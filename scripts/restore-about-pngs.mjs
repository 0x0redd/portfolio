/**
 * Restore the About hero PNGs from the PSD HTML export.
 *
 * The earlier transparency pass keyed out near-black pixels, which also ate the
 * subject's hair and other dark objects. These layers already ship with a real
 * alpha channel from the PSD, so they only need extracting — no keying.
 *
 * Usage: node scripts/restore-about-pngs.mjs
 */
import sharp from "sharp";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = path.join(root, "app/about/6ac135246057935.69bb1a8d1c75c.html");
const outDir = path.join(root, "public/about");

// Rank in the export, sorted by byte size, → filename used by the About page.
const BY_RANK = {
  0: "hero-portrait.png",
  1: "hero-desk.png",
  2: "typewriter.png",
  3: "macintosh.png",
  4: "armchair.png",
};
// Aliases that should mirror another restored file.
const ALIASES = {
  "hero-secondary.png": "hero-desk.png",
  "portrait-chair.png": "typewriter.png",
  "still-typewriter.png": "armchair.png",
  "portrait-armchair.png": "macintosh.png",
};

if (!existsSync(htmlPath)) {
  console.error("HTML export not found:", htmlPath);
  process.exit(1);
}

const html = readFileSync(htmlPath, "utf8");
const re = /url\(data:image\/(png|jpeg|jpg|webp);base64,([A-Za-z0-9+/=]+)\)/gi;
const seen = new Map();
let match;
while ((match = re.exec(html)) !== null) {
  const b64 = match[2];
  const hash = createHash("sha1").update(b64).digest("hex").slice(0, 12);
  if (!seen.has(hash)) seen.set(hash, Buffer.from(b64, "base64"));
}

const sorted = [...seen.values()].sort((a, b) => b.length - a.length);

for (const [rank, name] of Object.entries(BY_RANK)) {
  const buf = sorted[Number(rank)];
  if (!buf) continue;
  const dest = path.join(outDir, name);
  writeFileSync(dest, buf);
  const m = await sharp(dest).metadata();
  console.log(
    "restored",
    name.padEnd(22),
    `${m.width}x${m.height}`.padEnd(12),
    `alpha=${m.hasAlpha}`,
    `${(buf.length / 1024).toFixed(0)}KB`
  );
}

for (const [alias, source] of Object.entries(ALIASES)) {
  const from = path.join(outDir, source);
  if (!existsSync(from)) continue;
  writeFileSync(path.join(outDir, alias), readFileSync(from));
  console.log("aliased ", alias.padEnd(22), "<-", source);
}
