"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
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
  const images = [
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
  ];

  const [dimensions, setDimensions] = useState<ImageDimensions[]>([]);
  
  useEffect(() => {
    const loadImageDimensions = async () => {
      const newDimensions: ImageDimensions[] = await Promise.all(
        images.map((src) => {
          return new Promise<ImageDimensions>((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve({ src, width: img.width, height: img.height });
            img.onerror = () => resolve({ src, width: 0, height: 0 }); // Handle errors
            img.src = src;
          });
        })
      );
      setDimensions(newDimensions);
    };

    loadImageDimensions();
  }, [images]);

  if (!images || images.length === 0) {
    return <div>No images found.</div>;
  }

  // Explicitly type the columns array
  const columns: ImageDimensions[][] = [[], [], []];
  
  // Distribute images into columns
  dimensions.forEach((imageDim, index) => {
    columns[index % 3].push(imageDim);
  });

  return (
    <div className="p-6 container mx-auto">
      {/* Create a flex container for columns */}
      <div className="flex flex-col md:flex-row md:space-x-6 md:justify-center ">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col space-y-6 mb-6 md:mb-0">
            {column.map((imageDim, index) => (
              <MorphingDialog
                key={index}
                transition={{
                  duration: 0.4,
                  ease: 'easeInOut',
                }}
              >
                <MorphingDialogTrigger>
                  <article className="relative flex items-center justify-center cursor-pointer">
                    <div className="relative">
                      {imageDim.width > 0 && imageDim.height > 0 ? (
                        <Image
                          className="relative max-w-[400px] w-full md:w-auto md:justify-center transition-transform duration-300 ease-in-out hover:scale-[1.02]"
                          src={imageDim.src}
                          alt={`Image ${index + 1}`}
                          width={imageDim.width}
                          height={imageDim.height}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-red-500">
                          Image failed to load
                        </div>
                      )}
                    </div>
                  </article>
                </MorphingDialogTrigger>

                <MorphingDialogContainer>
                  <MorphingDialogContent className="relative">
                    <MorphingDialogImage
                      src={imageDim.src}
                      alt={`Image ${index + 1}`}
                      className="h-auto w-full max-w-[90vw] rounded-[6px] object-contain lg:h-[90vh]"
                    />
                  </MorphingDialogContent>
                  <MorphingDialogClose
                    className="fixed right-6 top-6 h-fit w-fit rounded-full bg-white/90 p-2 shadow-lg backdrop-blur"
                    variants={{
                      initial: { opacity: 0 },
                      animate: {
                        opacity: 1,
                        transition: { delay: 0.2, duration: 0.1 },
                      },
                      exit: { opacity: 0, transition: { duration: 0 } },
                    }}
                  >
                    <XIcon className="h-6 w-6 text-zinc-700 hover:text-black" />
                  </MorphingDialogClose>
                </MorphingDialogContainer>
              </MorphingDialog>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Grid;
