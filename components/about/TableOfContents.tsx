"use client";

import { about } from "@/lib/about-content";

interface TableOfContentsProps {
  structure: {
    title: string;
    display: boolean;
    items: string[];
  }[];
}

export function TableOfContents({ structure }: TableOfContentsProps) {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const offset = 96;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (!about.tableOfContent.display) return null;

  return (
    <nav className="fixed left-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-8 lg:flex">
      {structure
        .filter((section) => section.display)
        .map((section) => (
          <div key={section.title} className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => scrollTo(section.title)}
              className="group flex items-center gap-2 text-sm text-white/60 transition-all hover:translate-x-1 hover:text-white"
            >
              <span className="h-px w-4 bg-white/50 transition-colors group-hover:bg-white" />
              <span className="whitespace-nowrap">{section.title}</span>
            </button>
            {about.tableOfContent.subItems &&
              section.items.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => scrollTo(item)}
                  className="group flex items-center gap-3 pl-6 text-sm text-white/45 transition-all hover:translate-x-1 hover:text-white/80"
                >
                  <span className="h-px w-2 bg-white/35 transition-colors group-hover:bg-white/70" />
                  <span className="whitespace-nowrap">{item}</span>
                </button>
              ))}
          </div>
        ))}
    </nav>
  );
}
