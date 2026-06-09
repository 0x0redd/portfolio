"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Instagram } from "lucide-react";

type InstagramPost = {
  id: string;
  caption?: string;
  media_url: string;
  media_type: string;
  timestamp: string;
  permalink: string;
  thumbnail_url?: string;
};

type InstagramFeed = {
  data: InstagramPost[];
  paging?: {
    cursors?: {
      after?: string;
    };
  };
  error?: string;
};

interface InstaFeedProps {
  title?: string;
  profileUrl?: string;
  profileHandle?: string;
  className?: string;
}

export function InstaFeed({
  title = "Instagram",
  profileUrl = "https://www.instagram.com/0x0red/",
  profileHandle = "@0x0red",
  className = "",
}: InstaFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [after, setAfter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeed = useCallback(async (cursor: string | null, append = false) => {
    try {
      const url = cursor
        ? `/api/instagram?after=${encodeURIComponent(cursor)}`
        : "/api/instagram";

      const response = await fetch(url);
      const feed: InstagramFeed = await response.json();

      if (!response.ok) {
        throw new Error(feed.error || "Failed to fetch Instagram feed");
      }

      setPosts((prev) =>
        append ? [...prev, ...(feed.data ?? [])] : (feed.data ?? [])
      );
      setAfter(feed.paging?.cursors?.after ?? null);
      setError(null);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch Instagram feed";
      setError(message);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchFeed(null).finally(() => setLoading(false));
  }, [fetchFeed]);

  const loadMore = async () => {
    if (!after || loadingMore) return;
    setLoadingMore(true);
    await fetchFeed(after, true);
    setLoadingMore(false);
  };

  if (loading) {
    return (
      <section className={`w-full ${className}`}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[4/5] animate-pulse rounded-lg bg-white/5"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`w-full text-center ${className}`}>
        <p className="text-sm text-gray-500">{error}</p>
        <Link
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
        >
          <Instagram className="h-4 w-4" aria-hidden="true" />
          View {profileHandle} on Instagram
        </Link>
      </section>
    );
  }

  if (!posts.length) {
    return null;
  }

  return (
    <section className={`w-full ${className}`} aria-label={title}>
      <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h3 className="text-2xl font-light text-white md:text-3xl">{title}</h3>
        <Link
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition-colors hover:border-white/30 hover:bg-white/10"
        >
          <Instagram className="h-4 w-4" aria-hidden="true" />
          {profileHandle}
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-[#1d1d1d]"
          >
            {post.media_type === "VIDEO" ? (
              <video
                src={post.media_url}
                poster={post.thumbnail_url}
                muted
                playsInline
                loop
                autoPlay
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <Image
                src={post.media_url}
                alt={post.caption?.slice(0, 120) || "Instagram post"}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}

            {post.caption && (
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="line-clamp-3 text-xs text-white/90 md:text-sm">
                  {post.caption}
                </p>
              </div>
            )}
          </Link>
        ))}
      </div>

      {after && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            disabled={loadingMore}
            className="rounded-full border border-white/20 px-6 py-2.5 text-sm text-white transition-colors hover:border-white/40 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loadingMore ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
    </section>
  );
}
