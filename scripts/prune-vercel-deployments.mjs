// Prune old Vercel deployments to free Deployment Storage.
// Usage:
//   node scripts/prune-vercel-deployments.mjs
// Optional:
//   KEEP=3 node scripts/prune-vercel-deployments.mjs

import { execSync } from "node:child_process";

const KEEP = Number(process.env.KEEP || 3);
const URL_RE = /https:\/\/[a-z0-9-]+\.vercel\.app/gi;

function run(command) {
  return execSync(command, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function extractUrls(text) {
  const matches = text.match(URL_RE) || [];
  // Preserve first-seen order (newest first from `vercel ls`)
  return [...new Set(matches.map((url) => url.toLowerCase()))];
}

function listAllDeployments() {
  const urls = [];
  let next = null;
  let page = 1;

  while (true) {
    const command = next
      ? `npx vercel ls -y --next ${next}`
      : "npx vercel ls -y";

    console.log(`Fetching deployments page ${page}...`);
    let output = "";
    try {
      output = run(command);
    } catch (error) {
      const stderr = String(error.stderr || error.message || error);
      throw new Error(stderr);
    }

    const pageUrls = extractUrls(output);
    for (const url of pageUrls) {
      if (!urls.includes(url)) urls.push(url);
    }

    const nextMatch = output.match(/vercel ls --yes --next (\d+)/i);
    if (!nextMatch) break;

    next = nextMatch[1];
    page += 1;

    // Safety valve
    if (page > 50) break;
  }

  return urls;
}

function main() {
  console.log(`Keeping newest ${KEEP} deployments.\n`);

  let deployments;
  try {
    deployments = listAllDeployments();
  } catch (error) {
    console.error(
      "Failed to list deployments. Run `npx vercel login` then `npx vercel link` in this project."
    );
    console.error(String(error.message || error));
    process.exit(1);
  }

  const toDelete = deployments.slice(KEEP);
  console.log(
    `\nFound ${deployments.length} deployments. Deleting ${toDelete.length}...\n`
  );

  if (toDelete.length === 0) {
    console.log("Nothing to delete.");
    return;
  }

  for (const url of toDelete) {
    console.log(`Removing ${url} ...`);
    try {
      execSync(`npx vercel rm ${url} -y`, { stdio: "inherit" });
    } catch (error) {
      console.error(`Failed to remove ${url}`);
      console.error(String(error.message || error));
    }
  }

  console.log("\nDone. Check Vercel → Usage → Deployment Storage.");
}

main();
