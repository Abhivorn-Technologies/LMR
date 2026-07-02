import { createPageMetadata, PageHero } from "@/components/layout/PageHero";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = createPageMetadata({
  title: "Services",
  description: "Comprehensive risk management, insurance placement, and bespoke product implementation by LMB Insurance Brokers.",
  path: "/services",
});

const businessLines = [
  "FIRE & BURGLARY",
  "ENGINEERING",
  "WORKMEN COMPENSATION",
  "GROUP MEDICLAIM",
  "LIVE STOCK",
  "EMPLOYEEE BENEFIT SCHEMES",
  "PROPERTY",
  "AGRICULTURE",
  "PROJECT",
  "PERSONAL ACCIDENT",
  "MARINE",
  "LIFE",
  "REINSURANCE",
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Comprehensive Risk Management"
        description="Meticulous evaluation and tailored solutions for our clients."
      />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="space-y-6 text-lg leading-relaxed text-muted-light max-w-4xl">
              <p>
                Our team of highly proficient risk management specialists conducts a meticulous evaluation of our clients' needs, and endeavors to acquire a detailed understanding of their operations, assets, and potential liabilities. Organizational facilities may be examined as deemed necessary. Any deficiencies in existing coverage are also identified and addressed.
              </p>
              <p>
                Utilizing the information gathered, we determine the optimal choices for risk retention and transfer, and execute a thorough cost-benefit analysis. We prioritize the development of solutions that provide comprehensive coverage in a financially sound manner, tailored to the specific needs of our clients. We subsequently solicit proposals from insurers and engage in negotiations on behalf of our clients to ensure their needs are met. This may involve the implementation of bespoke products that are otherwise unavailable in the market.
              </p>
              <p>
                Our paramount concern is ensuring that the insurance plan established for the client is implemented, maintained, and fully satisfactory. We maintain our partnership with our client as we continually assess their needs and propose any necessary adjustments as the organization's operations and exposures evolve over time.
              </p>
              <p>
                We possess a wealth of expertise as a direct intermediary, having had the opportunity to collaborate with both government entities and a plethora of medium and large-scale organizations.
              </p>
              <p>
                Our clientele encompasses a diverse array of industries, including, but not limited to, Healthcare, Agriculture, Mining, Electronics, Biotechnology, Tourism, Chemical, Power, Paper, Dairy, and Information Technology.
              </p>
            </div>
          </FadeIn>

          <FadeIn className="mt-24">
            <SectionHeading
              eyebrow="Coverage"
              title="Our Business Lines"
            />
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {businessLines.map((line, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card px-4 py-4 text-center shadow-md transition-all hover:border-cyan hover:bg-card-hover"
                >
                  <p className="text-sm font-bold text-cyan">{line}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
