"use client";

import { useState, useEffect, useRef } from 'react';

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
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Switch to next video when current one ends (if not looping)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || loop) return;

    const handleEnded = () => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [currentVideoIndex, videos.length, loop]);

  // Reset video when switching
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      setIsLoaded(false);
      video.load();
    }
  }, [currentVideoIndex]);

  const handleLoadedData = () => {
    setIsLoaded(true);
    if (videoRef.current && autoPlay) {
      videoRef.current.play().catch(() => {
        // Autoplay might fail, that's okay
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
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        onLoadedData={handleLoadedData}
      >
        <source src={videos[currentVideoIndex]} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Video Controls - Optional: Show on hover */}
      {videos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 hover:opacity-100 transition-opacity duration-300 group">
          <button
            onClick={prevVideo}
            className="px-3 py-2 bg-black/50 hover:bg-black/70 text-white rounded-lg backdrop-blur-sm transition-all"
            aria-label="Previous video"
          >
            ←
          </button>
          
          {/* Video indicators */}
          <div className="flex gap-1">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => switchVideo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentVideoIndex
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextVideo}
            className="px-3 py-2 bg-black/50 hover:bg-black/70 text-white rounded-lg backdrop-blur-sm transition-all"
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
