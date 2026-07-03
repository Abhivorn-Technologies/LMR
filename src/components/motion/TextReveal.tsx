"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  wordMode?: boolean;
}

export function TextReveal({ children, className, delay = 0, wordMode = true }: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Handle case where children might not be a string (fallback to normal rendering)
  if (typeof children !== "string") {
    return <span className={className}>{children}</span>;
  }

  // Split text into words or characters
  const elements = wordMode ? children.split(" ") : children.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: wordMode ? 0.08 : 0.03,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("inline-block", className)}
      style={{ perspective: "1000px" }}
    >
      {elements.map((element, index) => (
        <span key={index} className="overflow-hidden inline-block align-bottom">
          <motion.span variants={childVariants} className="inline-block" style={{ transformOrigin: "top" }}>
            {element === " " && !wordMode ? "\u00A0" : element}
            {wordMode && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
