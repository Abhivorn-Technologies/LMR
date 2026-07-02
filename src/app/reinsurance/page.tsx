import { PageHero } from "@/components/layout/PageHero";
import { createPageMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CTA } from "@/components/sections/home/CTA";
import { reinsuranceContent } from "@/lib/content/pages";
import { CheckCircle2, Shield, Target, Globe, BarChart3, TrendingUp } from "lucide-react";

export const metadata = createPageMetadata({
  title: "Reinsurance",
  description:
    "Reinsurance advisory from LMB — treaty programs, facultative placement, retention strategy, and global market access.",
  path: "/reinsurance",
});

const capabilityIcons = [Shield, Target, BarChart3, Globe];

export default function ReinsurancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffffff] via-[#e2f1f4] to-[#4f737d] text-slate-900 relative z-0">
      <PageHero
        eyebrow="Reinsurance"
        title={reinsuranceContent.headline}
        description={reinsuranceContent.subheadline}
        align="center"
        theme="light"
      />

      <section className="relative pb-24 z-10 -mt-16">
        <div className="mx-auto max-w-7xl px-6">
          
          {/* Ultra-Modern Asymmetrical Bento Grid */}
          <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 relative z-10">
            
            {/* Huge Top Left Block */}
            <div className="md:col-span-2 h-full">
              <ScrollReveal direction="left" delay={0.1} className="h-full">
                <div className="group relative h-full rounded-[2.5rem] bg-white/60 border border-white/60 p-10 md:p-12 overflow-hidden transition-all duration-500 hover:bg-white/80 hover:shadow-[0_20px_50px_rgba(0,180,216,0.1)] hover:-translate-y-1 flex flex-col justify-between min-h-[300px]">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                    <TrendingUp className="w-48 h-48 text-cyan" />
                  </div>
                  <div className="relative z-10 mb-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan/10 border border-cyan/20 group-hover:bg-cyan/20 transition-colors duration-500 mb-6">
                      <TrendingUp className="h-7 w-7 text-cyan-600" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-[#04151a] mb-4">
                      Market Capacity & Expansion
                    </h3>
                  </div>
                  <p className="relative z-10 text-lg leading-relaxed text-slate-700 font-medium max-w-md">
                    Expanding presence in treaty and facultative markets to secure unparalleled terms for new, emerging, and existing business lines.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Top Right Tall Block */}
            <div className="md:col-span-1 h-full">
              <ScrollReveal direction="right" delay={0.2} className="h-full">
                <div className="group relative h-full rounded-[2.5rem] bg-gradient-to-br from-cyan/5 to-cyan/10 border border-cyan/20 p-10 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,180,216,0.15)] hover:-translate-y-1 flex flex-col justify-between min-h-[300px]">
                  <div className="relative z-10 mb-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/60 border border-white/80 group-hover:bg-white transition-colors duration-500 mb-6">
                      <Shield className="h-7 w-7 text-cyan-600" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-[#04151a] mb-4">
                      Strategic Selection
                    </h3>
                  </div>
                  <p className="relative z-10 text-base leading-relaxed text-slate-700">
                    Rigorous due diligence of international reinsurers, leveraging technical expertise to design optimal, customized programs.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Bottom Left Square Block */}
            <div className="md:col-span-1 h-full">
              <ScrollReveal direction="up" delay={0.3} className="h-full">
                <div className="group relative h-full rounded-[2.5rem] bg-white/60 border border-white/60 p-10 overflow-hidden transition-all duration-500 hover:bg-white/80 hover:shadow-[0_20px_50px_rgba(0,180,216,0.1)] hover:-translate-y-1 flex flex-col justify-between min-h-[300px]">
                  <div className="relative z-10 mb-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan/5 border border-cyan/10 group-hover:bg-cyan/10 transition-colors duration-500 mb-6">
                      <Target className="h-7 w-7 text-cyan-600" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-[#04151a] mb-4">
                      Favorable Terms
                    </h3>
                  </div>
                  <p className="relative z-10 text-base leading-relaxed text-slate-700">
                    Comprehensive assessment of counterparty risk to aggressively negotiate and secure unparalleled client coverage.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Huge Bottom Right Block */}
            <div className="md:col-span-2 h-full">
              <ScrollReveal direction="up" delay={0.4} className="h-full">
                <div className="group relative h-full rounded-[2.5rem] bg-gradient-to-r from-white/60 to-white/40 border border-white/60 p-10 md:p-12 overflow-hidden transition-all duration-500 hover:bg-white/80 hover:shadow-[0_20px_50px_rgba(0,180,216,0.1)] hover:-translate-y-1 flex flex-col justify-between min-h-[300px]">
                  <div className="absolute bottom-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none">
                    <Globe className="w-64 h-64 text-slate-900" />
                  </div>
                  <div className="relative z-10 mb-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan/5 border border-cyan/10 group-hover:bg-cyan/10 transition-colors duration-500 mb-6">
                      <Globe className="h-7 w-7 text-cyan-600" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-[#04151a] mb-4">
                      Global Market Insights
                    </h3>
                  </div>
                  <p className="relative z-10 text-lg leading-relaxed text-slate-700 font-medium max-w-lg">
                    Continuous monitoring of global economic trends and emerging market developments to ensure access to cutting-edge, comprehensive coverage options worldwide.
                  </p>
                </div>
              </ScrollReveal>
            </div>

          </div>

          {/* Capabilities Grid */}
          <ScrollReveal>
            <div className="mb-10 text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight text-[#04151a] md:text-4xl">
                Reinsurance Capabilities
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {reinsuranceContent.expertise.map((item, i) => {
              const Icon = capabilityIcons[i % capabilityIcons.length];
              return (
                <ScrollReveal key={item.title} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"}>
                  <div className="group relative h-full overflow-hidden rounded-[2rem] bg-white/60 p-8 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,180,216,0.1)] border border-white/40 hover:border-cyan/30 backdrop-blur-md">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00B4D8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative z-10">
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-cyan/20 group-hover:bg-cyan/10 transition-colors duration-500 shadow-sm">
                        <Icon className="h-7 w-7 text-cyan group-hover:text-cyan-600 transition-colors" />
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#04151a] group-hover:text-cyan-700 transition-colors duration-500 mb-4">
                        {item.title}
                      </h3>
                      <p className="text-base leading-relaxed text-slate-700 group-hover:text-slate-800 transition-colors">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="mt-32 grid gap-16 lg:grid-cols-2 lg:gap-24">
            
            {/* Process Timeline */}
            <div>
              <ScrollReveal direction="left">
                <div className="mb-10">
                  <h2 className="font-display text-3xl font-bold tracking-tight text-[#04151a] md:text-4xl">
                    How we work
                  </h2>
                </div>
                <div className="mt-12 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-cyan/50 via-cyan/20 to-transparent" />
                  
                  <div className="space-y-12 relative z-10">
                    {reinsuranceContent.process.map((step, i) => (
                      <div key={step} className="group flex items-start gap-6 relative">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border-2 border-cyan/30 text-cyan font-display font-bold text-lg shadow-[0_0_15px_rgba(0,180,216,0.1)] group-hover:border-cyan group-hover:bg-cyan/5 group-hover:text-cyan-600 group-hover:shadow-[0_0_20px_rgba(0,180,216,0.2)] transition-all duration-500 z-10">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className="pt-2">
                          <p className="text-lg font-medium text-slate-800 group-hover:text-[#04151a] transition-colors">
                            {step}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Benefits Cards */}
            <div>
              <ScrollReveal direction="right" delay={0.2}>
                <div className="mb-10">
                  <h2 className="font-display text-3xl font-bold tracking-tight text-[#04151a] md:text-4xl">
                    Client advantages
                  </h2>
                </div>
                <div className="mt-12 space-y-4">
                  {reinsuranceContent.benefits.map((benefit, i) => (
                    <ScrollReveal key={benefit} delay={i * 0.1 + 0.3} direction="up">
                      <div className="group flex items-center gap-5 rounded-[1.5rem] bg-white/60 border border-white/40 p-6 backdrop-blur-md transition-all duration-500 hover:bg-white hover:border-cyan/30 hover:shadow-[0_10px_30px_rgba(0,180,216,0.1)] hover:translate-x-2 cursor-default">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan/5 border border-cyan/20 group-hover:bg-cyan/10 group-hover:border-cyan/40 transition-all duration-500">
                          <CheckCircle2 className="h-5 w-5 text-cyan group-hover:text-cyan-600" />
                        </div>
                        <span className="text-base font-medium text-slate-800 group-hover:text-[#04151a] transition-colors">
                          {benefit}
                        </span>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </ScrollReveal>
            </div>
            
          </div>
          
        </div>
      </section>

      <CTA />
    </div>
  );
}
