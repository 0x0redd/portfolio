import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  UNSPLASH_API_BASE,
  UNSPLASH_FALLBACK,
  UNSPLASH_USERNAME,
  mapUnsplashProfile,
} from "@/lib/unsplash";

export const dynamic = "force-dynamic";

const UNSPLASH_ACCESS_KEY =
  process.env.UNSPLASH_ACCESS_KEY ||
  "cxxw5OQ2k5SX6cvewtfgHodhT25WFt3nNPOMEntUtio";

async function fetchUnsplash<T>(path: string) {
  const url = new URL(`${UNSPLASH_API_BASE}${path}`);
  url.searchParams.set("client_id", UNSPLASH_ACCESS_KEY);

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as T;
}

async function profileFromDb() {
  try {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase.from("stats").select("key, value");
    if (!data?.length) return null;

    const map: Record<string, number> = {};
    for (const row of data) map[row.key] = Number(row.value) || 0;

    return {
      ...UNSPLASH_FALLBACK,
      totalPhotos: map.unsplash_photos || UNSPLASH_FALLBACK.totalPhotos,
      totalLikes: map.unsplash_likes || UNSPLASH_FALLBACK.totalLikes,
      totalCollections:
        map.unsplash_collections || UNSPLASH_FALLBACK.totalCollections,
      stats: {
        views: map.unsplash_views || 0,
        downloads: map.unsplash_downloads || 0,
      },
    };
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const [user, statistics] = await Promise.all([
      fetchUnsplash<Parameters<typeof mapUnsplashProfile>[0]>(
        `/users/${UNSPLASH_USERNAME}`
      ),
      fetchUnsplash<NonNullable<Parameters<typeof mapUnsplashProfile>[1]>>(
        `/users/${UNSPLASH_USERNAME}/statistics`
      ),
    ]);

    if (!user) {
      const cached = await profileFromDb();
      return NextResponse.json({
        ...(cached || UNSPLASH_FALLBACK),
        error: "Failed to load Unsplash profile",
      });
    }

    const profile = mapUnsplashProfile(user, statistics);

    // Keep stats table in sync for the Numbers section / dashboard
    try {
      const supabase = createSupabaseServerClient();
      const now = new Date().toISOString();
      await supabase.from("stats").upsert(
        [
          {
            key: "unsplash_views",
            value: profile.stats?.views ?? 0,
            label: "Unsplash views",
            hint: "Total impressions across published photos.",
            updated_at: now,
          },
          {
            key: "unsplash_downloads",
            value: profile.stats?.downloads ?? 0,
            label: "Unsplash downloads",
            hint: "Free downloads by creators worldwide.",
            updated_at: now,
          },
          {
            key: "unsplash_photos",
            value: profile.totalPhotos,
            label: "Photos published",
            hint: "Free photos shared on Unsplash.",
            updated_at: now,
          },
          {
            key: "unsplash_likes",
            value: profile.totalLikes,
            label: "Photo likes",
            hint: "Community appreciation across the library.",
            updated_at: now,
          },
          {
            key: "unsplash_collections",
            value: profile.totalCollections,
            label: "Collections",
            hint: "Curated sets of work on Unsplash.",
            updated_at: now,
          },
        ],
        { onConflict: "key" }
      );
    } catch (syncError) {
      console.warn("Could not sync Unsplash stats to Supabase:", syncError);
    }

    return NextResponse.json(profile);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch Unsplash data";
    console.error("Unsplash API error:", message);
    const cached = await profileFromDb();
    return NextResponse.json(
      { ...(cached || UNSPLASH_FALLBACK), error: message },
      { status: 500 }
    );
  }
}
