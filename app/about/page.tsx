"use client";

import { NavbarDemo } from "@/components/navbar";
import { Avatar } from "@/components/ui/avatar-enhanced";
import { Badge } from "@/components/ui/badge";
import { TableOfContents } from "@/components/about/TableOfContents";
import { SocialLinks } from "@/components/about/SocialLinks";
import { about, person } from "@/lib/about-content";
import { Globe, Mail, Phone } from "lucide-react";

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
    {
      title: about.projects.title,
      display: about.projects.display,
      items: about.projects.items.map((project) => project.title),
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.leadership.title,
      display: about.leadership.display,
      items: about.leadership.items.map((item) => item.org),
    },
    {
      title: about.design.title,
      display: about.design.display,
      items: [],
    },
    {
      title: about.awards.title,
      display: about.awards.display,
      items: [],
    },
    {
      title: about.certifications.title,
      display: about.certifications.display,
      items: [],
    },
  ];

  return (
    <main className="min-h-screen bg-[#141414] text-white">
      <NavbarDemo />

      <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-24 md:px-12 lg:px-16">
        <TableOfContents structure={structure} />

        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-12">
          {about.avatar.display && (
            <aside className="flex w-full flex-col items-center gap-4 md:sticky md:top-24 md:w-44 md:shrink-0 md:self-start">
              <Avatar
                size="2xl"
                src={person.avatar}
                alt={person.name}
                verified
                className="!h-28 !w-28 md:!h-32 md:!w-32"
              />
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Globe className="h-4 w-4" aria-hidden="true" />
                <span>{person.location}</span>
              </div>
              {person.languages.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2">
                  {person.languages.map((language) => (
                    <Badge
                      key={language}
                      variant="outline"
                      className="border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              )}
              <p className="text-center text-xs leading-relaxed text-white/45">
                {person.seeking}
              </p>
            </aside>
          )}

          <div className="min-w-0 flex-1">
            <section
              id={about.intro.title}
              className="mb-12 flex min-h-40 flex-col justify-center text-center md:mb-16 md:text-left"
            >
              <p className="mb-3 text-xs uppercase tracking-[0.28em] text-white/45">
                {person.primaryFocus} · {person.secondaryFocus}
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
                {person.name}
              </h1>
              <p className="mt-3 text-lg text-[#e5fdfd]/85 md:text-xl">{person.role}</p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
                {person.tagline}
              </p>
              <div className="mt-4 flex flex-col items-center gap-2 text-sm text-white/55 md:items-start">
                <a
                  href={`mailto:${person.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {person.email}
                </a>
                <a
                  href={`tel:${person.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {person.phone}
                </a>
              </div>
              <SocialLinks />
            </section>

            {about.intro.display && (
              <section className="mb-14 md:mb-16">
                <p className="text-base leading-relaxed text-white/75 md:text-lg">
                  {about.intro.description}
                </p>
                {about.intro.secondary && (
                  <p className="mt-4 text-base leading-relaxed text-white/60 md:text-lg">
                    {about.intro.secondary}
                  </p>
                )}
              </section>
            )}

            {about.studies.display && (
              <section className="mb-14 md:mb-16">
                <h2
                  id={about.studies.title}
                  className="mb-6 text-2xl font-semibold tracking-tight text-white md:text-3xl"
                >
                  {about.studies.title}
                </h2>
                <div className="flex flex-col gap-8">
                  {about.studies.institutions.map((institution) => (
                    <article key={institution.name} className="space-y-2">
                      <h3
                        id={institution.name}
                        className="text-xl font-semibold text-white md:text-2xl"
                      >
                        {institution.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/55 md:text-base">
                        {institution.description}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {about.technical.display && (
              <section className="mb-14 md:mb-16">
                <h2
                  id={about.technical.title}
                  className="mb-8 text-2xl font-semibold tracking-tight text-white md:text-3xl"
                >
                  {about.technical.title}
                </h2>
                <div className="flex flex-col gap-10">
                  {about.technical.skills.map((skill) => (
                    <article key={skill.title} className="space-y-3">
                      <h3
                        id={skill.title}
                        className="text-xl font-semibold text-white md:text-2xl"
                      >
                        {skill.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/55 md:text-base">
                        {skill.description}
                      </p>
                      {skill.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {skill.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="border-white/15 bg-white/5 px-3 py-1 text-sm text-white/75"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}

            {about.projects.display && (
              <section className="mb-14 md:mb-16">
                <h2
                  id={about.projects.title}
                  className="mb-6 text-2xl font-semibold tracking-tight text-white md:text-3xl"
                >
                  {about.projects.title}
                </h2>
                <div className="flex flex-col gap-10">
                  {about.projects.items.map((project) => (
                    <article key={project.title} className="space-y-3">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                        <h3
                          id={project.title}
                          className="text-xl font-semibold text-white md:text-2xl"
                        >
                          {project.title}
                        </h3>
                        <p className="shrink-0 text-sm text-white/45">
                          {project.timeframe}
                        </p>
                      </div>
                      <p className="text-sm leading-relaxed text-white/70 md:text-base">
                        {project.summary}
                      </p>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="text-sm leading-relaxed text-white/60 md:text-base"
                          >
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="border-[#e5fdfd]/25 bg-[#e5fdfd]/5 px-3 py-1 text-xs text-[#e5fdfd]/90"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {project.tech.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {about.work.display && (
              <section className="mb-14 md:mb-16">
                <h2
                  id={about.work.title}
                  className="mb-6 text-2xl font-semibold tracking-tight text-white md:text-3xl"
                >
                  {about.work.title}
                </h2>
                <div className="flex flex-col gap-10">
                  {about.work.experiences.map((experience) => (
                    <article key={experience.company} className="space-y-3">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                        <h3
                          id={experience.company}
                          className="text-xl font-semibold text-white md:text-2xl"
                        >
                          {experience.company}
                        </h3>
                        <p className="text-sm text-white/45">{experience.timeframe}</p>
                      </div>
                      <p className="text-sm font-medium text-[#e5fdfd]/80 md:text-base">
                        {experience.role}
                      </p>
                      <ul className="space-y-3">
                        {experience.achievements.map((achievement) => (
                          <li
                            key={achievement}
                            className="text-sm leading-relaxed text-white/70 md:text-base"
                          >
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {about.leadership.display && (
              <section className="mb-14 md:mb-16">
                <h2
                  id={about.leadership.title}
                  className="mb-6 text-2xl font-semibold tracking-tight text-white md:text-3xl"
                >
                  {about.leadership.title}
                </h2>
                <div className="flex flex-col gap-8">
                  {about.leadership.items.map((item) => (
                    <article key={item.org} className="space-y-3">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                        <h3
                          id={item.org}
                          className="text-xl font-semibold text-white md:text-2xl"
                        >
                          {item.org}
                        </h3>
                        <p className="text-sm text-white/45">{item.timeframe}</p>
                      </div>
                      <ul className="space-y-3">
                        {item.roles.map((role) => (
                          <li
                            key={role}
                            className="text-sm leading-relaxed text-white/70 md:text-base"
                          >
                            {role}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {about.design.display && (
              <section className="mb-14 md:mb-16">
                <h2
                  id={about.design.title}
                  className="mb-6 text-2xl font-semibold tracking-tight text-white md:text-3xl"
                >
                  {about.design.title}
                </h2>
                <p className="mb-4 text-base leading-relaxed text-white/70 md:text-lg">
                  {about.design.description}
                </p>
                <ul className="space-y-3">
                  {about.design.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="text-sm leading-relaxed text-white/60 md:text-base"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {about.awards.display && (
              <section className="mb-14 md:mb-16">
                <h2
                  id={about.awards.title}
                  className="mb-6 text-2xl font-semibold tracking-tight text-white md:text-3xl"
                >
                  {about.awards.title}
                </h2>
                <ul className="space-y-3">
                  {about.awards.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm leading-relaxed text-white/70 md:text-base"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {about.certifications.display && (
              <section className="mb-14 md:mb-16">
                <h2
                  id={about.certifications.title}
                  className="mb-6 text-2xl font-semibold tracking-tight text-white md:text-3xl"
                >
                  {about.certifications.title}
                </h2>
                <ul className="space-y-3">
                  {about.certifications.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm leading-relaxed text-white/70 md:text-base"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {about.interests.display && (
              <section>
                <h2
                  id={about.interests.title}
                  className="mb-6 text-2xl font-semibold tracking-tight text-white md:text-3xl"
                >
                  {about.interests.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {about.interests.items.map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="border-white/15 bg-white/5 px-3 py-1 text-sm text-white/75"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
