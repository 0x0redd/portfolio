'use client';

import { Camera } from 'lucide-react';
import { NavbarDemo } from '@/components/navbar';
import { motion } from 'framer-motion';
import Image from 'next/image';
import GridWC from './components/gridWC';
import VideoPlayer from './components/video';
import { useState } from 'react';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  href: string;
  image: string;
  description: string;
}

function ProjectCard({ title, href, image, description }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const imageVariants = {
    collapsed: { scale: 1, filter: 'blur(0px)' },
    expanded: { scale: 1.1, filter: 'blur(3px)' },
  };

  const contentVariants = {
    collapsed: { opacity: 0, y: 10 },
    expanded: { opacity: 1, y: 0 },
  };

  const transition = {
    type: 'spring' as const,
    stiffness: 26.7,
    damping: 4.1,
    mass: 0.2,
  };

  return (
    <Link
      href={href}
      className='relative h-[350px] w-[290px] overflow-hidden rounded-xl block group'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="h-full w-full"
        animate={isHovered ? 'expanded' : 'collapsed'}
        variants={imageVariants}
        transition={transition}
      >
        <Image
          src={image}
          alt={title}
          width={290}
          height={350}
          className='h-full w-full object-cover select-none'
        />
      </motion.div>
      <div className='absolute bottom-0 left-0 right-0 rounded-xl bg-gray-900/50 backdrop-blur-sm px-4 pt-2'>
        <div className='w-full pb-2 text-left text-[16px] font-bold text-white'>
          {title}
        </div>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className='flex flex-col pb-4 text-[13px] text-zinc-300'
          >
            <p className='line-clamp-3 mb-3'>
              {description}
            </p>
            <div className='w-full rounded-[4px] border border-zinc-700 bg-zinc-900 px-4 py-1 text-zinc-50 text-center transition-colors duration-300 hover:bg-zinc-800'>
              View Project
            </div>
          </motion.div>
        )}
      </div>
    </Link>
  );
}

export default function Home() {
  // Video files from /VIDEO folder
  const videos = [
    '/VIDEO/Sequence 01_17.webm',
    '/VIDEO/Sequence 01_14.webm',
    '/VIDEO/Sequence 01_12.webm',
    '/VIDEO/Sequence 01_10.webm',
    '/VIDEO/Sequence 01_11.webm',
    '/VIDEO/Untitled-1story_2.webm',
  ];

  

  return (
    <main className="min-h-screen bg-[#111111]">
      <NavbarDemo />
      
      {/* Full Screen Video Hero Section */}
      <section className="relative w-screen h-screen flex flex-col justify-center items-start overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <VideoPlayer
            videos={videos}
            className="w-full h-full object-cover"
            autoPlay={true}
            loop={false}
            muted={true}
            playsInline={true}
          />
        </div>
        
        {/* Overlay with 50% opacity */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        {/* Hero Content */}
        <div className="relative z-20 space-y-6 container mx-auto px-6 md:px-12 lg:px-24">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-white leading-none">
            Hello, I&apos;m<br />
            <span className="text-[#fff] ">Othmane Ferrah</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl leading-relaxed">
            Street & documentary photographer<br />
            Focused on motion, emotion, and real human stories
          </p>

          
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 pt-20 relative z-10">

        <section className=" my-16 relative overflow-hidden">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-start">Projects</h2>
          {/* Project Navigation */}
          <div className="flex flex-wrap gap-4 mt-8">
            <ProjectCard
              title="World Cup Celebrations 22"
              href="/WorldCup2022"
              image="/world cup 2022/DSC_3906.jpg"
              description="A candid street photography series capturing the raw emotions and celebrations of football fans during the 2022 World Cup."
            />
            <ProjectCard
              title="FES"
              href="/FES25"
              image="/Fes/IMG_9399.jpg"
              description="Documenting the streets and stories of Fes through documentary photography."
            />
            <ProjectCard
              title="Meknes"
              href="/Meknes"
              image="/meknes/IMG_20210410_193620 (2).jpg"
              description="Exploring the urban landscape and human stories of Meknes."
            />
            <ProjectCard
              title="Street"
              href="/Street"
              image="/Street/IMG_20220813_190956 (2).jpg"
              description="Street photography capturing real moments, emotions, and human stories."
            />
            <ProjectCard
              title="Rabat"
              href="/rabat"
              image="/rabat/IMG_4941.jpg"
              description="Street photography capturing real moments, emotions, and human stories."
            />
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <h1 className="text-gray-400 text-sm">Trusted by</h1>
          </div>


          {/* Ambient Blurred Spheres - Only for this section */}
          
          
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-start space-y-8 mb-16">
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

            {/* Preview Images Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="relative group cursor-pointer">
                <div className="relative overflow-hidden shadow-lg  transition-all duration-300">
                  <Image
                    src="/world cup 2022/DSC_3670.jpg"
                    alt="World Cup 2022 Preview 1"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              
              <div className="relative group cursor-pointer">
                <div className="relative overflow-hidden shadow-lg  transition-all duration-300">
                  <Image
                    src="/world cup 2022/DSC_3679.jpg"
                    alt="World Cup 2022 Preview 2"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              
              <div className="relative group cursor-pointer">
                <div className="relative overflow-hidden shadow-lg  transition-all duration-300">
                  <Image
                    src="/world cup 2022/DSC_3680.jpg"
                    alt="World Cup 2022 Preview 3"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <motion.a
                href="/WorldCup2022"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                
              >
                <span>View Full Gallery</span>
              </motion.a>
            </div>
          </div>
        </section>

        

        <footer className="py-12 border-t border-[#193977]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
            <p>© 2025 Your Name. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-[#e5fdfd] transition-colors">Instagram</a>
              <a href="#" className="hover:text-[#e5fdfd] transition-colors">Behance</a>
              <a href="#" className="hover:text-[#e5fdfd] transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
