"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Camera, Mail, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ContactModal } from "@/app/components/contactModal";
import { person } from "@/lib/about-content";

const STORAGE_KEY = "about-engage-shown";
const DELAY_MS = 10_000;

export function AboutEngageModal() {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;

    const timer = window.setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
    }, DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  function openContact() {
    setOpen(false);
    // Let the engage dialog unmount/close before opening contact.
    window.setTimeout(() => setContactOpen(true), 180);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          overlayClassName="bg-black/40 backdrop-blur-sm dark:bg-black/55"
          className="gap-0 overflow-hidden rounded-3xl border border-black/5 bg-ios-card p-0 text-ios-label shadow-ios-lg sm:max-w-[420px] dark:border-white/10 [&>button]:right-4 [&>button]:top-4 [&>button]:flex [&>button]:h-8 [&>button]:w-8 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:border [&>button]:border-black/5 [&>button]:bg-ios-fill [&>button]:text-ios-secondary [&>button]:opacity-100 hover:[&>button]:text-ios-label dark:[&>button]:border-white/10"
        >
          <DialogHeader className="space-y-3 px-6 pb-2 pt-7 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ios-blue/10 text-ios-blue">
              <Sparkles className="h-5 w-5" aria-hidden />
            </div>
            <DialogTitle className="text-xl font-semibold tracking-tight md:text-2xl">
              Hey, still around?
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-ios-secondary">
              If you like what you see, drop me a message. Or take a look at my
              photos. Consider it a small thank you for sticking around.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2.5 p-4 pt-3">
            <button
              type="button"
              onClick={openContact}
              className="group flex w-full items-center gap-3 rounded-2xl bg-ios-blue px-4 py-3.5 text-left text-white shadow-ios transition hover:brightness-110"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                <Mail className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">Get in touch</span>
                <span className="block text-xs text-white/75">
                  Just say hi · {person.email}
                </span>
              </span>
            </button>

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="group flex w-full items-center gap-3 rounded-2xl border border-black/5 bg-ios-fill px-4 py-3.5 text-left transition hover:bg-black/[0.04] dark:border-white/10 dark:hover:bg-white/[0.06]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ios-label ring-1 ring-black/5 dark:bg-ios-card dark:ring-white/10">
                <Camera className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-ios-label">
                  Check the pictures
                </span>
                <span className="block text-xs text-ios-secondary">
                  A quick look at my photography
                </span>
              </span>
            </Link>
          </div>

          <p className="border-t border-black/5 px-6 py-3.5 text-center text-xs text-ios-secondary dark:border-white/10">
            Currently looking for a PFE internship in AI &amp; Data Science
          </p>
        </DialogContent>
      </Dialog>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
}
