"use client";

import { useState } from "react";
import { Camera, Send } from "lucide-react";
import { ContactModal } from "@/app/components/contactModal";
import { person } from "@/lib/about-content";
import { IosCard } from "@/components/about/AboutShell";

export function AboutCta() {
  const [draft, setDraft] = useState("");

  return (
    <section className="mt-10 space-y-4 md:mt-14">
      <div className="flex flex-col gap-3">
        <div className="max-w-[min(100%,28rem)] self-start rounded-3xl rounded-bl-md bg-[#E5E5EA] px-5 py-4 text-ios-label shadow-ios">
          <p className="text-sm font-medium leading-relaxed md:text-base">
            I&apos;m looking for my next AI &amp; Data Science internship —
            Master&apos;s track, ready to build and ship.
          </p>
        </div>
        <div className="max-w-xs self-end rounded-3xl rounded-br-md bg-ios-blue px-5 py-4 text-white shadow-ios">
          <p className="text-sm font-medium leading-relaxed md:text-base">
            Let&apos;s build something together.
          </p>
        </div>
      </div>

      <IosCard className="!p-3 md:!p-4">
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const subject = encodeURIComponent("AI / Data Science opportunity");
            const body = encodeURIComponent(
              draft ||
                `Hi Othmane,\n\nI'd like to talk about an AI / Data Science opportunity.\n`
            );
            window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`;
          }}
        >
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ios-fill text-ios-secondary"
            aria-label="Attach"
          >
            <Camera className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Say hello…"
            className="h-11 flex-1 rounded-full border border-ios-tertiary/60 bg-[#FAFAFA] px-4 text-sm text-ios-label outline-none ring-ios-blue placeholder:text-ios-secondary focus:ring-2"
          />
          <button
            type="submit"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ios-blue text-white shadow-ios transition hover:brightness-110"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1">
          <a
            href={`mailto:${person.email}`}
            className="text-sm font-medium text-ios-blue"
          >
            {person.email}
          </a>
          <ContactModal>
            <button
              type="button"
              className="text-sm font-semibold text-ios-label underline-offset-4 hover:underline"
            >
              Open contact options
            </button>
          </ContactModal>
        </div>
      </IosCard>
    </section>
  );
}
