import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { createPageMetadata, PageHero } from "@/components/layout/PageHero";
import { FadeIn } from "@/components/motion/FadeIn";
import { Card } from "@/components/ui/Card";
import { services } from "@/lib/content/services";

export const metadata = createPageMetadata({
  title: "Business Lines",
  description:
    "Insurance business lines offered by LMB — general insurance, reinsurance, life, risk management, and consulting.",
  path: "/business-lines",
});

export default function BusinessLinesPage() {
  return (
    <>
      <PageHero
        eyebrow="Business Lines"
        title="Coverage across every insurance line"
        description="Each business line is supported by dedicated advisory — from program design through placement and renewal."
      />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <FadeIn key={service.id} delay={i * 0.08}>
                  <Link href={service.href} className="block h-full">
                    <Card className="group h-full">
                      <Icon className="mb-6 h-7 w-7 text-cyan transition-transform duration-500 group-hover:scale-110" />
                      <h2 className="font-display text-xl font-semibold text-white">
                        {service.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted-light">
                        {service.shortDescription}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-1 text-sm text-cyan opacity-0 transition-opacity group-hover:opacity-100">
                        Explore <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </Card>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
