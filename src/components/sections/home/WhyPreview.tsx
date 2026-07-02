import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { whyLmbPoints } from "@/lib/content/pages";
import { companyProfile } from "@/lib/content/company";

export function WhyPreview() {
  return (
    <section className="py-16 md:py-20 bg-[#04151a]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <FadeIn>
            <SectionHeading
              eyebrow="Why LMB"
              title="Advisory you can rely on"
              description={companyProfile.compositeNote}
            />
            <Link href="/why-lmb" className="mt-8 inline-block">
              <Button variant="secondary">
                Why Choose LMB
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2">
            {whyLmbPoints.slice(0, 4).map((point, i) => (
              <FadeIn key={point.title} delay={i * 0.08}>
                <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-border-hover">
                  <CheckCircle2 className="mb-3 h-5 w-5 text-cyan" />
                  <h3 className="font-medium text-white">{point.title}</h3>
                  <p className="mt-2 text-sm text-[#c4e0e6]">
                    {point.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
