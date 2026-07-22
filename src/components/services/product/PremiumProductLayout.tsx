"use client";

import React, { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ChevronRight, CheckCircle2, ShieldCheck, Star, HelpCircle, XCircle, ChevronDown } from "lucide-react";
import * as Icons from "lucide-react";
import { ProductImages, getProductImages, getFeatureSvg } from "@/lib/utils/imageMapper";

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

interface PremiumProductLayoutProps {
  data: any;
  images: ProductImages;
}

export function PremiumProductLayout({ data, images }: PremiumProductLayoutProps) {
  const shortTitle = data.title.replace('Insurance', '').trim();
  const [activeTab, setActiveTab] = useState<"included" | "excluded">("included");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  const coverageData = activeTab === "included" ? data.inclusions : data.exclusions;

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col font-sans selection:bg-yellow-500 selection:text-white bg-white text-[#1f2937] overflow-hidden">
      
      {/* 1. What is X Insurance? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 md:pt-16 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={slideInLeft}
            className="flex justify-center relative w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-100 to-yellow-50 rounded-[3rem] transform -rotate-3 scale-105 -z-10"></div>
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl w-full max-w-[500px] aspect-square flex items-center justify-center p-4 md:p-8 bg-white/50 backdrop-blur-sm relative">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
                src={images.hero} 
                alt={`What is ${data.title}`} 
                className="w-full h-full object-contain drop-shadow-xl max-h-[250px] md:max-h-[400px]" 
                onError={(e) => { e.currentTarget.src = "/assets/image3.jpeg"; }}
              />
            </div>
          </motion.div>
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={slideInRight}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 text-yellow-700 font-bold text-sm mb-2">
              <ShieldCheck size={18} /> Verified Protection
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#0F172A] leading-[1.2] tracking-tight">
              What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-400">{data.title}?</span>
            </h2>
            <div 
              className="text-[16px] md:text-lg text-slate-600 leading-relaxed font-medium space-y-4"
              dangerouslySetInnerHTML={{ __html: data.richText?.[0]?.content || `<p>${data.description}</p>` }}
            />
            <div className="pt-4 flex items-center gap-4">
              <div className="flex -space-x-4 shrink-0">
                <img className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white object-cover" src="/assets/image1.jpeg" alt="Customer" onError={(e) => e.currentTarget.style.display = 'none'} />
                <img className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white object-cover" src="/assets/image4.jpeg" alt="Customer" onError={(e) => e.currentTarget.style.display = 'none'} />
                <img className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white object-cover" src="/assets/image5.jpeg" alt="Customer" onError={(e) => e.currentTarget.style.display = 'none'} />
              </div>
              <div className="text-xs md:text-sm font-bold text-slate-700">
                Trusted by 10,000+ <br className="hidden sm:block"/><span className="text-slate-500 font-normal">Happy Customers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Key Features */}
      {data.features && data.features.length > 0 && (
        <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-[40px] font-extrabold text-[#0F172A] mb-4 md:mb-5 tracking-tight">{data.featuresTitle || `Key Features of LMB ${shortTitle}`}</h2>
              <div className="w-16 md:w-20 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mx-auto mb-4 md:mb-6"></div>
              <p className="text-[16px] md:text-[19px] text-slate-600 max-w-3xl mx-auto leading-relaxed px-2">
                {data.featuresSubtitle || `Our ${shortTitle} policies are designed to provide complete financial and legal protection.`}
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="flex flex-wrap justify-center gap-6 md:gap-8">
              {data.features.map((feature: any, i: number) => {
                const IconComponent = (Icons as any)[feature.iconName || "ShieldCheck"] || Icons.ShieldCheck;
                return (
                  <motion.div key={i} variants={i % 2 === 0 ? slideInLeft : slideInRight} className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.333rem)] bg-white border border-slate-200 rounded-[1.5rem] p-8 shadow-sm hover:shadow-[0_20px_50px_rgba(234,179,8,0.15)] hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full cursor-default">
                    <div className="w-14 h-14 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center mb-6 shadow-sm border border-yellow-100 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-yellow-500 group-hover:text-white">
                      <IconComponent size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-3 leading-tight group-hover:text-yellow-600 transition-colors">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed font-medium mt-auto text-[15px]">{feature.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* 3. Decision Guide (Mapped from steps) */}
      {data.steps && data.steps.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-slate-100">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-[40px] font-extrabold text-[#0F172A] mb-4 md:mb-5 tracking-tight">{data.stepsTitle || `How does ${shortTitle} work?`}</h2>
            <div className="w-16 md:w-20 h-1.5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mx-auto mb-4 md:mb-6"></div>
            <p className="text-[16px] md:text-[19px] text-slate-600 max-w-3xl mx-auto leading-relaxed px-2">
              {data.stepsSubtitle || `A simple, fully digital, and completely hassle-free process for your peace of mind.`}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={slideInLeft}
              className="flex justify-center order-first lg:order-none"
            >
              <div className="relative w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square max-w-[500px]">
                <div className="absolute inset-0 bg-yellow-500/20 mix-blend-overlay z-10 rounded-[2rem] md:rounded-[2.5rem]"></div>
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                  src={images.rightForMe} 
                  alt="Decision guide" 
                  className="w-full h-full object-cover" 
                  onError={(e) => { e.currentTarget.src = "/assets/image4.jpeg"; }}
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
              className="space-y-4 md:space-y-6"
            >
              {data.steps.map((step: any, i: number) => (
                  <motion.div key={i} variants={slideInRight} className="bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-3xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-3 md:mb-4 flex items-center gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center text-sm md:text-lg shrink-0">
                        {i + 1}
                      </div>
                      {step.title}
                    </h3>
                    <div className="pl-11 md:pl-13 text-slate-600 font-medium text-[15px] md:text-[16px] leading-relaxed">
                      {step.description}
                    </div>
                  </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* 4. What's Covered (Mapped from Inclusions/Exclusions) */}
      {(data.inclusions?.length > 0 || data.exclusions?.length > 0) && (
        <section className="bg-[#0F172A] py-16 md:py-24 relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-yellow-600 rounded-full blur-[80px] md:blur-[120px] opacity-10 transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-yellow-500 rounded-full blur-[80px] md:blur-[120px] opacity-10 transform -translate-x-1/3 translate-y-1/3"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-[40px] font-extrabold text-white mb-4 md:mb-5 tracking-tight">What's Covered in LMB {shortTitle}?</h2>
              <div className="w-16 md:w-20 h-1.5 bg-yellow-500 rounded-full mx-auto mb-4 md:mb-6"></div>
              <p className="text-[16px] md:text-[19px] text-slate-300 max-w-4xl mx-auto leading-relaxed px-2">
                A transparent look at your policy coverage. Understand exactly what is included and what is excluded.
              </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
              <div className="flex justify-center mb-10 md:mb-12">
                <div className="bg-white/10 backdrop-blur-md p-1 md:p-1.5 rounded-[1rem] md:rounded-2xl flex flex-row border border-white/20 w-full sm:w-auto">
                  <button 
                    onClick={() => setActiveTab("included")}
                    className={`flex-1 sm:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-[14px] sm:text-[16px] transition-all duration-300 flex justify-center items-center gap-1.5 sm:gap-2 ${
                      activeTab === "included" ? "bg-white text-yellow-600 shadow-lg" : "text-white hover:bg-white/10"
                    }`}
                  >
                    <CheckCircle2 size={16} className="sm:w-[18px] sm:h-[18px]" /> Inclusions
                  </button>
                  <button 
                    onClick={() => setActiveTab("excluded")}
                    className={`flex-1 sm:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-[14px] sm:text-[16px] transition-all duration-300 flex justify-center items-center gap-1.5 sm:gap-2 ${
                      activeTab === "excluded" ? "bg-white text-red-500 shadow-lg" : "text-white hover:bg-white/10"
                    }`}
                  >
                    <XCircle size={16} className="sm:w-[18px] sm:h-[18px]" /> Exclusions
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="flex flex-wrap justify-center gap-6 md:gap-8">
              {coverageData?.map((item: any, i: number) => (
                  <motion.div key={i} variants={i % 2 === 0 ? slideInLeft : slideInRight} className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.333rem)] bg-white/10 backdrop-blur-md border border-white/20 rounded-[1.5rem] p-8 flex flex-col text-left hover:bg-white/15 transition-all duration-300 shadow-xl group h-full">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${activeTab === 'included' ? 'bg-yellow-400/20 text-yellow-400' : 'bg-red-400/20 text-red-400'}`}>
                      {activeTab === 'included' ? <CheckCircle2 size={28} strokeWidth={2.5} /> : <XCircle size={28} strokeWidth={2.5} />}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 leading-tight">{item.title}</h3>
                    <p className="text-slate-300 leading-relaxed font-medium text-[15px]">{item.description}</p>
                  </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* 5. FAQs */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="bg-slate-50 py-16 md:py-24 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-[40px] font-extrabold text-[#0F172A] mb-4 md:mb-5 tracking-tight">Frequently Asked Questions</h2>
              <div className="w-16 md:w-20 h-1.5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mx-auto"></div>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="space-y-3 md:space-y-4">
              {data.faqs.map((faq: any, i: number) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp} 
                  className="bg-white rounded-[1rem] shadow-sm border border-slate-200 border-l-[4px] border-l-yellow-500 hover:shadow-md transition-all overflow-hidden"
                >
                  <button 
                    onClick={() => toggleFaq(i)}
                    className="w-full text-left py-4 px-5 md:py-5 md:px-6 flex justify-between items-center focus:outline-none"
                  >
                    <h3 className="text-[15px] md:text-[17px] font-semibold text-[#0F172A] pr-4">
                      {faq.q || faq.question}
                    </h3>
                    <motion.div 
                      animate={{ rotate: openFaqIndex === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0 text-slate-400"
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openFaqIndex === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-5 pt-0 text-slate-600 font-medium leading-relaxed text-[14px] md:text-[15px]">
                          {faq.a || faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
      
    </div>
  );
}
