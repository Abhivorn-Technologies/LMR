"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: readonly FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <FadeIn key={item.question} delay={i * 0.05}>
          <div className={cn(
            "overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition-all duration-300",
            openIndex === i ? "border-cyan/30 bg-[#00E5FF]/5 shadow-[0_0_20px_rgba(0,229,255,0.05)]" : "hover:border-white/20 hover:bg-white/[0.04]"
          )}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-300"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              <span className="font-semibold text-white">{item.question}</span>
              <div className={cn(
                "p-1.5 rounded-full bg-cyan/5 border border-cyan/15 transition-all duration-300",
                openIndex === i && "bg-cyan/20 border-cyan/40"
              )}>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-cyan transition-transform duration-300",
                    openIndex === i && "rotate-180"
                  )}
                />
              </div>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="border-t border-white/10 px-6 py-5 text-[0.9rem] leading-relaxed text-[#c4e0e6] font-medium bg-black/10">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
