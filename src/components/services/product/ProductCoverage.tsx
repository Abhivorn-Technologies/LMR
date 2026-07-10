"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CheckCircle2, XCircle } from "lucide-react";

interface CoverageItem {
  title: string;
  description: string;
}

interface ProductCoverageProps {
  inclusions: CoverageItem[];
  exclusions: CoverageItem[];
}

export const ProductCoverage: React.FC<ProductCoverageProps> = ({ inclusions, exclusions }) => {
  const [activeTab, setActiveTab] = useState<"included" | "excluded">("included");
  const data = activeTab === "included" ? inclusions : exclusions;

  return (
    <section className="bg-[#0F172A] py-24 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[120px] opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500 rounded-full blur-[120px] opacity-10 transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="down">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-[40px] font-extrabold text-white mb-5 tracking-tight">What's Covered & What's Not?</h2>
            <div className="w-20 h-1.5 bg-orange-500 rounded-full mx-auto mb-6"></div>
            <p className="text-[19px] text-slate-300 max-w-4xl mx-auto leading-relaxed">
              A transparent look at your policy coverage. Understand exactly what is included and what is excluded.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <div className="flex justify-center mb-12">
            <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-2xl flex border border-white/20">
              <button 
                onClick={() => setActiveTab("included")}
                className={`px-8 py-3 rounded-xl font-bold text-[16px] transition-all duration-300 flex items-center gap-2 ${
                  activeTab === "included" ? "bg-white text-blue-600 shadow-lg" : "text-white hover:bg-white/10"
                }`}
              >
                <CheckCircle2 size={18} /> Inclusions
              </button>
              <button 
                onClick={() => setActiveTab("excluded")}
                className={`px-8 py-3 rounded-xl font-bold text-[16px] transition-all duration-300 flex items-center gap-2 ${
                  activeTab === "excluded" ? "bg-white text-orange-500 shadow-lg" : "text-white hover:bg-white/10"
                }`}
              >
                <XCircle size={18} /> Exclusions
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item, idx) => (
            <ScrollReveal key={idx} direction="up" delay={(idx % 3) * 0.1}>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[1.5rem] p-8 flex flex-col text-left hover:bg-white/15 transition-all duration-300 shadow-xl group h-full">
                <div className="h-16 flex items-center justify-start mb-4">
                  {activeTab === "included" ? (
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle2 size={28} />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <XCircle size={28} />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 leading-tight">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed font-medium">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
