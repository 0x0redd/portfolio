import { NextResponse } from "next/server";
import {
  UNSPLASH_API_BASE,
  UNSPLASH_FALLBACK,
  UNSPLASH_USERNAME,
  mapUnsplashProfile,
} from "@/lib/unsplash";

export const dynamic = "force-dynamic";

const UNSPLASH_ACCESS_KEY = "cxxw5OQ2k5SX6cvewtfgHodhT25WFt3nNPOMEntUtio";

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
      return NextResponse.json({
        ...UNSPLASH_FALLBACK,
        error: "Failed to load Unsplash profile",
      });
    }

    return NextResponse.json(mapUnsplashProfile(user, statistics));
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch Unsplash data";
    console.error("Unsplash API error:", message);
    return NextResponse.json(
      { ...UNSPLASH_FALLBACK, error: message },
      { status: 500 }
    );
  }
}
