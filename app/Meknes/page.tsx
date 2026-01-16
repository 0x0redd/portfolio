import React from 'react'
import { NavbarDemo } from '@/components/navbar'
import GridMeknes from '../components/gridMeknes'

export default function Meknes() {
  return (
    <main className="min-h-screen bg-[#141414]">
        <NavbarDemo />

        <div className="text-start space-y-8 mb-16 container mx-auto px-6 md:px-12 lg:px-24 pt-20 relative z-10">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 text-center">
                Meknes
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                  Exploring the urban landscape and human stories of Meknes through documentary photography.
                </p>
                <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                  A visual journey through the streets, architecture, and daily life of this historic Moroccan city, 
                  capturing the essence of its culture and people.
                </p>
              </div>
        </div>

        <GridMeknes />

    </main>
  )
}
