import { PageHero } from "@/components/layout/PageHero";
import { createPageMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { companyProfile } from "@/lib/content/company";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about LMB Insurance Brokers — composite insurance broking, mission, values, and corporate philosophy.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Established insurance broking advisory"
        description={companyProfile.intro}
      />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <ScrollReveal direction="left">
              <SectionHeading
                eyebrow="Our Story"
                title="Composite broking expertise"
                description={companyProfile.compositeNote}
              />
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.1}>
              <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
                <p>
                  LMB Insurance Brokers operates as a composite insurance broking
                  firm — authorized to advise and place general insurance, life
                  insurance, and reinsurance programs for corporate and individual
                  clients.
                </p>
                <div className="rounded-2xl border border-cyan/20 bg-cyan/5 p-6 backdrop-blur-md">
                  <p className="text-sm font-medium text-cyan">
                    (Content Required from Client — founding history, leadership
                    background, and regional presence)
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-24 grid gap-8 md:grid-cols-2">
            <ScrollReveal direction="up" delay={0.1} scale>
              <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-[#0a2b33]/80 to-[#04151a] p-8 shadow-2xl backdrop-blur-xl h-full group">
                <div className="absolute top-0 right-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-cyan/20 blur-[50px] transition-all duration-700 group-hover:scale-150 group-hover:bg-cyan/30" />
                <p className="text-sm font-bold uppercase tracking-widest text-[#00E5FF]">
                  Mission
                </p>
                <p className="mt-6 text-lg text-slate-300 leading-relaxed font-medium relative z-10">{companyProfile.mission}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2} scale>
              <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-[#0a2b33]/80 to-[#04151a] p-8 shadow-2xl backdrop-blur-xl h-full group">
                <div className="absolute bottom-0 left-0 h-32 w-32 translate-y-1/2 -translate-x-1/2 rounded-full bg-[#00E5FF]/20 blur-[50px] transition-all duration-700 group-hover:scale-150 group-hover:bg-[#00E5FF]/30" />
                <p className="text-sm font-bold uppercase tracking-widest text-[#00B4D8]">
                  Vision
                </p>
                <p className="mt-6 text-lg text-slate-300 leading-relaxed font-medium relative z-10">{companyProfile.vision}</p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal className="mt-32">
            <SectionHeading
              eyebrow="Values"
              title="Principles that guide our work"
              align="center"
              className="mx-auto"
            />
          </ScrollReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {companyProfile.values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.1} scale>
                <Card className="h-full text-center group">
                  <h3 className="font-display text-xl font-semibold text-white group-hover:text-[#00E5FF] transition-colors">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400 group-hover:text-slate-200 transition-colors">
                    {value.description}
                  </p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
