"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogImage,
  MorphingDialogContainer,
} from "@/components/ui/morphing-dialog";
import { XIcon } from "lucide-react";
import type { PortfolioImage } from "@/lib/images";

interface ImageDimensions {
  src: string;
  width: number;
  height: number;
}

type AlbumGridProps = {
  album: string;
  altPrefix: string;
};

export default function AlbumGrid({ album, altPrefix }: AlbumGridProps) {
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState<Record<string, ImageDimensions>>({});
  const [mediaLoaded, setMediaLoaded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/images?album=${encodeURIComponent(album)}`);
        const data = await res.json();
        if (!cancelled && res.ok && Array.isArray(data.images)) {
          setImages(data.images);
        }
      } catch (error) {
        console.error(`Failed to load album ${album}:`, error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [album]);

  useEffect(() => {
    images.forEach((image) => {
      const src = image.url;
      if (/\.(webm|mp4|mov)(\?|$)/i.test(src)) {
        setDimensions((prev) => ({
          ...prev,
          [src]: prev[src] || { src, width: 1600, height: 900 },
        }));
        return;
      }
      const img = new window.Image();
      img.onload = () => {
        setDimensions((prev) => ({
          ...prev,
          [src]: { src, width: img.width, height: img.height },
        }));
      };
      img.onerror = () => {
        setDimensions((prev) => ({
          ...prev,
          [src]: { src, width: 1600, height: 1200 },
        }));
      };
      img.src = src;
    });
  }, [images]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="h-10 w-10 animate-pulse rounded-full bg-white/10" />
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-gray-500 text-lg">No images found.</p>
        </div>
      </div>
    );
  }

  const urls = images.map((image) => image.url);

  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-8 container mx-auto max-w-7xl">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
        {[0, 1, 2].map((colIndex) => (
          <div key={colIndex} className="flex flex-col gap-3 sm:gap-4 md:gap-6 flex-1">
            {images
              .filter((_, index) => index % 3 === colIndex)
              .map((image, indexInColumn) => {
                const src = image.url;
                const globalIndex = urls.findIndex((item) => item === src);
                const imageDim = dimensions[src];
                const isReady = mediaLoaded[src] === true;
                const aspectRatio =
                  imageDim && imageDim.width > 0 && imageDim.height > 0
                    ? `${imageDim.width} / ${imageDim.height}`
                    : "4 / 5";

                return (
                  <MorphingDialog
                    key={image.id}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                  >
                    <MorphingDialogTrigger>
                      <article className="relative flex items-center justify-center cursor-pointer group">
                        <div
                          className="relative w-full overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-[#1d1d1d]"
                          style={{ aspectRatio }}
                        >
                          {!isReady && (
                            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/10 to-white/5 z-10" />
                          )}
                          <Image
                            className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
                            src={src}
                            alt={`${altPrefix} ${globalIndex + 1}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            priority={globalIndex < 6}
                            onLoad={() =>
                              setMediaLoaded((prev) => ({ ...prev, [src]: true }))
                            }
                            onError={() =>
                              setMediaLoaded((prev) => ({ ...prev, [src]: true }))
                            }
                          />
                        </div>
                      </article>
                    </MorphingDialogTrigger>

                    <MorphingDialogContainer>
                      <MorphingDialogContent className="relative max-w-[95vw] h-[95vh] sm:max-w-[90vw] sm:h-[90vh] flex items-center justify-center">
                        <MorphingDialogImage
                          src={src}
                          alt={`${altPrefix} ${globalIndex + 1}`}
                          className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                        />
                      </MorphingDialogContent>
                      <MorphingDialogClose
                        className="fixed right-3 top-3 sm:right-6 sm:top-6 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/90 hover:bg-white p-1.5 sm:p-2 shadow-lg backdrop-blur-sm border border-gray-200/50"
                        variants={{
                          initial: { opacity: 0, scale: 0.8 },
                          animate: {
                            opacity: 1,
                            scale: 1,
                            transition: { delay: 0.2, duration: 0.2 },
                          },
                          exit: {
                            opacity: 0,
                            scale: 0.8,
                            transition: { duration: 0.15 },
                          },
                        }}
                      >
                        <XIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700 hover:text-black transition-colors" />
                      </MorphingDialogClose>
                    </MorphingDialogContainer>
                  </MorphingDialog>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}
