"use client";

import React, { useId, memo } from "react";
import { cn } from "@/lib/utils";

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "prominent" | "regular" | "thin";
  blur?: number;
  opacity?: number;
  distortion?: "none" | "subtle" | "medium" | "strong";
  tint?: "neutral" | "warm" | "cool" | "vibrant";
  border?: boolean;
  hover?: boolean;
  glassOverlay?: boolean;
  highlightColor?: string;
  highlightOpacity?: number;
  innerGlowColor?: string;
  innerGlowOpacity?: number;
  specularIntensity?: number;
}

export const GlassContainer: React.FC<
  GlassContainerProps & React.HTMLAttributes<HTMLDivElement>
> = memo(
  ({
    children,
    className = "",
    variant = "default",
    blur,
    opacity,
    distortion = "subtle",
    tint = "cool",
    border = true,
    hover = false,
    glassOverlay = true,
    highlightColor = "rgba(255, 255, 255, 0.55)",
    highlightOpacity = 1,
    innerGlowColor = "rgba(255, 255, 255, 0.35)",
    innerGlowOpacity = 1,
    specularIntensity = 0.45,
    ...props
  }) => {
    const variantConfig = {
      default: { blur: 20, opacity: 0.45 },
      prominent: { blur: 30, opacity: 0.55 },
      regular: { blur: 15, opacity: 0.35 },
      thin: { blur: 10, opacity: 0.25 },
    };

    const config = variantConfig[variant];
    const finalBlur = blur !== undefined ? blur : config.blur;
    const finalOpacity = opacity !== undefined ? opacity : config.opacity;
    const shouldDistort = distortion !== "none" && finalBlur > 0;

    const distortionConfig = {
      none: { scale: 0, frequency: 0 },
      subtle: { scale: 8, frequency: 0.05 },
      medium: { scale: 15, frequency: 0.07 },
      strong: { scale: 25, frequency: 0.09 },
    };

    const tintStyles = {
      neutral: "rgba(255, 255, 255, 0.55)",
      warm: "rgba(255, 248, 240, 0.55)",
      cool: "rgba(240, 248, 255, 0.55)",
      vibrant: "rgba(255, 255, 255, 0.65)",
    };

    const distortConfig = distortionConfig[distortion];
    const baseId = useId().replace(/:/g, "");
    const filterId = `glass-filter-${baseId}`;
    const specularStrong = `rgba(255, 255, 255, ${specularIntensity})`;
    const specularWeak = `rgba(255, 255, 255, ${specularIntensity * 0.25})`;

    return (
      <div
        className={cn(
          "relative isolate overflow-hidden bg-transparent shadow-lg transition-all duration-400",
          hover && "hover:scale-[1.02] hover:shadow-2xl",
          border && "border border-white/40 dark:border-white/15",
          className
        )}
        style={{
          transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
          ...props.style,
        }}
        {...props}
      >
        <div
          className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
          style={{
            backdropFilter: `blur(${finalBlur}px)`,
            WebkitBackdropFilter: `blur(${finalBlur}px)`,
            filter: shouldDistort ? `url(#${filterId})` : "none",
          }}
        />

        {glassOverlay && (
          <>
            <div
              className="absolute inset-0 z-10 dark:hidden"
              style={{
                background: tintStyles[tint],
                opacity: finalOpacity,
              }}
            />
            <div
              className="absolute inset-0 z-10 hidden dark:block"
              style={{
                background: "rgba(28, 28, 30, 0.72)",
                opacity: Math.min(finalOpacity + 0.2, 0.85),
              }}
            />
          </>
        )}

        <div
          className="absolute inset-0 z-[15] opacity-[0.03]"
          style={{
            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 z-[25]"
          style={{
            opacity: highlightOpacity,
            background: `
            linear-gradient(135deg,
              ${specularStrong} 0%,
              transparent 20%,
              transparent 80%,
              ${specularWeak} 100%
            )
          `,
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 z-30"
          style={{
            opacity: innerGlowOpacity,
            boxShadow: `
            inset 0 0 20px ${innerGlowColor},
            inset 0 1px 2px ${highlightColor}
          `,
          }}
        />

        <div className="relative z-40">{children}</div>

        {shouldDistort && (
          <svg
            aria-hidden
            className="absolute h-0 w-0"
            style={{ position: "absolute", width: 0, height: 0 }}
          >
            <defs>
              <filter
                id={filterId}
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency={`${distortConfig.frequency} ${distortConfig.frequency}`}
                  numOctaves="2"
                  seed="92"
                  result="noise"
                />
                <feGaussianBlur
                  in="noise"
                  stdDeviation="0.5"
                  result="blurred"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="blurred"
                  scale={distortConfig.scale}
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
          </svg>
        )}
      </div>
    );
  }
);

GlassContainer.displayName = "GlassContainer";
