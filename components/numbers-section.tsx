"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { UnsplashProfilePayload } from "@/lib/unsplash";

type StatItem = {
  label: string;
  value: string;
  hint?: string;
  href?: string;
};

function formatCount(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return value.toLocaleString("en-US");
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.06] md:p-8"
    >
      <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-white/45">
        {stat.label}
      </p>
      <p className="text-4xl font-light tabular-nums tracking-tight text-white md:text-5xl lg:text-6xl">
        {stat.value}
      </p>
      {stat.hint && (
        <p className="mt-3 text-sm leading-relaxed text-white/50">{stat.hint}</p>
      )}
      {stat.href && (
        <span className="mt-5 inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-white/60 transition-colors group-hover:text-white">
          View profile
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      )}
    </motion.div>
  );

  if (stat.href) {
    return (
      <Link href={stat.href} target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    );
  }

  return content;
}

export function NumbersSection() {
  const [profile, setProfile] = useState<UnsplashProfilePayload | null>(null);
  const [siteViews, setSiteViews] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/unsplash")
      .then((res) => res.json())
      .then((data: UnsplashProfilePayload) => setProfile(data))
      .catch(() => setProfile(null));

    fetch("/api/views")
      .then((res) => res.json())
      .then((data) => {
        if (data.viewCount !== undefined) {
          setSiteViews(data.viewCount + 2000);
        }
      })
      .catch(() => setSiteViews(null));
  }, []);

  const profileUrl = profile?.profileUrl;
  const stats: StatItem[] = [];

  if (profile?.stats) {
    stats.push(
      {
        label: "Unsplash views",
        value: formatCount(profile.stats.views),
        hint: "Total impressions across published photos.",
        href: profileUrl,
      },
      {
        label: "Unsplash downloads",
        value: formatCount(profile.stats.downloads),
        hint: "Free downloads by creators worldwide.",
        href: profileUrl,
      }
    );
  }

  if (profile) {
    stats.push(
      {
        label: "Photos published",
        value: formatCount(profile.totalPhotos),
        hint: "Free photos shared on Unsplash.",
        href: profileUrl,
      },
      {
        label: "Photo likes",
        value: formatCount(profile.totalLikes),
        hint: "Community appreciation across the library.",
        href: profileUrl,
      },
      {
        label: "Collections",
        value: formatCount(profile.totalCollections),
        hint: "Curated sets of work on Unsplash.",
        href: profileUrl,
      }
    );
  }

  if (siteViews !== null) {
    stats.push({
      label: "Portfolio visits",
      value: formatCount(siteViews),
      hint: "People who explored this site.",
    });
  }

  return (
    <section className="relative w-full overflow-hidden py-8 md:py-12" aria-label="By the numbers">
      {profile?.coverImage && (
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={profile.coverImage}
            alt=""
            fill
            className="object-cover opacity-20 blur-2xl scale-110"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-[#111111]/90 to-[#111111]" />
        </div>
      )}

      <div className="container relative mx-auto px-3 md:px-6 lg:px-12">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/40">
              Reach & impact
            </p>
            <h2 className="text-5xl font-light text-white md:text-7xl lg:text-8xl">
              By the Numbers
            </h2>
            {profile && (
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/60">
                {profile.profileImage && (
                  <Image
                    src={profile.profileImage}
                    alt={profile.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                )}
                <span className="capitalize text-white/80">{profile.name}</span>
                {profile.location && <span>· {profile.location}</span>}
                {profile.forHire && (
                  <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/70">
                    Available for hire
                  </span>
                )}
              </div>
            )}
          </div>
          {profile && (
            <Link
              href={profile.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/80 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              @{profile.username} on Unsplash
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>

        {!profile ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-40 animate-pulse rounded-2xl bg-white/5"
                aria-hidden="true"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
