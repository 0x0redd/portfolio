"use client";

import { useEffect, useState } from "react";
import { Monitor } from "lucide-react";
import SwipeToast from "@/components/about/SwipeToast";

const STORAGE_KEY = "about-pc-tip-dismissed";

/** Phone-only tip: better experience on desktop. */
export function MobilePcTipToast() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");

    const sync = () => {
      const dismissed = sessionStorage.getItem(STORAGE_KEY) === "1";
      setOpen(mq.matches && !dismissed);
    };

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!open) return null;

  return (
    <SwipeToast
      open={open}
      onClose={() => {
        sessionStorage.setItem(STORAGE_KEY, "1");
        setOpen(false);
      }}
      icon={<Monitor className="h-[18px] w-[18px]" aria-hidden />}
      title="Best on desktop"
      description="Open this page on a computer for the full experience."
      background="#1C1C1E"
      color="#F5F5F7"
      fuseColor="#0A84FF"
      width={340}
      radius={14}
      slideMs={400}
      settleBounce={0.2}
      swipeDistance={40}
      duration={7000}
      fuse="bottom"
      pauseOnHover
      closeButton={false}
      className="!bottom-[calc(6.5rem+env(safe-area-inset-bottom,0px))] !right-4 !left-4 !w-auto max-[600px]:!bottom-[calc(6.5rem+env(safe-area-inset-bottom,0px))]"
    />
  );
}
