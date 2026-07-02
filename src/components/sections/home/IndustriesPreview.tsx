"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
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
    <section className="relative overflow-hidden bg-surface py-16 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center gap-6 mb-10">
          <FadeIn>
            <SectionHeading
              align="center"
              eyebrow="Industries"
              title="Sector expertise"
              description="Insurance programs tailored to industry-specific exposures and regulatory environments."
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                disabled={!canPrev}
                aria-label="Previous"
                className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/15"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                disabled={!canNext}
                aria-label="Next"
                className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/15"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </FadeIn>
        </div>

        <div className="mt-8 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {industries.map((industry, i) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.id}
                  className="min-w-0 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <FadeIn delay={i * 0.05}>
                    <div className="group h-full rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:border-border-hover hover:bg-card-hover">
                      <Icon className="mb-6 h-8 w-8 text-cyan" />
                      <h3 className="font-display text-2xl font-semibold text-white">
                        {industry.title}
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-[#c4e0e6]">
                        {industry.description}
                      </p>
                    </div>
                  </FadeIn>
                </div>
              );
            })}
          </div>
        </div>

        <FadeIn delay={0.2} className="mt-10 text-center">
          <Link href="/industries">
            <Button variant="secondary">View All Industries</Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
