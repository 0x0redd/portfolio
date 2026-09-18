import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const mapping = {
  Fes: "_curated_Fes.tsx",
  Afcon: "_curated_Afcon.tsx",
  "world cup 2022": "_curated_WC.tsx",
  meknes: "_curated_Meknes.tsx",
  Street: "_curated_Street.tsx",
  rabat: "_curated_Rabat.tsx",
  candid: "_curated_candid.tsx",
  CSC: "_curated_CSC.tsx",
  Pined: "_curated_Pined.tsx",
};

const out = {};

for (const [album, file] of Object.entries(mapping)) {
  const full = path.join(root, "scripts", file);
  if (!existsSync(full)) {
    out[album] = [];
    continue;
  }
  const text = readFileSync(full, "utf8");
  const paths = [];
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("//")) continue;
    const m = t.match(
      /['"](\/[^'"]+\.(?:jpg|jpeg|png|webp|gif|svg|webm|mp4|mov))['"]/i
    );
    if (m) paths.push(m[1].replace(/^\//, ""));
  }
  out[album] = paths;
  console.log(album, paths.length);
}

writeFileSync(
  path.join(root, "lib/gallery-manifest.json"),
  JSON.stringify(out, null, 2)
);
console.log("wrote lib/gallery-manifest.json");
