"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface ParallaxImageProps extends Omit<ImageProps, "className"> {
  containerClassName?: string;
  imageClassName?: string;
  speed?: number; // How much it moves (negative or positive)
}

export function ParallaxImage({
  containerClassName,
  imageClassName,
  speed = 0.5,
  ...imageProps
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate parallax offset based on speed
  // A positive speed means it moves slower than the scroll (moves down relatively)
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 15}%`, `${speed * 15}%`]);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden w-full h-full", containerClassName)}
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[130%] -top-[15%] pointer-events-none"
      >
        <Image
          {...imageProps}
          className={cn("object-cover", imageClassName)}
          fill
        />
      </motion.div>
    </div>
  );
}
