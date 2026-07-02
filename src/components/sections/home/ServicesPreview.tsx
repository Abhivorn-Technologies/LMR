import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { services } from "@/lib/content/services";

export function ServicesPreview() {
  return (
    <section className="relative py-16 md:py-20 bg-[#04151a]">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <SectionHeading
            align="center"
            eyebrow="Services"
            title="Comprehensive insurance broking"
            description="Advisory and placement across general insurance, reinsurance, life insurance, and risk management."
          />
        </FadeIn>

        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeIn 
                key={service.id} 
                delay={i * 0.1}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-md flex"
              >
                <Link href={service.href} className="block w-full h-full">
                  <Card className="group h-full w-full">
                    <div className="mb-4 inline-flex rounded-xl border border-border bg-surface p-3 transition-colors group-hover:border-cyan/30 group-hover:bg-cyan/5">
                      <Icon className="h-6 w-6 text-cyan" />
                    </div>
                    <h3 className="text-[1.05rem] font-bold text-white mt-4">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-[#c4e0e6]">
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
