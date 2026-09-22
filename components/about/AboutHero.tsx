"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Lock, Phone, PhoneOff, Star, User, X } from "lucide-react";
import { CvModal } from "@/components/about/CvModal";
import { person } from "@/lib/about-content";
import { TechStrip } from "@/components/about/TechStrip";
import { cn } from "@/lib/utils";

const HERO_SKILLS = [
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "Data Science",
  "LLMs & VLMs",
  "Generative AI / RAG",
  "End-to-End AI Systems",
];

export function AboutHero() {
  const [skillsOpen, setSkillsOpen] = useState(false);

  return (
    <section className="relative overflow-hidden pb-10 pt-10 md:pb-12 md:pt-28">
      {/* Studio backdrop — light gray wash fading into the page background */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#9CA1A6] via-[#C3C7CA] to-ios-bg transition-colors duration-300 dark:from-[#0A0A0C] dark:via-[#121214] dark:to-ios-bg"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.45),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_50%_-10%,rgba(10,132,255,0.22),transparent_60%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <header className="text-center">
          <p className="text-[11px] font-light uppercase tracking-[0.22em] text-white drop-shadow-sm sm:text-base md:text-2xl lg:text-[28px]">
            Artificial Intelligence
          </p>
          <p className="mt-1 text-lg font-light text-white drop-shadow-sm md:text-2xl">
            &amp;
          </p>
          <h1 className="mt-0.5 text-[2.6rem] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.18)] sm:text-6xl md:text-[clamp(3.5rem,9vw,7rem)]">
            Data Scientist
          </h1>
        </header>

        {/* Stage: portrait with floating iOS widgets. Stacked on mobile,
            absolutely composed from md up to match the layout of the design. */}
        <div className="relative mx-auto mt-4 flex max-w-4xl flex-col items-center gap-4 md:mt-2 md:block md:min-h-[clamp(320px,52vh,600px)] md:gap-0">
          {/* Portrait */}
          <div className="relative order-1 aspect-[4/3] w-full max-w-2xl md:absolute md:inset-0 md:order-none md:aspect-auto md:h-full md:w-full md:max-w-none">
            <Image
              src="/about/hero-desk.png"
              alt={`${person.name} — AI & Data Science`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-contain object-bottom"
            />
          </div>

          {/* Intro card */}
          <div className="order-2 z-30 w-full max-w-sm rounded-2xl bg-white/90 p-4 shadow-ios backdrop-blur-xl dark:bg-[#1C1C1E]/90 md:absolute md:left-0 md:top-[8%] md:order-none md:w-[250px] lg:w-[278px]">
            <h2 className="text-center text-[15px] font-bold tracking-tight text-ios-label md:text-base">
              AI Builder, Researcher, Creator
            </h2>
            <p className="mt-2 text-justify text-[11px] leading-[1.55] text-ios-label/90 md:text-[11.5px]">
              I&apos;m an AI &amp; Data Science student who loves turning ideas
              into working systems. From computer vision and intelligent models
              to robotics and creative tech, I build, experiment, and learn by
              making things that actually work.
            </p>
            <CvModal>
              <button
                type="button"
                className="mt-3 w-full text-center text-sm font-medium text-ios-blue transition hover:opacity-70"
              >
                Check my CV
              </button>
            </CvModal>
          </div>

          {/* Incoming-call widget */}
          <div className="order-4 z-30 flex w-full max-w-sm items-center gap-3 rounded-[26px] bg-[#1C1C1E]/90 px-3 py-2.5 shadow-ios-lg backdrop-blur-xl md:absolute md:left-0 md:top-[52%] md:w-[292px] lg:left-[2%]">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
              <User className="h-5 w-5 text-white/80" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {person.name}
              </p>
              <p className="select-none truncate text-xs text-white/70 blur-[2.5px]">
                {person.phone}
              </p>
            </div>
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF453A]"
              aria-hidden
            >
              <PhoneOff className="h-[18px] w-[18px] text-white" />
            </span>
            <a
              // href={`tel:${person.phone.replace(/\s/g, "")}`}
              aria-label={`Call ${person.name}`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#30D158] transition hover:brightness-110"
            >
              <Phone className="h-[18px] w-[18px] fill-white text-white" />
            </a>
          </div>

          {/* Skills panel — collapsed by default on phone; tap "skills" to toggle */}
          <div className="order-3 z-30 w-full max-w-sm md:absolute md:right-0 md:top-[14%] md:w-[224px] lg:w-[248px]">
            <button
              type="button"
              onClick={() => setSkillsOpen((open) => !open)}
              aria-expanded={skillsOpen}
              aria-controls="hero-skills-panel"
              className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#1C1C1E]/90 px-4 py-1.5 text-sm text-white shadow-ios backdrop-blur-xl transition hover:bg-[#1C1C1E] md:pointer-events-none md:-ml-12 lg:-ml-16"
            >
              skills
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200 md:hidden",
                  skillsOpen && "rotate-180"
                )}
                aria-hidden
              />
            </button>
            <div
              id="hero-skills-panel"
              className={cn(
                "overflow-hidden rounded-xl bg-[#3A3A3C]/90 shadow-ios-lg backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-out",
                skillsOpen
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0 md:max-h-[500px] md:opacity-100"
              )}
            >
              <ul className="divide-y divide-white/10">
                {HERO_SKILLS.map((skill, i) => (
                  <li
                    key={skill}
                    className="flex items-center justify-between gap-2 px-3 py-2"
                  >
                    <span className="text-[11px] leading-tight text-white/90 md:text-[11.5px]">
                      {skill}
                    </span>
                    <Star
                      className={
                        i === HERO_SKILLS.length - 1
                          ? "h-3.5 w-3.5 shrink-0 fill-[#FFD60A] text-[#FFD60A]"
                          : "h-3.5 w-3.5 shrink-0 fill-white/75 text-white/75"
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Safari address bar — desktop only */}
          <div className="order-5 z-30 hidden w-full max-w-xs items-center gap-2 rounded-xl bg-white/90 px-3 py-2 shadow-ios backdrop-blur-xl dark:bg-[#1C1C1E]/90 md:absolute md:bottom-[7%] md:left-1/2 md:flex md:w-[292px] md:-translate-x-1/2">
            <span className="text-[11px] font-medium text-ios-secondary">
              aA
            </span>
            <span className="flex flex-1 items-center justify-center gap-1.5">
              <Lock className="h-3 w-3 text-ios-secondary" />
              <span className="text-[13px] text-ios-label">0x0red.me</span>
            </span>
            <X className="h-3.5 w-3.5 text-ios-secondary" />
          </div>
        </div>

        <TechStrip className="relative z-30 mt-8 md:mt-6" />
      </div>
    </section>
  );
}
