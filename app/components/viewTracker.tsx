"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useViewCount() {
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchViewCount = async () => {
      try {
        const response = await fetch("/api/views");
        const data = await response.json();
        if (response.ok && data.viewCount !== undefined) {
          setViewCount(data.viewCount);
        }
      } catch (error) {
        console.error("Error fetching view count:", error);
      }
    };

    fetchViewCount();
  }, []);

  return viewCount;
}

function collectClientDeviceInfo() {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: {
      effectiveType?: string;
      downlink?: number;
      rtt?: number;
    };
  };

  const connection = nav.connection;

  return {
    userAgent: nav.userAgent || "Unknown",
    timestamp: new Date().toISOString(),
    screenWidth: window.screen?.width,
    screenHeight: window.screen?.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: nav.language,
    languages: Array.from(nav.languages || []),
    platform: nav.platform,
    hardwareConcurrency: nav.hardwareConcurrency,
    deviceMemory: nav.deviceMemory,
    connectionType: connection?.effectiveType,
    connectionDownlink: connection?.downlink,
    connectionRtt: connection?.rtt,
    touchSupport:
      "ontouchstart" in window ||
      (nav.maxTouchPoints != null && nav.maxTouchPoints > 0),
    colorScheme: window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
    referrer: document.referrer || undefined,
  };
}

export function ViewTracker() {
  const pathname = usePathname();
  const [hasTracked, setHasTracked] = useState(false);

  useEffect(() => {
    if (hasTracked) return;

    const trackView = async () => {
      try {
        await fetch("/api/views", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...collectClientDeviceInfo(),
            page: pathname || "/",
          }),
        });

        setHasTracked(true);
      } catch (error) {
        console.error("Error tracking view:", error);
      }
    };

    const timer = setTimeout(trackView, 1000);
    return () => clearTimeout(timer);
  }, [pathname, hasTracked]);

  return null;
}

export function ViewCount({ className }: { className?: string }) {
  const rawCount = useViewCount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || rawCount === null) {
    return null;
  }

  return (
    <span className={className ?? "text-xs text-gray-500 dark:text-gray-400"}>
      {rawCount.toLocaleString("en-US")} views
    </span>
  );
}
