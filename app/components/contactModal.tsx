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
import { ArrowUpRight, Instagram, Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactModalProps {
  children: React.ReactNode;
}

interface ContactOptionProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  iconClassName?: string;
  onClick: () => void;
}

function ContactOption({
  label,
  value,
  icon,
  iconClassName,
  onClick,
}: ContactOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
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
      <ArrowUpRight
        className="h-4 w-4 shrink-0 text-white/30 transition-colors group-hover:text-white/80"
        aria-hidden="true"
      />
    </button>
  );
}

export function ContactModal({ children }: ContactModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const email = "0x0red.me@gmail.com";
  const instagram = "0x0red";
  const whatsapp = "212636851343";

  const handleEmailClick = () => {
    setIsOpen(false);
    window.location.href = `mailto:${email}`;
  };

  const handleInstagramClick = () => {
    setIsOpen(false);
    window.open(`https://instagram.com/${instagram}`, "_blank");
  };

  const handleWhatsAppClick = () => {
    setIsOpen(false);
    window.open(`https://wa.me/${whatsapp}`, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        overlayClassName="bg-black/50 backdrop-blur-md"
        className="gap-0 overflow-hidden rounded-2xl border border-white/10 bg-[#141414]/85 p-0 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:max-w-[440px] [&>button]:right-4 [&>button]:top-4 [&>button]:flex [&>button]:h-8 [&>button]:w-8 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:border [&>button]:border-white/10 [&>button]:bg-white/5 [&>button]:text-white/70 [&>button]:opacity-100 [&>button]:transition-colors hover:[&>button]:bg-white/10 hover:[&>button]:text-white"
      >
        <DialogHeader className="space-y-2 border-b border-white/10 px-6 py-6 text-left">
          <DialogTitle className="text-2xl font-semibold tracking-tight text-white">
            Get in Touch
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-white/50">
            Let&apos;s collaborate on your next project — reach out through any
            channel below.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 p-4">
          <ContactOption
            label="Email"
            value={email}
            icon={<Mail className="h-5 w-5" aria-hidden="true" />}
            onClick={handleEmailClick}
          />
          <ContactOption
            label="Instagram"
            value={`@${instagram}`}
            icon={<Instagram className="h-5 w-5" aria-hidden="true" />}
            iconClassName="border-purple-500/20 bg-purple-500/10 text-purple-200"
            onClick={handleInstagramClick}
          />
          <ContactOption
            label="WhatsApp"
            value="Send a message"
            icon={<MessageCircle className="h-5 w-5" aria-hidden="true" />}
            iconClassName="border-emerald-500/20 bg-emerald-500/10 text-emerald-200"
            onClick={handleWhatsAppClick}
          />
        </div>

        <p className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/35">
          Based in Morocco — available worldwide
        </p>
      </DialogContent>
    </Dialog>
  );
}
