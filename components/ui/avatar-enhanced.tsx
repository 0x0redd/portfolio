"use client";

import { type FC, type ReactNode, useState } from "react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

export type AvatarSize = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface AvatarProps {
  size?: AvatarSize;
  className?: string;
  src?: string | null;
  alt?: string;
  /**
   * Display a contrast border around the avatar.
   */
  contrastBorder?: boolean;
  /**
   * Display a badge (i.e. company logo).
   */
  badge?: ReactNode;
  /**
   * Display a status indicator.
   */
  status?: "online" | "offline";
  /**
   * Display a verified tick icon.
   *
   * @default false
   */
  verified?: boolean;

  /**
   * The initials of the user to display if no image is available.
   */
  initials?: string;
  /**
   * An icon to display if no image is available.
   */
  placeholderIcon?: FC<{ className?: string }>;
  /**
   * A placeholder to display if no image is available.
   */
  placeholder?: ReactNode;

  /**
   * Whether the avatar should show a focus ring when the parent group is in focus.
   * For example, when the avatar is wrapped inside a link.
   *
   * @default false
   */
  focusable?: boolean;
}

const styles = {
  xxs: { root: "w-4 h-4 outline-[0.5px] -outline-offset-[0.5px]", initials: "text-[10px] font-semibold", icon: "w-3 h-3" },
  xs: { root: "w-6 h-6 outline-[0.5px] -outline-offset-[0.5px]", initials: "text-xs font-semibold", icon: "w-4 h-4" },
  sm: { root: "w-8 h-8 outline-[0.75px] -outline-offset-[0.75px]", initials: "text-sm font-semibold", icon: "w-5 h-5" },
  md: { root: "w-10 h-10 outline-1 -outline-offset-1", initials: "text-sm font-semibold", icon: "w-6 h-6" },
  lg: { root: "w-12 h-12 outline-1 -outline-offset-1", initials: "text-base font-semibold", icon: "w-7 h-7" },
  xl: { root: "w-14 h-14 outline-1 -outline-offset-1", initials: "text-lg font-semibold", icon: "w-8 h-8" },
  "2xl": { root: "w-16 h-16 outline-1 -outline-offset-1", initials: "text-xl font-semibold", icon: "w-8 h-8" },
};

// Status indicator component
const AvatarOnlineIndicator = ({ status, size }: { status: "online" | "offline"; size: AvatarSize }) => {
  const sizeMap = {
    xxs: "w-1.5 h-1.5",
    xs: "w-2 h-2",
    sm: "w-2.5 h-2.5",
    md: "w-3 h-3",
    lg: "w-3.5 h-3.5",
    xl: "w-4 h-4",
    "2xl": "w-4 h-4",
  };

  return (
    <div
      className={cn(
        "absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-gray-900",
        status === "online" ? "bg-green-500" : "bg-gray-400",
        sizeMap[size]
      )}
    />
  );
};

// Verified tick component
const VerifiedTick = ({ size, className }: { size: AvatarSize; className?: string }) => {
  const sizeMap = {
    xxs: "w-3 h-3",
    xs: "w-3.5 h-3.5",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
    "2xl": "w-6 h-6",
  };

  return (
    <div
      className={cn(
        "absolute rounded-full bg-blue-500 flex items-center justify-center text-white",
        sizeMap[size],
        className
      )}
    >
      <svg
        className={cn("w-2/3 h-2/3")}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
};

export const Avatar = ({
  contrastBorder = true,
  size = "md",
  src,
  alt,
  initials,
  placeholder,
  placeholderIcon: PlaceholderIcon,
  badge,
  status,
  verified,
  focusable = false,
  className,
}: AvatarProps) => {
  const [isFailed, setIsFailed] = useState(false);

  const renderMainContent = () => {
    if (src && !isFailed) {
      return (
        <img
          data-avatar-img
          className="w-full h-full rounded-full object-cover"
          src={src}
          alt={alt}
          onError={() => setIsFailed(true)}
        />
      );
    }

    if (initials) {
      return (
        <span className={cn("text-gray-600 dark:text-gray-300", styles[size].initials)}>
          {initials}
        </span>
      );
    }

    if (PlaceholderIcon) {
      return <PlaceholderIcon className={cn("text-gray-400 dark:text-gray-500", styles[size].icon)} />;
    }

    return placeholder || <User className={cn("text-gray-400 dark:text-gray-500", styles[size].icon)} />;
  };

  const renderBadgeContent = () => {
    if (status) {
      return <AvatarOnlineIndicator status={status} size={size === "xxs" ? "xs" : size} />;
    }

    if (verified) {
      return (
        <VerifiedTick
          size={size === "xxs" ? "xs" : size}
          className={cn("absolute right-0 bottom-0", (size === "xxs" || size === "xs") && "-right-px -bottom-px")}
        />
      );
    }

    return badge;
  };

  return (
    <div
      data-avatar
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 outline-transparent",
        // Focus styles
        focusable && "group-outline-focus-ring group-focus-visible:outline-2 group-focus-visible:outline-offset-2",
        contrastBorder && "outline outline-gray-200 dark:outline-gray-700",
        styles[size].root,
        className
      )}
    >
      {renderMainContent()}
      {renderBadgeContent()}
    </div>
  );
};
