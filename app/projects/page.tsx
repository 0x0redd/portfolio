"use client";

import { NavbarDemo } from "@/components/navbar";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#141414]">
      <NavbarDemo />

      <div className="container mx-auto px-6 pb-24 pt-24 md:px-12 lg:px-24">
        <section className="mb-16 text-center md:text-left">
          <h1 className="mb-6 text-4xl font-light text-white md:text-6xl lg:text-7xl">
            Projects
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300 md:mx-0 md:text-xl">
            Selected street and documentary work from Morocco and beyond —
            stories captured through unscripted moments and real human
            experience.
          </p>
        </section>

        <section className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.href} {...project} />
          ))}
        </section>
      </div>
    </main>
  );
}
