"use client";

import AlbumGrid from "@/app/components/AlbumGrid";

const images = [
  "/CSC/IMG_9006-15.jpg",
  "/CSC/2S6A4912-Pano.jpg",
  "/CSC/2S6A5092.jpg",
  "/CSC/2S6A5115.jpg",
  "/CSC/2S6A5134.jpg",
  "/CSC/2S6A5181.jpg",
  "/CSC/20241211-IMG_0578-Pano.jpg",
  "/CSC/DSC_5927-Pano.jpg",
  "/CSC/DSC_5990-Pano.jpg",
  "/CSC/IMG_0730-Pano-2.jpg",
  "/CSC/IMG_0973.jpg",
  "/CSC/IMG_1006.jpg",
  "/CSC/IMG_3252-Pano.jpg",
  "/CSC/IMG_3298-Pano.jpg",
  "/CSC/IMG_3763-Pano.jpg",
  "/CSC/IMG_4018.jpg",
  "/CSC/IMG_4174-Pano.jpg",
  "/CSC/IMG_4189-Pano.jpg",
  "/CSC/IMG_4813-Pano.jpg",
  "/CSC/IMG_4844.jpg",
  "/CSC/IMG_5132-Pano.jpg",
  "/CSC/IMG_6073-Pano-2.jpg",
] as const;

export default function GridCSC() {
  return <AlbumGrid images={[...images]} altPrefix="CSC Photo" />;
}
