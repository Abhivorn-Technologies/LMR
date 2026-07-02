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
                <div className="relative w-full h-[320px]">
                  <Link href={service.href} className="block absolute top-0 left-0 right-0 z-10 hover:z-50 outline-none">
                    <Card className="group min-h-[320px] h-auto flex flex-col justify-start w-full bg-[#041d24] border-cyan/10 hover:border-cyan/40 hover:bg-[#062630] hover:shadow-2xl hover:shadow-[#00B4D8]/10 transition-all duration-500 overflow-hidden">
                      <div className="p-7 shrink-0">
                        <div className="mb-5 inline-flex rounded-2xl border border-cyan/20 bg-cyan/5 p-3.5 transition-colors group-hover:bg-cyan/10">
                          <Icon className="h-6 w-6 text-cyan" />
                        </div>
                        <h3 className="text-[1.15rem] font-bold text-white mb-3 tracking-tight">
                          {service.title}
                        </h3>
                        <p className="text-[0.95rem] leading-relaxed text-[#a8d5df] line-clamp-3">
                          {service.shortDescription}
                        </p>
                      </div>
                      
                      {/* Hover expanding section */}
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500">
                        <div className="overflow-hidden">
                          <div className="px-7 pb-7 pt-0 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                            <div className="w-full h-px bg-cyan/10 mb-5" />
                            <ul className="space-y-3">
                              {service.homePoints.map((point, idx) => (
                                <li key={idx} className="flex items-start text-[0.9rem] text-[#a8d5df]/90 leading-snug">
                                  <span className="text-cyan mr-2 mt-0.5 text-[0.7rem] opacity-80">✦</span>
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
