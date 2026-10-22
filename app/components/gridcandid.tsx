"use client";

import AlbumGrid from "@/app/components/AlbumGrid";

const images = [
  "/candid/IMG_0736.jpg",
  "/candid/IMG_3685.jpg",
  "/candid/IMG_8896.jpg",
] as const;

export default function GridCandid() {
  return <AlbumGrid images={[...images]} altPrefix="Candid Photo" />;
}
