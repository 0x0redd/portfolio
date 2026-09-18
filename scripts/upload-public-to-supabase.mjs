/**
 * Upload everything under /public to Supabase Storage.
 *
 * Requires a service role key (Storage admin):
 *   Dashboard → Project Settings → API → service_role
 *
 * Add to .env.local (never commit):
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ...
 *
 * Usage:
 *   node scripts/upload-public-to-supabase.mjs
 *   node scripts/upload-public-to-supabase.mjs --dry-run
 *   node scripts/upload-public-to-supabase.mjs --folder=Fes
 */

import { createClient } from "@supabase/supabase-js";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync, existsSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  const text = readFileSync(filePath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(path.join(root, ".env.local"));
loadEnvFile(path.join(root, ".env"));

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v === undefined ? true : v];
  })
);

const DRY_RUN = Boolean(args["dry-run"]);
const ONLY_FOLDER = args.folder || null;
const BUCKET = process.env.SUPABASE_MEDIA_BUCKET || "portfolio";
const PUBLIC_DIR = path.join(root, "public");

// Free-tier default is 50MB. Keep under that unless you raise it in the dashboard.
const MAX_BYTES = Number(process.env.SUPABASE_MAX_FILE_BYTES || 50 * 1024 * 1024);

const SKIP_NAMES = new Set([
  "compress.py",
  ".DS_Store",
  "Thumbs.db",
  "Untitled",
]);

const MEDIA_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".svg",
  ".webm",
  ".mp4",
  ".mov",
]);

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_URL in .env");
  process.exit(1);
}

if (!serviceKey) {
  console.error(`
Missing SUPABASE_SERVICE_ROLE_KEY.

1. Open Supabase → Project Settings → API
2. Copy the service_role key (secret)
3. Add to .env.local:

   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

Then re-run:
   node scripts/upload-public-to-supabase.mjs
`);
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".webm": "video/webm",
    ".mp4": "video/mp4",
    ".mov": "video/quicktime",
  };
  return map[ext] || "application/octet-stream";
}

function formatMB(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

async function walk(dir, base = "") {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (SKIP_NAMES.has(entry.name)) continue;
    if (entry.name.startsWith(".")) continue;

    const abs = path.join(dir, entry.name);
    const rel = base ? `${base}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      if (ONLY_FOLDER && !base && entry.name !== ONLY_FOLDER) continue;
      files.push(...(await walk(abs, rel)));
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!MEDIA_EXT.has(ext)) continue;

    const info = await stat(abs);
    files.push({
      abs,
      rel: rel.replace(/\\/g, "/"),
      size: info.size,
    });
  }

  return files;
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function uploadWithRetry(file, attempts = 5) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const body = await readFile(file.abs);
      const { error } = await supabase.storage.from(BUCKET).upload(file.rel, body, {
        contentType: contentType(file.abs),
        upsert: true,
        cacheControl: "31536000",
      });
      if (error) throw error;
      return;
    } catch (err) {
      lastError = err;
      const msg = String(err?.message || err);
      const retryable =
        /fetch failed|network|timeout|ECONNRESET|ETIMEDOUT|429|503|502/i.test(msg);
      if (!retryable || attempt === attempts) break;
      const wait = Math.min(30_000, 1000 * 2 ** (attempt - 1));
      console.warn(`     retry ${attempt}/${attempts} in ${wait}ms (${msg})`);
      await sleep(wait);
    }
  }
  throw lastError;
}

async function ensureBucket() {
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) throw listError;

  const existing = (buckets || []).find((b) => b.name === BUCKET);
  if (existing) {
    console.log(`Bucket "${BUCKET}" already exists.`);
    // Keep free-tier safe limit (50MB)
    const { error: updateError } = await supabase.storage.updateBucket(BUCKET, {
      public: true,
      fileSizeLimit: MAX_BYTES,
    });
    if (updateError) {
      console.warn(`Could not update bucket limits: ${updateError.message}`);
    }
    return;
  }

  console.log(`Creating public bucket "${BUCKET}" (max file ${formatMB(MAX_BYTES)})...`);
  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: MAX_BYTES,
  });

  if (error) {
    // Bucket may already exist from a partial previous run
    if (/already exists|duplicate/i.test(error.message)) {
      console.log(`Bucket "${BUCKET}" already exists (continuing).`);
      return;
    }
    throw error;
  }

  console.log(`Created bucket "${BUCKET}".`);
}

async function listExistingPaths(prefix = "") {
  const existing = new Set();
  const queue = [prefix];

  while (queue.length) {
    const current = queue.shift();
    const { data, error } = await supabase.storage.from(BUCKET).list(current || undefined, {
      limit: 1000,
      offset: 0,
    });
    if (error) {
      console.warn(`Could not list "${current || "/"}": ${error.message}`);
      continue;
    }
    for (const item of data || []) {
      const rel = current ? `${current}/${item.name}` : item.name;
      // folders have id null and no metadata in storage list
      if (item.id === null && !item.metadata) {
        queue.push(rel);
      } else {
        existing.add(rel);
      }
    }
  }

  return existing;
}

async function main() {
  console.log(`Supabase: ${url}`);
  console.log(`Bucket:   ${BUCKET}`);
  console.log(`Max file: ${formatMB(MAX_BYTES)}`);
  console.log(`Mode:     ${DRY_RUN ? "DRY RUN" : "UPLOAD"}`);
  if (ONLY_FOLDER) console.log(`Folder:   ${ONLY_FOLDER}`);
  console.log("");

  await ensureBucket();

  const files = await walk(PUBLIC_DIR);
  const tooBig = files.filter((f) => f.size > MAX_BYTES);
  let uploadable = files.filter((f) => f.size <= MAX_BYTES);

  console.log(`Found ${files.length} media files under public/`);
  console.log(`  under limit: ${uploadable.length}`);
  console.log(`  too large:   ${tooBig.length}`);

  if (tooBig.length) {
    console.log("\nSkipping files over the size limit:");
    for (const file of tooBig) {
      console.log(`  SKIP ${file.rel} (${formatMB(file.size)})`);
    }
  }

  console.log("\nChecking what's already in the bucket...");
  const existing = await listExistingPaths(ONLY_FOLDER || "");
  const pending = uploadable.filter((f) => !existing.has(f.rel));
  const already = uploadable.length - pending.length;
  uploadable = pending;

  console.log(`  already uploaded: ${already}`);
  console.log(`  remaining:        ${uploadable.length}\n`);

  let uploaded = 0;
  let skipped = tooBig.length + already;
  let failed = 0;

  for (let i = 0; i < uploadable.length; i++) {
    const file = uploadable[i];
    const label = `[${i + 1}/${uploadable.length}] ${file.rel} (${formatMB(file.size)})`;

    if (DRY_RUN) {
      console.log(`DRY  ${label}`);
      skipped++;
      continue;
    }

    try {
      await uploadWithRetry(file);
      uploaded++;
      process.stdout.write(`OK   ${label}\n`);
    } catch (err) {
      failed++;
      console.error(`FAIL ${label}`);
      console.error(`     ${err.message || err}`);
    }

    // Light pacing to reduce intermittent fetch failures on large batches
    await sleep(40);
  }

  const publicBase = `${url.replace(/\/$/, "")}/storage/v1/object/public/${BUCKET}`;
  console.log(`
Done.
  uploaded: ${uploaded}
  skipped:  ${skipped}
  failed:   ${failed}

Public base URL:
  ${publicBase}/Fes/example.jpg

If uploads still 413:
  Supabase → Storage → ${BUCKET} → Configuration → raise "Global file size limit"
  (Free plan max is usually 50MB per file)
`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
