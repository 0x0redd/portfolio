"use client";

import LogoLoop, { type LogoItem } from "./LogoLoop/LogoLoop";
import { cn } from "@/lib/utils";
import { TextRoll } from "./text-roll";

interface AnimatedCarouselProps {
  title?: string;
  logos?: LogoItem[];
  containerClassName?: string;
  titleClassName?: string;
  padding?: string;
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  fadeOutColor?: string;
  ariaLabel?: string;
}

const defaultLogos: LogoItem[] = [
  { src: "/Canon_wordmark.svg", alt: "Canon", href: "https://www.canon.com" },
  { src: "/NIKON.png", alt: "Nikon", href: "https://www.nikon.com" },
  { src: "/CSC BYED.png", alt: "CSC" , href: "https://www.csc-fsm.me" },
  { src: "/2Artboard 1.svg", alt: "Partner" },
  { src: "/newLogo.bdbf733c.png", alt: "Partner" },
  { src: "/SIHATI.png", alt: "CRT" , href: "https://www.sihati.cc" }, 
  { src: "/nebrasai.png", alt: "NebrasAI" , href: "https://www.nebrasai.com" },
  { src: "Unsplash_Logo_Full_Stacked.png", alt: "Unsplash" , href: "https://unsplash.com" },
];

export function AnimatedCarousel({
  title = "Trusted by brands worldwide",
  logos = defaultLogos,
  containerClassName = "",
  titleClassName = "",
  padding = "py-5 lg:py-16",
  speed = 50,
  direction = "left",
  logoHeight = 60,
  gap = 60,
  hoverSpeed = 0,
  fadeOutColor = "#111111",
  ariaLabel = "Trusted brands",
}: AnimatedCarouselProps) {
  return (
    <div className={cn("w-4/5 mx-auto", padding, containerClassName)}>
      <div className="container mx-auto px-3 md:px-6 lg:px-12">
        <div className="flex flex-col gap-10">
          <h2
            className={cn(
              "text-6xl md:text-8xl lg:text-7xl text-center mx-auto mb-10 mt-10 font-medium text-white text-start",
              titleClassName
            )}
          >
            <TextRoll>{title}</TextRoll>
          </h2>

          <div
            className="relative overflow-hidden"
            style={{ height: `${logoHeight + 20}px` }}
          >
            <LogoLoop
              logos={logos}
              speed={speed}
              direction={direction}
              logoHeight={logoHeight}
              gap={gap}
              hoverSpeed={hoverSpeed}
              scaleOnHover
              fadeOut
              fadeOutColor={fadeOutColor}
              ariaLabel={ariaLabel}
              className="[&_img]:max-w-[150px] [&_img]:brightness-0 [&_img]:invert [&_img]:opacity-80 hover:[&_img]:opacity-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
