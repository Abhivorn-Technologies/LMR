import { createPageMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/content/services";
import { MethodologySection } from "@/components/sections/MethodologySection";
import { BusinessLinesSection } from "@/components/sections/BusinessLinesSection";

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

      {/* Elegant Service Cards with Images */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 mb-32">
        <div className="flex flex-wrap justify-center gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
            <div key={service.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
              <ScrollReveal direction="up" delay={0.1 * (index + 1)} className="h-full">
                <Link href={service.href} className="block h-full group">
                  <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl hover:shadow-2xl hover:shadow-[#115E59]/10 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden flex flex-col h-full">
                    
                    {/* Image Header */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image 
                        src={service.image} 
                        alt={service.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-8 pt-10 flex flex-col flex-grow relative">
                      {/* Floating Icon */}
                      <div className="absolute -top-10 left-8 w-16 h-16 rounded-2xl bg-white flex items-center justify-center border-4 border-white shadow-sm group-hover:bg-[#115E59] group-hover:border-[#115E59] transition-colors duration-500 z-10">
                        <Icon size={24} className="text-[#115E59] group-hover:text-white transition-colors duration-500" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#115E59] transition-colors duration-300">
                        {service.title}
                      </h3>
                      
                      <p className="text-slate-600 font-light leading-relaxed mb-4 flex-grow">
                        {service.shortDescription}
                      </p>
                    </div>

                  </div>
                </Link>
              </ScrollReveal>
            </div>
            );
          })}
        </div>
      </section>

      {/* New Business Lines Section */}
      <BusinessLinesSection />

      {/* Methodology Section with Pinning Scroll Effect */}
      <MethodologySection />

    </div>
  );
}
