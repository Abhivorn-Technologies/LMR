"use client";

import React from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  title: string;
  description: string;
}

interface ProductStepsProps {
  title: string;
  subtitle?: string;
  steps: Step[];
}

export const ProductSteps: React.FC<ProductStepsProps> = ({ title, subtitle, steps }) => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <ScrollReveal direction="down">
            <h2 className="text-3xl md:text-[40px] font-extrabold text-[#0F172A] mb-5 tracking-tight">{title}</h2>
            {subtitle && <p className="text-[17px] text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">{subtitle}</p>}
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mt-8"></div>
          </ScrollReveal>
        </div>

        <div className="relative">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, idx) => {
              return (
                <div key={idx} className="relative group">
                  <ScrollReveal direction="up" delay={idx * 0.15}>
                    <div className="relative bg-white p-10 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-300 border border-slate-200 hover:border-blue-200 hover:-translate-y-1 h-full flex flex-col z-10">
                      
                      {/* Clean Number Indicator */}
                      <div className="absolute top-8 right-8 text-[6rem] font-black text-slate-50 leading-none pointer-events-none select-none z-0 group-hover:text-blue-50 transition-colors duration-300">
                        {idx + 1}
                      </div>

                      {/* Header Content */}
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 border border-slate-100 flex items-center justify-center text-xl font-black group-hover:scale-110 transition-transform duration-300 shadow-sm">
                            0{idx + 1}
                          </div>
                          {idx < steps.length - 1 && (
                            <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300 absolute -right-5 top-1/2 -translate-y-1/2 z-20">
                              <ArrowRight className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        
                        <h3 className="text-[20px] font-bold text-[#0F172A] mb-4 pr-12 group-hover:text-blue-600 transition-colors duration-300">
                          {step.title}
                        </h3>
                        
                        <p className="text-slate-500 font-medium leading-relaxed text-[15px]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
