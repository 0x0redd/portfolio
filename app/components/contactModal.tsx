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
import { Button } from "@/components/ui/button";
import { Mail, Instagram, MessageCircle } from "lucide-react";

interface ContactModalProps {
  children: React.ReactNode;
}

export function ContactModal({ children }: ContactModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const email = "0x0red.me@gmail.com"; // Replace with your actual email
  const instagram = "0x0red"; // Replace with your actual Instagram handle
  const whatsapp = "212636851343"; // Replace with your actual WhatsApp number (country code + number, no + or spaces)

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
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-[#1a1a1a] border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Get in Touch</DialogTitle>
          <DialogDescription className="text-gray-400">
            Let&apos;s collaborate on your next project
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 mt-6">
          {/* Email */}
          <Button
            onClick={handleEmailClick}
            className="w-full justify-start bg-white text-black hover:bg-gray-200 h-14 text-base"
          >
            <Mail className="mr-3 h-5 w-5" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Email</span>
              <span className="text-sm text-gray-600">{email}</span>
            </div>
          </Button>

          {/* Instagram */}
          <Button
            onClick={handleInstagramClick}
            className="w-full justify-start bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 h-14 text-base"
          >
            <Instagram className="mr-3 h-5 w-5" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Instagram</span>
              <span className="text-sm text-white/80">@{instagram}</span>
            </div>
          </Button>

          {/* WhatsApp */}
          <Button
            onClick={handleWhatsAppClick}
            className="w-full justify-start bg-[#25D366] text-white hover:bg-[#20BA5A] h-14 text-base"
          >
            <MessageCircle className="mr-3 h-5 w-5" />
            <div className="flex flex-col items-start">
              <span className="font-medium">WhatsApp</span>
              <span className="text-sm text-white/80">Send a message</span>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
