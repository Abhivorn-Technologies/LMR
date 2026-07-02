import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { companyProfile } from "@/lib/content/company";
import { whyLmbPoints } from "@/lib/content/pages";

export function WhyPreview() {
  return (
    <section className="pt-16 md:pt-20 pb-24 md:pb-32 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#115E59]/5 to-transparent rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          
          <FadeIn className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 mb-8 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#115E59]" />
              <span className="text-xs font-bold tracking-[0.2em] text-[#115E59] uppercase">Why LMB</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Advisory you can <span className="text-[#115E59] font-serif italic">rely on.</span>
            </h2>
            
            <p className="text-lg text-slate-600 font-light leading-relaxed mb-10">
              {companyProfile.compositeNote}
            </p>

            <Link href="/about" className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-[#115E59] text-white font-semibold shadow-lg shadow-[#115E59]/20 hover:bg-[#0a3a3f] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#115E59]/30 transition-all">
              Learn About Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 h-full">
            {whyLmbPoints.slice(0, 4).map((point, i) => (
              <FadeIn key={point.title} delay={i * 0.1} className="h-full">
                <div className="h-full flex flex-col rounded-[2rem] border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-[#115E59]/30 hover:shadow-xl hover:shadow-[#115E59]/5 hover:-translate-y-1">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#115E59]/10">
                    <CheckCircle2 className="h-6 w-6 text-[#115E59]" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900">
                    {point.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-light leading-relaxed flex-1">
                    {point.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
