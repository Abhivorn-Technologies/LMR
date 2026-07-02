import { createPageMetadata, PageHero } from "@/components/layout/PageHero";
import { FadeIn } from "@/components/motion/FadeIn";
import { Card } from "@/components/ui/Card";
import { industries } from "@/lib/content/industries";

export const metadata = createPageMetadata({
  title: "Industries",
  description:
    "Industry-specific insurance programs for construction, oil & energy, marine, aviation, and travel sectors.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Sector-specific insurance expertise"
        description="Each industry carries distinct exposures. LMB structures programs aligned to sector risk profiles and regulatory requirements."
      />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 space-y-12">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <FadeIn key={industry.id} delay={i * 0.06}>
                <Card glow={i === 0}>
                  <div className="grid gap-8 lg:grid-cols-[auto_1fr]">
                    <Icon className="h-10 w-10 text-cyan" />
                    <div>
                      <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                        {industry.title}
                      </h2>
                      <p className="mt-4 max-w-3xl leading-relaxed text-muted-light">
                        {industry.description}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {industry.coverageAreas.map((area) => (
                          <span
                            key={area}
                            className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-light"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </>
  );
}
