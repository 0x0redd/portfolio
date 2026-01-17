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
    '/VIDEO/MVI_0784_3.mp4',
    '/Pined/100_0370@3x.jpg',
    '/Pined/20241119-IMG_0246.jpg',
    '/Pined/20241215-IMG_0689.jpg',
    '/Pined/DSC_2652.jpg',
    '/Pined/DSC_3793.jpg',
    '/Pined/DSC_3821.jpg',
    '/VIDEO/MVI_0784_Sub_04.00.mp4',
    '/Pined/DSC_3893.jpg',
    '/Pined/DSC_3900.jpg',
    '/Pined/DSC_3906.jpg',
    '/Pined/DSC_3981.jpg',
    '/Pined/DSC_4179.jpg',
    '/Pined/DSC_4299.jpg',
    '/Pined/DSC_4909 (1).jpg',
    '/VIDEO/MVI_0784_Sub_10.00.mp4',
    '/Pined/DSC_4927 (1).jpg',
    '/Pined/IMG_20200920_202833.jpg',
    '/Pined/IMG_20211130_170752 (2).jpg',
    '/Pined/IMG_4965.jpg',
    '/Pined/IMG_7896.jpg',
    '/Pined/IMG_7961-1.jpg',
    '/VIDEO/MVI_0784_Sub_11.00.mp4',
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
    '/VIDEO/MVI_0784_Sub_12.00.mp4',
    '/Pined/IMG_9631.jpg',
    '/Pined/IMG_9713.jpg',
    '/Pined/IMG_9846-Pano.jpg',
    '/Pined/IMG_9981.jpg',
    '/Pined/Nov (2).jpg',
    '/Pined/Nov-15.jpg',
  ], []);

  const [dimensions, setDimensions] = useState<ImageDimensions[]>([]);
  const [columns, setColumns] = useState<ImageDimensions[][]>([[], [], []]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadImageDimensions = async () => {
      const newDimensions: ImageDimensions[] = await Promise.all(
        images.map((src) => {
          return new Promise<ImageDimensions>((resolve) => {
            if (isVideoFile(src)) {
              // For videos, use default dimensions or load video metadata
              const video = document.createElement('video');
              video.preload = 'metadata';
              video.onloadedmetadata = () => {
                resolve({ 
                  src, 
                  width: video.videoWidth || 1920, 
                  height: video.videoHeight || 1080,
                  isVideo: true 
                });
              };
              video.onerror = () => {
                resolve({ src, width: 1920, height: 1080, isVideo: true });
              };
              video.src = src;
            } else {
              const img = new window.Image();
              img.onload = () => resolve({ src, width: img.width, height: img.height, isVideo: false });
              img.onerror = () => resolve({ src, width: 0, height: 0, isVideo: false });
              img.src = src;
            }
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
    <div className="w-full">
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
                        {imageDim.isVideo ? (
                          <video
                            className="w-full h-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
                            src={imageDim.src}
                            controls
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                          />
                        ) : imageDim.width > 0 && imageDim.height > 0 ? (
                          <Image
                            className="w-full h-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
                            src={imageDim.src}
                            alt={`Pinned work ${globalIndex + 1}`}
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
                      {imageDim.isVideo ? (
                        <video
                          src={imageDim.src}
                          controls
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                        />
                      ) : (
                        <MorphingDialogImage
                          src={imageDim.src}
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
