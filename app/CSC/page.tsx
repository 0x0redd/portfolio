import React from "react";
import Link from "next/link";
import { ExternalLink, Instagram } from "lucide-react";
import { NavbarDemo } from "@/components/navbar";
import GridCSC from "../components/gridCSC";
import { InstaFeed } from "../components/insta-feed";

export default function CSC() {
  return (
    <main className="min-h-screen bg-[#141414]">
      <NavbarDemo />

      <div className="relative z-10 container mx-auto mb-16 space-y-8 px-6 pt-20 text-center md:px-12 lg:px-24">
        <h2 className="mb-6 text-4xl font-light text-white md:text-6xl lg:text-7xl">
          Computer Science Club
        </h2>

        <div className="mx-auto max-w-4xl space-y-6">
          <p className="text-lg leading-relaxed text-gray-300 md:text-xl">
            Event photography for the Computer Science Club at the University of
            Moulay Ismaïl — documenting workshops, hackathons, gaming expos, and
            the community behind CSC-FSM.
          </p>
          <p className="text-base leading-relaxed text-gray-400 md:text-lg">
            CSC-FSM builds, learns, and ships in AI. From hands-on technical
            workshops and competitive programming sessions to large-scale events
            like the Moroccan Gaming Expo, I capture the energy of students
            learning, collaborating, and pushing innovation forward at the Faculty
            of Sciences in Meknès.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="https://www.instagram.com/csc.fsm/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white transition-colors hover:border-white/30 hover:bg-white/10"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
              @csc.fsm
              <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
            </Link>
            <Link
              href="https://csc-fsm.me"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white transition-colors hover:border-white/30 hover:bg-white/10"
            >
              csc-fsm.me
              <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto mb-16 px-6 md:px-12 lg:px-24">
        <InstaFeed
          title="Latest from CSC"
          profileUrl="https://www.instagram.com/csc.fsm/"
          profileHandle="@csc.fsm"
        />
      </div>

      <GridCSC />
    </main>
  );
}
