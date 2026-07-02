import Link from "next/link";
import { createPageMetadata, PageHero } from "@/components/layout/PageHero";
import { FadeIn } from "@/components/motion/FadeIn";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata = createPageMetadata({
  title: "Careers",
  description: "Career opportunities at LMB Insurance Brokers.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build your career in insurance broking"
        description="Join a composite insurance broking firm where expertise, integrity, and client focus define the culture."
      />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <Card>
              <p className="text-muted-light">
                (Content Required from Client — open positions, application
                process, and workplace culture details)
              </p>
              <Link href="/contact" className="mt-6 inline-block">
                <Button variant="secondary">Express Interest</Button>
              </Link>
            </Card>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
