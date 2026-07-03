"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { industries } from "@/lib/content/industries";

export function IndustriesPreview() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    update();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  return (
    <section className="relative overflow-hidden bg-white pt-24 md:pt-32 pb-16 border-t border-slate-100">
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
          <FadeIn delay={0.1} className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-12 -right-12 justify-between z-20 pointer-events-none">
            <button
              onClick={scrollPrev}
              disabled={!canPrev}
              aria-label="Previous"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition-all hover:border-[#115E59] hover:text-[#115E59] hover:shadow-lg disabled:opacity-0 pointer-events-auto -ml-4"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canNext}
              aria-label="Next"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition-all hover:border-[#115E59] hover:text-[#115E59] hover:shadow-lg disabled:opacity-0 pointer-events-auto -mr-4"
            >
              <ChevronRight className="h-5 w-5" />
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
                      <div className="group h-full rounded-2xl border border-slate-100 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#115E59]/10 hover:border-[#115E59]/20 relative flex flex-col overflow-hidden">
                        
                        <div className="relative z-10 flex flex-col h-full">
                          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-[#115E59] group-hover:border-[#115E59] transition-colors duration-300 shadow-sm">
                            <Icon className="h-6 w-6 text-[#115E59] group-hover:text-white transition-colors duration-300" />
                          </div>
                          
                          <h3 className="mb-3 text-xl font-bold text-slate-900 group-hover:text-[#115E59] transition-colors duration-300">
                            {industry.title}
                          </h3>
                          
                          <p className="text-slate-600 font-light text-sm leading-relaxed flex-1">
                            {industry.description}
                          </p>
                        </div>
                      </div>
                    </FadeIn>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Dots */}
        <div className="flex lg:hidden justify-center items-center gap-2 mt-8 mb-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`transition-all duration-300 rounded-full ${
                index === selectedIndex
                  ? "w-6 h-1.5 bg-[#115E59]"
                  : "w-1.5 h-1.5 bg-slate-200 hover:bg-slate-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <FadeIn delay={0.2} className="mt-4 text-center">
          <p className="text-slate-500 mb-4 font-light text-sm">Don&apos;t see your industry listed?</p>
          <Link href="/contact" className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold shadow-sm hover:border-[#115E59] hover:text-[#115E59] hover:shadow-md transition-all text-sm">
            Consult With Our Experts
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
