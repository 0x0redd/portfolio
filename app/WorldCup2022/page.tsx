import React from 'react'
import { NavbarDemo } from '@/components/navbar'
import GridWC from '../components/gridWC'

export default function WorldCup2022() {
  return (
    <main className="min-h-screen bg-[#141414]">
        <NavbarDemo />

        <div className="text-start space-y-8 mb-16 container mx-auto px-6 md:px-12 lg:px-24 pt-20 relative z-10">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 text-center">
                World Cup 2022
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                  A candid street photography series capturing the raw emotions and celebrations 
                  of football fans during the 2022 World Cup. These intimate moments document 
                  the passion, joy, and unity that football brings to communities around the world.
                </p>
                <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                  Through candid street style photography, I captured the spontaneous celebrations 
                  and achievements of football teams, revealing the human stories behind the beautiful game.
                </p>
              </div>
        </div>

        <GridWC />

    </main>
  )
}