"use client";

import { useState, useEffect, useRef } from "react";

interface VideoPlayerProps {
  videos: string[];
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videos,
  className = "",
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [blobSrc, setBlobSrc] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeUrl = videos[currentVideoIndex] ?? "";

  // Fetch once into a blob URL so looping does not re-hit the server (206 range requests).
  useEffect(() => {
    if (!activeUrl) {
      setBlobSrc(null);
      return;
    }

    let cancelled = false;
    let objectUrl: string | null = null;

    setIsLoaded(false);
    setBlobSrc(null);

    (async () => {
      try {
        const response = await fetch(activeUrl, { cache: "force-cache" });
        if (!response.ok) throw new Error(`Failed to load video: ${response.status}`);
        const blob = await response.blob();
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setBlobSrc(objectUrl);
      } catch {
        if (!cancelled) {
          // Fallback to direct URL if blob fetch fails
          setBlobSrc(activeUrl);
        }
      }
    })();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [activeUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || loop) return;

    const handleEnded = () => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [currentVideoIndex, videos.length, loop]);

  const handleLoadedData = () => {
    setIsLoaded(true);
    if (videoRef.current && autoPlay) {
      videoRef.current.play().catch(() => {
        // Autoplay might fail — ignore
      });
    }
  };

  const switchVideo = (index: number) => {
    if (index >= 0 && index < videos.length) {
      setCurrentVideoIndex(index);
    }
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  if (videos.length === 0) {
    return (
      <div className={className}>
        <p className="text-white">No videos available</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {blobSrc && (
        <video
          key={blobSrc}
          ref={videoRef}
          src={blobSrc}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload="auto"
          className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
          onLoadedData={handleLoadedData}
        />
      )}

      {videos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 opacity-0 transition-opacity duration-300 hover:opacity-100 group">
          <button
            onClick={prevVideo}
            className="rounded-lg bg-black/50 px-3 py-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
            aria-label="Previous video"
          >
            ←
          </button>

          <div className="flex gap-1">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => switchVideo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentVideoIndex
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextVideo}
            className="rounded-lg bg-black/50 px-3 py-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
            aria-label="Next video"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
