"use client";

import { Avatar, type AvatarSize } from "./avatar-enhanced";
import { cn } from "@/lib/utils";

export interface AvatarLabelGroupProps {
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  src?: string | null;
  alt?: string;
  title: string;
  subtitle?: string;
  className?: string;
  verified?: boolean;
  status?: "online" | "offline";
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
}: AvatarLabelGroupProps) => {
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
      </div>
    </div>
  );
};
