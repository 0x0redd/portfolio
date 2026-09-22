"use client";

import { NavbarDemo } from "@/components/navbar";
import { AboutShell } from "@/components/about/AboutShell";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutSidebar } from "@/components/about/AboutSidebar";
import { CareerJourney } from "@/components/about/CareerJourney";
import { AboutLeadership } from "@/components/about/AboutLeadership";
import { AboutProjects } from "@/components/about/AboutProjects";
import { AboutCta } from "@/components/about/AboutCta";

export default function About() {
  return (
    <AboutShell>
      <NavbarDemo />

      <AboutHero />

      <div className="mx-auto max-w-6xl px-4 pb-28 pt-12 md:px-8 md:pb-20 md:pt-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="order-2 lg:order-1 lg:col-span-4 lg:sticky lg:top-10 lg:self-start">
            <AboutSidebar />
          </div>

          <div className="order-1 flex flex-col gap-10 lg:order-2 lg:col-span-8">
            <CareerJourney />
            <AboutLeadership />
            <AboutProjects />
            <AboutCta />
          </div>
        </div>
      </div>
    </AboutShell>
  );
}
