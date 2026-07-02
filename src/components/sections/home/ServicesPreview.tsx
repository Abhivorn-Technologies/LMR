import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { services } from "@/lib/content/services";

export function ServicesPreview() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <SectionHeading
            eyebrow="Services"
            title="Comprehensive insurance broking"
            description="Advisory and placement across general insurance, reinsurance, life insurance, and risk management."
          />
        </FadeIn>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.id} delay={i * 0.1}>
                <Link href={service.href} className="block h-full">
                  <Card className="group h-full">
                    <div className="mb-6 inline-flex rounded-xl border border-border bg-surface p-3 transition-colors group-hover:border-cyan/30 group-hover:bg-cyan/5">
                      <Icon className="h-6 w-6 text-cyan" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-light">
                      {service.shortDescription}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-cyan opacity-0 transition-opacity group-hover:opacity-100">
                      View details <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Card>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
