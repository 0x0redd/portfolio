/**
 * Extract unique base64 PNGs from the PSD HTML export into public/about/
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = path.join(
  root,
  "app/about/6ac135246057935.69bb1a8d1c75c.html"
);
const outDir = path.join(root, "public/about");

if (!existsSync(htmlPath)) {
  console.error("HTML export not found:", htmlPath);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

const html = readFileSync(htmlPath, "utf8");
const re = /url\(data:image\/(png|jpeg|jpg|webp);base64,([A-Za-z0-9+/=]+)\)/gi;
const seen = new Map();
let match;
let index = 0;

while ((match = re.exec(html)) !== null) {
  const ext = match[1] === "jpeg" ? "jpg" : match[1];
  const b64 = match[2];
  const hash = createHash("sha1").update(b64).digest("hex").slice(0, 12);
  if (seen.has(hash)) continue;

  const buf = Buffer.from(b64, "base64");
  // Skip tiny icons (< 8KB) for named hero assets; still save large ones
  seen.set(hash, { size: buf.length, ext, buf, index: index++ });
}

const sorted = [...seen.entries()].sort((a, b) => b[1].size - a[1].size);
console.log(`Unique images: ${sorted.length}`);

const named = [];
sorted.forEach(([hash, info], i) => {
  let name;
  if (i === 0) name = `hero-portrait.${info.ext}`;
  else if (i === 1) name = `hero-secondary.${info.ext}`;
  else if (i === 2) name = `typewriter.${info.ext}`;
  else if (i === 3) name = `macintosh.${info.ext}`;
  else if (i === 4) name = `armchair.${info.ext}`;
  else if (info.size < 12_000) name = `icon-${hash}.${info.ext}`;
  else name = `asset-${String(i).padStart(2, "0")}-${hash}.${info.ext}`;

  writeFileSync(path.join(outDir, name), info.buf);
  named.push({ name, size: info.size, kb: (info.size / 1024).toFixed(1) });
});

console.log("Top 12 by size:");
named.slice(0, 12).forEach((n) => console.log(`  ${n.name} (${n.kb} KB)`));
console.log(`Wrote ${named.length} files to public/about/`);
