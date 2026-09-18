/**
 * Apply SQL migration via Supabase Postgres connection.
 * Needs one of: DATABASE_URL | SUPABASE_DB_PASSWORD | POSTGRES_PASSWORD
 *
 * Fallback: paste supabase/migrations/001_portfolio_db.sql in the SQL Editor.
 */
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadEnv(file) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))
      v = v.slice(1, -1);
    if (!(k in process.env)) process.env[k] = v;
  }
}

loadEnv(path.join(root, ".env.local"));
loadEnv(path.join(root, ".env"));

const sqlPath = path.join(root, "supabase/migrations/001_portfolio_db.sql");
const sql = readFileSync(sqlPath, "utf8");

function connectionString() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const password =
    process.env.SUPABASE_DB_PASSWORD ||
    process.env.POSTGRES_PASSWORD ||
    process.env.DB_PASSWORD;
  const host = process.env.POSTGRES_HOST || "db.ircpfkersflenhimzjrs.supabase.co";
  const user = process.env.POSTGRES_USER || "postgres";
  const database = process.env.POSTGRES_DATABASE || "postgres";
  const port = process.env.POSTGRES_PORT || "5432";
  if (!password) return null;
  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}`;
}

const conn = connectionString();
if (!conn) {
  console.error(`
Missing database password.

Add one of these to .env.local:
  SUPABASE_DB_PASSWORD=your-database-password
  # or
  DATABASE_URL=postgresql://postgres:PASSWORD@db.ircpfkersflenhimzjrs.supabase.co:5432/postgres

Find it in: Supabase → Project Settings → Database → Database password

Then re-run:
  npm run db:setup

Or paste this file into the SQL Editor:
  supabase/migrations/001_portfolio_db.sql
`);
  process.exit(1);
}

const client = new pg.Client({
  connectionString: conn,
  ssl: { rejectUnauthorized: false },
});

await client.connect();
try {
  await client.query(sql);
  console.log("Migration applied successfully.");
} finally {
  await client.end();
}
