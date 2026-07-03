"use client";

import Image from "next/image";
import { Building2, FileText, Calendar, Award } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextReveal } from "@/components/motion/TextReveal";

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
                <span className="text-xs font-bold tracking-[0.2em] text-[#115E59] uppercase">Company Profile</span>
              </div>
            </ScrollReveal>
            
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-slate-900 mb-8 leading-[1.1] tracking-tight">
              <TextReveal delay={0.1}>Authorized &</TextReveal>
              <br />
              <span className="text-[#115E59] font-serif italic">
                <TextReveal delay={0.3}>Registered Brokers.</TextReveal>
              </span>
            </h2>
            
            <ScrollReveal direction="up" delay={0.4}>
              <div className="space-y-6 text-[1.05rem] text-slate-600 font-light leading-relaxed">
                <p>
                  L M B Insurance Brokers Pvt. Ltd., is a Private Limited Company incorporated under the Companies Act, 1956, and registered with the Insurance Regulatory and Development Authority of India (IRDAI) vide Certificate of Registration (CoR) No: 116 to solicit insurance (Direct (Life & General) and Reinsurance) business as per IRDAI (Insurance Brokers) Regulations and such other applicable Regulations as issued/amended by the Authority (IRDAI) from time to time.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.5}>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="flex flex-col bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="text-[#115E59]" size={16} />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">CIN</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">U66010KL2002PTC015686</span>
                </div>

                <div className="flex flex-col bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="text-[#115E59]" size={16} />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">MCA Reg No</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">015686 (RoC Ernakulam)</span>
                </div>

                <div className="flex flex-col bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="text-[#115E59]" size={16} />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Incorporation</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">08/10/2002</span>
                </div>

                <div className="flex flex-col bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="text-[#115E59]" size={16} />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">IRDAI License</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">18-02-2003 (First Issued)</span>
                </div>

              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="right" className="w-full mt-12 lg:mt-0 relative group">
            {/* Soft sophisticated glow behind the image */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#115E59]/30 to-[#00B4D8]/20 rounded-[3rem] blur-2xl -z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative h-[450px] md:h-[550px] lg:h-[650px] w-full rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(17,94,89,0.15)] bg-white p-3">
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden border border-slate-100/50">
                <Image 
                  src="/assets/lmr image.png" 
                  alt="Company Registration" 
                  fill
                  className="object-cover object-center group-hover:scale-[1.05] transition-transform duration-[2s] ease-out"
                />
                <div className="absolute inset-0 bg-slate-900/5 mix-blend-multiply transition-colors duration-700 group-hover:bg-transparent pointer-events-none" />
              </div>
            </div>
          </ScrollReveal>
          
        </div>
      </div>
    </section>
  );
}
