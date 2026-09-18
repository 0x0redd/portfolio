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

const GridMeknes: React.FC = () => {
  const images = useMemo(() => [
    '/meknes/03112020-IMG_20201103_182534.JPG',
    '/meknes/05012021-DSC_9278.jpg',
    '/meknes/05012021-DSC_9311.jpg',
    '/meknes/06122020-DSC_0071.JPG',
    '/meknes/10122020-IMG_20201210_185031.JPG',
    '/meknes/12122020-DSC_8767.JPG',
    '/meknes/16102020-IMG_20201016_183424.JPG',
    '/meknes/16102020-IMG_20201016_183658.JPG',
    '/meknes/16102020-IMG_20201016_185413.JPG',
    '/meknes/16102020-IMG_20201016_185508.JPG',
    '/meknes/17112020-IMG_20201117_181054.JPG',
    '/meknes/17112020-IMG_20201117_182159.JPG',
    '/meknes/18112020-IMG_20201118_175602.JPG',
    '/meknes/18112020-IMG_20201118_175606.JPG',
    '/meknes/20210116-IMG_20210116_180133.jpg',
    '/meknes/20210121-IMG_20210121_191503.jpg',
    '/meknes/20210130-DSC_9906.jpg',
    '/meknes/20210130-DSC_9910.jpg',
    '/meknes/20210207-DSC_0111.jpg',
    '/meknes/20210207-DSC_0115.jpg',
    '/meknes/20210307-IMG_20210307_181241.jpg',
    '/meknes/20210317-DSC_0744.jpg',
    '/meknes/20210317-DSC_0745.jpg',
    '/meknes/20210317-DSC_0746.jpg',
    '/meknes/20241231-IMG_1291-HDR.jpg',
    '/meknes/27092020-IMG_20200927_190502.JPG',
    '/meknes/27112020-IMG_20201127_173903.JPG',
    '/meknes/27112020-IMG_20201127_173904.JPG',
    '/meknes/DSC_1630.jpg',
    '/meknes/DSC_1632.jpg',
    '/meknes/DSC_1701.jpg',
    '/meknes/DSC_1702.jpg',
    '/meknes/DSC_1708-Enhanced-NR-2.jpg',
    '/meknes/DSC_1727.jpg',
    '/meknes/DSC_2652.jpg',
    '/meknes/IMG_1166.jpg',
    '/meknes/IMG_20201018_185649.jpg',
    '/meknes/IMG_20210116_173247.jpg',
    '/meknes/IMG_20210410_190033.jpg',
    '/meknes/IMG_20210410_193620 (2).jpg',
    '/meknes/IMG_20210410_201327.jpg',
    '/meknes/IMG_20210413_105328.jpg',
    '/meknes/IMG_20210416_150902.jpg',
    '/meknes/IMG_20210808_173213.jpg',
    '/meknes/IMG_20210831_194013 (3).jpg',
    '/meknes/IMG_20210925_194225.jpg',
    '/meknes/IMG_3208-Pano.jpg',
    '/meknes/IMG_6143.jpg',
    '/meknes/IMG_6152.jpg',
    '/meknes/IMG_6464-Pano.jpg',
    '/meknes/IMG_7870-Pano.jpg',
    '/meknes/IMG_7882.jpg',
    '/meknes/IMG_7896.jpg',
    '/meknes/IMG_7905.jpg',
    '/meknes/IMG_7914.jpg',
    '/meknes/IMG_7920.jpg',
    '/meknes/IMG_7940-1.jpg',
    '/meknes/IMG_7961-1.jpg',
    '/meknes/IMG_8677-1.jpg',
    '/meknes/IMG_8678-2 (2).jpg',
    '/meknes/IMG_8678-2.jpg',
    '/meknes/IMG_9089.jpg',
    '/meknes/IMG_9095.jpg',
    '/meknes/IMG_9107.jpg',
    '/meknes/IMG_9113.jpg',
    '/meknes/IMG_9119.jpg',
    '/meknes/IMG_9122.jpg',
    '/meknes/IMG_9124.jpg',
    '/meknes/IMG_9130.jpg',
    '/meknes/IMG_9141.jpg',
    '/meknes/IMG_9150.jpg',
    '/meknes/IMG_9164.jpg',
    '/meknes/IMG_9713.jpg',
    '/meknes/IMG_9820-HDR.jpg',
    '/meknes/IMG_9831-HDR.jpg',
    '/meknes/IMG_9915-Edit.jpg',
    '/meknes/IMG_9920-Edit.jpg',
    '/meknes/IMG_9981.jpg',
    '/meknes/IMG_9982.jpg',
    '/meknes/Nov (1).jpg',
    '/meknes/Nov (2).jpg',
    '/meknes/Nov (3).jpg',
    '/meknes/Nov (4).jpg',
    '/meknes/Nov (5).jpg',
    '/meknes/Nov-01.jpg',
    '/meknes/sumer 3-0527.jpg',
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
                          alt={`Meknes Photo ${globalIndex + 1}`}
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
                        alt={`Meknes Photo ${globalIndex + 1}`}
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

export default GridMeknes;
