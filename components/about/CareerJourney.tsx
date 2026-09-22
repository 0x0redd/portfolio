"use client";

import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { about } from "@/lib/about-content";
import { IosCard, IosSectionTitle } from "@/components/about/AboutShell";

/**
 * The CV bolds the label that opens an achievement ("Data Extraction: …").
 * Only treat a short leading fragment as a label so ordinary sentences that
 * happen to contain a colon are left alone.
 */
function Achievement({ text }: { text: string }) {
  const split = text.indexOf(": ");
  const label = split > 0 && split <= 24 ? text.slice(0, split + 1) : null;

  return (
    <p className="text-sm leading-relaxed text-ios-secondary">
      {label && (
        <span className="font-semibold text-ios-label">{label} </span>
      )}
      {label ? text.slice(split + 2) : text}
    </p>
  );
}

export function CareerJourney() {
  return (
    <section>
      <IosSectionTitle className="md:text-3xl">Career Journey</IosSectionTitle>
      <div className="flex flex-col gap-3">
        {about.work.experiences.map((exp) => {
          const [dates, location] = exp.timeframe.split(" · ");

          return (
            <IosCard key={`${exp.company}-${exp.timeframe}`}>
              <div className="flex items-start gap-3 md:gap-4">
                <div className="order-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-white p-2 shadow-ios ring-1 ring-black/5 md:order-1">
                  <Image
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    width={40}
                    height={40}
                    className="h-auto max-h-8 w-auto max-w-full object-contain"
                  />
                </div>

                <div className="order-1 min-w-0 flex-1 md:order-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-[17px] font-bold leading-tight tracking-tight text-ios-label">
                        {exp.company}
                      </h3>
                      <p className="mt-0.5 text-[13px] font-semibold text-ios-label/75">
                        {exp.role}
                      </p>
                      <p className="mt-1 text-[11px] leading-snug text-ios-secondary/80 md:hidden">
                        {[location, dates].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <div className="hidden shrink-0 text-right text-[11px] leading-snug text-ios-secondary/80 md:block">
                      {location && <p>{location}</p>}
                      <p>{dates}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-col gap-1.5">
                    {exp.achievements.map((a) => (
                      <Achievement key={a} text={a} />
                    ))}
                  </div>
                </div>
              </div>
            </IosCard>
          );
        })}

        {about.studies.display && (
          <IosCard>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-white p-2 text-ios-blue shadow-ios ring-1 ring-black/5">
                {about.studies.logo ? (
                  <Image
                    src={about.studies.logo}
                    alt="Université Moulay Ismaïl logo"
                    width={40}
                    height={40}
                    className="h-auto max-h-7 w-full max-w-full object-contain"
                  />
                ) : (
                  <GraduationCap className="h-5 w-5" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[17px] font-bold leading-tight tracking-tight text-ios-label">
                  {about.studies.title}
                </h3>
                <ul className="mt-3 space-y-3">
                  {about.studies.institutions.map((inst) => (
                    <li key={inst.name}>
                      <p className="text-sm font-semibold text-ios-label">
                        {inst.name}
                      </p>
                      <p className="text-sm text-ios-secondary">
                        {inst.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </IosCard>
        )}
      </div>
    </section>
  );
}
