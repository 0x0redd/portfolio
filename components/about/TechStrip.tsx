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
      <div className="flex max-w-full items-center gap-2 overflow-x-auto rounded-full bg-white px-3 py-2.5 shadow-ios [-ms-overflow-style:none] [scrollbar-width:none] md:gap-2.5 md:px-4 md:py-3 [&::-webkit-scrollbar]:hidden">
        {TECH.map(({ icon, label }) => (
          <div
            key={label}
            title={label}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04] transition-transform duration-200 hover:-translate-y-0.5 md:h-[52px] md:w-[52px] md:rounded-2xl"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="h-[22px] w-[22px] md:h-6 md:w-6"
              aria-label={label}
            >
              <title>{label}</title>
              <path d={icon.path} fill={`#${icon.hex}`} />
            </svg>
          </div>
        ))}
      </div>
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
