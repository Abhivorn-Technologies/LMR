import { createPageMetadata, PageHero } from "@/components/layout/PageHero";
import { FadeIn } from "@/components/motion/FadeIn";
import { Card } from "@/components/ui/Card";

export const metadata = createPageMetadata({
  title: "Resources",
  description: "Insurance resources, insights, and updates from LMB Insurance Brokers.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Insights and industry knowledge"
        description="Articles, guides, and updates on insurance broking, risk management, and regulatory developments."
      />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <Card className="text-center">
              <p className="text-muted-light">
                (Content Required from Client — articles, whitepapers, news
                updates, and downloadable resources)
              </p>
            </Card>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
