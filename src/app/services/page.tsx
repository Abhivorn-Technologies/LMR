import { PageHero } from "@/components/layout/PageHero";
import { createPageMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CTA } from "@/components/sections/home/CTA";
import Image from "next/image";

export const metadata = createPageMetadata({
  title: "Services",
  description: "Comprehensive risk management, insurance placement, and bespoke product implementation by LMB Insurance Brokers.",
  path: "/services",
});

const businessLines = [
  "FIRE & BURGLARY",
  "ENGINEERING",
  "WORKMEN COMPENSATION",
  "GROUP MEDICLAIM",
  "LIVE STOCK",
  "EMPLOYEE BENEFIT SCHEMES",
  "PROPERTY",
  "AGRICULTURE",
  "PROJECT",
  "PERSONAL ACCIDENT",
  "MARINE",
  "LIFE",
  "REINSURANCE",
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000511] via-[#0A2342] to-[#175676] text-slate-300 relative z-0">
      <PageHero
        eyebrow="Our Services"
        title="Comprehensive Risk Management"
        description="Meticulous evaluation and tailored solutions for our clients."
        theme="navy"
      />

      <section className="relative pb-32 z-10 -mt-16">
        <div className="mx-auto max-w-7xl px-6">
          
          {/* Dynamic Image & Text Layout - Section 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <ScrollReveal direction="left" delay={0.1}>
              <div className="rounded-[2.5rem] bg-white/5 border border-white/10 p-10 md:p-14 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <p className="text-lg leading-relaxed text-slate-300 mb-6 font-medium">
                  Our team of highly proficient risk management specialists conducts a meticulous evaluation of our clients&apos; needs, and endeavors to acquire a detailed understanding of their operations, assets, and potential liabilities. Organizational facilities may be examined as deemed necessary. Any deficiencies in existing coverage are also identified and addressed.
                </p>
                <p className="text-lg leading-relaxed text-slate-400">
                  Utilizing the information gathered, we determine the optimal choices for risk retention and transfer, and execute a thorough cost-benefit analysis. We prioritize the development of solutions that provide comprehensive coverage in a financially sound manner, tailored to the specific needs of our clients.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right" delay={0.3} className="h-full w-full">
              <div className="relative h-full min-h-[400px] w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                <div className="absolute inset-0 bg-[#00E5FF]/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Image src="/assets/image1.jpeg" alt="Risk Management Strategy" fill className="object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
              </div>
            </ScrollReveal>
          </div>

          {/* Dynamic Image & Text Layout - Section 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
            <ScrollReveal direction="left" delay={0.2} className="order-2 lg:order-1 h-full w-full">
              <div className="relative h-full min-h-[400px] w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                <div className="absolute inset-0 bg-[#00E5FF]/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Image src="/assets/image2.jpeg" alt="Insurance Planning" fill className="object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.4} className="order-1 lg:order-2">
              <div className="rounded-[2.5rem] bg-white/5 border border-white/10 p-10 md:p-14 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <p className="text-lg leading-relaxed text-slate-300 mb-6 font-medium">
                  We subsequently solicit proposals from insurers and engage in negotiations on behalf of our clients to ensure their needs are met. This may involve the implementation of bespoke products that are otherwise unavailable in the market.
                </p>
                <p className="text-lg leading-relaxed text-slate-400">
                  Our paramount concern is ensuring that the insurance plan established for the client is implemented, maintained, and fully satisfactory. We maintain our partnership with our client as we continually assess their needs and propose any necessary adjustments as the organization&apos;s operations and exposures evolve over time.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Industries Full Width Banner */}
          <ScrollReveal direction="up">
            <div className="relative w-full rounded-[3rem] overflow-hidden mb-32 group border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-[#000511]/70 z-10 transition-colors duration-700 group-hover:bg-[#000511]/40" />
              <Image src="/assets/image5.jpeg" alt="Industries Served" fill className="object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
              
              <div className="relative z-20 p-12 md:p-24 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#00E5FF]/30 bg-[#00B4D8]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#00E5FF] backdrop-blur-md mb-8">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                  Direct Intermediary Expertise
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-8 max-w-4xl leading-tight">
                  We possess a wealth of expertise collaborating with government entities and large-scale organizations.
                </h3>
                <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
                  Our clientele encompasses a diverse array of industries, including, but not limited to, <span className="text-white font-semibold">Healthcare, Agriculture, Mining, Electronics, Biotechnology, Tourism, Chemical, Power, Paper, Dairy, and Information Technology.</span>
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Ultra-Premium Grid for Business Lines */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00E5FF]/30 bg-[#00B4D8]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#00E5FF] backdrop-blur-md mb-6">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                Coverage
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white">
                Our Business Lines
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {businessLines.map((line, i) => {
              // Make some items span 2 columns for a staggered masonry look
              const isWide = i === 2 || i === 7 || i === 12;
              
              return (
                <ScrollReveal key={line} delay={i * 0.05} direction="up" className={isWide ? "col-span-2 md:col-span-2 lg:col-span-2" : ""}>
                  <div className="group relative h-full min-h-[140px] flex items-center justify-center rounded-[2rem] bg-white/5 border border-white/10 p-6 backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-[#00E5FF]/10 hover:border-[#00E5FF]/50 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] hover:-translate-y-2 cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/0 to-[#00E5FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <h4 className={`relative z-10 font-display font-bold text-center transition-colors duration-500 ${isWide ? 'text-xl md:text-2xl' : 'text-sm md:text-lg'} text-slate-300 group-hover:text-white`}>
                      {line}
                    </h4>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>

      <CTA />
    </div>
  );
}
