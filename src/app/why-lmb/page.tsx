import { PageHero } from "@/components/layout/PageHero";
import { createPageMetadata } from "@/lib/metadata";
import { FadeIn } from "@/components/motion/FadeIn";
import { Card } from "@/components/ui/Card";
import { CTA } from "@/components/sections/home/CTA";
import { whyLmbPoints } from "@/lib/content/pages";

export const metadata = createPageMetadata({
  title: "Why Choose LMB",
  description:
    "Why businesses choose LMB Insurance Brokers — composite broking, licensed operations, dedicated advisory, and industry depth.",
  path: "/why-lmb",
});

export default function WhyLmbPage() {
  return (
    <>
      <PageHero
        eyebrow="Why LMB"
        title="Trust built through disciplined advisory"
        description="LMB combines composite broking capability with structured risk management — one advisory relationship across insurance lines."
      />

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyLmbPoints.map((point, i) => (
              <FadeIn key={point.title} delay={i * 0.07}>
                <Card className="h-full">
                  <span className="text-xs font-bold text-cyan/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 font-display text-xl font-semibold text-white">
                    {point.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-light">
                    {point.description}
                  </p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
