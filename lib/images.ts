import galleryManifest from "@/lib/gallery-manifest.json";

export type PortfolioImage = {
  id: string;
  path: string;
  album: string;
  filename: string;
  url: string;
  sort_order: number;
  featured: boolean;
};

/** Build public URL for a path under /public, e.g. `Fes/IMG.jpg` → `/Fes/IMG.jpg`. */
export function imagePublicUrl(storagePath: string): string {
  return storagePath.startsWith("/") ? storagePath : `/${storagePath}`;
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

/** Album images from the local gallery manifest (served from /public). */
export function getAlbumImages(album: string): PortfolioImage[] {
  const paths = (galleryManifest as Record<string, string[]>)[album] || [];
  return paths.map((storagePath, index) => {
    const path = normalizeStoragePath(storagePath);
    return {
      id: `${album}-${index}`,
      path,
      album,
      filename: path.split("/").pop() || path,
      sort_order: index + 1,
      featured: false,
      url: imagePublicUrl(path),
    };
  });
}
