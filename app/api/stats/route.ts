import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  UNSPLASH_API_BASE,
  UNSPLASH_FALLBACK,
  UNSPLASH_USERNAME,
  mapUnsplashProfile,
  type UnsplashProfilePayload,
} from "@/lib/unsplash";

export const dynamic = "force-dynamic";

const UNSPLASH_ACCESS_KEY =
  process.env.UNSPLASH_ACCESS_KEY ||
  "cxxw5OQ2k5SX6cvewtfgHodhT25WFt3nNPOMEntUtio";

type StatMap = Record<string, number>;

async function fetchUnsplash<T>(path: string) {
  const url = new URL(`${UNSPLASH_API_BASE}${path}`);
  url.searchParams.set("client_id", UNSPLASH_ACCESS_KEY);
  const response = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!response.ok) return null;
  return (await response.json()) as T;
}

async function readStatsMap(): Promise<StatMap> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from("stats").select("key, value");
  if (error) throw error;
  const map: StatMap = {};
  for (const row of data || []) {
    map[row.key] = Number(row.value) || 0;
  }
  return map;
}

async function upsertStats(
  entries: Array<{ key: string; value: number; label?: string; hint?: string }>
) {
  const supabase = createSupabaseServerClient();
  const now = new Date().toISOString();
  const { error } = await supabase.from("stats").upsert(
    entries.map((entry) => ({
      ...entry,
      updated_at: now,
    })),
    { onConflict: "key" }
  );
  if (error) throw error;
}

function profileFromStats(
  stats: StatMap,
  meta?: Partial<UnsplashProfilePayload>
): UnsplashProfilePayload {
  return {
    ...UNSPLASH_FALLBACK,
    ...meta,
    totalPhotos: stats.unsplash_photos || UNSPLASH_FALLBACK.totalPhotos,
    totalLikes: stats.unsplash_likes || UNSPLASH_FALLBACK.totalLikes,
    totalCollections:
      stats.unsplash_collections || UNSPLASH_FALLBACK.totalCollections,
    stats: {
      views: stats.unsplash_views || 0,
      downloads: stats.unsplash_downloads || 0,
    },
  };
}

export async function GET() {
  try {
    const supabase = createSupabaseServerClient();
    const stats = await readStatsMap();

    // Refresh Unsplash numbers into the stats table when possible
    try {
      const [user, statistics] = await Promise.all([
        fetchUnsplash<Parameters<typeof mapUnsplashProfile>[0]>(
          `/users/${UNSPLASH_USERNAME}`
        ),
        fetchUnsplash<NonNullable<Parameters<typeof mapUnsplashProfile>[1]>>(
          `/users/${UNSPLASH_USERNAME}/statistics`
        ),
      ]);

      if (user) {
        const profile = mapUnsplashProfile(user, statistics);
        await upsertStats([
          {
            key: "unsplash_views",
            value: profile.stats?.views ?? 0,
            label: "Unsplash views",
            hint: "Total impressions across published photos.",
          },
          {
            key: "unsplash_downloads",
            value: profile.stats?.downloads ?? 0,
            label: "Unsplash downloads",
            hint: "Free downloads by creators worldwide.",
          },
          {
            key: "unsplash_photos",
            value: profile.totalPhotos,
            label: "Photos published",
            hint: "Free photos shared on Unsplash.",
          },
          {
            key: "unsplash_likes",
            value: profile.totalLikes,
            label: "Photo likes",
            hint: "Community appreciation across the library.",
          },
          {
            key: "unsplash_collections",
            value: profile.totalCollections,
            label: "Collections",
            hint: "Curated sets of work on Unsplash.",
          },
        ]);

        const { count } = await supabase
          .from("page_views")
          .select("*", { count: "exact", head: true });

        const siteViews =
          (count ?? 0) + (stats.site_views_offset ?? 2000);

        return NextResponse.json({
          ...profile,
          siteViews,
          source: "supabase+unsplash",
        });
      }
    } catch (syncError) {
      console.warn("Unsplash sync skipped:", syncError);
    }

    const fresh = await readStatsMap();
    const { count } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true });
    const siteViews = (count ?? 0) + (fresh.site_views_offset ?? 2000);

    return NextResponse.json({
      ...profileFromStats(fresh),
      siteViews,
      source: "supabase",
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch stats";
    console.error("Stats API error:", message);
    return NextResponse.json(
      { ...UNSPLASH_FALLBACK, siteViews: 2000, error: message },
      { status: 500 }
    );
  }
}
