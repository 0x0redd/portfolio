"use client";

import Image from 'next/image';
import React, { useState, useEffect, useMemo } from 'react';
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogImage,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog';
import { XIcon } from 'lucide-react';

interface ImageDimensions {
  src: string;
  width: number;
  height: number;
  isVideo?: boolean;
}

const isVideoFile = (src: string): boolean => {
  const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv'];
  return videoExtensions.some(ext => src.toLowerCase().endsWith(ext));
};

const GridPinned: React.FC = () => {
  const images = useMemo(() => [
    '/VIDEO/MVI_0784_3.webm',
    '/Pined/100_0370@3x.jpg',
    '/Pined/20241119-IMG_0246.jpg',
    '/Pined/20241215-IMG_0689.jpg',
    '/Pined/DSC_2652.jpg',
    '/Pined/DSC_3793.jpg',
    '/Pined/DSC_3821.jpg',
    '/VIDEO/MVI_0784_Sub_04.00.webm',
    '/Pined/DSC_3893.jpg',
    '/Pined/DSC_3900.jpg',
    '/Pined/DSC_3906.jpg',
    '/Pined/DSC_3981.jpg',
    '/Pined/DSC_4179.jpg',
    '/Pined/DSC_4299.jpg',
    '/Pined/DSC_4909 (1).jpg',
    '/Pined/DSC_4927 (1).jpg',
    '/Pined/IMG_20200920_202833.jpg',
    '/Pined/IMG_20211130_170752 (2).jpg',
    '/Pined/IMG_4965.jpg',
    '/Pined/IMG_7896.jpg',
    '/Pined/IMG_7961-1.jpg',
    '/VIDEO/MVI_0784_Sub_11.00.webm',
    '/Pined/IMG_8263.jpg',
    '/Pined/IMG_8265.jpg',
    '/Pined/IMG_8612.jpg',
    '/Pined/IMG_8638.jpg',
    '/Pined/IMG_8678-2 (2).jpg',
    '/Pined/IMG_8689-2.jpg',
    '/Pined/IMG_9095.jpg',
    '/Pined/IMG_9107.jpg',
    '/Pined/IMG_9399.jpg',
    '/Pined/IMG_9471-Edit.jpg',
    '/Pined/IMG_9472.jpg',
    '/Pined/IMG_9476.jpg',
    '/Pined/IMG_9606.jpg',
    '/VIDEO/MVI_0784_Sub_12.00.webm',
    '/Pined/IMG_9631.jpg',
    '/Pined/IMG_9713.jpg',
    '/Pined/IMG_9846-Pano.jpg',
    '/Pined/IMG_9981.jpg',
    '/Pined/Nov (2).jpg',
    '/Pined/Nov-15.jpg',
  ], []);

  const [dimensions, setDimensions] = useState<Record<string, ImageDimensions>>({});
  const [mediaLoaded, setMediaLoaded] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    images.forEach((src) => {
      if (isVideoFile(src)) {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
          setDimensions((prev) => ({
            ...prev,
            [src]: {
              src,
              width: video.videoWidth || 1920,
              height: video.videoHeight || 1080,
              isVideo: true,
            },
          }));
        };
        video.onerror = () => {
          setDimensions((prev) => ({
            ...prev,
            [src]: { src, width: 1920, height: 1080, isVideo: true },
          }));
        };
        video.src = src;
      } else {
        const img = new window.Image();
        img.onload = () => {
          setDimensions((prev) => ({
            ...prev,
            [src]: { src, width: img.width, height: img.height, isVideo: false },
          }));
        };
        img.onerror = () => {
          setDimensions((prev) => ({
            ...prev,
            [src]: { src, width: 1600, height: 1200, isVideo: false },
          }));
        };
        img.src = src;
      }
    });
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-gray-500 text-lg">No images found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
        {[0, 1, 2].map((colIndex) => (
          <div key={colIndex} className="flex flex-col gap-3 sm:gap-4 md:gap-6 flex-1">
            {images
              .filter((_, index) => index % 3 === colIndex)
              .map((src, indexInColumn) => {
              const globalIndex = images.findIndex((item) => item === src);
              const imageDim = dimensions[src];
              const isVideo = isVideoFile(src);
              const isReady = mediaLoaded[src] === true;
              const aspectRatio =
                imageDim && imageDim.width > 0 && imageDim.height > 0
                  ? `${imageDim.width} / ${imageDim.height}`
                  : isVideo
                    ? '16 / 9'
                    : '4 / 5';

              return (
                <MorphingDialog
                  key={`${colIndex}-${indexInColumn}-${src}`}
                  transition={{
                    duration: 0.4,
                    ease: 'easeInOut',
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
                        {isVideo ? (
                          <video
                            className="w-full h-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
                            src={src}
                            controls
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            onLoadedData={() =>
                              setMediaLoaded((prev) => ({ ...prev, [src]: true }))
                            }
                            onError={() =>
                              setMediaLoaded((prev) => ({ ...prev, [src]: true }))
                            }
                          />
                        ) : (
                          <Image
                            className="w-full h-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
                            src={src}
                            alt={`Pinned work ${globalIndex + 1}`}
                            width={imageDim?.width || 1600}
                            height={imageDim?.height || 1200}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            priority={globalIndex < 6}
                            onLoad={() =>
                              setMediaLoaded((prev) => ({ ...prev, [src]: true }))
                            }
                            onError={() =>
                              setMediaLoaded((prev) => ({ ...prev, [src]: true }))
                            }
                          />
                        )}
                      </div>
                    </article>
                  </MorphingDialogTrigger>

                  <MorphingDialogContainer>
                    <MorphingDialogContent className="relative max-w-[95vw] h-[95vh] sm:max-w-[90vw] sm:h-[90vh] flex items-center justify-center">
                      {isVideo ? (
                        <video
                          src={src}
                          controls
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                        />
                      ) : (
                        <MorphingDialogImage
                          src={src}
                          alt={`Pinned work ${globalIndex + 1}`}
                          className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                        />
                      )}
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
                          transition: { duration: 0.15 } 
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
};

export default GridPinned;
