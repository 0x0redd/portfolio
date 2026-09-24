"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, ArrowUpRight, Camera, ChevronDown } from "lucide-react";
import { ContactModal } from "@/app/components/contactModal";
import { about, person, social } from "@/lib/about-content";
import { IosCard, IosSectionTitle } from "@/components/about/AboutShell";
import { StillLifeImage } from "@/components/about/TechStrip";
import FolderFloat from "@/components/about/FolderFloat";
import { cn } from "@/lib/utils";

const EXPERTISE = [
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "Natural Language Processing",
  "Data Analytics",
  "Big Data Technologies",
  "Time-Series Forecasting",
  "LLMs, VLMs & Generative AI",
  "RAG & AI Applications",
];

const PERSONAL_PICKS = [
  {
    src: "/rabat/IMG_4941.jpg",
    alt: "Rainy night street, Hotel Malta neon, Rabat",
  },
  {
    src: "/meknes/IMG_9981.jpg",
    alt: "Street scene with Meknes bus, black and white",
  },
  {
    src: "/Fes/IMG_9606.jpg",
    alt: "Moroccan football jerseys in a Fes medina alley",
  },
  {
    src: "/Pined/DSC_2652.jpg",
    alt: "Person walking under stadium lights, black and white",
  },
  {
    src: "/Pined/IMG_20211130_170752%20(2).jpg",
    alt: "Coastal sunset through foliage",
  },
];

export function AboutSidebar() {
  const [picksOpen, setPicksOpen] = useState(false);

  return (
      <aside className="flex w-full max-w-full flex-col gap-6 overflow-visible">
      <StillLifeImage
        src="/about/still-typewriter.png"
        alt="Creative tools — typewriter, tablet, coffee"
        className="hidden lg:block"
        priority
      />

      <IosCard className="relative overflow-x-clip overflow-visible">
        <IosSectionTitle>Core Expertise</IosSectionTitle>
        <div className="relative flex justify-center  overflow-visible py-6">
          <FolderFloat
            items={EXPERTISE}
            label="Core Expertise"
            sublabel={`${EXPERTISE.length} skills`}
            trigger="click"
            closeOnSelect={false}
            physics
            drift={0.001}
            folderColor="#007AFF"
            frontColor="#0A84FF"
            paperColor="#F2F2F7"
            itemColor="#FFFFFF"
            itemTextColor="#1C1C1E"
            labelColor="#FFFFFF"
            width={180}
            height={140}
            radius={14}
            spread={140}
            lift={24}
            tilt={8}
            flapAngle={34}
            restAngle={16}
            openDuration={520}
            stagger={45}
            bounce={0.3}
            className="max-w-full"
          />
        </div>
        <p className="text-center text-[11px] text-ios-secondary">
          Tap the folder to explore skills
        </p>
      </IosCard>

      {/* Stats rings inspired by the design */}
      <IosCard>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "ML / AI", value: 92 },
            { label: "Vision", value: 80 },
            { label: "Design", value: 80 },
            { label: "Research", value: 70 },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <div
                className="relative flex h-16 w-16 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(var(--ios-blue) ${stat.value}%, var(--ios-fill) 0)`,
                }}
              >
                <div className="absolute inset-1.5 flex items-center justify-center rounded-full bg-white text-sm font-semibold text-[#1C1C1E]">
                  {stat.value}%
                </div>
              </div>
              <span className="text-xs text-ios-secondary">{stat.label}</span>
            </div>
          ))}
        </div>
      </IosCard>

      {/* <IosCard className="overflow-hidden !p-0">
        <div className="relative h-36 w-full bg-ios-fill">
          <Image
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
            alt="Map context — Meknès, Morocco"
            fill
            className="object-cover opacity-90"
            sizes="400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-sm font-medium shadow-ios">
            <MapPin className="h-4 w-4 text-ios-blue" />
            Where I&apos;m Based
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-ios-secondary">{person.location}</p>
          <p className="mt-1 text-sm font-medium text-ios-label">
            {person.availability}
          </p>
        </div>
      </IosCard> */}

      <IosCard>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ios-secondary">
          My work online
        </p>
        <ul className="mt-3 space-y-2">
          {social.map((s) => (
            <li key={s.name}>
              <a
                href={s.link}
                target={s.link.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl bg-ios-fill px-3 py-2.5 text-sm font-medium text-ios-label transition hover:bg-ios-blue hover:text-white"
              >
                <span>{s.name}</span>
                <ArrowUpRight className="h-4 w-4 opacity-60" />
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${person.email}`}
          className="mt-4 flex items-center gap-2 text-sm font-medium text-ios-blue"
        >
          <Mail className="h-4 w-4" />
          {person.email}
        </a>
      </IosCard>

      {/* <StillLifeImage
        src="/about/portrait-armchair.png"
        alt={`${person.name} portrait`}
      /> */}

      <div className="flex flex-col gap-2">
        <ContactModal>
          <button
            type="button"
            className="w-full rounded-2xl bg-white px-4 py-3.5 text-center text-base font-semibold text-ios-blue shadow-ios transition hover:bg-ios-blue hover:text-white dark:bg-ios-fill dark:hover:bg-ios-blue"
          >
            Hire Me
          </button>
        </ContactModal>
        <ContactModal>
          <button
            type="button"
            className="w-full rounded-2xl bg-white px-4 py-3.5 text-center text-base font-semibold text-ios-label shadow-ios transition hover:bg-ios-fill dark:bg-ios-fill dark:hover:bg-[#3A3A3C]"
          >
            Bring Me on Board
          </button>
        </ContactModal>
        <ContactModal>
          <button
            type="button"
            className="w-full rounded-2xl bg-white px-4 py-3.5 text-center text-base font-semibold text-ios-label shadow-ios transition hover:bg-ios-fill dark:bg-ios-fill dark:hover:bg-[#3A3A3C]"
          >
            Start a Project
          </button>
        </ContactModal>
      </div>

      {about.design.display && (
        <IosCard>
          <IosSectionTitle>{about.design.title}</IosSectionTitle>
          <p className="text-sm leading-relaxed text-ios-secondary">
            {about.design.description}
          </p>
          <ul className="mt-3 space-y-2">
            {about.design.highlights.slice(0, 3).map((h) => (
              <li key={h} className="text-sm text-ios-label">
                · {h}
              </li>
            ))}
          </ul>
          <Link
            href="/"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-ios-blue px-4 py-3 text-sm font-semibold text-white shadow-ios transition hover:brightness-110"
          >
            <Camera className="h-4 w-4" />
            View photography portfolio
            <ArrowUpRight className="h-4 w-4 opacity-80" />
          </Link>
        </IosCard>
      )}

      <IosCard className="overflow-hidden !p-0">
        <button
          type="button"
          onClick={() => setPicksOpen((v) => !v)}
          aria-expanded={picksOpen}
          className="flex w-full cursor-pointer items-center gap-3 px-5 py-5 text-left transition hover:bg-black/[0.02] dark:hover:bg-white/[0.03] md:px-6"
        >
          <div className="min-w-0 flex-1">
            <IosSectionTitle>Personal pick</IosSectionTitle>
            <p className="mt-1 text-sm text-ios-secondary">
              A few frames I keep coming back to.
            </p>
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 shrink-0 text-ios-blue transition-transform duration-300",
              picksOpen && "rotate-180"
            )}
            aria-hidden
          />
        </button>

        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-out",
            picksOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-3 px-3 pb-3 md:px-4 md:pb-4">
              {PERSONAL_PICKS.map((photo) => (
                <div
                  key={photo.src}
                  className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-ios-fill"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 320px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </IosCard>
    </aside>
  );
}
