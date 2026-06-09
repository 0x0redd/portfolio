"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

interface ProjectCardProps extends Project {
  className?: string;
}

export function ProjectCard({
  title,
  href,
  image,
  description,
  featured,
  className,
  available = true,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const imageVariants = {
    collapsed: { scale: 1, filter: "blur(0px)" },
    expanded: {
      scale: available ? 1.1 : 1,
      filter: available ? "blur(3px)" : "blur(10px)",
    },
  };

  const transition = {
    type: "spring" as const,
    stiffness: 26.7,
    damping: 4.1,
    mass: 0.2,
  };

  const cardClassName = `relative block h-[350px] w-full max-w-[290px] overflow-hidden rounded-xl group ${
    available ? "" : "cursor-not-allowed"
  } ${className ?? ""}`;

  const cardContent = (
    <>
      {featured && (
        <span className="absolute left-3 top-3 z-10 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          Current
        </span>
      )}
      <motion.div
        className="h-full w-full"
        animate={isHovered ? "expanded" : "collapsed"}
        variants={imageVariants}
        transition={transition}
      >
        <Image
          src={image}
          alt={title}
          width={290}
          height={350}
          className="h-full w-full select-none object-cover"
        />
      </motion.div>

      {!available && isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-md"
        >
          <span className="rounded-full border border-white/20 bg-black/40 px-5 py-2 text-sm font-medium uppercase tracking-[0.2em] text-white">
            Unavailable
          </span>
        </motion.div>
      )}

      <div className="absolute bottom-0 left-0 right-0 rounded-xl bg-gray-900/50 px-4 pt-2 backdrop-blur-sm">
        <div className="w-full pb-2 text-left text-[16px] font-bold text-white">
          {title}
        </div>
        {available && isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="flex flex-col pb-4 text-[13px] text-zinc-300"
          >
            <p className="mb-3 line-clamp-3">{description}</p>
            <div className="w-full rounded-[4px] border border-zinc-700 bg-zinc-900 px-4 py-1 text-center text-zinc-50 transition-colors duration-300 hover:bg-zinc-800">
              View Project
            </div>
          </motion.div>
        )}
      </div>
    </>
  );

  if (!available) {
    return (
      <div
        className={cardClassName}
        aria-disabled="true"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={cardClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {cardContent}
    </Link>
  );
}
