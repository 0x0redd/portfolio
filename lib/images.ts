import { mediaUrl } from "@/lib/media";

export type PortfolioImage = {
  id: string;
  path: string;
  album: string;
  filename: string;
  url: string;
  sort_order: number;
  featured: boolean;
};

/** Build public URL for a storage-relative path like `Fes/IMG.jpg`. */
export function imagePublicUrl(storagePath: string): string {
  return mediaUrl(storagePath.startsWith("/") ? storagePath : `/${storagePath}`);
}

export function normalizeStoragePath(path: string): string {
  return path.replace(/^\/+/, "").replace(/\\/g, "/");
}

export function albumFromPath(storagePath: string): string {
  const normalized = normalizeStoragePath(storagePath);
  const slash = normalized.indexOf("/");
  if (slash === -1) return "root";
  return normalized.slice(0, slash);
}
