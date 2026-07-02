"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { industries } from "@/lib/content/industries";

export function IndustriesPreview() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    update();
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32 border-t border-slate-100">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-multiply pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#115E59]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center gap-8 mb-16">
          <FadeIn className="max-w-3xl flex flex-col items-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-2 mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#115E59]" />
              <span className="text-xs font-bold tracking-[0.2em] text-[#115E59] uppercase">Industries</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Specialized <span className="text-[#115E59] font-serif italic">Sector Expertise.</span>
            </h2>
            <p className="text-lg text-slate-600 font-light leading-relaxed">
              Insurance programs meticulously tailored to address your industry-specific exposures, compliance mandates, and operational environments.
            </p>
          </FadeIn>
        </div>
          
        {/* Carousel Section */}
        <div className="relative mt-12">
          {/* Navigation Arrows (Positioned on the sides) */}
          <FadeIn delay={0.1} className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-6 -right-6 justify-between z-20 pointer-events-none">
            <button
              onClick={scrollPrev}
              disabled={!canPrev}
              aria-label="Previous"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg transition-all hover:border-[#115E59] hover:text-[#115E59] hover:shadow-xl disabled:opacity-0 pointer-events-auto -ml-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canNext}
              aria-label="Next"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg transition-all hover:border-[#115E59] hover:text-[#115E59] hover:shadow-xl disabled:opacity-0 pointer-events-auto -mr-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </FadeIn>

          <div className="overflow-hidden -mx-4 px-4 pb-8 pt-4" ref={emblaRef}>
            <div className="flex gap-8">
              {industries.map((industry, i) => {
                const Icon = industry.icon;
                return (
                  <div
                    key={industry.id}
                    className="min-w-0 flex-[0_0_100%] md:flex-[0_0_calc(50%-1rem)] lg:flex-[0_0_calc(33.333%-1.33rem)]"
                  >
                    <FadeIn delay={i * 0.1} className="h-full">
                      <div className="group h-full rounded-[2rem] border border-slate-100 bg-white p-10 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#115E59]/10 relative flex flex-col overflow-hidden">
                        
                        {/* Hover Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#115E59]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="relative z-10">
                          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-[#115E59] group-hover:border-[#115E59] transition-colors duration-500 shadow-sm">
                            <Icon className="h-7 w-7 text-[#115E59] group-hover:text-white transition-colors duration-500" />
                          </div>
                          
                          <h3 className="mb-4 text-2xl font-bold text-slate-900 group-hover:text-[#115E59] transition-colors duration-300">
                            {industry.title}
                          </h3>
                          
                          <p className="text-slate-600 font-light leading-relaxed mb-8">
                            {industry.description}
                          </p>
                        </div>

                        <div className="mt-auto relative z-10 flex items-center text-[#115E59] font-medium text-sm tracking-wide">
                          Learn More 
                          <ArrowRight size={16} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </div>
                        
                      </div>
                    </FadeIn>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <FadeIn delay={0.2} className="mt-4 text-center">
          <p className="text-slate-500 mb-4 font-light text-sm">Don't see your industry listed?</p>
          <Link href="/contact" className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold shadow-sm hover:border-[#115E59] hover:text-[#115E59] hover:shadow-md transition-all text-sm">
            Consult With Our Experts
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
