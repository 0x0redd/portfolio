"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  injectVideoPreloadHints,
  isHighPriorityVideo,
  isVideoCached,
  subscribeToVideoPreload,
} from "@/lib/video-cache";

interface ScrollHorizontalVideosProps {
  videos: string[];
  children?: ReactNode;
}

interface HorizontalVideoProps {
  src: string;
  index: number;
  isCached: boolean;
}

function HorizontalVideo({ src, index, isCached }: HorizontalVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const highPriority = isHighPriorityVideo(index);
  const [isVisible, setIsVisible] = useState(false);
  const shouldLoad = highPriority || isCached || isVisible;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          if (!video.src) {
            video.src = src;
            video.load();
          }
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35, rootMargin: "200px 0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad || video.src) return;

    video.src = src;
    video.load();
    if (highPriority) {
      video.play().catch(() => {});
    }
  }, [shouldLoad, src, highPriority]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-[72vw] flex-shrink-0 overflow-hidden rounded-lg sm:w-[300px] md:w-[360px] lg:w-[420px]"
    >
      {!shouldLoad && (
        <div className="absolute inset-0 animate-pulse bg-white/5" aria-hidden="true" />
      )}
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        loop
        muted
        playsInline
        preload={highPriority ? "auto" : shouldLoad ? "auto" : "none"}
        {...(highPriority ? { fetchPriority: "high" as const } : {})}
      />
    </div>
  );
}

export function ScrollHorizontalVideos({ videos, children }: ScrollHorizontalVideosProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [cachedVideos, setCachedVideos] = useState<Set<string>>(new Set());

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, (progress) => -progress * maxScroll);

  useEffect(() => {
    injectVideoPreloadHints(videos);
    return subscribeToVideoPreload(videos, (url) => {
      setCachedVideos((prev) => new Set(prev).add(url));
    });
  }, [videos]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateMaxScroll = () => {
      const scrollWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      setMaxScroll(Math.max(0, scrollWidth - viewportWidth));
    };

    updateMaxScroll();

    const observer = new ResizeObserver(updateMaxScroll);
    observer.observe(track);
    window.addEventListener("resize", updateMaxScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateMaxScroll);
    };
  }, [videos, cachedVideos]);

  const scrollHeight = `${Math.max(videos.length * 80, 200)}vh`;

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: scrollHeight }}
      aria-label="Video gallery"
    >
      <div className="sticky top-20 flex h-[calc(100vh-5rem)] flex-col justify-between overflow-hidden">
        {children && (
          <div className="relative z-10 flex w-full flex-shrink-0 justify-center px-6 pt-2 md:px-12 lg:px-24">
            {children}
          </div>
        )}

        <div className="flex w-full flex-shrink-0 items-end overflow-hidden pb-48 md:pb-24 lg:pb-32">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex items-end gap-4 px-3 will-change-transform md:px-6 lg:px-12"
          >
            {videos.map((video, index) => (
              <HorizontalVideo
                key={video}
                src={video}
                index={index}
                isCached={cachedVideos.has(video) || isVideoCached(video)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
