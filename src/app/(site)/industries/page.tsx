import { PageHero } from "@/components/layout/PageHero";
import { createPageMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
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
        theme="light"
        align="center"
      />

      <section className="pb-24 pt-8 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 space-y-10">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <ScrollReveal key={industry.id} delay={0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="group/card relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-slate-200 bg-white p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(14,165,233,0.12)] transition-all duration-700 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 relative z-10">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-16 w-16 md:h-20 md:w-20 rounded-2xl md:rounded-[1.25rem] bg-slate-50 border border-slate-100 group-hover/card:bg-sky-50 group-hover/card:border-sky-100 transition-colors duration-700">
                        <Icon className="h-8 w-8 md:h-10 md:w-10 text-slate-700 group-hover/card:text-sky-600 transition-colors duration-700" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl group-hover/card:text-sky-700 transition-colors duration-700 tracking-tight">
                        {industry.title}
                      </h2>
                      <p className="mt-3 max-w-3xl leading-relaxed text-slate-600 font-medium">
                        {industry.description}
                      </p>
                      <div className="mt-6 md:mt-8 flex flex-wrap gap-2.5">
                        {industry.coverageAreas.map((area) => (
                          <span
                            key={area}
                            className="rounded-xl border border-slate-200 bg-white px-3 md:px-4 py-1.5 md:py-2 text-[12px] md:text-[13px] font-bold text-slate-600 transition-all duration-300 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700 shadow-sm"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
