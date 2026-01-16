'use client';

import { Camera } from 'lucide-react';
import { NavbarDemo } from '@/components/navbar';
import { motion } from 'framer-motion';
import Image from 'next/image';
import VideoPlayer from './components/video';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { InfiniteSlider } from '@/components/core/infinite-slider';
import { ViewCount } from './components/viewTracker';

// Lazy load components that are below the fold
const GridPinned = dynamic(() => import('./components/gridPinned'), {
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
    </div>
  ),
  ssr: false,
});

const MarqueeDemo = dynamic(() => import('./components/comments').then(mod => ({ default: mod.MarqueeDemo })), {
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
    </div>
  ),
  ssr: false,
});

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

function InfiniteSliderBasic() {
  return (
    <InfiniteSlider gap={24} reverse>
      <img
        src='/Canon_wordmark.svg'
        alt='Canon logo'
        className='h-[120px] w-[120px]'
      />
      <img
        src='/Nikon_Logo.svg'
        alt='Nikon logo'
        className='h-[120px] w-auto'
      />
      <img
        src='/Artboard 1.png'
        alt='csc logo'
        className='h-[120px] w-auto'
      />
      <img
        src='/2Artboard 1.svg'
        alt='csc logo'
        className='h-[120px] w-auto'
      />
    </InfiniteSlider>
  );
}

// LazySection component that only loads content when it enters viewport
function LazySection({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;

    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsVisible(true);
            setHasLoaded(true);
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before section enters viewport
        threshold: 0.1,
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasLoaded]);

  return (
    <div ref={ref} className="min-h-[200px]">
      {isVisible ? children : (
        <div className="flex items-center justify-center py-12">
          <div className="animate-pulse text-gray-500">Loading...</div>
        </div>
      )}
    </div>
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

      <div className="container mx-auto px-3 md:px-6 lg:px-12 pt-10 relative z-10">

        {/* Projects Section - Loads after hero */}
        <LazySection>
          <section id="projects" className=" my-16 relative overflow-hidden">
            <h2 className="text-8xl md:text-8xl lg:text-7xl text-center mx-auto mb-20 mt-10 font-bold text-white  text-start">Projects</h2>
            {/* Project Navigation */}
            <div  className="flex sm:flex-row flex-col justify-center items-center sm:mx-auto gap-4 mt-8 ">
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
                description="Capturing the essence of Rabat through street and documentary photography."
              />
              <ProjectCard
                title="Wedding"
                href="/Wedding"
                image="/candid/IMG_9219.jpg"
                description="Candid wedding photography preserving authentic moments and emotions of your special day."
              />
            </div>
          </section>
        </LazySection>

        {/* Current Project Section */}
        <LazySection>
          <section className="mt-20 w-full">
            <Link href="/afcon">
              <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg group cursor-pointer">
                <Image 
                  src="/Afcon/IMG_1682.jpg" 
                  alt="Current Project : AFCON 25" 
                  width={2000} 
                  height={1200} 
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-sm" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white text-center px-4 drop-shadow-lg">
                    Current Project : AFCON 25
                  </h3>
                </div>
              </div>
            </Link>
          </section>
        </LazySection>

        {/* Reviews Section - Loads after projects */}
        <LazySection>
          <section className="mt-16 w-full">
            <div className="mt-16 w-full">
              <MarqueeDemo />
            </div>
          </section>
        </LazySection>

        {/* Pinned Works Section - Loads last */}
        <LazySection>
          <section className="mt-16 w-full">
            <div className="mt-16 w-full">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-start">Pinned works and visuals</h1>
              <GridPinned />
            </div>
          </section>
        </LazySection>

        

        <footer className="py-12 border-t border-[#193977]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
            <div className="flex flex-col gap-2">
              <p>© 2025 Othmane Ferrah. All rights reserved.</p>
              <ViewCount />
            </div>
            <div className="flex gap-8 items-center">
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
