"use client";

import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogImage,
  MorphingDialogContainer,
} from "@/components/ui/morphing-dialog";
import { XIcon } from "lucide-react";

interface ImageDimensions {
  src: string;
  width: number;
  height: number;
}

const GridCandid: React.FC = () => {
  const images = useMemo(
    () => [
      "/candid/IMG_0736.jpg",
      "/candid/IMG_3685.jpg",
      //"/candid/IMG_8845.jpg",
      "/candid/IMG_8896.jpg",
      //"/candid/IMG_8944.jpg",
    ],
    []
  );

  const [dimensions, setDimensions] = useState<Record<string, ImageDimensions>>({});
  const [mediaLoaded, setMediaLoaded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    images.forEach((src) => {
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

  if (!images.length) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-lg text-gray-500">No images found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 md:gap-6">
        {[0, 1, 2].map((colIndex) => (
          <div
            key={colIndex}
            className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6"
          >
            {images
              .filter((_, index) => index % 3 === colIndex)
              .map((src, indexInColumn) => {
                const globalIndex = images.findIndex((item) => item === src);
                const imageDim = dimensions[src];
                const isReady = mediaLoaded[src] === true;
                const aspectRatio =
                  imageDim && imageDim.width > 0 && imageDim.height > 0
                    ? `${imageDim.width} / ${imageDim.height}`
                    : "4 / 5";

                return (
                  <MorphingDialog
                    key={`${colIndex}-${indexInColumn}-${src}`}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                  >
                    <MorphingDialogTrigger>
                      <article className="group relative flex cursor-pointer items-center justify-center">
                        <div
                          className="relative w-full overflow-hidden rounded-lg bg-[#1d1d1d] shadow-sm transition-all duration-300 hover:shadow-md"
                          style={{ aspectRatio }}
                        >
                          {!isReady && (
                            <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-br from-white/10 to-white/5" />
                          )}
                          <Image
                            className="h-full w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
                            src={src}
                            alt={`Candid photo ${globalIndex + 1}`}
                            width={imageDim?.width || 1600}
                            height={imageDim?.height || 1200}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            priority={globalIndex < 3}
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
                      <MorphingDialogContent className="relative flex h-[95vh] max-w-[95vw] items-center justify-center sm:h-[90vh] sm:max-w-[90vw]">
                        <MorphingDialogImage
                          src={src}
                          alt={`Candid photo ${globalIndex + 1}`}
                          className="h-auto max-h-full w-auto max-w-full rounded-lg object-contain"
                        />
                      </MorphingDialogContent>
                      <MorphingDialogClose
                        className="fixed right-3 top-3 h-8 w-8 rounded-full border border-gray-200/50 bg-white/90 p-1.5 shadow-lg backdrop-blur-sm hover:bg-white sm:right-6 sm:top-6 sm:h-10 sm:w-10 sm:p-2"
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
                        <XIcon className="h-4 w-4 text-gray-700 transition-colors hover:text-black sm:h-5 sm:w-5" />
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
};

export default GridCandid;
