"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Hook to get view count
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

// Component to track views (silent, no UI)
export function ViewTracker() {
  const pathname = usePathname();
  const [hasTracked, setHasTracked] = useState(false);

  useEffect(() => {
    // Track view only once per page load
    if (hasTracked) return;

    const trackView = async () => {
      try {
        // Get user agent
        const userAgent = navigator.userAgent || "Unknown";
        const timestamp = new Date().toISOString();
        const page = pathname || "/";

        // Track the view
        await fetch("/api/views", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userAgent,
            timestamp,
            page,
          }),
        });

        setHasTracked(true);
      } catch (error) {
        console.error("Error tracking view:", error);
        // Silently fail - don't break the user experience
      }
    };

    // Small delay to ensure page is fully loaded
    const timer = setTimeout(trackView, 1000);
    return () => clearTimeout(timer);
  }, [pathname, hasTracked]);

  return null; // Silent tracker, no UI
}

// Component to display view count
export function ViewCount() {
  const viewCount = useViewCount();

  if (viewCount === null) {
    return null; // Don't show anything while loading
  }

  return (
    <span className="text-xs text-gray-500 dark:text-gray-400">
      {viewCount.toLocaleString()} views
    </span>
  );
}
