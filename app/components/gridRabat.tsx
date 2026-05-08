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
}

const GridRabat: React.FC = () => {
  const images = useMemo(() => [
    '/rabat/100_0370.jpg',
    '/rabat/100_0371.jpg',
    '/rabat/100_0372.jpg',
    '/rabat/20241116-IMG_0014.jpg',
    '/rabat/20241116-IMG_0023.jpg',
    '/rabat/20241116-IMG_0030-Pano.jpg',
    '/rabat/20241116-IMG_0034.jpg',
    '/rabat/20241116-IMG_0037.jpg',
    '/rabat/20241116-IMG_0042.jpg',
    '/rabat/20241116-IMG_0056-Edit.jpg',
    '/rabat/20241116-IMG_0057-Edit.jpg',
    '/rabat/20241116-IMG_0058.jpg',
    '/rabat/20241116-IMG_0060.jpg',
    '/rabat/20241116-IMG_0076.jpg',
    '/rabat/20241116-IMG_0109.jpg',
    '/rabat/20241117-IMG_0130-Edit.jpg',
    '/rabat/20241117-IMG_0143.jpg',
    '/rabat/20241117-IMG_0144-Edit.jpg',
    '/rabat/20241117-IMG_0146.jpg',
    '/rabat/20241117-IMG_0149.jpg',
    '/rabat/20241117-IMG_0163-Pano.jpg',
    '/rabat/20241117-IMG_0188-Pano.jpg',
    '/rabat/20241117-IMG_0189.jpg',
    '/rabat/20241117-IMG_0198.jpg',
    '/rabat/DSC_2761.jpg',
    '/rabat/DSC_2764.jpg',
    '/rabat/IMG_0683.jpg',
    '/rabat/IMG_0689.jpg',
    '/rabat/IMG_0693.jpg',
    '/rabat/IMG_0701.jpg',
    '/rabat/IMG_0706.jpg',
    '/rabat/IMG_0707.jpg',
    '/rabat/IMG_0710.jpg',
    '/rabat/IMG_0718.jpg',
    '/rabat/IMG_0725.jpg',
    '/rabat/IMG_0746.jpg',
    '/rabat/IMG_0749.jpg',
    '/rabat/IMG_0752.jpg',
    '/rabat/IMG_20210811_144410.jpg',
    '/rabat/IMG_20210812_121354.jpg',
    '/rabat/IMG_20210812_125840 (1).jpg',
    '/rabat/IMG_20210812_125842.jpg',
    '/rabat/IMG_20210812_125913.jpg',
    '/rabat/IMG_20210812_130027.jpg',
    '/rabat/IMG_20210812_130115.jpg',
    '/rabat/IMG_20210812_130121.jpg',
    '/rabat/IMG_20210812_130854.jpg',
    '/rabat/IMG_20210812_131309.jpg',
    '/rabat/IMG_20210812_131314.jpg',
    '/rabat/IMG_20210812_133824.jpg',
    '/rabat/IMG_20210812_134212 (1).jpg',
    '/rabat/IMG_20210812_134328.jpg',
    '/rabat/IMG_20210812_135655.jpg',
    '/rabat/IMG_20210812_143553.jpg',
    '/rabat/IMG_20220807_155212.jpg',
    '/rabat/IMG_4752.jpg',
    '/rabat/IMG_4791-Pano.jpg',
    '/rabat/IMG_4821.jpg',
    '/rabat/IMG_4826.jpg',
    '/rabat/IMG_4829.jpg',
    '/rabat/IMG_4830.jpg',
    '/rabat/IMG_4834.jpg',
    '/rabat/IMG_4837.jpg',
    '/rabat/IMG_4840.jpg',
    '/rabat/IMG_4848.jpg',
    '/rabat/IMG_4853.jpg',
    '/rabat/IMG_4855.jpg',
    '/rabat/IMG_4859.jpg',
    '/rabat/IMG_4940-2.jpg',
    '/rabat/IMG_4941.jpg',
    '/rabat/IMG_8010.jpg',
    '/rabat/IMG_8013-Pano.jpg',
    '/rabat/IMG_8029.jpg',
    '/rabat/IMG_8436.jpg',
    '/rabat/IMG_8438.jpg',
    '/rabat/IMG_8549.jpg',
    '/rabat/IMG_8563.jpg',
    '/rabat/IMG_8568.jpg',
    '/rabat/IMG_8569.jpg',
    '/rabat/IMG_8570.jpg',
    '/rabat/IMG_8573.jpg',
    '/rabat/IMG_8574.jpg',
    '/rabat/IMG_8588-Pano.jpg',
    '/rabat/IMG_8595.jpg',
    '/rabat/IMG_8610.jpg',
    '/rabat/IMG_8612.jpg',
    '/rabat/IMG_8628.jpg',
    '/rabat/IMG_8634.jpg',
    '/rabat/IMG_8638.jpg',
  ], []);

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
    <div className="px-2 sm:px-4 md:px-6 lg:px-8 container mx-auto max-w-7xl">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
        {[0, 1, 2].map((colIndex) => (
          <div key={colIndex} className="flex flex-col gap-3 sm:gap-4 md:gap-6 flex-1">
            {images.filter((_, index) => index % 3 === colIndex).map((src, indexInColumn) => {
              const globalIndex = images.findIndex((item) => item === src);
              const imageDim = dimensions[src];
              const isReady = mediaLoaded[src] === true;
              const aspectRatio =
                imageDim && imageDim.width > 0 && imageDim.height > 0
                  ? `${imageDim.width} / ${imageDim.height}`
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
                        <Image
                          className="w-full h-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
                          src={src}
                          alt={`Rabat Photo ${globalIndex + 1}`}
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
                      </div>
                    </article>
                  </MorphingDialogTrigger>

                  <MorphingDialogContainer>
                    <MorphingDialogContent className="relative max-w-[95vw] h-[95vh] sm:max-w-[90vw] sm:h-[90vh] flex items-center justify-center">
                      <MorphingDialogImage
                        src={src}
                        alt={`Rabat Photo ${globalIndex + 1}`}
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

export default GridRabat;
