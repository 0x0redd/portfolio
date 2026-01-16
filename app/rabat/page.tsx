import React from 'react'
import { NavbarDemo } from '@/components/navbar'
import GridRabat from '../components/gridRabat'

export default function Rabat() {
  return (
    <main className="min-h-screen bg-[#141414]">
        <NavbarDemo />

        <div className="text-start space-y-8 mb-16 container mx-auto px-6 md:px-12 lg:px-24 pt-20 relative z-10">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 text-center">
                Rabat
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                  Capturing the essence of Rabat through street and documentary photography.
                </p>
                <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                  A visual exploration of Morocco&apos;s capital city, documenting its unique blend of 
                  historical heritage and modern urban life through intimate street scenes and architectural details.
                </p>
              </div>
        </div>

        <GridRabat />

    </main>
  )
}
