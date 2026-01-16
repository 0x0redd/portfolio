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

const GridFES: React.FC = () => {
  const images = useMemo(() => [
    '/Fes/IMG_9399.jpg',
    '/Fes/IMG_9400.jpg',
    '/Fes/IMG_9402.jpg',
    '/Fes/IMG_9409.jpg',
    '/Fes/IMG_9410.jpg',
    '/Fes/IMG_9412.jpg',
    '/Fes/IMG_9414.jpg',
    '/Fes/IMG_9415.jpg',
    '/Fes/IMG_9416.jpg',
    '/Fes/IMG_9418.jpg',
    '/Fes/IMG_9420-Pano.jpg',
    '/Fes/IMG_9425.jpg',
    '/Fes/IMG_9426.jpg',
    '/Fes/IMG_9427.jpg',
    '/Fes/IMG_9428.jpg',
    '/Fes/IMG_9429.jpg',
    '/Fes/IMG_9430.jpg',
    '/Fes/IMG_9434.jpg',
    '/Fes/IMG_9437.jpg',
    '/Fes/IMG_9438.jpg',
    '/Fes/IMG_9439.jpg',
    '/Fes/IMG_9440.jpg',
    '/Fes/IMG_9441.jpg',
    '/Fes/IMG_9442.jpg',
    '/Fes/IMG_9450.jpg',
    '/Fes/IMG_9451.jpg',
    '/Fes/IMG_9454.jpg',
    '/Fes/IMG_9455.jpg',
    '/Fes/IMG_9457.jpg',
    '/Fes/IMG_9464.jpg',
    '/Fes/IMG_9470.jpg',
    '/Fes/IMG_9471.jpg',
    '/Fes/IMG_9471-Edit.jpg',
    '/Fes/IMG_9472.jpg',
    '/Fes/IMG_9475.jpg',
    '/Fes/IMG_9476.jpg',
    '/Fes/IMG_9483.jpg',
    '/Fes/IMG_9484.jpg',
    '/Fes/IMG_9493.jpg',
    '/Fes/IMG_9498.jpg',
    '/Fes/IMG_9501.jpg',
    '/Fes/IMG_9506.jpg',
    '/Fes/IMG_9507.jpg',
    '/Fes/IMG_9524-Pano.jpg',
    '/Fes/IMG_9528.jpg',
    '/Fes/IMG_9529.jpg',
    '/Fes/IMG_9530.jpg',
    '/Fes/IMG_9548.jpg',
    '/Fes/IMG_9549.jpg',
    '/Fes/IMG_9551.jpg',
    '/Fes/IMG_9554.jpg',
    '/Fes/IMG_9556.jpg',
    '/Fes/IMG_9564-Pano.jpg',
    '/Fes/IMG_9569.jpg',
    '/Fes/IMG_9574.jpg',
    '/Fes/IMG_9575.jpg',
    '/Fes/IMG_9576.jpg',
    '/Fes/IMG_9582.jpg',
    '/Fes/IMG_9602.jpg',
    '/Fes/IMG_9605.jpg',
    '/Fes/IMG_9606.jpg',
    '/Fes/IMG_9607.jpg',
    '/Fes/IMG_9608.jpg',
    '/Fes/IMG_9610.jpg',
    '/Fes/IMG_9612.jpg',
    '/Fes/IMG_9620-Pano.jpg',
    '/Fes/IMG_9623-Pano.jpg',
    '/Fes/IMG_9627.jpg',
    '/Fes/IMG_9628.jpg',
    '/Fes/IMG_9631.jpg',
    '/Fes/IMG_9637.jpg',
    '/Fes/IMG_9640-Pano.jpg',
    '/Fes/IMG_9659.jpg',
    '/Fes/IMG_9660.jpg',
    '/Fes/IMG_9663.jpg',
    '/Fes/IMG_9671.jpg',
    '/Fes/IMG_9680.jpg',
    '/Fes/IMG_9685-Pano.jpg',
    '/Fes/IMG_9690.jpg',
    '/Fes/IMG_9694.jpg',
    '/Fes/IMG_9698.jpg',
    '/Fes/IMG_9714.jpg',
    '/Fes/IMG_9722.jpg',
    '/Fes/IMG_9725.jpg',
    '/Fes/IMG_9728.jpg',
    '/Fes/IMG_9729.jpg',
    '/Fes/IMG_9736.jpg',
    '/Fes/IMG_9737.jpg',
    '/Fes/IMG_9737-2.jpg',
    '/Fes/IMG_9738.jpg',
    '/Fes/IMG_9739.jpg',
    '/Fes/IMG_9742.jpg',
    '/Fes/IMG_9745.jpg',
    '/Fes/IMG_9746.jpg',
    '/Fes/IMG_9747.jpg',
    '/Fes/IMG_9748.jpg',
    '/Fes/IMG_9749.jpg',
    '/Fes/IMG_9750.jpg',
    '/Fes/IMG_9751.jpg',
    '/Fes/IMG_9759.jpg'
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
                            alt={`FES 2025 Photo ${globalIndex + 1}`}
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
                        alt={`FES 2025 Photo ${globalIndex + 1}`}
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

export default GridFES;
