"use client";

import React from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ShieldCheck } from "lucide-react";

export const LmbBranding: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 bg-[#F8FBFC] overflow-hidden mt-8 md:mt-0">
      <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center">
          
          {/* Left Text Content */}
          <div className="flex flex-col gap-5 md:gap-6 items-center md:items-start text-center md:text-left">
            <ScrollReveal>
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#115E59]/10 rounded-2xl flex items-center justify-center border border-[#115E59]/20 shadow-sm mb-1 md:mb-2 mx-auto md:mx-0">
                <ShieldCheck className="text-[#115E59] w-7 h-7 md:w-8 md:h-8" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="text-[28px] leading-[1.2] md:text-4xl lg:text-5xl font-extrabold text-[#04151a] tracking-tight">
                Why Choose <br className="hidden md:block"/>
                <span className="text-[#115E59]">LMB Insurance Brokers?</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="h-1 w-16 md:w-20 bg-gradient-to-r from-[#115E59] to-[#00B4D8] rounded-full mb-3 mx-auto md:mx-0" />
              <p className="text-slate-600 text-[16px] md:text-lg lg:text-xl font-normal leading-[1.7] max-w-lg mx-auto md:mx-0 px-2 md:px-0">
                At <strong className="font-bold text-[#115E59]">LMB</strong>, we arrange insurances from all the main insurers directly to the client. 
                You get unbiased advice, perfectly tailored coverage, and dedicated support for claims, all from one trusted partner.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Image Container */}
          <div className="relative mt-4 md:mt-0 px-4 md:px-0">
            <ScrollReveal delay={0.3}>
              <div className="relative w-full aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl border-[3px] md:border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1200&auto=format&fit=crop" 
                  alt="LMB Insurance Brokers Team" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Decorative block */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#00B4D8]/10 rounded-full blur-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-[#115E59]/10 rounded-full blur-2xl -z-10" />
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
