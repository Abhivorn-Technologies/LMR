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
              What would you like us to take care of?
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
              <FadeIn key={service.id} delay={i * 0.1} className="h-full">
                <Link href={service.href} className="block h-full group">
                  <div className="bg-white hover:bg-[#115E59] rounded-3xl border border-slate-200 hover:border-[#115E59] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(17,94,89,0.25)] transition-all duration-700 ease-out relative overflow-hidden flex flex-col h-full z-10">
                    
                    {/* Top Icon Area */}
                    <div className="mb-6 flex justify-between items-start">
                      <div className="w-16 h-16 rounded-2xl bg-[#f8fafc] group-hover:bg-gradient-to-br group-hover:from-white/10 group-hover:to-white/0 flex items-center justify-center border border-slate-100 group-hover:border-white/20 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-700 ease-out">
                        <div className="transition-all duration-700 ease-out group-hover:scale-[1.2] group-hover:-translate-y-1 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                          <Icon className="h-8 w-8 text-[#0f172a] group-hover:text-white transition-colors duration-700" strokeWidth={1.5} />
                        </div>
                      </div>
                      
                      {/* Arrow indicator */}
                      <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-700 group-hover:bg-white/10 opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Title & Description */}
                    <h3 className="text-[22px] font-bold text-[#0f172a] group-hover:text-white mb-3 tracking-tight transition-colors duration-700">
                      {service.title}
                    </h3>
                    <p className="text-[14px] text-[#64748b] group-hover:text-white/90 font-medium leading-relaxed mb-8 flex-grow transition-colors duration-700">
                      {service.shortDescription}
                    </p>

                    {/* Feature List */}
                    <ul className="space-y-3.5 mb-2 mt-auto">
                      {service.homePoints.map((point, idx) => (
                        <li key={idx} className="flex items-start text-[13px] font-semibold text-[#0f172a] group-hover:text-white transition-colors duration-700">
                          <div className="mt-0.5 mr-3 flex shrink-0 h-[18px] w-[18px] rounded-full bg-[#10b981] group-hover:bg-white group-hover:text-[#115E59] items-center justify-center transition-colors duration-700">
                            <CheckCircle2 className="w-3 h-3 text-white group-hover:text-[#115E59] transition-colors duration-700" strokeWidth={3} />
                          </div>
                          {point}
                        </li>
                      ))}
                    </ul>

                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
