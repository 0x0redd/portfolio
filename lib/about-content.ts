export const person = {
  name: "Othmane Ferrah",
  role: "Street & Documentary Photographer",
  avatar: "/Pined/IMG_9846-Pano.jpg",
  email: "0x0red.me@gmail.com",
  location: "Morocco",
  languages: ["Arabic", "French", "English"],
};

export const social = [
  {
    name: "Instagram",
    link: "https://instagram.com/0x0red",
    essential: true,
  },
  {
    name: "Behance",
    link: "https://www.behance.net/othmaneferrah",
    essential: true,
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/0x0red",
    essential: true,
  },
  {
    name: "Unsplash",
    link: "https://unsplash.com/@0x0red",
    essential: false,
  },
  {
    name: "Email",
    link: "mailto:0x0red.me@gmail.com",
    essential: true,
  },
] as const;

export const about = {
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  intro: {
    display: true,
    title: "Introduction",
    description:
      "Othmane is a Morocco-based street and documentary photographer dedicated to capturing unscripted moments and real human stories. His work explores the intersection of culture, emotion, and everyday life — from celebrations to quiet reflections, from ancient traditions to modern expressions.",
  },
  work: {
    display: true,
    title: "Selected Work",
    experiences: [
      {
        company: "AFCON 25",
        timeframe: "2025 — Present",
        role: "Event & Documentary Photographer",
        achievements: [
          "Documenting the atmosphere, fans, and human stories around Africa's biggest football tournament.",
          "Capturing candid moments across stadiums and city streets with a documentary approach.",
        ],
      },
      {
        company: "World Cup Celebrations 2022",
        timeframe: "2022",
        role: "Street Photographer",
        achievements: [
          "A candid street photography series capturing raw emotions and celebrations of football fans.",
          "Focused on spontaneous moments, movement, and collective joy in urban environments.",
        ],
      },
      {
        company: "Morocco Cities Series",
        timeframe: "2020 — Present",
        role: "Documentary Photographer",
        achievements: [
          "Long-form documentary work across Fes, Meknes, Rabat, and Moroccan streets.",
          "Exploring place, people, and culture through respectful, curiosity-driven storytelling.",
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: "Background",
    institutions: [
      {
        name: "Self-directed practice",
        description:
          "Years of street and documentary photography built through daily observation, personal projects, and real-world assignments.",
      },
      {
        name: "Morocco — worldwide",
        description:
          "Based in Morocco and available for editorial, commercial, and documentary commissions internationally.",
      },
    ],
  },
  technical: {
    display: true,
    title: "Focus areas",
    skills: [
      {
        title: "Street Photography",
        description:
          "Capturing spontaneous moments, emotions, and interactions in shared public spaces.",
        tags: ["Candid", "Urban", "Black & White"],
      },
      {
        title: "Documentary Storytelling",
        description:
          "Long-form visual narratives that document culture, people, and place with authenticity.",
        tags: ["Editorial", "Culture", "Reportage"],
      },
      {
        title: "Events & Portraits",
        description:
          "Unposed coverage for weddings, events, and portraits that feel natural and true to the moment.",
        tags: ["Weddings", "Events", "Portraits"],
      },
    ],
  },
};
