"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
  scale?: boolean;
  parallax?: boolean;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.8,
  once = true,
  scale = false,
  parallax = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const directionOffset = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
    none: { x: 0, y: 0 },
  };

  const offset = directionOffset[direction];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const baseContent = (
    <motion.div
      ref={ref}
      className={cn(className)} // Removed w-full h-full to stop layout breaks
      initial={{ opacity: 0, ...offset, ...(scale ? { scale: 0.95 } : {}) }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, ...(scale ? { scale: 1 } : {}) } : { opacity: 0, ...offset, ...(scale ? { scale: 0.95 } : {}) }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );

  if (parallax) {
    return (
      <motion.div style={{ y }} className={cn(className)}>
        {baseContent}
      </motion.div>
    );
  }

  return baseContent;
}
