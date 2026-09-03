"use client";

import Link from "next/link";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { siBehance, siUnsplash } from "simple-icons";
import { social } from "@/lib/about-content";

const iconMap = {
  Instagram,
  LinkedIn: Linkedin,
  GitHub: Github,
  Email: Mail,
} as const;

function SocialIcon({ name }: { name: string }) {
  if (name === "Behance") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d={siBehance.path} />
      </svg>
    );
  }

  if (name === "Unsplash") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d={siUnsplash.path} />
      </svg>
    );
  }

  const Icon = iconMap[name as keyof typeof iconMap];
  if (!Icon) return null;
  return <Icon className="h-4 w-4" aria-hidden="true" />;
}

export function SocialLinks() {
  const essentialLinks = social.filter((item) => item.essential);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 pt-5 md:justify-start">
      {essentialLinks.map((item) => (
        <Link
          key={item.name}
          href={item.link}
          target={item.name === "Email" ? undefined : "_blank"}
          rel={item.name === "Email" ? undefined : "noopener noreferrer"}
          className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white sm:inline-flex"
        >
          <SocialIcon name={item.name} />
          <span>{item.name}</span>
        </Link>
      ))}
      {essentialLinks.map((item) => (
        <Link
          key={`${item.name}-icon`}
          href={item.link}
          target={item.name === "Email" ? undefined : "_blank"}
          rel={item.name === "Email" ? undefined : "noopener noreferrer"}
          aria-label={item.name}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white sm:hidden"
        >
          <SocialIcon name={item.name} />
        </Link>
      ))}
    </div>
  );
}
