"use client";

import { motion } from "framer-motion";

interface TextRollProps {
  children: string;
}

export function TextRoll({ children }: TextRollProps) {
  const words = children.split(" ");

  return (
    <span className="inline-flex flex-wrap">
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: index * 0.08,
            duration: 0.5,
            ease: [0.33, 1, 0.68, 1],
          }}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
