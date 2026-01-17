'use client';

import React from 'react'
import { NavbarDemo } from '@/components/navbar'
import GridFES from '../components/gridFES25'
import VideoPlayer from '../components/video'

export default function WorldCup2022() {
  // Video files from /VIDEO folder
  const videos = [
    '/VIDEO/Sequence 01_9.webm',
    '/VIDEO/Sequence 01_10.webm',
    '/VIDEO/Sequence 01_11.webm',
    '/VIDEO/Sequence 01_12.webm',
    '/VIDEO/Sequence 01_14.webm',
    '/VIDEO/Sequence 01_17.webm',
  ];

  return (
    <main className="min-h-screen bg-[#141414]">
        <NavbarDemo />

        <div className="text-start space-y-8 mb-16 container mx-auto px-6 md:px-12 lg:px-24 pt-20 relative z-10">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 text-center">
                FES
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                  I traveled to Fes to explore and experience the old walls, the rituals, the smells, 
                  the people—everything. Each picture, postcard, and video is a point of view of me 
                  exploring and documenting everything I encountered.
                </p>
                <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                  Through my lens, I captured the essence of this ancient city—its timeless architecture, 
                  vibrant street life, and the daily rituals that make Fes a living, breathing testament 
                  to Moroccan culture and history.
                </p>
              </div>
        </div>

        {/* videos - side by side */}
        <div className="w-full mb-16 overflow-x-auto overflow-y-visible pb-4 scrollbar-hide scroll-smooth">
          <div className="flex gap-4 px-3 md:px-6 lg:px-12 min-w-max">
            {videos.map((video, index) => (
              <div 
                key={index} 
                className="relative flex-shrink-0 w-[300px] md:w-[400px] lg:w-[500px] aspect-[4/3] overflow-hidden rounded-lg"
              >
                <video
                  src={video}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            ))}
          </div>
        </div>

        <GridFES />

    </main>
  )
}