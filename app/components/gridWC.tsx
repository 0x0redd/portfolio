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

  const [dimensions, setDimensions] = useState<ImageDimensions[]>([]);
  const [columns, setColumns] = useState<ImageDimensions[][]>([[], [], []]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadImageDimensions = async () => {
      const newDimensions: ImageDimensions[] = await Promise.all(
        images.map((src) => {
          return new Promise<ImageDimensions>((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve({ src, width: img.width, height: img.height });
            img.onerror = () => resolve({ src, width: 0, height: 0 });
            img.src = src;
          });
        })
      );
      setDimensions(newDimensions);
      
      // Distribute images into columns based on aspect ratio to minimize gaps
      const numColumns = 3;
      const columnHeights = new Array(numColumns).fill(0);
      const distributedColumns: ImageDimensions[][] = new Array(numColumns).fill(null).map(() => []);
      
      newDimensions.forEach((imageDim) => {
        if (imageDim.width > 0 && imageDim.height > 0) {
          const aspectRatio = imageDim.height / imageDim.width;
          const estimatedHeight = 400 * aspectRatio;
          
          const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
          distributedColumns[shortestColumnIndex].push(imageDim);
          columnHeights[shortestColumnIndex] += estimatedHeight;
        } else {
          distributedColumns[0].push(imageDim);
        }
      });
      
      setColumns(distributedColumns);
      setIsLoading(false);
    };

    loadImageDimensions();
  }, [images]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading photos...</p>
        </div>
      </div>
    );
  }

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
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-3 sm:gap-4 md:gap-6 flex-1">
            {column.map((imageDim, index) => {
              const globalIndex = dimensions.findIndex(d => d.src === imageDim.src);
              return (
                <MorphingDialog
                  key={`${colIndex}-${index}`}
                  transition={{
                    duration: 0.4,
                    ease: 'easeInOut',
                  }}
                >
                  <MorphingDialogTrigger>
                    <article className="relative flex items-center justify-center cursor-pointer group">
                      <div className="relative w-full overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                        {imageDim.width > 0 && imageDim.height > 0 ? (
                          <Image
                            className="w-full h-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
                            src={imageDim.src}
                            alt={`World Cup 2022 Photo ${globalIndex + 1}`}
                            width={imageDim.width}
                            height={imageDim.height}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            priority={globalIndex < 6}
                          />
                        ) : (
                          <div className="w-full h-48 sm:h-64 flex items-center justify-center text-red-500 bg-gray-100 rounded-lg">
                            <span className="text-sm">Image failed to load</span>
                          </div>
                        )}
                      </div>
                    </article>
                  </MorphingDialogTrigger>

                  <MorphingDialogContainer>
                    <MorphingDialogContent className="relative max-w-[95vw] h-[95vh] sm:max-w-[90vw] sm:h-[90vh] flex items-center justify-center">
                      <MorphingDialogImage
                        src={imageDim.src}
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
