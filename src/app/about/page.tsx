import { createPageMetadata, PageHero } from "@/components/layout/PageHero";
import { FadeIn } from "@/components/motion/FadeIn";
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
            <FadeIn>
              <SectionHeading
                eyebrow="Our Story"
                title="Composite broking expertise"
                description={companyProfile.compositeNote}
              />
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="space-y-6 text-muted-light leading-relaxed">
                <p>
                  LMB Insurance Brokers operates as a composite insurance broking
                  firm — authorized to advise and place general insurance, life
                  insurance, and reinsurance programs for corporate and individual
                  clients.
                </p>
                <p className="text-sm text-muted">
                  (Content Required from Client — founding history, leadership
                  background, and regional presence)
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="mt-24 grid gap-8 md:grid-cols-2">
            <FadeIn>
              <Card>
                <p className="text-xs font-semibold uppercase tracking-widest text-cyan">
                  Mission
                </p>
                <p className="mt-4 text-muted-light">{companyProfile.mission}</p>
              </Card>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Card>
                <p className="text-xs font-semibold uppercase tracking-widest text-cyan">
                  Vision
                </p>
                <p className="mt-4 text-muted-light">{companyProfile.vision}</p>
              </Card>
            </FadeIn>
          </div>

          <FadeIn className="mt-24">
            <SectionHeading
              eyebrow="Values"
              title="Principles that guide our work"
              align="center"
              className="mx-auto"
            />
          </FadeIn>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {companyProfile.values.map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.08}>
                <Card className="h-full text-center">
                  <h3 className="font-display text-lg font-semibold text-white">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-light">
                    {value.description}
                  </p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
