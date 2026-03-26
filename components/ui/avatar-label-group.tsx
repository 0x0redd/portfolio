"use client";

import { Avatar, type AvatarSize } from "./avatar-enhanced";
import { cn } from "@/lib/utils";
import { Linkedin, Instagram } from "lucide-react";
import { siBehance, siUnsplash } from "simple-icons";
import type { ReactNode } from "react";

export interface AvatarLabelGroupProps {
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  src?: string | null;
  alt?: string;
  title: string;
  subtitle?: string;
  className?: string;
  verified?: boolean;
  status?: "online" | "offline";
  instagramUrl?: string;
  behanceUrl?: string;
  linkedinUrl?: string;
  unsplashUrl?: string;
}

export const AvatarLabelGroup = ({
  size = "md",
  src,
  alt,
  title,
  subtitle,
  className,
  verified,
  status,
  instagramUrl,
  behanceUrl,
  linkedinUrl,
  unsplashUrl,
}: AvatarLabelGroupProps) => {
  const socialIconSizeClass =
    size === "xxs" || size === "xs"
      ? "h-3 w-3"
      : size === "sm" || size === "md"
        ? "h-4 w-4"
        : "h-5 w-5";

  const SocialIconLink = ({
    href,
    label,
    children,
  }: {
    href: string;
    label: string;
    children: ReactNode;
  }) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="text-white/70 hover:text-[#e5fdfd] transition-colors"
      >
        {children}
      </a>
    );
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar
        size={size}
        src={src}
        alt={alt || title}
        verified={verified}
        status={status}
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-text-white dark:text-white">
          {title}
        </span>
        {subtitle && (
          <span className="text-sm font-light text-white">
            {subtitle}
          </span>
        )}

        {(instagramUrl || behanceUrl || linkedinUrl || unsplashUrl) && (
          <div className="mt-2 flex items-center gap-3">
            {instagramUrl && (
              <SocialIconLink
                href={instagramUrl}
                label="Instagram"
              >
                <Instagram className={socialIconSizeClass} aria-hidden="true" />
              </SocialIconLink>
            )}
            {behanceUrl && (
              <SocialIconLink href={behanceUrl} label="Behance">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={socialIconSizeClass}
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d={siBehance.path} />
                </svg>
              </SocialIconLink>
            )}
            {linkedinUrl && (
              <SocialIconLink href={linkedinUrl} label="LinkedIn">
                <Linkedin className={socialIconSizeClass} aria-hidden="true" />
              </SocialIconLink>
            )}
            {unsplashUrl && (
              <SocialIconLink
                href={unsplashUrl}
                label="Unsplash"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={socialIconSizeClass}
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d={siUnsplash.path} />
                </svg>
              </SocialIconLink>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
