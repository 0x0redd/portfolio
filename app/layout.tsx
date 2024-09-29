// app/layout.tsx (or app/root-layout.tsx depending on structure)

import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Using Poppins font as you prefer
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider"; // Import your theme provider if you have one

export const metadata: Metadata = {
  title: "Profolio - Othmane Ferrah's Portfolio",
  description:
    "Explore my projects, skills, and professional journey. Discover the work that defines me as a web developer.",
  keywords:
    "portfolio, web development, programming, Next.js, Othmane Ferrah, personal projects, developer",
  authors: [{ name: "Othmane Ferrah" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0070f3", // Customize the theme color
  openGraph: {
    title: "Profolio - Othmane Ferrah's Portfolio",
    description:
      "A showcase of my web development projects and professional journey.",
    url: "https://www.yourdomain.com", // Replace with your actual domain
    type: "website",
    images: [
      {
        url: "https://www.yourdomain.com/og-image.png", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Profolio Banner",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // Change the default theme if needed
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
