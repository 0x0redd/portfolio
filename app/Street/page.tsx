import React from 'react'
import { NavbarDemo } from '@/components/navbar'
import GridStreet from '../components/gridStreet'

export default function Street() {
  return (
    <main className="min-h-screen bg-[#141414]">
        <NavbarDemo />

        <div className="text-start space-y-8 mb-16 container mx-auto px-6 md:px-12 lg:px-24 pt-20 relative z-10">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 text-center">
                Street
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                  Street photography capturing real moments, emotions, and human stories.
                </p>
                <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                  Through candid observation, I document the authentic moments that unfold in everyday life, 
                  revealing the beauty and complexity of human experience in urban environments.
                </p>
              </div>
        </div>

        <GridStreet />

    </main>
  )
}
