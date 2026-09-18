/**
 * One-time migrate comments from Google Sheets → Supabase `comments`.
 */
import { createClient } from "@supabase/supabase-js";
import { google } from "googleapis";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SHEET_ID = "17PT7eF7NbNythiSCyRyYeE6UDVtuPGXzGQu1JVbaO0E";

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
const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!url || !key) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}
if (!clientEmail || !privateKey) {
  console.error("Missing Google credentials — skip comments migration");
  process.exit(0);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const auth = new google.auth.GoogleAuth({
  credentials: { client_email: clientEmail, private_key: privateKey },
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});
const sheets = google.sheets({ version: "v4", auth });

const sheetInfo = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
const sheetName =
  sheetInfo.data.sheets?.[0]?.properties?.title || "Sheet1";

const response = await sheets.spreadsheets.values.get({
  spreadsheetId: SHEET_ID,
  range: `${sheetName}!A:B`,
});

const rows = response.data.values || [];
const testimonials = rows
  .slice(1)
  .map((row) => ({
    name: String(row[0] || "").trim(),
    comment: String(row[1] || "").trim(),
  }))
  .filter((t) => t.name && t.comment);

console.log(`Found ${testimonials.length} comments in Sheets (${sheetName})`);

if (!testimonials.length) {
  process.exit(0);
}

const { data: existing } = await supabase.from("comments").select("name, comment");
const existingKeys = new Set(
  (existing || []).map((r) => `${r.name}::${r.comment}`)
);

const toInsert = testimonials.filter(
  (t) => !existingKeys.has(`${t.name}::${t.comment}`)
);

if (!toInsert.length) {
  console.log("All comments already in Supabase");
  process.exit(0);
}

const { error } = await supabase.from("comments").insert(toInsert);
if (error) throw error;
console.log(`Inserted ${toInsert.length} comments`);
