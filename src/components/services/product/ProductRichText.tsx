"use client";

import React from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { cn } from "@/lib/utils";

export interface RichTextBlock {
  title?: string;
  content: string;
  highlight?: boolean;
}

interface ProductRichTextProps {
  blocks: RichTextBlock[];
}

export const ProductRichText: React.FC<ProductRichTextProps> = ({ blocks }) => {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-16 lg:space-y-24">
        {blocks.map((block, idx) => {
          const direction = idx % 2 === 0 ? "left" : "right";

          return (
            <div key={idx} className={cn("grid lg:grid-cols-12 gap-8 lg:gap-16 items-center")}>
              <div className="lg:col-span-12 relative">
                <ScrollReveal direction={direction}>
                  <div className="relative">
                    <div 
                      className={cn(
                        "rounded-[2.5rem] p-8 md:p-12 transition-all duration-300 overflow-hidden relative border",
                        block.highlight 
                          ? "bg-[#0F172A] border-[#0F172A] shadow-2xl" 
                          : "bg-slate-50 border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                      )}
                    >
                      <div className="relative z-10">
                        {block.title && (
                          <h2 
                            className={cn(
                              "text-[32px] font-extrabold mb-6 tracking-tight",
                              block.highlight ? "text-white" : "text-[#0F172A]"
                            )}
                          >
                            {block.title}
                          </h2>
                        )}
                        
                        <div 
                          className={cn(
                            "max-w-none leading-relaxed text-[17px] font-medium",
                            "[&_p]:mb-6",
                            "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_li]:mb-2",
                            "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_li]:mb-2",
                            block.highlight 
                              ? "[&_p]:text-slate-300 [&_li]:text-slate-300 [&_a]:text-blue-400 hover:[&_a]:text-white [&_strong]:text-white" 
                              : "[&_p]:text-slate-500 [&_li]:text-slate-500 [&_a]:text-blue-600 hover:[&_a]:text-[#0F172A] [&_strong]:text-[#0F172A]"
                          )}
                          dangerouslySetInnerHTML={{ __html: block.content }}
                        />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
