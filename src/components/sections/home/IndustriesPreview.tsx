import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { industries } from "@/lib/content/industries";

export function IndustriesPreview() {
  return (
    <section className="relative overflow-hidden bg-[#f4f9f9] pt-24 md:pt-32 pb-24">
      <div className="relative mx-auto max-w-[1400px] px-6">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center gap-6 mb-16">
          <FadeIn className="max-w-3xl flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0c494f] mb-6">
              Specialized <span className="relative inline-block">sector expertise<div className="absolute bottom-2 left-0 w-full h-[6px] bg-[#115E59]/20 -z-10 rounded-full" /></span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-3xl">
              Insurance programs meticulously tailored to your industry's exposures, compliance mandates, and operational environments.
            </p>
          </FadeIn>
        </div>
          
        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          {industries.slice(0, 5).map((industry, i) => {
            const Icon = industry.icon;
            return (
              <FadeIn key={industry.id} delay={i * 0.1}>
                <div className="h-full bg-white rounded-3xl p-8 flex flex-col items-center text-center border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#115E59]/30 transition-all duration-300">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 border border-slate-100">
                    <Icon className="h-7 w-7 text-[#0c494f]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[17px] font-bold text-[#0c494f] mb-3">
                    {industry.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">
                    {industry.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* View All Industries Button */}
        <FadeIn delay={0.2}>
          <div className="flex justify-center mb-16">
            <Link href="/industries" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border-2 border-[#115E59] text-[#115E59] font-bold rounded-xl hover:bg-[#115E59] hover:text-white transition-all duration-300 shadow-sm">
              View All Industries <ArrowRight size={18} />
            </Link>
          </div>
        </FadeIn>

        {/* Bottom CTA Banner */}
        <FadeIn delay={0.4}>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <h4 className="text-lg md:text-xl font-bold text-[#0c494f] text-center sm:text-left">
              Don't see your industry listed? We probably cover it too.
            </h4>
            <Link href="/contact" className="shrink-0 bg-[#115E59] hover:bg-[#0c494f] text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg shadow-[#115E59]/20 flex items-center justify-center">
              Consult With Our Experts <span className="ml-2 font-normal">→</span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
