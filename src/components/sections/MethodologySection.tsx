"use client";

import Image from "next/image";
import { Shield, Target, Activity } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

export function MethodologySection() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start relative h-full">
          
          {/* CSS Sticky Pinning */}
          <div className="relative z-10 pt-10 lg:sticky lg:top-32 h-fit">
            <ScrollReveal direction="left">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-2 mb-8 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#115E59]" />
                <span className="text-xs font-bold tracking-[0.2em] text-[#115E59] uppercase">Our Methodology</span>
              </div>
            </ScrollReveal>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-[1.1] tracking-tight">
              <TextReveal delay={0.1}>Partnering in </TextReveal>
              <br />
              <span className="text-[#115E59] font-serif italic">
                <TextReveal delay={0.3}>Your Success.</TextReveal>
              </span>
            </h2>
            
            <ScrollReveal direction="up" delay={0.4}>
              <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed">
                <p>
                  Our team of highly proficient risk management specialists conducts a meticulous evaluation of our clients&apos; needs, acquiring a detailed understanding of operations, assets, and potential liabilities.
                </p>
                <p>
                  Utilizing this information, we determine the optimal choices for risk retention and transfer, executing a thorough cost-benefit analysis to develop solutions that provide comprehensive coverage in a financially sound manner.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.5}>
              <div className="mt-10 flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-white px-5 py-3.5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <Target className="text-[#115E59]" size={20} />
                  <span className="text-sm font-semibold text-slate-700">Meticulous Evaluation</span>
                </div>
                <div className="flex items-center gap-3 bg-white px-5 py-3.5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <Shield className="text-[#115E59]" size={20} />
                  <span className="text-sm font-semibold text-slate-700">Comprehensive Coverage</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="right" className="w-full mt-12 lg:mt-0 lg:h-[500px]">
            <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl group flex items-center justify-center bg-slate-50">
              <Image 
                src="/assets/image5.jpeg" 
                alt="Partnering in Success" 
                fill
                className="object-cover object-bottom group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
            </div>
          </ScrollReveal>
          
        </div>
      </div>
    </section>
  );
}
