#!/usr/bin/env node
/**
 * Prune old Vercel deployments to reclaim Deployment Storage.
 *
 * Setup:
 *   export VERCEL_TOKEN=xxxxx        # vercel.com/account/tokens
 *   export VERCEL_TEAM_ID=team_xxx   # optional; omit for a personal account
 *
 * Dry run (default — deletes nothing):
 *   node vercel-prune-deployments.mjs --days=30
 *
 * Delete for real:
 *   node vercel-prune-deployments.mjs --days=30 --apply
 *
 * Options:
 *   --days=N               only touch deployments older than N days (default 30)
 *   --project=name         limit to one project
 *   --include-production   also delete production deployments (off by default)
 *   --apply                actually delete; without it, nothing is removed
 *
 * Production deployments are skipped unless you opt in, and anything that
 * currently has an alias pointing at it is always skipped — deleting those
 * takes your site down and kills instant rollback.
 */

const TOKEN = process.env.VERCEL_TOKEN;
const TEAM = process.env.VERCEL_TEAM_ID || '';

if (!TOKEN) {
  console.error('Set VERCEL_TOKEN first. Create one at vercel.com/account/tokens');
  process.exit(1);
}

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v === undefined ? true : v];
  })
);

const DAYS = Number(args.days ?? 30);
const PROJECT = args.project || null;
const APPLY = Boolean(args.apply);
const INCLUDE_PROD = Boolean(args['include-production']);
const CUTOFF = Date.now() - DAYS * 86400_000;

const teamParam = TEAM ? `teamId=${TEAM}` : '';
const headers = { Authorization: `Bearer ${TOKEN}` };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(path) {
  const res = await fetch(`https://api.vercel.com${path}`, { headers });
  if (res.status === 429) {
    const wait = Number(res.headers.get('retry-after') || 30);
    console.log(`  rate limited, waiting ${wait}s…`);
    await sleep(wait * 1000);
    return api(path);
  }
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
}

async function listDeployments() {
  const all = [];
  let until = null;
  for (;;) {
    const qs = [teamParam, 'limit=100', PROJECT && `app=${PROJECT}`, until && `until=${until}`]
      .filter(Boolean)
      .join('&');
    const data = await api(`/v6/deployments?${qs}`);
    const batch = data.deployments || [];
    all.push(...batch);
    process.stdout.write(`\rFetched ${all.length} deployments…`);
    if (!data.pagination?.next || !batch.length) break;
    until = data.pagination.next;
    await sleep(300);
  }
  process.stdout.write('\n');
  return all;
}

async function remove(id) {
  const res = await fetch(
    `https://api.vercel.com/v13/deployments/${id}${teamParam ? '?' + teamParam : ''}`,
    { method: 'DELETE', headers }
  );
  if (res.status === 429) {
    const wait = Number(res.headers.get('retry-after') || 30);
    console.log(`  rate limited, waiting ${wait}s…`);
    await sleep(wait * 1000);
    return remove(id);
  }
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
}

const fmt = (d) => new Date(d).toISOString().slice(0, 10);

const all = await listDeployments();

const keep = [];
const targets = [];

for (const d of all) {
  const age = d.created ?? d.createdAt;
  if (age >= CUTOFF) { keep.push([d, `newer than ${DAYS}d`]); continue; }
  if (d.aliasAssigned) { keep.push([d, 'alias assigned']); continue; }
  if (d.target === 'production' && !INCLUDE_PROD) { keep.push([d, 'production']); continue; }
  targets.push(d);
}

// Group for a readable summary
const byProject = targets.reduce((acc, d) => {
  (acc[d.name] ||= []).push(d);
  return acc;
}, {});

console.log(`\n${all.length} deployments total · ${keep.length} kept · ${targets.length} to delete\n`);
for (const [name, list] of Object.entries(byProject)) {
  const oldest = fmt(Math.min(...list.map((d) => d.created ?? d.createdAt)));
  const newest = fmt(Math.max(...list.map((d) => d.created ?? d.createdAt)));
  console.log(`  ${name.padEnd(28)} ${String(list.length).padStart(4)} deployments  ${oldest} → ${newest}`);
}

if (!targets.length) {
  console.log('\nNothing older than the cutoff. Try a smaller --days value.');
  process.exit(0);
}

if (!APPLY) {
  console.log('\nDry run. Re-run with --apply to delete these.');
  process.exit(0);
}

console.log('\nDeleting…');
let done = 0, failed = 0;
for (const d of targets) {
  try {
    await remove(d.uid);
    done++;
  } catch (err) {
    failed++;
    console.error(`  ${d.url}: ${err.message}`);
  }
  process.stdout.write(`\r  ${done}/${targets.length} deleted${failed ? `, ${failed} failed` : ''}`);
  await sleep(250);
}
console.log('\nDone.');
