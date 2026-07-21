import { createPageMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/content/services";
import { MethodologySection } from "@/components/sections/MethodologySection";

export const metadata = createPageMetadata({
  title: "Services",
  description: "Comprehensive insurance and risk management services by LMB Insurance Brokers.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 relative z-0 selection:bg-[#115E59] selection:text-white">
      
      <section className="pt-32 pb-12 px-6 max-w-6xl mx-auto w-full">
        <ScrollReveal direction="down" delay={0.1} className="w-full">
          <div className="relative w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-[8px] border-white ring-1 ring-slate-900/5 bg-slate-50">
            <Image 
              src="/assets/service-10.png" 
              alt="LMB Services Background" 
              width={1600}
              height={900}
              className="w-full h-auto"
              priority
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Hero Text Section (Below Image) */}
      <section className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center pb-24">
        <ScrollReveal direction="up" delay={0.2}>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2 mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#115E59]" />
            <span className="text-sm font-bold tracking-[0.2em] text-[#115E59] uppercase">Our Expertise</span>
          </div>
        </ScrollReveal>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-8">
          <TextReveal delay={0.3}>Comprehensive </TextReveal>
          <br />
          <span className="text-[#115E59] font-serif italic">
            <TextReveal delay={0.5}>Insurance Solutions.</TextReveal>
          </span>
        </h1>
        
        <ScrollReveal direction="up" delay={0.6}>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Tailored risk management and elite insurance broking services designed to protect what matters most to you and your enterprise.
          </p>
        </ScrollReveal>
      </section>

      {/* Elegant Icon-Centric Service Cards */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.id} direction="up" delay={0.1 * (index + 1)} className="h-full">
                <Link href={service.href} className="block h-full group">
                  <div className="bg-white hover:bg-[#115E59] rounded-2xl border border-slate-200/60 hover:border-[#115E59] p-8 shadow-sm hover:shadow-[0_20px_40px_rgba(17,94,89,0.25)] transition-all duration-700 ease-out relative overflow-hidden flex flex-col h-full z-10">
                    
                    {/* Top Icon Area */}
                    <div className="mb-8 flex justify-between items-start">
                      <div className="w-20 h-20 rounded-2xl bg-slate-50 group-hover:bg-gradient-to-br group-hover:from-white/10 group-hover:to-white/0 flex items-center justify-center border border-slate-100 group-hover:border-white/20 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-700 ease-out">
                        <div className="transition-all duration-700 ease-out group-hover:scale-[1.3] group-hover:-translate-y-1 group-hover:drop-shadow-[0_0_25px_rgba(0,229,255,0.8)]">
                          <Icon className="w-11 h-11" />
                        </div>
                      </div>
                      
                      {/* Arrow indicator */}
                      <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-700 group-hover:bg-white/10 opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-white mb-3 transition-colors duration-700">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 font-medium text-sm leading-relaxed flex-grow group-hover:text-white transition-colors duration-700">
                        {service.shortDescription}
                      </p>
                    </div>

                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </section>



      {/* Methodology Section with Pinning Scroll Effect */}
      <MethodologySection />

    </div>
  );
}
