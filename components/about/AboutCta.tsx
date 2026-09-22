"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Send } from "lucide-react";
import { ContactModal } from "@/app/components/contactModal";
import { person } from "@/lib/about-content";
import { IosCard } from "@/components/about/AboutShell";

type ChatMessage = {
  id: string;
  role: "sent" | "received";
  text: string;
};

const OPENING: ChatMessage[] = [
  {
    id: "open-1",
    role: "sent",
    text: "I'm looking for my next AI & Data Science internship — Master's track, ready to build and ship.",
  },
  {
    id: "open-2",
    role: "sent",
    text: "Let's build something together.",
  },
];

function Bubble({
  message,
  animate,
}: {
  message: ChatMessage;
  animate?: boolean;
}) {
  const sent = message.role === "sent";
  const body = (
    <div
      className={`max-w-[min(100%,28rem)] px-5 py-4 shadow-ios ${
        sent
          ? "self-start rounded-3xl rounded-bl-md bg-white text-ios-label ring-1 ring-black/5 dark:bg-ios-fill dark:ring-white/10"
          : "self-end rounded-3xl rounded-br-md bg-ios-blue text-white"
      }`}
    >
      <p className="text-sm font-medium leading-relaxed md:text-base">
        {message.text}
      </p>
    </div>
  );

  if (!animate) return body;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={`flex w-full ${sent ? "justify-start" : "justify-end"}`}
    >
      {body}
    </motion.div>
  );
}

export function AboutCta() {
  const [draft, setDraft] = useState("");
  const [live, setLive] = useState<ChatMessage[]>([]);

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;

    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}`;

    setLive((prev) => [...prev, { id, role: "received", text }]);
    setDraft("");
  }

  return (
    <section className="mt-10 space-y-4 md:mt-14">
      <div className="flex flex-col gap-3">
        {OPENING.map((m) => (
          <div key={m.id} className="flex w-full justify-start">
            <Bubble message={m} />
          </div>
        ))}

        <AnimatePresence initial={false}>
          {live.map((m) => (
            <Bubble key={m.id} message={m} animate />
          ))}
        </AnimatePresence>
      </div>

      <IosCard className="!p-3 md:!p-4">
        <form className="flex items-center gap-2" onSubmit={sendMessage}>
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ios-fill text-ios-secondary"
            aria-label="Attach"
          >
            <Camera className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Say hello…"
            className="h-11 flex-1 rounded-full border border-ios-tertiary/60 bg-[#FAFAFA] px-4 text-sm text-ios-label outline-none ring-ios-blue placeholder:text-ios-secondary focus:ring-2 dark:border-white/10 dark:bg-ios-fill"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ios-blue text-white shadow-ios transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1">
          <a
            href={`mailto:${person.email}`}
            className="text-sm font-medium text-ios-blue"
          >
            {person.email}
          </a>
          <ContactModal>
            <button
              type="button"
              className="text-sm font-semibold text-ios-label underline-offset-4 hover:underline"
            >
              Open contact options
            </button>
          </ContactModal>
        </div>
      </IosCard>
    </section>
  );
}
