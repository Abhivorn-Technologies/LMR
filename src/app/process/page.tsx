"use client";

import React from "react";
import { PageHero } from "@/components/layout/PageHero";
import { createPageMetadata } from "@/lib/metadata";
import { FadeIn } from "@/components/motion/FadeIn";
import { processSteps } from "@/lib/content/pages";

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-[#04151a] text-white relative z-0 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 left-0 w-full h-[600px] z-0 pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-[#00E5FF]/5 blur-[120px]" />
        <div className="absolute top-1/3 -left-1/4 h-[600px] w-[600px] rounded-full bg-[#0c494f]/10 blur-[150px]" />
      </div>

      <PageHero
        eyebrow="Process"
        title="A structured approach to insurance advisory"
        description="From initial discovery through renewal management — every engagement follows a disciplined, documented workflow."
      />

      <section className="pb-24 relative z-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute top-0 bottom-0 left-6 w-px bg-gradient-to-b from-cyan/55 via-cyan/20 to-transparent md:left-1/2 md:-translate-x-px" />

            {processSteps.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.1}>
                <div
                  className={`relative mb-12 flex items-start gap-8 md:mb-16 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="hidden flex-1 md:block" />
                  
                  {/* Glowing step sphere */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0c494f] to-[#00B4D8] border border-cyan/40 text-white font-display text-sm font-extrabold shadow-[0_0_15px_rgba(0,180,216,0.3)] hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>

                  {/* Glass Card */}
                  <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm transition-all duration-500 hover:border-cyan/30 hover:bg-[#00E5FF]/5 hover:shadow-[0_8px_30px_rgba(0,180,216,0.12)] hover:-translate-y-1 shadow-md">
                    <h2 className="font-display text-xl font-bold text-white mb-2">
                      {step.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-[#c4e0e6] font-medium">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
