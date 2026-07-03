"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Flame, 
  HardHat, 
  PawPrint, 
  Building2, 
  ClipboardList, 
  Ship, 
  Cog, 
  Users, 
  HeartHandshake, 
  Sprout, 
  ShieldAlert, 
  Heart, 
  Repeat,
  ChevronDown
} from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const businessLines = [
  { id: 1, name: "Fire & Burglary", icon: Flame },
  { id: 2, name: "Workmen Compensation", icon: HardHat },
  { id: 3, name: "Live Stock", icon: PawPrint },
  { id: 4, name: "Property", icon: Building2 },
  { id: 5, name: "Project", icon: ClipboardList },
  { id: 6, name: "Marine", icon: Ship },
  { id: 7, name: "Engineering", icon: Cog },
  { id: 8, name: "Group Mediclaim", icon: Users },
  { id: 9, name: "Employee Benefit Schemes", icon: HeartHandshake },
  { id: 10, name: "Agriculture", icon: Sprout },
  { id: 11, name: "Personal Accident", icon: ShieldAlert },
  { id: 12, name: "Life", icon: Heart },
  { id: 13, name: "Reinsurance", icon: Repeat }
];

export function BusinessLinesSection() {
  const [showAll, setShowAll] = useState(false);
  
  // Show first 8 items by default, then reveal the rest
  const visibleItems = showAll ? businessLines : businessLines.slice(0, 8);

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00B4D8]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#115E59]/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              Our Business <span className="text-[#115E59] italic font-serif">Lines</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Comprehensive coverage across every major sector of risk management and insurance broking.
            </p>
          </ScrollReveal>
        </div>

        <motion.div 
          layout
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          <AnimatePresence>
            {visibleItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <ScrollReveal 
                  key={item.id} 
                  direction="up" 
                  delay={0.05 * (index % 8)}
                  className="w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]"
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group h-full bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:shadow-[#00B4D8]/10 transition-all duration-300 hover:-translate-y-1 cursor-default flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden"
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00B4D8]/0 to-[#115E59]/0 group-hover:from-[#00B4D8]/5 group-hover:to-[#115E59]/5 transition-colors duration-500" />
                    
                    <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#115E59] transition-all duration-300 relative z-10 shadow-sm border border-slate-100 group-hover:border-[#115E59]">
                      <Icon size={24} className="text-[#115E59] group-hover:text-white transition-colors duration-300" />
                    </div>
                    
                    <h3 className="font-bold text-slate-800 text-sm md:text-base group-hover:text-[#115E59] transition-colors duration-300 relative z-10 leading-tight">
                      {item.name}
                    </h3>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <ScrollReveal direction="up" delay={0.2} className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-[#115E59] bg-white border border-[#115E59]/20 rounded-full overflow-hidden hover:border-[#115E59] transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            <div className="absolute inset-0 w-0 bg-[#115E59]/5 transition-all duration-[250ms] ease-out group-hover:w-full" />
            <span className="relative z-10 tracking-wider text-sm uppercase">
              {showAll ? "View Less" : "View All Business Lines"}
            </span>
          </button>
        </ScrollReveal>

      </div>
    </section>
  );
}
