import { PageHero } from "@/components/layout/PageHero";
import { createPageMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
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

      <section className="pb-16 bg-background">
        <div className="mx-auto max-w-7xl px-6 space-y-12">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <ScrollReveal key={industry.id} delay={0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <Card glow={i === 0}>
                  <div className="grid gap-8 lg:grid-cols-[auto_1fr]">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-[#00E5FF]/20 to-transparent shadow-[0_0_20px_rgba(0,180,216,0.2)]">
                      <Icon className="h-12 w-12 text-[#00E5FF]" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-white md:text-3xl group-hover/card:text-[#00E5FF] transition-colors">
                        {industry.title}
                      </h2>
                      <p className="mt-4 max-w-3xl leading-relaxed text-[#c4e0e6]">
                        {industry.description}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        {industry.coverageAreas.map((area) => (
                          <span
                            key={area}
                            className="rounded-full border border-[#00B4D8]/30 bg-[#00B4D8]/10 px-4 py-1.5 text-xs font-semibold text-[#00E5FF] backdrop-blur-sm shadow-[0_0_10px_rgba(0,180,216,0.1)] transition-all hover:bg-[#00B4D8]/20 hover:scale-105 hover:-translate-y-1"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
