"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollHorizontalVideosProps {
  videos: string[];
}

export function ScrollHorizontalVideos({ videos }: ScrollHorizontalVideosProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, (progress) => -progress * maxScroll);

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
  }, [videos]);

  const scrollHeight = `${Math.max(videos.length * 80, 200)}vh`;

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: scrollHeight }}
      aria-label="Video gallery"
    >
      <div className="sticky top-20 flex h-[calc(100vh-5rem)] items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-4 px-3 will-change-transform md:px-6 lg:px-12"
        >
          {videos.map((video) => (
            <div
              key={video}
              className="relative aspect-[4/3] w-[85vw] flex-shrink-0 overflow-hidden rounded-lg sm:w-[360px] md:w-[420px] lg:w-[500px]"
            >
              <video
                src={video}
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
