/**
 * Build the web-ready CV PDFs served from /public/cv.
 *
 * The designed CV is a Photoshop export that ships every layer at full
 * resolution (~42 MB), which is far too heavy to put behind a download button.
 * We flatten it to a single JPEG at the artboard's native pixel size and wrap
 * that in a minimal one-page PDF, which keeps it visually identical on screen.
 *
 * Requires poppler's `pdftoppm` on PATH (ships with MiKTeX).
 *
 * Usage: node scripts/build-cv-pdfs.mjs
 */
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { mkdirSync, copyFileSync, readFileSync, writeFileSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public/cv");

const SOURCES = {
  professional: path.join(root, "design-src/cv/main-1.pdf"),
  designed: path.join(root, "design-src/cv/designed-artboard.pdf"),
};
const OUTPUTS = {
  professional: path.join(outDir, "othmane-ferrah-cv.pdf"),
  designed: path.join(outDir, "othmane-ferrah-cv-designed.pdf"),
};

const DPI = 72; // artboard points == native pixels, so 72 is 1:1
const JPEG_QUALITY = 82;

/** Wrap a JPEG buffer in a minimal single-page PDF (DCTDecode, no re-encoding). */
function jpegToPdf(jpeg, pxWidth, pxHeight) {
  const w = ((pxWidth / DPI) * 72).toFixed(2);
  const h = ((pxHeight / DPI) * 72).toFixed(2);
  const content = Buffer.from(`q\n${w} 0 0 ${h} 0 0 cm\n/Im0 Do\nQ\n`, "latin1");

  const objects = [
    Buffer.from("<< /Type /Catalog /Pages 2 0 R >>", "latin1"),
    Buffer.from("<< /Type /Pages /Kids [3 0 R] /Count 1 >>", "latin1"),
    Buffer.from(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${w} ${h}] ` +
        `/Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`,
      "latin1"
    ),
    Buffer.concat([
      Buffer.from(
        `<< /Type /XObject /Subtype /Image /Width ${pxWidth} /Height ${pxHeight} ` +
          `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode ` +
          `/Length ${jpeg.length} >>\nstream\n`,
        "latin1"
      ),
      jpeg,
      Buffer.from("\nendstream", "latin1"),
    ]),
    Buffer.concat([
      Buffer.from(`<< /Length ${content.length} >>\nstream\n`, "latin1"),
      content,
      Buffer.from("\nendstream", "latin1"),
    ]),
  ];

  const chunks = [Buffer.from("%PDF-1.4\n%\xe2\xe3\xcf\xd3\n", "latin1")];
  let offset = chunks[0].length;
  const xref = [];

  objects.forEach((body, i) => {
    xref.push(offset);
    const obj = Buffer.concat([
      Buffer.from(`${i + 1} 0 obj\n`, "latin1"),
      body,
      Buffer.from("\nendobj\n", "latin1"),
    ]);
    chunks.push(obj);
    offset += obj.length;
  });

  let table = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const o of xref) table += `${String(o).padStart(10, "0")} 00000 n \n`;
  table += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${offset}\n%%EOF\n`;
  chunks.push(Buffer.from(table, "latin1"));

  return Buffer.concat(chunks);
}

const mb = (p) => (statSync(p).size / 1024 / 1024).toFixed(2) + " MB";

mkdirSync(outDir, { recursive: true });

// The LaTeX CV is already small — ship it as-is.
copyFileSync(SOURCES.professional, OUTPUTS.professional);
console.log("professional:", mb(SOURCES.professional), "->", mb(OUTPUTS.professional));

const stage = path.join(tmpdir(), `cv-designed-${Date.now()}`);
execFileSync("pdftoppm", ["-r", String(DPI), "-png", "-singlefile", SOURCES.designed, stage], {
  stdio: "inherit",
});

const png = `${stage}.png`;
const { width, height } = await sharp(png).metadata();
const jpeg = await sharp(png)
  .flatten({ background: "#ffffff" })
  .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, chromaSubsampling: "4:4:4" })
  .toBuffer();

writeFileSync(OUTPUTS.designed, jpegToPdf(jpeg, width, height));
rmSync(png, { force: true });

console.log(`designed:     ${mb(SOURCES.designed)} -> ${mb(OUTPUTS.designed)}  (${width}x${height}px)`);
