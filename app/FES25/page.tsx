'use client';

import React, { useEffect } from 'react'
import { NavbarDemo } from '@/components/navbar'
import GridFES from '../components/gridFES25'
import { ScrollHorizontalVideos } from '../components/scrollHorizontalVideos'
import { injectVideoPreloadHints, startVideoPreload } from '@/lib/video-cache'

const videos = [
  '/VIDEO/Sequence 01_9.webm',
  '/VIDEO/Sequence 01_10.webm',
  '/VIDEO/Sequence 01_11.webm',
  '/VIDEO/Sequence 01_12.webm',
  '/VIDEO/Sequence 01_14.webm',
  '/VIDEO/Sequence 01_17.webm',
];

export default function FES25() {
  useEffect(() => {
    injectVideoPreloadHints(videos);
    startVideoPreload(videos);
  }, []);

  return (
    <main className="min-h-screen bg-[#141414]">
      <NavbarDemo />

      <ScrollHorizontalVideos videos={videos}>
        <div className="mx-auto w-full max-w-4xl space-y-4 text-center md:space-y-6">
          <h2 className="text-4xl font-light text-white md:text-6xl lg:text-7xl">
            FES
          </h2>
          <div className="mx-auto max-w-3xl">
            <p className="text-base leading-relaxed text-gray-300 md:text-lg lg:text-xl">
              I traveled to Fes to explore and experience the old walls, the rituals, the smells,
              the people, the culture, everything. Each picture, postcard, and video is a point of view of me
              exploring and documenting everything I encountered.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-400 md:text-base lg:text-lg">
              Through my lens, I captured the essence of this ancient city—its timeless architecture,
              vibrant street life, and the daily rituals that make Fes a living, breathing testament
              to Moroccan culture and history.
            </p>
          </div>
        </div>
      </ScrollHorizontalVideos>

      <GridFES />
    </main>
  )
}
