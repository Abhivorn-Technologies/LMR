"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";

import { 
  Flame, HardHat, UserMinus, Stethoscope, Bird, Users, Home, 
  Wheat, Building, Activity, Anchor, Heart, ShieldAlert 
} from "lucide-react";

const businessLines = [
  { name: "FIRE & BURGLARY", icon: Flame },
  { name: "ENGINEERING", icon: HardHat },
  { name: "WORKMEN COMPENSATION", icon: UserMinus },
  { name: "GROUP MEDICLAIM", icon: Stethoscope },
  { name: "LIVE STOCK", icon: Bird },
  { name: "EMPLOYEE BENEFIT SCHEMES", icon: Users },
  { name: "PROPERTY", icon: Home },
  { name: "AGRICULTURE", icon: Wheat },
  { name: "PROJECT", icon: Building },
  { name: "PERSONAL ACCIDENT", icon: Activity },
  { name: "MARINE", icon: Anchor },
  { name: "LIFE", icon: Heart },
  { name: "REINSURANCE", icon: ShieldAlert },
];

export function BusinessLinesGrid() {
  const [showAll, setShowAll] = useState(false);

  // Show 8 items initially (2 rows on desktop with 4 cols)
  const visibleItems = showAll ? businessLines : businessLines.slice(0, 8);

  return (
    <div className="relative z-20">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Our Business Lines
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#00E5FF] to-transparent rounded-full mx-auto" />
        </div>
      </ScrollReveal>

      {/* Elegant Grid Layout with centering for leftover cards */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {visibleItems.map((line, i) => (
          <ScrollReveal 
            key={line.name} 
            delay={i * 0.05} 
            direction="up"
            className="w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] max-w-sm flex"
          >
            <div className="group h-full w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl transition-all duration-500 hover:bg-[#00E5FF]/10 hover:border-[#00E5FF]/40 hover:shadow-[0_10px_40px_-10px_rgba(0,229,255,0.25)] hover:-translate-y-2 cursor-pointer relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/0 to-[#00E5FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-[#00E5FF]/5 border border-[#00E5FF]/20 group-hover:bg-[#00E5FF]/20 group-hover:border-[#00E5FF]/50 group-hover:scale-110 transition-all duration-500">
                  <line.icon size={32} className="text-[#00E5FF] transition-opacity" />
                </div>
                <h4 className="font-display font-semibold tracking-wide text-sm md:text-base text-white group-hover:text-[#00E5FF] transition-colors duration-300">
                  {line.name}
                </h4>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal direction="up" delay={0.2}>
        <div className="mt-12 flex justify-center">
          <Button 
            onClick={() => setShowAll(!showAll)}
            className="group relative overflow-hidden rounded-full bg-transparent border border-[#00E5FF]/40 text-[#00E5FF] hover:text-white px-8 py-6 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00B4D8] to-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 flex items-center gap-2 font-bold tracking-wider uppercase text-sm">
              {showAll ? "View Less" : "View More"}
            </span>
          </Button>
        </div>
      </ScrollReveal>
    </div>
  );
}
