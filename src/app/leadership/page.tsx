import { PageHero } from "@/components/layout/PageHero";
import { createPageMetadata } from "@/lib/metadata";
import { FadeIn } from "@/components/motion/FadeIn";
import { Card } from "@/components/ui/Card";

export const metadata = createPageMetadata({
  title: "Leadership",
  description: "Leadership team at LMB Insurance Brokers.",
  path: "/leadership",
});

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Experienced insurance professionals"
        description="LMB is led by practitioners with deep experience across insurance broking, underwriting, and risk management."
      />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <Card className="text-center">
              <p className="text-muted-light">
                (Content Required from Client — leadership profiles, names,
                titles, photographs, and biographies)
              </p>
            </Card>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
