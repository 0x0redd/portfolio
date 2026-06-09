export interface Project {
  title: string;
  href: string;
  image: string;
  description: string;
  featured?: boolean;
  available?: boolean;
}

export const projects: Project[] = [
  {
    title: "AFCON 25",
    href: "/afcon",
    image: "/Afcon/IMG_1682.jpg",
    description:
      "Current project documenting the atmosphere, fans, and human stories around Africa's biggest football tournament.",
    featured: true,
  },
  {
    title: "World Cup Celebrations 22",
    href: "/WorldCup2022",
    image: "/world cup 2022/DSC_3906.jpg",
    description:
      "A candid street photography series capturing the raw emotions and celebrations of football fans during the 2022 World Cup.",
  },
  {
    title: "FES",
    href: "/FES25",
    image: "/Fes/IMG_9399.jpg",
    description:
      "Documenting the streets and stories of Fes through documentary photography.",
  },
  {
    title: "Meknes",
    href: "/Meknes",
    image: "/meknes/IMG_20210410_193620 (2).jpg",
    description:
      "Exploring the urban landscape and human stories of Meknes.",
  },
  {
    title: "Street",
    href: "/Street",
    image: "/Street/IMG_20220813_190956 (2).jpg",
    description:
      "Street photography capturing real moments, emotions, and human stories.",
  },
  {
    title: "Rabat",
    href: "/rabat",
    image: "/rabat/IMG_4941.jpg",
    description:
      "Capturing the essence of Rabat through street and documentary photography.",
  },
  {
    title: "Candid",
    href: "/candid",
    image: "/candid/IMG_0736.jpg",
    description:
      "Unposed coverage for weddings, events, and portraits that feel natural and true to the moment.",
    available: false,
  },
  {
    title: "Computer science club",
    href: "/CSC",
    image: "/CSC/IMG_9006-15.jpg",
    description:
      "Event photography for the computer science club at the university of moulay ismail.",

  },
];
