"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, FileText, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CvModalProps {
  children: React.ReactNode;
}

interface CvOptionProps {
  label: string;
  value: string;
  href: string;
  download: string;
  icon: React.ReactNode;
  iconClassName?: string;
  onSelect: () => void;
}

function CvOption({
  label,
  value,
  href,
  download,
  icon,
  iconClassName,
  onSelect,
}: CvOptionProps) {
  return (
    <a
      href={href}
      download={download}
      onClick={onSelect}
      className="group flex w-full items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08]"
    >
      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white",
          iconClassName
        )}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="truncate text-xs text-white/50">{value}</p>
      </div>
      <Download
        className="h-4 w-4 shrink-0 text-white/30 transition-colors group-hover:text-white/80"
        aria-hidden="true"
      />
    </a>
  );
}

export function CvModal({ children }: CvModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        overlayClassName="bg-black/50 backdrop-blur-md"
        className="gap-0 overflow-hidden rounded-2xl border border-white/10 bg-[#141414]/85 p-0 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:max-w-[440px] [&>button]:right-4 [&>button]:top-4 [&>button]:flex [&>button]:h-8 [&>button]:w-8 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:border [&>button]:border-white/10 [&>button]:bg-white/5 [&>button]:text-white/70 [&>button]:opacity-100 [&>button]:transition-colors hover:[&>button]:bg-white/10 hover:[&>button]:text-white"
      >
        <DialogHeader className="space-y-2 border-b border-white/10 px-6 py-6 text-left">
          <DialogTitle className="text-2xl font-semibold tracking-tight text-white">
            Pick a CV
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-white/50">
            Same story, two formats: one built to pass screening software, and one
            built to be looked at.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 p-4">
          <CvOption
            label="Professional CV"
            value="ATS-friendly · 2 pages · PDF"
            href="/cv/othmane-ferrah-cv.pdf"
            download="Othmane-Ferrah-CV.pdf"
            icon={<FileText className="h-5 w-5" aria-hidden="true" />}
            onSelect={close}
          />
          <CvOption
            label="Designed CV"
            value="Visual one-pager · PDF"
            href="/cv/othmane-ferrah-cv-designed.pdf"
            download="Othmane-Ferrah-CV-Designed.pdf"
            icon={<Sparkles className="h-5 w-5" aria-hidden="true" />}
            iconClassName="border-amber-400/20 bg-amber-400/10 text-amber-200"
            onSelect={close}
          />
        </div>

        <p className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/35">
          Updated September 2026
        </p>
      </DialogContent>
    </Dialog>
  );
}
