"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Users } from "lucide-react";
import { about } from "@/lib/about-content";
import { mediaUrl } from "@/lib/media";
import { cn } from "@/lib/utils";
import { IosCard, IosSectionTitle } from "@/components/about/AboutShell";

type RoleObject = {
  title: string;
  period?: string;
  summary: string;
  bullets?: string[];
};

function RoleAccordion({
  role,
  defaultOpen,
}: {
  role: RoleObject;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <li className="overflow-hidden rounded-2xl bg-ios-fill/70">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 px-3.5 py-3 text-left md:cursor-default md:pointer-events-none"
      >
        <span
          className="hidden h-3.5 w-6 shrink-0 rounded-full bg-white ring-1 ring-black/5 md:block"
          aria-hidden
        />
        <span className="min-w-0 flex-1 text-[15px] font-bold leading-snug text-ios-label md:text-sm">
          {role.title}
          {role.period && (
            <span className="font-medium text-ios-secondary">
              {" "}
              ({role.period})
            </span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-ios-secondary transition-transform duration-200 md:hidden",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out md:grid-rows-[1fr]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] md:grid-rows-[1fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-2 px-3.5 pb-3.5 pt-0 md:px-3.5 md:pl-11">
            <p className="text-[13px] leading-relaxed text-ios-secondary md:text-sm">
              {role.summary}
            </p>
            {role.bullets && role.bullets.length > 0 && (
              <ul className="space-y-1.5">
                {role.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2 text-[13px] leading-relaxed text-ios-secondary md:text-sm"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ios-secondary/60"
                      aria-hidden
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export function AboutLeadership() {
  if (!about.leadership.display) return null;

  return (
    <section>
      <IosSectionTitle>{about.leadership.title}</IosSectionTitle>
      <div className="flex flex-col gap-4">
        {about.leadership.items.map((item) => {
          const roles = item.roles ?? [];
          const gallery = item.gallery ?? [];

          return (
            <div key={item.org} className="flex flex-col gap-3">
              <IosCard>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="order-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-white p-2 shadow-ios ring-1 ring-black/5 md:order-1">
                    {item.logo ? (
                      <Image
                        src={item.logo}
                        alt={`${item.org} logo`}
                        width={40}
                        height={40}
                        className="h-auto max-h-8 w-auto max-w-full object-contain"
                      />
                    ) : (
                      <Users className="h-5 w-5 text-ios-blue" />
                    )}
                  </div>

                  <div className="order-1 min-w-0 flex-1 md:order-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-[17px] font-bold leading-tight tracking-tight text-ios-label">
                          {item.org}
                        </h3>
                        {item.headline && (
                          <p className="mt-1 text-[12px] font-medium leading-snug text-ios-label/70 md:mt-0.5 md:text-[13px] md:font-semibold md:text-ios-label/75">
                            {item.headline}
                          </p>
                        )}
                        <p className="mt-1.5 text-[11px] leading-snug text-ios-secondary/80 md:hidden">
                          {[item.location, item.timeframe]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>
                      <div className="hidden shrink-0 text-right text-[11px] leading-snug text-ios-secondary/80 md:block">
                        {item.location && <p>{item.location}</p>}
                        <p>{item.timeframe}</p>
                      </div>
                    </div>

                    <ul className="mt-4 space-y-2 md:space-y-3">
                      {roles.map((role, index) => {
                        if (typeof role === "string") {
                          return (
                            <li
                              key={role}
                              className="rounded-2xl bg-ios-fill px-3.5 py-3 text-[13px] leading-relaxed text-ios-label md:text-sm"
                            >
                              {role}
                            </li>
                          );
                        }

                        return (
                          <RoleAccordion
                            key={`${role.title}-${role.period}`}
                            role={role}
                            defaultOpen={index === 0}
                          />
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </IosCard>

              {gallery.length > 0 &&
                (() => {
                  const mid = Math.ceil(gallery.length / 2);
                  const rows = [gallery.slice(0, mid), gallery.slice(mid)];

                  return (
                    <div className="-mx-1 overflow-hidden md:mx-0">
                      <div className="overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <div className="flex w-max flex-col gap-2.5 md:gap-3">
                          {rows.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex gap-2.5 md:gap-3">
                              {row.map((photo) => {
                                const src =
                                  typeof photo === "string"
                                    ? photo
                                    : photo.src;
                                const width =
                                  typeof photo === "string"
                                    ? 3
                                    : photo.width;
                                const height =
                                  typeof photo === "string"
                                    ? 2
                                    : photo.height;

                                return (
                                  <div
                                    key={src}
                                    className="relative h-28 shrink-0 overflow-hidden rounded-2xl bg-ios-fill shadow-ios ring-1 ring-black/5 md:h-36"
                                    style={{
                                      aspectRatio: `${width} / ${height}`,
                                    }}
                                  >
                                    <Image
                                      src={mediaUrl(src)}
                                      alt={`${item.org} — club photography`}
                                      fill
                                      sizes="(max-width: 768px) 160px, 240px"
                                      className="object-cover"
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
            </div>
          );
        })}
      </div>
    </section>
  );
}
