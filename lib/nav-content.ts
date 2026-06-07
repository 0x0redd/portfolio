import { person } from "@/lib/about-content";

export const routes = {
  "/": true,
  "/about": true,
  "/projects": true,
} as const;

export const display = {
  location: true,
  time: true,
};

export const nav = {
  home: { label: "Home", href: "/" },
  about: { label: "About", href: "/about" },
  projects: { label: "Projects", href: "/projects" },
};

export const headerPerson = {
  location: person.location,
  timeZone: "Africa/Casablanca",
};
