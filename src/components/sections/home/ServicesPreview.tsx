import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { FadeIn } from "@/components/motion/FadeIn";
import { services } from "@/lib/content/services";

export function ServicesPreview() {
  return (
    <section className="relative py-20 bg-white">
      <div className="mx-auto max-w-[1400px] px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] mb-4">
              What would you like us to <span className="relative inline-block">take care of?<div className="absolute bottom-2 left-0 w-full h-[6px] bg-[#ffb800] -z-10 rounded-sm" /></span>
            </h2>
            <p className="text-lg md:text-xl text-[#64748b] font-medium max-w-3xl mx-auto">
              Comprehensive broking across general insurance, life insurance, reinsurance, and risk management.
            </p>
          </FadeIn>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.id} delay={i * 0.1}>
                <div className="h-full bg-white rounded-3xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 hover:border-[#0ea5e9]/30 transition-all duration-300 p-8 flex flex-col group">
                  
                  {/* Icon */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8fafc] border border-slate-100 group-hover:bg-[#f0f9ff] group-hover:border-[#0ea5e9]/20 transition-colors">
                    <Icon className="h-8 w-8 text-[#0ea5e9]" strokeWidth={1.5} />
                  </div>
                  
                  {/* Title & Description */}
                  <h3 className="text-[22px] font-bold text-[#0f172a] mb-3 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-[14px] text-[#64748b] font-medium leading-relaxed mb-8 flex-grow">
                    {service.shortDescription}
                  </p>

                  {/* Feature List */}
                  <ul className="space-y-3.5 mb-8">
                    {service.homePoints.map((point, idx) => (
                      <li key={idx} className="flex items-start text-[13px] font-semibold text-[#0f172a]">
                        <div className="mt-0.5 mr-3 flex shrink-0 h-[18px] w-[18px] rounded-full bg-[#10b981] items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Explore Link */}
                  <Link href={service.href} className="inline-flex items-center text-[13px] font-bold text-[#0ea5e9] group-hover:text-[#0284c7] transition-colors mt-auto pt-5 border-t border-slate-100">
                    Explore <span className="ml-1 text-[16px]">→</span>
                  </Link>

                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
