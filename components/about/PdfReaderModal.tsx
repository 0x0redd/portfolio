"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileText, BookOpen, Presentation } from "lucide-react";

export type ProjectDocument = {
  label: string;
  kind: "paper" | "report" | "presentation";
  href: string;
  preview: string;
  pages?: number;
};

const KIND_META = {
  paper: { badge: "Paper", Icon: FileText, unit: "pages" },
  report: { badge: "Report", Icon: BookOpen, unit: "pages" },
  presentation: { badge: "Slides", Icon: Presentation, unit: "slides" },
} as const;

function viewerSrc(href: string) {
  // Chrome/Edge built-in viewer: hide chrome so it feels read-only.
  const hash = "toolbar=0&navpanes=0&scrollbar=1&view=FitH";
  return href.includes("#") ? href : `${href}#${hash}`;
}

export function PdfReaderModal({
  doc,
  children,
}: {
  doc: ProjectDocument;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { Icon, unit } = KIND_META[doc.kind];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        overlayClassName="bg-black/60 backdrop-blur-md"
        className="flex h-[min(92vh,900px)] w-[min(96vw,920px)] max-w-none flex-col gap-0 overflow-hidden rounded-2xl border border-black/10 bg-[#F2F2F7] p-0 shadow-ios-lg sm:rounded-2xl [&>button]:right-3 [&>button]:top-3 [&>button]:rounded-full [&>button]:border [&>button]:border-black/10 [&>button]:bg-white [&>button]:opacity-100"
      >
        <DialogHeader className="space-y-1 border-b border-black/5 bg-white px-5 py-4 pr-14 text-left">
          <DialogTitle className="flex items-center gap-2 text-base font-semibold text-ios-label">
            <Icon className="h-4 w-4 text-ios-blue" aria-hidden />
            {doc.label}
          </DialogTitle>
          <DialogDescription className="text-xs text-ios-secondary">
            Read-only preview
            {doc.pages ? ` · ${doc.pages} ${unit}` : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 bg-[#E5E5EA]">
          <iframe
            title={doc.label}
            src={viewerSrc(doc.href)}
            className="h-full w-full border-0"
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DocumentPreviewCard({ doc }: { doc: ProjectDocument }) {
  const { badge, Icon, unit } = KIND_META[doc.kind];
  const isSlides = doc.kind === "presentation";

  return (
    <PdfReaderModal doc={doc}>
      <button
        type="button"
        className={`group flex w-full flex-col overflow-hidden rounded-2xl bg-ios-fill text-left shadow-ios ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:bg-white ${
          isSlides ? "sm:max-w-[260px]" : "sm:max-w-[200px]"
        }`}
      >
        <div
          className={`relative w-full overflow-hidden bg-white ${
            isSlides ? "aspect-video" : "aspect-[3/4]"
          }`}
        >
          <Image
            src={doc.preview}
            alt={`${doc.label} preview`}
            fill
            sizes={isSlides ? "260px" : "200px"}
            className="object-cover object-top transition duration-300 group-hover:scale-[1.02]"
          />
          <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
            {badge}
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2.5">
          <Icon className="h-3.5 w-3.5 shrink-0 text-ios-blue" />
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-ios-label">
              {doc.label}
            </p>
            <p className="text-[10px] text-ios-secondary">
              Tap to view
              {doc.pages ? ` · ${doc.pages} ${unit}` : ""}
            </p>
          </div>
        </div>
      </button>
    </PdfReaderModal>
  );
}
