"use client";

import AlbumGrid from "@/app/components/AlbumGrid";

const images = [
  "/VIDEO/MVI_0784_3.webm",
  "/Pined/100_0370@3x.jpg",
  "/Pined/20241119-IMG_0246.jpg",
  "/Pined/20241215-IMG_0689.jpg",
  "/Pined/DSC_2652.jpg",
  "/Pined/DSC_3793.jpg",
  "/Pined/DSC_3821.jpg",
  "/VIDEO/MVI_0784_Sub_04.00.webm",
  "/Pined/DSC_3893.jpg",
  "/Pined/DSC_3900.jpg",
  "/Pined/DSC_3906.jpg",
  "/Pined/DSC_3981.jpg",
  "/Pined/DSC_4179.jpg",
  "/Pined/DSC_4299.jpg",
  "/Pined/DSC_4909 (1).jpg",
  "/Pined/DSC_4927 (1).jpg",
  "/Pined/IMG_20200920_202833.jpg",
  "/Pined/IMG_20211130_170752 (2).jpg",
  "/Pined/IMG_4965.jpg",
  "/Pined/IMG_7896.jpg",
  "/Pined/IMG_7961-1.jpg",
  "/VIDEO/MVI_0784_Sub_11.00.webm",
  "/Pined/IMG_8263.jpg",
  "/Pined/IMG_8265.jpg",
  "/Pined/IMG_8612.jpg",
  "/Pined/IMG_8638.jpg",
  "/Pined/IMG_8678-2 (2).jpg",
  "/Pined/IMG_8689-2.jpg",
  "/Pined/IMG_9095.jpg",
  "/Pined/IMG_9107.jpg",
  "/Pined/IMG_9399.jpg",
  "/Pined/IMG_9471-Edit.jpg",
  "/Pined/IMG_9472.jpg",
  "/Pined/IMG_9476.jpg",
  "/Pined/IMG_9606.jpg",
  "/VIDEO/MVI_0784_Sub_12.00.webm",
  "/Pined/IMG_9631.jpg",
  "/Pined/IMG_9713.jpg",
  "/Pined/IMG_9846-Pano.jpg",
  "/Pined/IMG_9981.jpg",
  "/Pined/Nov (2).jpg",
  "/Pined/Nov-15.jpg",
] as const;

export default function GridPinned() {
  return <AlbumGrid images={[...images]} altPrefix="Pinned Photo" />;
}
