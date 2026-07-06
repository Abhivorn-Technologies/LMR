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
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0c494f] mb-4">
              What would you like us to <span className="relative inline-block">take care of?<div className="absolute bottom-2 left-0 w-full h-[6px] bg-[#115E59]/20 -z-10 rounded-full" /></span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-3xl mx-auto">
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
                <div className="h-full bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#115E59]/30 transition-all duration-300 p-8 flex flex-col group">
                  
                  {/* Icon */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-[#115E59]/5 transition-colors">
                    <Icon className="h-8 w-8 text-[#0c494f]" strokeWidth={1.5} />
                  </div>
                  
                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-[#0c494f] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 flex-grow">
                    {service.shortDescription}
                  </p>

                  {/* Feature List */}
                  <ul className="space-y-3 mb-8">
                    {service.homePoints.map((point, idx) => (
                      <li key={idx} className="flex items-start text-sm font-semibold text-[#0c494f]">
                        <div className="mt-0.5 mr-3 flex shrink-0 h-4 w-4 rounded-full bg-[#115E59] items-center justify-center">
                          <CheckCircle2 className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </div>
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Explore Link */}
                  <Link href={service.href} className="inline-flex items-center text-sm font-bold text-[#115E59] group-hover:text-[#0c494f] transition-colors mt-auto pt-4 border-t border-slate-100">
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
