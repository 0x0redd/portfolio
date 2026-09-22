"use client";

import { about } from "@/lib/about-content";
import { IosCard, IosSectionTitle } from "@/components/about/AboutShell";
import { DocumentPreviewCard } from "@/components/about/PdfReaderModal";

export function AboutProjects() {
  if (!about.projects.display) return null;

  return (
    <section>
      <IosSectionTitle className="md:text-3xl">Projects</IosSectionTitle>
      <div className="flex flex-col gap-3">
        {about.projects.items.map((project) => (
          <IosCard key={project.title} className="group">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="text-base font-semibold leading-snug text-ios-label md:text-lg">
                {project.title}
              </h3>
              <span className="shrink-0 rounded-full bg-ios-fill px-2.5 py-1 text-[11px] font-medium text-ios-secondary">
                {project.timeframe}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ios-secondary">
              {project.summary}
            </p>
            {project.highlights?.length > 0 && (
              <ul className="mt-3 space-y-1.5 border-t border-ios-fill pt-3">
                {project.highlights.slice(0, 2).map((h) => (
                  <li
                    key={h}
                    className="text-sm leading-relaxed text-ios-label/80"
                  >
                    · {h}
                  </li>
                ))}
              </ul>
            )}
            {project.tags?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-ios-blue/10 px-2.5 py-1 text-[11px] font-semibold text-ios-blue"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {project.documents && project.documents.length > 0 && (
              <div className="mt-4 border-t border-ios-fill pt-4">
                <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-ios-secondary">
                  Documents
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.documents.map((doc) => (
                    <DocumentPreviewCard key={doc.href} doc={doc} />
                  ))}
                </div>
              </div>
            )}
          </IosCard>
        ))}
      </div>
    </section>
  );
}
