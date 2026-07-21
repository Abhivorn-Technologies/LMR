import React from 'react';
import { PageHero } from "@/components/layout/PageHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CTA } from "@/components/sections/home/CTA";
import { CheckCircle2, Shield, Target, Globe, BarChart3, TrendingUp } from "lucide-react";

const capabilityIcons = [Shield, Target, BarChart3, Globe];

export function ReinsuranceBlock({ content }: { content: any }) {
  if (!content) return null;

  return (
    <div className="min-h-screen bg-[#f8fbfc] text-slate-900 relative z-0 overflow-hidden w-full">
      {/* Cinematic Background Glows */}
      <div className="absolute top-0 left-0 w-full h-[800px] z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] h-[600px] w-[600px] rounded-full bg-[#00B4D8]/10 blur-[120px] animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute top-[40%] -left-[10%] h-[500px] w-[500px] rounded-full bg-[#0c494f]/10 blur-[100px] animate-[pulse_12s_ease-in-out_infinite_reverse]" />
      </div>
      <PageHero
        eyebrow="Reinsurance"
        title={content.headline || "Reinsurance Services"}
        description={content.subheadline || ""}
        align="center"
        theme="light"
      />

      <section className="relative pb-12 z-10 pt-6">
        <div className="mx-auto max-w-7xl px-6">
          
          {/* Ultra-Modern Asymmetrical Bento Grid */}
          <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative z-10">
            
            {/* Huge Top Left Block */}
            <div className="md:col-span-2 h-full">
              <ScrollReveal direction="left" delay={0.1} scale={true} className="h-full">
                <div className="group relative h-full rounded-[2.5rem] bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgba(12,73,79,0.06)] p-10 md:p-12 overflow-hidden transition-all duration-700 hover:bg-white/80 hover:shadow-[0_20px_50px_rgba(0,180,216,0.15)] hover:-translate-y-2 flex flex-col justify-start">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.04] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-700">
                    <TrendingUp className="w-64 h-64 text-[#0c494f]" />
                  </div>
                  <div className="relative z-10 mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0c494f] to-[#00869e] text-white shadow-lg shadow-[#0c494f]/20 group-hover:scale-110 transition-transform duration-500 mb-6">
                      <TrendingUp className="h-8 w-8" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-display font-extrabold text-[#04151a] mb-4 tracking-tight">
                      Market Capacity <br/><span className="text-[#0c494f] font-serif italic">& Expansion</span>
                    </h3>
                  </div>
                  <p className="relative z-10 text-lg leading-relaxed text-slate-600 font-medium max-w-md group-hover:text-slate-800 transition-colors">
                    Expanding presence in treaty and facultative markets to secure unparalleled terms for new, emerging, and existing business lines.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Top Right Tall Block */}
            <div className="md:col-span-1 h-full">
              <ScrollReveal direction="right" delay={0.2} scale={true} className="h-full">
                <div className="group relative h-full rounded-[2.5rem] bg-gradient-to-b from-[#0c494f] to-[#083a40] shadow-[0_8px_30px_rgba(12,73,79,0.2)] p-10 overflow-hidden transition-all duration-700 hover:shadow-[0_20px_50px_rgba(12,73,79,0.3)] hover:-translate-y-2 flex flex-col justify-start">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] pointer-events-none" />
                  <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
                    <Shield className="w-40 h-40 text-white" />
                  </div>
                  <div className="relative z-10 mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-white backdrop-blur-md group-hover:bg-white group-hover:text-[#0c494f] group-hover:scale-110 transition-all duration-500 mb-6">
                      <Shield className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white mb-4">
                      Strategic Selection
                    </h3>
                  </div>
                  <p className="relative z-10 text-base leading-relaxed text-[#a8d5df] group-hover:text-white transition-colors">
                    Rigorous due diligence of international reinsurers, leveraging technical expertise to design optimal programs.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Bottom Left Square Block */}
            <div className="md:col-span-1 h-full">
              <ScrollReveal direction="up" delay={0.3} scale={true} className="h-full">
                <div className="group relative h-full rounded-[2.5rem] bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgba(12,73,79,0.06)] p-10 overflow-hidden transition-all duration-700 hover:bg-white/80 hover:shadow-[0_20px_50px_rgba(0,180,216,0.1)] hover:-translate-y-2 flex flex-col justify-start">
                  <div className="relative z-10 mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00B4D8]/10 border border-[#00B4D8]/20 text-[#00869e] group-hover:bg-[#00B4D8] group-hover:text-white group-hover:scale-110 transition-all duration-500 mb-6">
                      <Target className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-[#04151a] mb-4">
                      Favorable Terms
                    </h3>
                  </div>
                  <p className="relative z-10 text-base leading-relaxed text-slate-600 group-hover:text-slate-800 transition-colors">
                    Comprehensive assessment of counterparty risk to aggressively negotiate and secure unparalleled client coverage.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Huge Bottom Right Block */}
            <div className="md:col-span-2 h-full">
              <ScrollReveal direction="up" delay={0.4} scale={true} className="h-full">
                <div className="group relative h-full rounded-[2.5rem] bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgba(12,73,79,0.06)] p-10 md:p-12 overflow-hidden transition-all duration-700 hover:bg-white/80 hover:shadow-[0_20px_50px_rgba(0,180,216,0.1)] hover:-translate-y-2 flex flex-col justify-start">
                  <div className="absolute bottom-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000 pointer-events-none">
                    <Globe className="w-64 h-64 text-[#0c494f]" />
                  </div>
                  <div className="relative z-10 mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-[#0c494f]/10 text-[#0c494f] shadow-sm group-hover:bg-[#0c494f] group-hover:text-white group-hover:scale-110 transition-all duration-500 mb-6">
                      <Globe className="h-8 w-8" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-display font-extrabold text-[#04151a] mb-4 tracking-tight">
                      Global Market <span className="text-[#0c494f] font-serif italic">Insights</span>
                    </h3>
                  </div>
                  <p className="relative z-10 text-lg leading-relaxed text-slate-600 font-medium max-w-lg group-hover:text-slate-800 transition-colors">
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

          {content.expertise && (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {content.expertise.map((item: any, i: number) => {
                const Icon = capabilityIcons[i % capabilityIcons.length];
                return (
                  <ScrollReveal key={i} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"}>
                    <div className="group relative h-full overflow-hidden rounded-[2rem] bg-white/90 p-8 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,180,216,0.12)] border border-white/60 hover:border-cyan/30 backdrop-blur-md shadow-[0_4px_20px_rgba(12,73,79,0.08)]">
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
          )}

          <div className="mt-12 grid gap-16 lg:grid-cols-2 lg:gap-24">
            
            {/* Process Timeline */}
            <div>
              <ScrollReveal direction="left">
                <div className="mb-10">
                  <h2 className="font-display text-3xl font-bold tracking-tight text-[#04151a] md:text-4xl">
                    How we work
                  </h2>
                </div>
                {content.process && (
                  <div className="mt-12 relative">
                    <div className="absolute left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-cyan/50 via-cyan/20 to-transparent" />
                    
                    <div className="space-y-12 relative z-10">
                      {content.process.map((step: any, i: number) => (
                        <div key={i} className="group flex items-start gap-6 relative">
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
                )}
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
                {content.benefits && (
                  <div className="mt-12 space-y-4">
                    {content.benefits.map((benefit: any, i: number) => (
                      <ScrollReveal key={i} delay={i * 0.1 + 0.3} direction="up">
                        <div className="group flex items-center gap-5 rounded-[1.5rem] bg-white/90 border border-white/60 shadow-[0_2px_12px_rgba(12,73,79,0.06)] p-6 backdrop-blur-md transition-all duration-500 hover:bg-white hover:border-cyan/30 hover:shadow-[0_10px_30px_rgba(0,180,216,0.12)] hover:translate-x-2 cursor-default">
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
                )}
              </ScrollReveal>
            </div>
            
          </div>
          
        </div>
      </section>

      <CTA />
    </div>
  );
}
