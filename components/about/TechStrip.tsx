"use client";

import Image from "next/image";
import {
  siPython,
  siPytorch,
  siTensorflow,
  siKeras,
  siOpencv,
  siScikitlearn,
  siPostgresql,
  siGit,
  siDocker,
  siRaspberrypi,
  siHuggingface,
} from "simple-icons";
import { cn } from "@/lib/utils";
import { GlassContainer } from "@/components/ui/glass-container";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TECH = [
  { icon: siPython, label: "Python" },
  { icon: siPytorch, label: "PyTorch" },
  { icon: siTensorflow, label: "TensorFlow" },
  { icon: siScikitlearn, label: "Scikit-learn" },
  { icon: siKeras, label: "Keras" },
  { icon: siOpencv, label: "OpenCV" },
  { icon: siPostgresql, label: "PostgreSQL" },
  { icon: siGit, label: "Git" },
  { icon: siDocker, label: "Docker" },
  { icon: siRaspberrypi, label: "Raspberry Pi" },
  { icon: siHuggingface, label: "Hugging Face" },
];

export function TechStrip({ className }: { className?: string }) {
  return (
    <div className={cn("flex w-full justify-center", className)}>
      <TooltipProvider delayDuration={120}>
        <GlassContainer
          blur={28}
          opacity={0.5}
          distortion="subtle"
          tint="cool"
          hover={false}
          border
          highlightOpacity={0.55}
          innerGlowOpacity={0.4}
          specularIntensity={0.5}
          className="max-w-full rounded-full p-0 shadow-ios"
        >
          <div className="flex max-w-full items-center gap-2 overflow-x-auto px-3 py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-2.5 md:px-4 md:py-3 [&::-webkit-scrollbar]:hidden">
        {TECH.map(({ icon, label }) => (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label={label}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-white/60 backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white dark:bg-[#2C2C2E]/90 dark:ring-white/10 dark:hover:bg-[#3A3A3C] md:h-[52px] md:w-[52px] md:rounded-2xl"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="h-[22px] w-[22px] md:h-6 md:w-6"
                      aria-hidden
            >
              <path d={icon.path} fill={`#${icon.hex}`} />
            </svg>
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="rounded-full border-white/40 bg-white/90 px-3 py-1.5 text-xs font-semibold text-ios-label shadow-ios backdrop-blur-md dark:border-white/15 dark:bg-[#2C2C2E]/95 dark:text-white"
                >
                  {label}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </GlassContainer>
      </TooltipProvider>
    </div>
  );
}

export function StillLifeImage({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-visible", className)}>
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        priority={priority}
        loading={priority ? "eager" : undefined}
        className="h-auto w-full object-contain drop-shadow-xl"
      />
    </div>
  );
}
