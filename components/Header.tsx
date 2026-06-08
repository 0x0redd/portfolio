"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, LayoutGrid, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { display, headerPerson, nav, routes } from "@/lib/nav-content";
import { ViewCount } from "@/app/components/viewTracker";
import styles from "./Header.module.css";

function TimeDisplay({ timeZone, locale = "en-GB" }: { timeZone: string; locale?: string }) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat(locale, options).format(now));
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <span suppressHydrationWarning>{currentTime}</span>;
}

interface NavToggleProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  selected: boolean;
}

function NavToggle({ href, icon, label, selected }: NavToggleProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={selected ? "page" : undefined}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors",
        selected
          ? "bg-white/10 text-white"
          : "text-white/60 hover:bg-white/5 hover:text-white"
      )}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </Link>
  );
}

function NavDivider() {
  return <span className="mx-1 h-6 w-px bg-white/15" aria-hidden="true" />;
}

export function Header() {
  const pathname = usePathname() ?? "";

  const isHomeSelected = pathname === "/";
  const isAboutSelected = pathname === "/about";
  const isProjectsSelected = pathname === "/projects";

  return (
    <>
      <div
        className={cn("fixed inset-x-0 top-0 z-40 hidden h-20 md:block", styles.mask)}
        aria-hidden="true"
      />
      <div
        className={cn("fixed inset-x-0 bottom-0 z-40 h-20 md:hidden", styles.mask, styles.maskBottom)}
        aria-hidden="true"
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full px-2 py-2 md:px-3",
          "max-md:top-auto max-md:bottom-6",
          styles.position
        )}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center">
          <div className="hidden flex-1 items-center pl-3 text-sm text-white/60 md:flex">
            {display.location && <span>{headerPerson.location}</span>}
          </div>

          <div className="flex flex-1 justify-center">
            <nav
              aria-label="Main"
              className="rounded-2xl border border-white/10 bg-[#141414]/90 px-1.5 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md"
            >
              <div className="flex items-center gap-1">
                {routes["/"] && (
                  <NavToggle
                    href={nav.home.href}
                    label={nav.home.label}
                    selected={isHomeSelected}
                    icon={<Home className="h-4 w-4" aria-hidden="true" />}
                  />
                )}

                {(routes["/about"] || routes["/projects"]) && <NavDivider />}

                {routes["/about"] && (
                  <NavToggle
                    href={nav.about.href}
                    label={nav.about.label}
                    selected={isAboutSelected}
                    icon={<User className="h-4 w-4" aria-hidden="true" />}
                  />
                )}

                {routes["/projects"] && (
                  <NavToggle
                    href={nav.projects.href}
                    label={nav.projects.label}
                    selected={isProjectsSelected}
                    icon={<LayoutGrid className="h-4 w-4" aria-hidden="true" />}
                  />
                )}
              </div>
            </nav>
          </div>

          <div className="hidden flex-1 items-center justify-end gap-3 pr-3 text-sm tabular-nums text-white/60 md:flex">
            
            {display.time && <TimeDisplay timeZone={headerPerson.timeZone} />}
            <ViewCount className="text-sm text-white/60" /> 
          </div>
        </div>
      </header>
    </>
  );
}
