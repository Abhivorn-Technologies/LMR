"use client";

import React from "react";
import { PageHero } from "@/components/layout/PageHero";
import { createPageMetadata } from "@/lib/metadata";
import { FadeIn } from "@/components/motion/FadeIn";
import { whyLmbPoints } from "@/lib/content/pages";
import { Layers, ShieldCheck, HeartHandshake, Globe, Activity, Building2 } from "lucide-react";

const icons = [Layers, ShieldCheck, HeartHandshake, Globe, Activity, Building2];

export default function WhyLmbPage() {
  return (
    <div className="min-h-screen bg-[#04151a] text-white relative z-0 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 left-0 w-full h-[600px] z-0 pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-[#00E5FF]/5 blur-[120px]" />
        <div className="absolute top-1/3 -left-1/4 h-[600px] w-[600px] rounded-full bg-[#0c494f]/10 blur-[150px]" />
      </div>

      <PageHero
        eyebrow="Why LMB"
        title="Trust built through disciplined advisory"
        description="LMB combines composite broking capability with structured risk management — one advisory relationship across insurance lines."
      />

      <section className="pb-24 relative z-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyLmbPoints.map((point, i) => {
              const Icon = icons[i % icons.length];
              return (
                <FadeIn key={point.title} delay={i * 0.08}>
                  <div className="group relative h-full rounded-[2rem] bg-white/[0.02] border border-white/10 p-8 transition-all duration-500 hover:border-cyan/40 hover:bg-[#00E5FF]/5 hover:shadow-[0_12px_40px_-10px_rgba(0,229,255,0.15)] hover:-translate-y-2 flex flex-col justify-between overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                    {/* Corner gradient light */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#00E5FF]/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-cyan/15 group-hover:border-cyan/30 transition-colors duration-500">
                            <Icon className="h-6 w-6 text-cyan" />
                          </div>
                          <span className="font-display text-4xl font-black bg-gradient-to-br from-cyan to-transparent bg-clip-text text-transparent opacity-25 group-hover:opacity-75 transition-all duration-500">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan transition-colors duration-300">
                          {point.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-[#c4e0e6] font-medium">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
