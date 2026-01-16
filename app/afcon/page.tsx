import React from 'react'
import { NavbarDemo } from '@/components/navbar'
import GridAfcon from '../components/gridAfcon'

export default function Afcon() {
  return (
    <main className="min-h-screen bg-[#141414]">
        <NavbarDemo />

        <div className="text-start space-y-8 mb-16 container mx-auto px-6 md:px-12 lg:px-24 pt-20 relative z-10">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 text-center">
                AFCON 25
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                  Celebrating the achievements of the Moroccan team during the African Cup of Nations.
                </p>
                <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                  Documenting the joy, passion, and unity of Moroccan fans as they celebrate their team&apos;s success 
                  in the streets, capturing the raw emotions and collective spirit of a nation united in celebration.
                </p>
              </div>
        </div>

        <GridAfcon />

    </main>
  )
}
