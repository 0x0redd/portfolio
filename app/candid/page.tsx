import React from 'react'
import { NavbarDemo } from '@/components/navbar'


export default function Candid() {
  return (
    <main className="min-h-screen bg-[#141414]">
        <NavbarDemo />

        <div className="text-start space-y-8 mb-16 container mx-auto px-6 md:px-12 lg:px-24 pt-20 relative z-10">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 text-center">
                Candid — Weddings & Events
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                  Unposed, documentary-style coverage that preserves the real energy of your day—glances, laughter, movement, and emotion.
                </p>
                <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                  I focus on honest storytelling: candid wedding moments, event highlights, and natural portraits that feel true to you—clean, timeless, and never over-directed.
                </p>
              </div>
        </div>

        

    </main>
  )
}
