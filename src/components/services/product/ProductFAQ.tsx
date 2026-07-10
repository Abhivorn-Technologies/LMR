"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface FAQ {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  faqs: FAQ[];
}

export const ProductFAQ: React.FC<ProductFAQProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-slate-50 py-24 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <ScrollReveal direction="down">
            <h2 className="text-3xl md:text-[40px] font-extrabold text-[#0F172A] mb-5 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-[17px] text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">Have questions? We have answers.</p>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mt-8"></div>
          </ScrollReveal>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal key={idx} direction="up" delay={idx * 0.1}>
                <div 
                  className={`border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 bg-white ${
                    isOpen ? "shadow-md ring-1 ring-blue-500/20" : "hover:shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                  >
                    <span className={`text-[18px] font-bold pr-8 transition-colors ${isOpen ? "text-blue-600" : "text-[#0F172A]"}`}>
                      {faq.question}
                    </span>
                    <ChevronDown 
                      className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-600" : "text-slate-400"}`} 
                      size={24} 
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 md:px-8 pb-8 text-[15px] text-slate-500 font-medium leading-relaxed border-t border-slate-50 mt-2">
                          <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
