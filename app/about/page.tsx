'use client';

import React from 'react';
import { NavbarDemo } from '@/components/navbar';
import { AvatarLabelGroup } from '@/components/ui/avatar-label-group';
import Image from 'next/image';

export default function About() {
  return (
    <main className="min-h-screen bg-[#141414]">
      <NavbarDemo />

      <div className="container mx-auto px-6 md:px-12 lg:px-24 pt-20 pb-20">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
            <div className="flex-shrink-0">
              <AvatarLabelGroup
                size="2xl"
                src="/Pined/IMG_9846-Pano.jpg"
                alt="Othmane Ferrah"
                title="Othmane Ferrah"
                subtitle="Street & Documentary Photographer"
                verified={true}
              />
            </div>
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6">
                About Me
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                I&apos;m a street and documentary photographer based in Morocco, 
                dedicated to capturing unscripted moments and real human stories. 
                My work explores the intersection of culture, emotion, and everyday life.
              </p>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                Through my lens, I document the authentic moments that define our shared 
                human experience—from celebrations to quiet reflections, from ancient 
                traditions to modern expressions.
              </p>
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section className="mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
            My Approach
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-light text-white mb-4">Documentary Storytelling</h3>
              <p className="text-gray-300 leading-relaxed">
                I believe in the power of authentic storytelling. Each project is an exploration 
                of place, people, and culture—captured with respect and genuine curiosity.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-light text-white mb-4">Street Photography</h3>
              <p className="text-gray-300 leading-relaxed">
                The streets are my canvas. I capture the spontaneous moments, emotions, and 
                interactions that happen in the everyday spaces we share.
              </p>
            </div>
          </div>
        </section>

        {/* Location & Availability */}
        <section className="mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
            Location & Availability
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            Based in Morocco — available for assignments worldwide.
          </p>
          <p className="text-base text-gray-400 leading-relaxed">
            I work with brands, publications, and organizations that value authentic 
            storytelling and cultural documentation. Whether it&apos;s editorial work, 
            commercial projects, or personal documentary series, I bring a unique 
            perspective to every assignment.
          </p>
        </section>
      </div>
    </main>
  );
}
