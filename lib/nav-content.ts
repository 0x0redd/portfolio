import { person } from "@/lib/about-content";

export const routes = {
  "/": true,
  "/about": true,
  "/projects": true,
  "/design": true,
  "/Dev": true,
} as const;

export const display = {
  location: true,
  time: true,
};

export const nav = {
  home: { label: "Home", href: "/" },
  about: { label: "About", href: "/about" },
  projects: { label: "Projects", href: "/projects" },
  design: { label: "Design", href: "/design" },
  dev: { label: "Dev", href: "/dev" },
};

export const headerPerson = {
  location: person.location,
  timeZone: "Africa/Casablanca",
};
