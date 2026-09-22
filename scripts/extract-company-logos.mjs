/**
 * Pull the company logos out of the PSD HTML export into public/about/logos.
 *
 * These are the same marks used on the designed CV. The export embeds them at
 * their native (small) size, so we only trim the transparent margin and keep
 * the pixels as-is rather than upscaling.
 *
 * Usage: node scripts/extract-company-logos.mjs
 */
import sharp from "sharp";
import { mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "public/about");
const outDir = path.join(root, "public/about/logos");

const LOGOS = {
  "sihati.png": "icon-3721c1b492e9.png",
  "mowajihai.png": "icon-e1fa4d1d7341.png",
  "nebrasai.png": "icon-910628a70c15.png",
  "twareg-esports.png": "icon-97af8ca7eb1b.png",
  "rawd-newton.png": "icon-d66ab2d54457.png",
  "cs-club.png": "icon-7b6ea53f6e00.png",
};

mkdirSync(outDir, { recursive: true });

for (const [name, source] of Object.entries(LOGOS)) {
  const from = path.join(srcDir, source);
  if (!existsSync(from)) {
    console.log("missing source for", name, "->", source);
    continue;
  }
  const dest = path.join(outDir, name);
  await sharp(from).ensureAlpha().trim({ threshold: 1 }).png().toFile(dest);
  const m = await sharp(dest).metadata();
  console.log(name.padEnd(20), `${m.width}x${m.height}`.padEnd(10), "from", source);
}
