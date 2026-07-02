import { PageHero } from "@/components/layout/PageHero";
import { createPageMetadata } from "@/lib/metadata";
import { FadeIn } from "@/components/motion/FadeIn";
import { processSteps } from "@/lib/content/pages";

export const metadata = createPageMetadata({
  title: "Our Process",
  description:
    "LMB's insurance advisory process — discovery, risk assessment, program design, placement, and ongoing support.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="A structured approach to insurance advisory"
        description="From initial discovery through renewal management — every engagement follows a disciplined, documented workflow."
      />

      <section className="pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-6 w-px bg-gradient-to-b from-cyan/40 via-cyan/20 to-transparent md:left-1/2 md:-translate-x-px" />

            {processSteps.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.1}>
                <div
                  className={`relative mb-12 flex items-start gap-8 md:mb-16 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="hidden flex-1 md:block" />
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cyan/40 bg-deep-black font-display text-sm font-bold text-cyan">
                    {step.step}
                  </div>
                  <div className="flex-1 rounded-2xl border border-border bg-card p-6 md:p-8">
                    <h2 className="font-display text-xl font-semibold text-white">
                      {step.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-light">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
