"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Addon {
  title: string;
  description: string;
}

interface ProductAddonsProps {
  title: string;
  subtitle: string;
  addons: Addon[];
}

const AddonCard = ({ addon }: { addon: Addon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "group bg-white p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg",
        isOpen ? "border-[#115E59]/30 shadow-md" : "border-slate-100 hover:border-[#115E59]/20"
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 pr-4">{addon.title}</h3>
        <div className="relative shrink-0 w-8 h-8 rounded-full bg-[#00B4D8]/10 flex items-center justify-center text-[#00B4D8] transition-colors group-hover:bg-[#00B4D8] group-hover:text-white">
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Plus size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-slate-600 text-sm leading-relaxed font-light">
              {addon.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ProductAddons: React.FC<ProductAddonsProps> = ({
  title,
  subtitle,
  addons,
}) => {
  return (
    <section className="py-24 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal direction="down">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-orange-500" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-orange-600 uppercase">Optional Covers</span>
            </div>
            <h2 className="text-3xl md:text-[40px] font-extrabold text-[#0F172A] mb-5 tracking-tight">{title}</h2>
            <p className="text-[17px] text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">{subtitle}</p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {addons.map((addon, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 0.1}>
              <AddonCard addon={addon} />
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
