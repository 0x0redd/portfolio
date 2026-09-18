/**
 * Resolve media paths to a same-origin /media URL (proxied to Supabase Storage).
 *
 * Avoids cross-origin supabase.co requests (and Cloudflare __cf_bm cookie noise).
 *
 * Optional:
 *   NEXT_PUBLIC_MEDIA_BASE=https://cdn.example.com  → use that host instead
 *   NEXT_PUBLIC_MEDIA_DIRECT=1 → hit Supabase storage URLs directly
 */
const BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET ||
  process.env.SUPABASE_MEDIA_BUCKET ||
  "portfolio";

function encodeStoragePath(normalized: string): string {
  return normalized
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

export function mediaUrl(path: string): string {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const normalized = path.startsWith("/") ? path.slice(1) : path;
  const encoded = encodeStoragePath(normalized);

  const customBase = (process.env.NEXT_PUBLIC_MEDIA_BASE || "").replace(/\/$/, "");
  if (customBase) {
    return `${customBase}/${encoded}`;
  }

  const supabaseUrl = (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    ""
  ).replace(/\/$/, "");

  if (!supabaseUrl) {
    return `/${normalized}`;
  }

  // Same-origin proxy (see next.config.js rewrites) — default
  if (process.env.NEXT_PUBLIC_MEDIA_DIRECT !== "1") {
    return `/media/${encoded}`;
  }

  return `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${encoded}`;
}

export const MEDIA_BUCKET = BUCKET;
