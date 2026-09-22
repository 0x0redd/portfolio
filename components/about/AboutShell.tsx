"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type AboutTheme = "light" | "dark";

const STORAGE_KEY = "about-theme";

const AboutThemeContext = createContext<{
  theme: AboutTheme;
  toggle: () => void;
} | null>(null);

export function useAboutTheme() {
  const ctx = useContext(AboutThemeContext);
  if (!ctx) {
    throw new Error("useAboutTheme must be used within AboutShell");
  }
  return ctx;
}

function AboutThemeToggle() {
  const { theme, toggle } = useAboutTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        // Sit above the mobile bottom nav; desktop stays in the corner
        "fixed bottom-24 right-4 z-[80] flex h-12 w-12 items-center justify-center rounded-full shadow-ios-lg transition-all duration-300",
        "md:bottom-8 md:right-8 md:h-14 md:w-14",
        "border border-black/5 bg-white/90 text-ios-label backdrop-blur-xl",
        "hover:-translate-y-1 hover:scale-105 active:scale-95",
        "dark:border-white/15 dark:bg-[#2C2C2E]/90 dark:text-white"
      )}
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <Sun
          className={cn(
            "absolute h-5 w-5 transition-all duration-300",
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          )}
        />
        <Moon
          className={cn(
            "absolute h-5 w-5 transition-all duration-300",
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          )}
        />
      </span>
    </button>
  );
}

export function AboutShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [theme, setTheme] = useState<AboutTheme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as AboutTheme | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, ready]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return (
    <AboutThemeContext.Provider value={{ theme, toggle }}>
      <div
        className={cn(
          "about-ios relative min-h-screen max-w-[100vw] overflow-x-hidden bg-ios-bg text-ios-label transition-colors duration-300",
          theme === "dark" && "dark",
          className
        )}
      >
        {children}
        <AboutThemeToggle />
      </div>
    </AboutThemeContext.Provider>
  );
}

export function IosCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-ios-card p-5 shadow-ios transition-colors duration-300 md:rounded-3xl md:p-6",
        "dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function IosSectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mb-4 text-xl font-semibold tracking-tight text-ios-label md:text-2xl",
        className
      )}
    >
      {children}
    </h2>
  );
}
