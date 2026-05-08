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

const GridStreet: React.FC = () => {
  const images = useMemo(() => [
    '/Street/04012021-DSC_9179.jpg',
    '/Street/08112020-IMG_20201108_183416.JPG',
    '/Street/20210114-DSC_9525.jpg',
    '/Street/20210116-IMG_20210116_180133.jpg',
    '/Street/20210116-IMG_20210116_180813.jpg',
    '/Street/20210317-DSC_0751.jpg',
    '/Street/20241116-IMG_0010.jpg',
    '/Street/20241117-IMG_0179.jpg',
    '/Street/20241117-IMG_0198.jpg',
    '/Street/20241117-IMG_0207.jpg',
    '/Street/27092020-IMG_20200927_190502.JPG',
    '/Street/28102020-IMG_20201028_190200.JPG',
    '/Street/28102020-IMG_20201028_190214.JPG',
    '/Street/31122020-DSC_8984.JPG',
    '/Street/DSC_0862.jpg',
    '/Street/DSC_1680.jpg',
    '/Street/DSC_2652.jpg',
    '/Street/DSC_2654.jpg',
    '/Street/DSC_2655.jpg',
    '/Street/DSC_2727.jpg',
    '/Street/DSC_2798.jpg',
    '/Street/DSC_2820.jpg',
    '/Street/DSC_2849.jpg',
    '/Street/DSC_3033.jpg',
    '/Street/DSC_3043.jpg',
    '/Street/DSC_3057.jpg',
    '/Street/DSC_3063.jpg',
    '/Street/DSC_3255.jpg',
    '/Street/DSC_3268.jpg',
    '/Street/DSC_3277.jpg',
    '/Street/DSC_3296.jpg',
    '/Street/DSC_3315.jpg',
    '/Street/DSC_3322.jpg',
    '/Street/DSC_4801.jpg',
    '/Street/DSC_4909 (1).jpg',
    '/Street/DSC_4911.jpg',
    '/Street/DSC_4912.jpg',
    '/Street/DSC_4924.jpg',
    '/Street/DSC_4927 (1).jpg',
    '/Street/DSC_4981.jpg',
    '/Street/DSC_4994.jpg',
    '/Street/DSC_4997.jpg',
    '/Street/DSC_5003.jpg',
    '/Street/DSC_5012.jpg',
    '/Street/DSC_5016.jpg',
    '/Street/DSC_5080.jpg',
    '/Street/DSC_5088.jpg',
    '/Street/DSC_5132.jpg',
    '/Street/IMG_0623.jpg',
    '/Street/IMG_0683.jpg',
    '/Street/IMG_0741.jpg',
    '/Street/IMG_1169.jpg',
    '/Street/IMG_2005.jpg',
    '/Street/IMG_20200624_203153.jpg',
    '/Street/IMG_20200920_202833.jpg',
    '/Street/IMG_20210103_182614.jpg',
    '/Street/IMG_20210410_201327.jpg',
    '/Street/IMG_20210515_192926.jpg',
    '/Street/IMG_20210812_120738.jpg',
    '/Street/IMG_20210812_121300.jpg',
    '/Street/IMG_20210812_134320.jpg',
    '/Street/IMG_20210812_134328.jpg',
    '/Street/IMG_20210920_183628.jpg',
    '/Street/IMG_20210920_183645.jpg',
    '/Street/IMG_20210920_183739.jpg',
    '/Street/IMG_20210925_192553.jpg',
    '/Street/IMG_20210925_194105.jpg',
    '/Street/IMG_20210925_195656.jpg',
    '/Street/IMG_20211009_180113.jpg',
    '/Street/IMG_20211018_182618 (1).jpg',
    '/Street/IMG_20211018_182710 (1).jpg',
    '/Street/IMG_20211018_183019.jpg',
    '/Street/IMG_20211123_142204.jpg',
    '/Street/IMG_20211123_145500.jpg',
    '/Street/IMG_20211130_154718 (1).jpg',
    '/Street/IMG_20211130_170752 (2).jpg',
    '/Street/IMG_20211216_155054 (1).jpg',
    '/Street/IMG_20211217_120930 (1).jpg',
    '/Street/IMG_20220107_163226.jpg',
    '/Street/IMG_20220107_163738.jpg',
    '/Street/IMG_20220328_175609 (1).jpg',
    '/Street/IMG_20220813_190956 (2).jpg',
    '/Street/IMG_2024.jpg',
    '/Street/IMG_2029.jpg',
    '/Street/IMG_2030.jpg',
    '/Street/IMG_2031.jpg',
    '/Street/IMG_2032.jpg',
    '/Street/IMG_4768.jpg',
    '/Street/IMG_4817.jpg',
    '/Street/IMG_6130.jpg',
    '/Street/IMG_6138.jpg',
    '/Street/IMG_6337.jpg',
    '/Street/IMG_6388.jpg',
    '/Street/IMG_7873.jpg',
    '/Street/IMG_8388.jpg',
    '/Street/IMG_8446.jpg',
    '/Street/IMG_8465.jpg',
    '/Street/IMG_8475.jpg',
    '/Street/IMG_8484.jpg',
    '/Street/IMG_8486.jpg',
    '/Street/IMG_8543.jpg',
    '/Street/IMG_8549.jpg',
    '/Street/IMG_8552.jpg',
    '/Street/IMG_8556.jpg',
    '/Street/IMG_8569.jpg',
    '/Street/IMG_8573.jpg',
    '/Street/IMG_8574.jpg',
    '/Street/IMG_8575.jpg',
    '/Street/IMG_8578.jpg',
    '/Street/IMG_8579.jpg',
    '/Street/IMG_8595.jpg',
    '/Street/IMG_8596.jpg',
    '/Street/IMG_8602.jpg',
    '/Street/IMG_8606.jpg',
    '/Street/IMG_8610.jpg',
    '/Street/IMG_8612.jpg',
    '/Street/IMG_8621.jpg',
    '/Street/IMG_8628.jpg',
    '/Street/IMG_8634.jpg',
    '/Street/IMG_8638.jpg',
    '/Street/IMG_9073.jpg',
    '/Street/IMG_9081.jpg',
    '/Street/IMG_9089.jpg',
    '/Street/IMG_9091.jpg',
    '/Street/IMG_9095.jpg',
    '/Street/IMG_9107.jpg',
    '/Street/IMG_9113.jpg',
    '/Street/IMG_9119.jpg',
    '/Street/IMG_9122.jpg',
    '/Street/IMG_9124.jpg',
    '/Street/IMG_9130.jpg',
    '/Street/IMG_9141.jpg',
    '/Street/Nov-01.jpg',
    '/Street/Nov-12.jpg',
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
                          alt={`Street Photo ${globalIndex + 1}`}
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
                        alt={`Street Photo ${globalIndex + 1}`}
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

export default GridStreet;
