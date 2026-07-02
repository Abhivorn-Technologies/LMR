import { createPageMetadata, PageHero } from "@/components/layout/PageHero";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CTA } from "@/components/sections/home/CTA";
import { reinsuranceContent } from "@/lib/content/pages";
import { CheckCircle2 } from "lucide-react";

export const metadata = createPageMetadata({
  title: "Reinsurance",
  description:
    "Reinsurance advisory from LMB — treaty programs, facultative placement, retention strategy, and global market access.",
  path: "/reinsurance",
});

export default function ReinsurancePage() {
  return (
    <>
      <PageHero
        eyebrow="Reinsurance"
        title={reinsuranceContent.headline}
        description={reinsuranceContent.subheadline}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-light">
              {reinsuranceContent.intro}
            </p>
          </FadeIn>

          <FadeIn className="mt-20">
            <SectionHeading eyebrow="Expertise" title="Reinsurance capabilities" />
          </FadeIn>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {reinsuranceContent.expertise.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <Card className="h-full">
                  <h3 className="font-display text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-light">
                    {item.description}
                  </p>
                </Card>
              </FadeIn>
            ))}
          </div>

          <div className="mt-24 grid gap-16 lg:grid-cols-2">
            <FadeIn>
              <SectionHeading eyebrow="Process" title="How we work" />
              <ol className="mt-8 space-y-4">
                {reinsuranceContent.process.map((step, i) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan/30 bg-cyan/5 text-xs font-bold text-cyan">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pt-1 text-muted-light">{step}</span>
                  </li>
                ))}
              </ol>
            </FadeIn>

            <FadeIn delay={0.1}>
              <SectionHeading eyebrow="Benefits" title="Client advantages" />
              <ul className="mt-8 space-y-4">
                {reinsuranceContent.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
                    <span className="text-muted-light">{benefit}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          <FadeIn className="mt-24">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-12">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan/5 via-transparent to-cyan/5" />
              <div className="relative grid gap-8 md:grid-cols-3">
                {[
                  { label: "Treaty", desc: "Proportional & non-proportional structures" },
                  { label: "Facultative", desc: "Individual risk placement" },
                  { label: "Strategy", desc: "Retention & capacity optimization" },
                ].map((node) => (
                  <div
                    key={node.label}
                    className="rounded-xl border border-border bg-surface p-6 text-center"
                  >
                    <p className="font-display text-lg font-semibold text-cyan">
                      {node.label}
                    </p>
                    <p className="mt-2 text-sm text-muted-light">{node.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTA />
    </>
  );
}
