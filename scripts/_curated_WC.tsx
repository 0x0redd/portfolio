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

const Grid: React.FC = () => {
  const images = useMemo(() => [
    '/world cup 2022/DSC_3670.jpg',
'/world cup 2022/DSC_3679.jpg',
'/world cup 2022/DSC_3680.jpg',
'/world cup 2022/DSC_3681.jpg',
'/world cup 2022/DSC_3689.jpg',
'/world cup 2022/DSC_3705.jpg',
'/world cup 2022/DSC_3707.jpg',
'/world cup 2022/DSC_3711.jpg',
'/world cup 2022/DSC_3714.jpg',
'/world cup 2022/DSC_3729.jpg',
'/world cup 2022/DSC_3761.jpg',
'/world cup 2022/DSC_3763.jpg',
'/world cup 2022/DSC_3766.jpg',
'/world cup 2022/DSC_3769.jpg',
'/world cup 2022/DSC_3788.jpg',
'/world cup 2022/DSC_3789.jpg',
'/world cup 2022/DSC_3791.jpg',
'/world cup 2022/DSC_3793.jpg',
'/world cup 2022/DSC_3821.jpg',
'/world cup 2022/DSC_3823.jpg',
'/world cup 2022/DSC_3825.jpg',
'/world cup 2022/DSC_3828.jpg',
'/world cup 2022/DSC_3849.jpg',
'/world cup 2022/DSC_3871.jpg',
'/world cup 2022/DSC_3872.jpg',
'/world cup 2022/DSC_3873.jpg',
'/world cup 2022/DSC_3874.jpg',
'/world cup 2022/DSC_3875.jpg',
'/world cup 2022/DSC_3876.jpg',
'/world cup 2022/DSC_3893.jpg',
'/world cup 2022/DSC_3900.jpg',
'/world cup 2022/DSC_3901.jpg',
'/world cup 2022/DSC_3904.jpg',
'/world cup 2022/DSC_3906.jpg',
'/world cup 2022/DSC_3961.jpg',
'/world cup 2022/DSC_3969.jpg',
'/world cup 2022/DSC_3975.jpg',
'/world cup 2022/DSC_3978.jpg',
'/world cup 2022/DSC_3980.jpg',
'/world cup 2022/DSC_3981.jpg',
'/world cup 2022/DSC_3984.jpg',
'/world cup 2022/DSC_3987.jpg',
'/world cup 2022/DSC_3991.jpg',
'/world cup 2022/DSC_3995.jpg',
'/world cup 2022/DSC_4005.jpg',
'/world cup 2022/DSC_4035.jpg',
'/world cup 2022/DSC_4045.jpg',
'/world cup 2022/DSC_4049.jpg',
'/world cup 2022/DSC_4053.jpg',
'/world cup 2022/DSC_4058.jpg',
'/world cup 2022/DSC_4063.jpg',
'/world cup 2022/DSC_4064.jpg',
'/world cup 2022/DSC_4072.jpg',
'/world cup 2022/DSC_4082.jpg',
'/world cup 2022/DSC_4090.jpg',
'/world cup 2022/DSC_4091.jpg',
'/world cup 2022/DSC_4094.jpg',
'/world cup 2022/DSC_4098.jpg',
'/world cup 2022/DSC_4099.jpg',
'/world cup 2022/DSC_4102.jpg',
'/world cup 2022/DSC_4121.jpg',
'/world cup 2022/DSC_4125.jpg',
'/world cup 2022/DSC_4134.jpg',
'/world cup 2022/DSC_4136.jpg',
'/world cup 2022/DSC_4142.jpg',
'/world cup 2022/DSC_4161-2.jpg',
'/world cup 2022/DSC_4161.jpg',
'/world cup 2022/DSC_4174.jpg',
'/world cup 2022/DSC_4178.jpg',
'/world cup 2022/DSC_4179-2.jpg',
'/world cup 2022/DSC_4186.jpg',
'/world cup 2022/DSC_4195.jpg',
'/world cup 2022/DSC_4196.jpg',
'/world cup 2022/DSC_4204.jpg',
'/world cup 2022/DSC_4222.jpg',
'/world cup 2022/DSC_4223.jpg',
'/world cup 2022/DSC_4225.jpg',
'/world cup 2022/DSC_4227.jpg',
'/world cup 2022/DSC_4228.jpg',
'/world cup 2022/DSC_4245.jpg',
'/world cup 2022/DSC_4249.jpg',
'/world cup 2022/DSC_4257.jpg',
'/world cup 2022/DSC_4269.jpg',
    '/world cup 2022/DSC_4296.jpg',
    '/world cup 2022/DSC_4299.jpg'
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
                          alt={`World Cup 2022 Photo ${globalIndex + 1}`}
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
                        alt={`World Cup 2022 Photo ${globalIndex + 1}`}
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

export default Grid;
