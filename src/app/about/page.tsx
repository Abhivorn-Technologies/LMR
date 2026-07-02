import { PageHero } from "@/components/layout/PageHero";
import { createPageMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CTA } from "@/components/sections/home/CTA";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export const metadata = createPageMetadata({
  title: "About Us",
  description: "Learn about LMB Insurance Brokers — composite insurance broking, mission, values, and corporate philosophy.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020b0e] via-[#04151a] to-[#0a2b33] text-slate-300 relative z-0">
      <PageHero
        eyebrow="Our Company"
        title="ABOUT LMB"
        description="Established direct and reinsurance brokerage services."
        theme="dark"
      />

      <section className="relative pb-32 z-10 -mt-16">
        <div className="mx-auto max-w-7xl px-6">
          
          {/* Interactive Our Company Section */}
          <div className="relative mb-32">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="relative w-full rounded-[3rem] overflow-hidden border border-[#00E5FF]/20 shadow-[0_30px_60px_rgba(0,180,216,0.15)] group">
                <div className="absolute inset-0 bg-[#04151a]/85 z-10 transition-colors duration-700 group-hover:bg-[#04151a]/70" />
                <Image src="/assets/image6.jpeg" alt="LMB Headquarters" fill className="object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
                
                <div className="relative z-20 grid lg:grid-cols-2 gap-12 p-10 md:p-16 lg:p-20">
                  <div className="flex flex-col justify-center">
                    <h2 className="text-5xl md:text-6xl lg:text-[5rem] font-display font-black text-white tracking-tight mb-8 opacity-95 leading-none">
                      ABOUT LMB
                    </h2>
                    <div className="h-2 w-32 bg-[#00E5FF] rounded-full mb-8 shadow-[0_0_15px_rgba(0,229,255,0.5)]" />
                  </div>

                  <div className="space-y-6 text-lg md:text-xl leading-relaxed text-slate-300">
                    <p className="font-medium text-white">
                      LMB Insurance Brokers Pvt. Ltd (incorporated under the Companies&apos; Act, 1956) has been providing Direct and Reinsurance Brokerage services for over a decade.
                    </p>
                    <p>
                      LMB became incorporated as a <span className="text-[#00E5FF] font-semibold">DIRECT BROKER in 2003</span> achieving the milestone of being the first Direct Insurance Broker in the state of Kerala, India. We have since upgraded to a Composite Broking License in 2018.
                    </p>
                    <p>
                      With us by your side, you can rest assured that all of your insurance needs will be met with speed and efficiency. Be it endorsements or new quotes for your company, we have you covered.
                    </p>
                    <p>
                      As a Reinsurance Broker, we are constantly striving to not only excel in what we do best, but also to venture into exciting, uncharted territories within the Reinsurance Market.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Holographic Mission & Vision Section */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-32">
            {/* Mission Card */}
            <ScrollReveal direction="left" delay={0.2} className="h-full">
              <div className="group relative h-full rounded-[3rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/10 p-10 md:p-14 overflow-hidden transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(0,180,216,0.15)] hover:border-[#00E5FF]/40 flex flex-col justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/0 via-[#00B4D8]/0 to-[#00E5FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="flex flex-col items-center text-center relative z-10 h-full">
                  <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#00E5FF] shadow-[0_0_40px_rgba(0,229,255,0.4)] group-hover:scale-110 transition-transform duration-500">
                    <ArrowDown className="h-10 w-10 text-[#04151a]" />
                  </div>
                  
                  <h3 className="mb-8 font-display text-3xl font-bold tracking-widest text-[#00E5FF] uppercase">
                    Mission
                  </h3>
                  
                  <p className="text-xl md:text-2xl leading-relaxed text-slate-300 font-medium group-hover:text-white transition-colors duration-500">
                    Our mission is to provide exceptional service to our clients while setting the industry standard for risk management consultation and reinsurance service.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Vision Card */}
            <ScrollReveal direction="right" delay={0.4} className="h-full">
              <div className="group relative h-full rounded-[3rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/10 p-10 md:p-14 overflow-hidden transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(0,180,216,0.15)] hover:border-[#00B4D8]/40 flex flex-col justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/0 via-[#00B4D8]/0 to-[#00B4D8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="flex flex-col items-center text-center relative z-10 h-full">
                  <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#00B4D8] shadow-[0_0_40px_rgba(0,180,216,0.4)] group-hover:scale-110 transition-transform duration-500">
                    <ArrowDown className="h-10 w-10 text-[#04151a]" />
                  </div>
                  
                  <h3 className="mb-8 font-display text-3xl font-bold tracking-widest text-[#00B4D8] uppercase">
                    Vision
                  </h3>
                  
                  <p className="text-xl md:text-2xl leading-relaxed text-slate-300 font-medium group-hover:text-white transition-colors duration-500">
                    With the aim of becoming a premier insurance broker in India, we strive to cultivate and bolster our connections with clients and insurance providers both domestically and globally. Additionally, we endeavor to expand our insurance ventures into untapped regions, solidifying our position as a premier force in the industry.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      <CTA />
    </div>
  );
}
