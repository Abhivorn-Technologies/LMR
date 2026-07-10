"use client";

import React from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

export interface Feature {
  title: string;
  description: string;
  iconName?: string;
}

interface ProductFeaturesProps {
  title: string;
  subtitle?: string;
  features: Feature[];
}

export const ProductFeatures: React.FC<ProductFeaturesProps> = ({ title, subtitle, features }) => {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal direction="down">
            <h2 className="text-3xl md:text-[40px] font-extrabold text-[#0F172A] mb-5 tracking-tight">{title}</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mx-auto mb-6"></div>
            {subtitle && <p className="text-[19px] text-slate-600 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>}
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            // @ts-ignore - dynamic icon loading
            const IconComponent = feature.iconName && Icons[feature.iconName] ? Icons[feature.iconName] : Icons.CheckCircle2;
            
            return (
              <ScrollReveal key={idx} direction="up" delay={(idx % 3) * 0.1}>
                <div className="bg-white border border-slate-200 rounded-[1.5rem] p-8 shadow-sm hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col cursor-default">
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                    <IconComponent size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3 leading-tight">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed mt-auto text-[15px]">{feature.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
