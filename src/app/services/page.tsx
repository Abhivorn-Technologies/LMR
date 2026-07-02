import { PageHero } from "@/components/layout/PageHero";
import { createPageMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import Image from "next/image";
import ShinyText from "@/components/ui/ShinyText";
import { BusinessLinesGrid } from "@/components/sections/services/BusinessLinesGrid";

export const metadata = createPageMetadata({
  title: "Services",
  description: "Comprehensive risk management, insurance placement, and bespoke product implementation by LMB Insurance Brokers.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#021217] text-slate-300 relative z-0 overflow-hidden">
      
      {/* Global Background Effects matching About Us */}
      <div className="absolute top-0 left-0 w-full h-[800px] z-0 pointer-events-none">
        <Image 
          src="/assets/image2.jpeg" 
          alt="Background Texture" 
          fill 
          className="object-cover opacity-10 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#021217]/80 via-[#021217]/95 to-[#021217]" />
        <div className="absolute top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-[#00E5FF]/10 blur-[120px] animate-[pulse_10s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 pt-28">
        <div className="mx-auto max-w-7xl px-6 flex flex-col items-center text-center mb-16">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00E5FF]/40 bg-[#00B4D8]/10 px-6 py-2 backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.15)]">
              <span className="flex h-2 w-2 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="text-sm font-bold tracking-[0.25em] text-[#00E5FF] uppercase">Our Services</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
              Comprehensive <br />
              <ShinyText 
                text="Risk Management" 
                speed={3} 
                color="#ffffff" 
                shineColor="#00E5FF" 
                className="bg-gradient-to-r from-[#00B4D8] to-[#00E5FF] bg-clip-text text-transparent inline-block pb-2 drop-shadow-[0_0_30px_rgba(0,229,255,0.3)]" 
              />
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="max-w-2xl mx-auto text-xl text-slate-400 font-medium leading-relaxed">
              Meticulous evaluation and tailored solutions for our clients, ensuring complete protection across all operational domains.
            </p>
          </ScrollReveal>
        </div>

        <section className="relative pb-16">
          <div className="mx-auto max-w-7xl px-6">
            
            {/* Premium Section 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
              <ScrollReveal direction="left" delay={0.1}>
                <div className="group relative rounded-[2.5rem] bg-[#04151a] border border-white/10 p-10 md:p-14 overflow-hidden transition-all duration-700 hover:shadow-[0_20px_80px_-20px_rgba(0,229,255,0.2)]">
                  <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#00E5FF] rounded-full mix-blend-screen filter blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity duration-700" />
                  <div className="relative z-10 space-y-6">
                    <div className="w-12 h-1 bg-gradient-to-r from-[#00E5FF] to-transparent rounded-full" />
                    <p className="text-lg leading-relaxed text-slate-300 font-medium">
                      Our team of highly proficient risk management specialists conducts a meticulous evaluation of our clients&apos; needs, and endeavors to acquire a detailed understanding of their operations, assets, and potential liabilities.
                    </p>
                    <p className="text-lg leading-relaxed text-slate-400">
                      Utilizing the information gathered, we determine the optimal choices for risk retention and transfer, and execute a thorough cost-benefit analysis. We prioritize the development of solutions that provide comprehensive coverage in a financially sound manner.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="right" delay={0.3} className="h-full w-full">
                <div className="relative h-full min-h-[400px] w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] group">
                  <div className="absolute inset-0 bg-[#00E5FF]/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <Image src="/assets/image1.jpeg" alt="Risk Management Strategy" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out" />
                </div>
              </ScrollReveal>
            </div>

            {/* Premium Section 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-40">
              <ScrollReveal direction="right" delay={0.2} className="order-2 lg:order-1 h-full w-full">
                <div className="relative h-full min-h-[400px] w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] group">
                  <div className="absolute inset-0 bg-[#00E5FF]/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <Image src="/assets/image3.jpeg" alt="Insurance Planning" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out" />
                </div>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.4} className="order-1 lg:order-2">
                <div className="group relative rounded-[2.5rem] bg-[#04151a] border border-white/10 p-10 md:p-14 overflow-hidden transition-all duration-700 hover:shadow-[0_20px_80px_-20px_rgba(0,229,255,0.2)]">
                  <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#00E5FF] rounded-full mix-blend-screen filter blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity duration-700" />
                  <div className="relative z-10 space-y-6">
                    <div className="w-12 h-1 bg-gradient-to-r from-[#00E5FF] to-transparent rounded-full" />
                    <p className="text-lg leading-relaxed text-slate-300 font-medium">
                      We subsequently solicit proposals from insurers and engage in negotiations on behalf of our clients to ensure their needs are met. This may involve the implementation of bespoke products that are otherwise unavailable in the market.
                    </p>
                    <p className="text-lg leading-relaxed text-slate-400">
                      Our paramount concern is ensuring that the insurance plan established is implemented, maintained, and fully satisfactory. We continually assess their needs and propose any necessary adjustments as operations evolve.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Completely Redesigned Business Lines */}
            <BusinessLinesGrid />

            {/* Industries Full Width Banner - Moved to bottom for better flow */}
            <ScrollReveal direction="up">
              <div className="relative w-full rounded-[3rem] overflow-hidden mt-32 group border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
                <div className="absolute inset-0 bg-[#021217]/80 z-10 transition-colors duration-700 group-hover:bg-[#021217]/60" />
                <Image src="/assets/image5.jpeg" alt="Industries Served" fill className="object-cover opacity-60 transform group-hover:scale-105 transition-all duration-1000 ease-out" />
                
                <div className="relative z-20 p-12 md:p-24 flex flex-col items-center text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#00E5FF]/30 bg-[#00B4D8]/10 px-6 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#00E5FF] backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                    Industry Expertise
                  </div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-8 max-w-4xl leading-tight">
                    Collaborating with government entities and global organizations.
                  </h3>
                  <p className="text-lg md:text-xl text-slate-300 max-w-4xl leading-relaxed">
                    Our clientele encompasses a diverse array of industries, including <span className="text-white font-semibold">Healthcare, Agriculture, Mining, Electronics, Biotechnology, Tourism, Chemical, Power, Paper, Dairy, and IT.</span>
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </section>
      </div>
    </div>
  );
}
