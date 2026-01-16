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

const GridAfcon: React.FC = () => {
  const images = useMemo(() => [
    '/Afcon/IMG_1317.jpg',
    '/Afcon/IMG_1329.jpg',
    '/Afcon/IMG_1331.jpg',
    '/Afcon/IMG_1337.jpg',
    '/Afcon/IMG_1346.jpg',
    '/Afcon/IMG_1362.jpg',
    '/Afcon/IMG_1364.jpg',
    '/Afcon/IMG_1366-Enhanced-NR.jpg',
    '/Afcon/IMG_1383-Enhanced-NR.jpg',
    '/Afcon/IMG_1418.jpg',
    '/Afcon/IMG_1423.jpg',
    '/Afcon/IMG_1442.jpg',
    '/Afcon/IMG_1443.jpg',
    '/Afcon/IMG_1450.jpg',
    '/Afcon/IMG_1461.jpg',
    '/Afcon/IMG_1467.jpg',
    '/Afcon/IMG_1472.jpg',
    '/Afcon/IMG_1473.jpg',
    '/Afcon/IMG_1474.jpg',
    '/Afcon/IMG_1475.jpg',
    '/Afcon/IMG_1483.jpg',
    '/Afcon/IMG_1484.jpg',
    '/Afcon/IMG_1486.jpg',
    '/Afcon/IMG_1487.jpg',
    '/Afcon/IMG_1488.jpg',
    '/Afcon/IMG_1489.jpg',
    '/Afcon/IMG_1556.jpg',
    '/Afcon/IMG_1579.jpg',
    '/Afcon/IMG_1580.jpg',
    '/Afcon/IMG_1598.jpg',
    '/Afcon/IMG_1600.jpg',
    '/Afcon/IMG_1607.jpg',
    '/Afcon/IMG_1608.jpg',
    '/Afcon/IMG_1618.jpg',
    '/Afcon/IMG_1639.jpg',
    '/Afcon/IMG_1640.jpg',
    '/Afcon/IMG_1641.jpg',
    '/Afcon/IMG_1664.jpg',
    '/Afcon/IMG_1669.jpg',
    '/Afcon/IMG_1679.jpg',
    '/Afcon/IMG_1682.jpg',
    '/Afcon/IMG_1699.jpg',
    '/Afcon/IMG_1700.jpg',
    '/Afcon/IMG_1702.jpg',
    '/Afcon/IMG_1705.jpg',
    '/Afcon/IMG_1716.jpg',
    '/Afcon/IMG_1717.jpg',
    '/Afcon/IMG_1720.jpg',
    '/Afcon/IMG_1721.jpg',
    '/Afcon/IMG_1728.jpg',
    '/Afcon/IMG_1729.jpg',
    '/Afcon/IMG_1736.jpg',
    '/Afcon/IMG_1738.jpg',
    '/Afcon/IMG_1741.jpg',
    '/Afcon/IMG_1743.jpg',
    '/Afcon/IMG_1775.jpg',
    '/Afcon/IMG_1776.jpg',
    '/Afcon/IMG_1791.jpg',
    '/Afcon/IMG_1792.jpg',
    '/Afcon/IMG_1806.jpg',
    '/Afcon/IMG_1807.jpg',
    '/Afcon/IMG_1810.jpg',
    '/Afcon/IMG_1821.jpg',
    '/Afcon/IMG_1822.jpg',
    '/Afcon/IMG_1823.jpg',
    '/Afcon/IMG_1826.jpg',
    '/Afcon/IMG_1827.jpg',
    '/Afcon/IMG_1828.jpg',
    '/Afcon/IMG_1829.jpg',
    '/Afcon/IMG_1832.jpg',
    '/Afcon/IMG_1833.jpg',
    '/Afcon/IMG_1834.jpg',
    '/Afcon/IMG_1836.jpg',
    '/Afcon/IMG_1838.jpg',
    '/Afcon/IMG_1839.jpg',
    '/Afcon/IMG_1857.jpg',
    '/Afcon/IMG_1858.jpg',
    '/Afcon/IMG_1859.jpg',
    '/Afcon/IMG_1863.jpg',
    '/Afcon/IMG_1864.jpg',
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
                            alt={`AFCON 25 Photo ${globalIndex + 1}`}
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
                        alt={`AFCON 25 Photo ${globalIndex + 1}`}
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

export default GridAfcon;
