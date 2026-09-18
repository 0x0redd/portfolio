import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { imagePublicUrl, normalizeStoragePath } from "@/lib/images";
import galleryManifest from "@/lib/gallery-manifest.json";

export const dynamic = "force-dynamic";

function manifestImages(album: string | null) {
  const entries = album
    ? { [album]: (galleryManifest as Record<string, string[]>)[album] || [] }
    : (galleryManifest as Record<string, string[]>);

  const images = Object.entries(entries).flatMap(([albumName, paths]) =>
    paths.map((storagePath, index) => {
      const path = normalizeStoragePath(storagePath);
      return {
        id: `manifest-${albumName}-${index}`,
        path,
        album: albumName,
        filename: path.split("/").pop() || path,
        sort_order: index + 1,
        featured: false,
        url: imagePublicUrl(path),
      };
    })
  );

  return images;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const album = searchParams.get("album");
    const publishedOnly = searchParams.get("all") !== "1";

    try {
      const supabase = createSupabaseServerClient();

      let query = supabase
        .from("images")
        .select("id, path, album, filename, sort_order, featured, published")
        .order("sort_order", { ascending: true })
        .order("filename", { ascending: true });

      if (album) query = query.eq("album", album);
      if (publishedOnly) query = query.eq("published", true);

      const { data, error } = await query;
      if (error) throw error;

      if (data && data.length > 0) {
        const images = data.map((row) => {
          const path = normalizeStoragePath(row.path);
          return {
            id: row.id,
            path,
            album: row.album,
            filename: row.filename,
            sort_order: row.sort_order,
            featured: row.featured,
            url: imagePublicUrl(path),
          };
        });
        return NextResponse.json({ images, source: "supabase" });
      }
    } catch (dbError) {
      console.warn("Images DB unavailable, using manifest:", dbError);
    }

    return NextResponse.json({
      images: manifestImages(album),
      source: "manifest",
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch images";
    console.error("Images API error:", message);
    return NextResponse.json({ error: message, images: [] }, { status: 500 });
  }
}
