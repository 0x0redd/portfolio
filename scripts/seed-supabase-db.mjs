/**
 * Seed / sync Supabase `images` (+ optional comments) from Storage + curated grids.
 *
 * Prerequisites:
 *   1. Run SQL: supabase/migrations/001_portfolio_db.sql
 *   2. SUPABASE_SERVICE_ROLE_KEY in .env.local
 *
 *   node scripts/seed-supabase-db.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const BUCKET = process.env.SUPABASE_MEDIA_BUCKET || "portfolio";

function loadEnv(file) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    if (!(k in process.env)) process.env[k] = v;
  }
}

loadEnv(path.join(root, ".env.local"));
loadEnv(path.join(root, ".env"));

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing SUPABASE URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

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

function normalizePath(p) {
  return p.replace(/^\/+/, "").replace(/\\/g, "/");
}

function albumFromPath(storagePath) {
  const normalized = normalizePath(storagePath);
  const slash = normalized.indexOf("/");
  return slash === -1 ? "root" : normalized.slice(0, slash);
}

/** Extract uncommented '/path/to/file' strings from a curated grid snapshot. */
function extractPathsFromCurated(filePath) {
  if (!existsSync(filePath)) return [];
  let buf = readFileSync(filePath);
  // PowerShell redirects sometimes write UTF-16 LE
  let text;
  if (buf[0] === 0xff && buf[1] === 0xfe) {
    text = buf.toString("utf16le");
  } else {
    text = buf.toString("utf8");
  }
  const paths = [];
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith("*")) continue;
    const match = trimmed.match(
      /['"](\/[^'"]+\.(?:jpg|jpeg|png|webp|gif|svg|webm|mp4|mov))['"]/i
    );
    if (match) paths.push(normalizePath(match[1]));
  }
  return paths;
}

function loadCuratedByAlbum() {
  const mapping = {
    Fes: "scripts/_curated_Fes.tsx",
    Afcon: "scripts/_curated_Afcon.tsx",
    "world cup 2022": "scripts/_curated_WC.tsx",
    meknes: "scripts/_curated_Meknes.tsx",
    Street: "scripts/_curated_Street.tsx",
    rabat: "scripts/_curated_Rabat.tsx",
    candid: "scripts/_curated_candid.tsx",
    CSC: "scripts/_curated_CSC.tsx",
    Pined: "scripts/_curated_Pined.tsx",
  };

  /** @type {Map<string, { album: string, sort: number }>} */
  const curated = new Map();

  for (const [album, rel] of Object.entries(mapping)) {
    const paths = extractPathsFromCurated(path.join(root, rel));
    paths.forEach((p, index) => {
      curated.set(p, { album, sort: index + 1 });
    });
    console.log(`Curated ${album}: ${paths.length} images`);
  }

  return curated;
}

async function listStoragePaths(prefix = "") {
  const out = [];
  const queue = [prefix];

  while (queue.length) {
    const current = queue.shift();
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .list(current || undefined, { limit: 1000, offset: 0 });

    if (error) {
      console.warn(`list ${current || "/"}: ${error.message}`);
      continue;
    }

    for (const item of data || []) {
      const rel = current ? `${current}/${item.name}` : item.name;
      if (item.id === null && !item.metadata) {
        queue.push(rel);
      } else {
        const ext = path.extname(item.name).toLowerCase();
        if (MEDIA_EXT.has(ext)) out.push(rel);
      }
    }
  }

  return out;
}

async function ensureTables() {
  const { error } = await supabase.from("images").select("id").limit(1);
  if (error) {
    console.error(`
Tables are missing (${error.message}).

1. Open Supabase → SQL Editor
2. Paste and run: supabase/migrations/001_portfolio_db.sql
3. Re-run: npm run db:seed
`);
    process.exit(1);
  }
}

async function seedImages() {
  const curated = loadCuratedByAlbum();
  const storagePaths = await listStoragePaths();
  console.log(`\nStorage files: ${storagePaths.length}`);

  const rows = storagePaths.map((storagePath) => {
    const curatedMeta = curated.get(storagePath);
    const album = curatedMeta?.album || albumFromPath(storagePath);
    const filename = storagePath.split("/").pop() || storagePath;
    return {
      path: storagePath,
      album,
      filename,
      content_type: contentType(storagePath),
      sort_order: curatedMeta?.sort ?? 0,
      published: Boolean(curatedMeta),
      featured: false,
      updated_at: new Date().toISOString(),
    };
  });

  // Also include curated paths that might only exist under a gallery override
  for (const [storagePath, meta] of curated.entries()) {
    if (rows.some((r) => r.path === storagePath)) continue;
    rows.push({
      path: storagePath,
      album: meta.album,
      filename: storagePath.split("/").pop() || storagePath,
      content_type: contentType(storagePath),
      sort_order: meta.sort,
      published: true,
      featured: false,
      updated_at: new Date().toISOString(),
    });
  }

  let upserted = 0;
  const chunkSize = 100;
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    const { error } = await supabase.from("images").upsert(chunk, {
      onConflict: "path",
    });
    if (error) throw error;
    upserted += chunk.length;
    process.stdout.write(`  images ${upserted}/${rows.length}\r`);
  }
  console.log(`\nUpserted ${upserted} image rows`);
  console.log(
    `Published: ${rows.filter((r) => r.published).length} (from curated grids)`
  );
}

async function seedStatsDefaults() {
  const defaults = [
    {
      key: "site_views_offset",
      value: 2000,
      label: "Portfolio visits offset",
      hint: "Added to raw page_views count for display",
    },
    {
      key: "unsplash_views",
      value: 0,
      label: "Unsplash views",
      hint: "Total impressions across published photos.",
    },
    {
      key: "unsplash_downloads",
      value: 0,
      label: "Unsplash downloads",
      hint: "Free downloads by creators worldwide.",
    },
    {
      key: "unsplash_photos",
      value: 0,
      label: "Photos published",
      hint: "Free photos shared on Unsplash.",
    },
    {
      key: "unsplash_likes",
      value: 0,
      label: "Photo likes",
      hint: "Community appreciation across the library.",
    },
    {
      key: "unsplash_collections",
      value: 0,
      label: "Collections",
      hint: "Curated sets of work on Unsplash.",
    },
  ];

  const { error } = await supabase.from("stats").upsert(defaults, {
    onConflict: "key",
    ignoreDuplicates: true,
  });
  if (error) throw error;
  console.log("Stats defaults ensured");
}

async function migrateCommentsFromSheets() {
  // Optional: leave empty comments table; users add via UI.
  const { count } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true });
  console.log(`Comments in DB: ${count ?? 0}`);
}

async function main() {
  console.log(`Supabase: ${url}`);
  console.log(`Bucket:   ${BUCKET}\n`);
  await ensureTables();
  await seedStatsDefaults();
  await seedImages();
  await migrateCommentsFromSheets();
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
