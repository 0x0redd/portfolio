export const UNSPLASH_USERNAME = "0x0red";

/** Official API base — use via /api/unsplash */
export const UNSPLASH_API_BASE = "https://api.unsplash.com";

export interface UnsplashProfilePayload {
  username: string;
  name: string;
  bio: string | null;
  location: string | null;
  profileUrl: string;
  profileImage: string | null;
  forHire: boolean;
  totalPhotos: number;
  totalLikes: number;
  totalCollections: number;
  totalPromotedPhotos: number;
  coverImage: string;
  coverImages: string[];
  stats: {
    views: number;
    downloads: number;
  } | null;
}

export const UNSPLASH_FALLBACK: UnsplashProfilePayload = {
  username: UNSPLASH_USERNAME,
  name: "Othmane Ferrah",
  bio: "Photography published on Unsplash — free high-resolution images.",
  location: "Morocco",
  profileUrl: `https://unsplash.com/@${UNSPLASH_USERNAME}`,
  profileImage: null,
  forHire: true,
  totalPhotos: 932,
  totalLikes: 5495,
  totalCollections: 5,
  totalPromotedPhotos: 14,
  coverImage: "/candid/DSC_2135.jpg",
  coverImages: [],
  stats: null,
};

type UnsplashUserResponse = {
  name: string;
  username: string;
  bio: string | null;
  location: string | null;
  for_hire?: boolean;
  total_photos?: number;
  total_likes?: number;
  total_collections?: number;
  total_promoted_photos?: number;
  links: { html: string };
  profile_image?: { large?: string; medium?: string; small?: string };
  photos?: Array<{ urls?: { regular?: string; small?: string } }>;
};

type UnsplashStatisticsResponse = {
  views?: { total: number };
  downloads?: { total: number };
};

export function mapUnsplashProfile(
  user: UnsplashUserResponse,
  statistics: UnsplashStatisticsResponse | null
): UnsplashProfilePayload {
  const coverImages =
    user.photos
      ?.map((photo) => photo.urls?.regular ?? photo.urls?.small)
      .filter((url): url is string => Boolean(url)) ?? [];

  return {
    username: user.username,
    name: user.name,
    bio: user.bio,
    location: user.location,
    profileUrl: user.links.html,
    profileImage:
      user.profile_image?.large ??
      user.profile_image?.medium ??
      user.profile_image?.small ??
      null,
    forHire: user.for_hire ?? false,
    totalPhotos: user.total_photos ?? 0,
    totalLikes: user.total_likes ?? 0,
    totalCollections: user.total_collections ?? 0,
    totalPromotedPhotos: user.total_promoted_photos ?? 0,
    coverImage: coverImages[0] ?? UNSPLASH_FALLBACK.coverImage,
    coverImages,
    stats: statistics
      ? {
          views: statistics.views?.total ?? 0,
          downloads: statistics.downloads?.total ?? 0,
        }
      : null,
  };
}
