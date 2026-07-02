import { createPageMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Globe2, Target, Award, Building2 } from "lucide-react";
import ShinyText from "@/components/ui/ShinyText";

export const metadata = createPageMetadata({
  title: "About Us",
  description: "Learn about LMB Insurance Brokers — composite insurance broking, mission, values, and corporate philosophy.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#021217] text-slate-300 relative z-0">
      {/* 1. Custom Premium Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-28 pb-16">
        {/* Background Layer: blocks.jpg with smooth transition to dark theme */}
        <div className="absolute inset-0 z-0 bg-[#E0F7FA]">
          <Image 
            src="/assets/blocks.jpg" 
            alt="LMB Corporate" 
            fill 
            className="object-cover opacity-90 scale-105"
            priority
          />
          {/* Gradient that fades to dark ONLY at the very bottom edge to seamlessly blend into the dark page */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-70% to-[#021217]" />
          
          {/* Subtle animated light blooms */}
          <div className="absolute top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-white/20 blur-[120px] animate-[pulse_10s_ease-in-out_infinite]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-start text-left pt-12 md:pt-20">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-slate-700/10 bg-white/40 px-6 py-2 backdrop-blur-md shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#0077B6] animate-pulse" />
              <span className="text-sm font-bold tracking-[0.2em] text-slate-800 uppercase">Our Legacy</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-6 text-slate-900 max-w-3xl drop-shadow-sm">
              About <br />
              <span className="text-[#0077B6]">LMB Brokers</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="max-w-xl text-xl md:text-2xl font-semibold text-slate-800 leading-relaxed mb-12 drop-shadow-sm">
              Established direct and reinsurance brokerage services, redefining risk management and client trust for over two decades.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Interactive Timeline & Story Section with Images */}
      <section className="relative py-16 md:py-20 z-10 bg-[#021217]">
        <div className="mx-auto max-w-7xl px-6">
          
          <div className="mb-12 text-center">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                Our Journey of Excellence
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[#00E5FF] to-[#00B4D8] rounded-full mx-auto" />
            </ScrollReveal>
          </div>

          <div className="space-y-24 md:space-y-32 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#00E5FF]/30 before:to-transparent">
            
            {/* Timeline Item 1 */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="relative flex flex-col md:flex-row items-center justify-between group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#021217] bg-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.4)] z-10 shrink-0 absolute left-0 md:left-1/2 -translate-x-1/2">
                  <ShieldCheck size={16} className="text-[#021217]" />
                </div>
                
                {/* Content Left */}
                <div className="w-full md:w-[45%] pl-16 md:pl-0 md:pr-12 md:text-right mb-8 md:mb-0">
                  <div className="text-[#00E5FF] font-bold tracking-widest text-sm mb-2">2003</div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">Incorporation</h3>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    LMB Insurance Brokers Pvt. Ltd was incorporated, achieving the milestone of being the first Direct Insurance Broker in the state of Kerala, India.
                  </p>
                </div>

                {/* Image Right */}
                <div className="w-full md:w-[45%] pl-16 md:pl-12">
                  <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] group-hover:shadow-[0_20px_40px_rgba(0,229,255,0.15)] transition-all duration-500 group-hover:-translate-y-2">
                    <div className="absolute inset-0 bg-[#00E5FF]/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Image src="/assets/image1.jpeg" alt="Incorporation in 2003" fill className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Timeline Item 2 */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="relative flex flex-col md:flex-row-reverse items-center justify-between group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#021217] bg-[#00B4D8] shadow-[0_0_20px_rgba(0,180,216,0.4)] z-10 shrink-0 absolute left-0 md:left-1/2 -translate-x-1/2">
                  <Award size={16} className="text-[#021217]" />
                </div>
                
                {/* Content Right */}
                <div className="w-full md:w-[45%] pl-16 md:pl-12 mb-8 md:mb-0">
                  <div className="text-[#00B4D8] font-bold tracking-widest text-sm mb-2">2018</div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">Composite License</h3>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    We successfully upgraded to a Composite Broking License, expanding our capabilities to serve both direct and complex reinsurance markets globally.
                  </p>
                </div>

                {/* Image Left */}
                <div className="w-full md:w-[45%] pl-16 md:pl-0 md:pr-12">
                  <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] group-hover:shadow-[0_20px_40px_rgba(0,180,216,0.15)] transition-all duration-500 group-hover:-translate-y-2">
                    <div className="absolute inset-0 bg-[#00B4D8]/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Image src="/assets/image5.jpeg" alt="Upgraded to Composite License" fill className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Timeline Item 3 */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="relative flex flex-col md:flex-row items-center justify-between group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#021217] bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)] z-10 shrink-0 absolute left-0 md:left-1/2 -translate-x-1/2">
                  <Globe2 size={16} className="text-[#021217]" />
                </div>
                
                {/* Content Left */}
                <div className="w-full md:w-[45%] pl-16 md:pl-0 md:pr-12 md:text-right mb-8 md:mb-0">
                  <div className="text-white font-bold tracking-widest text-sm mb-2">PRESENT</div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">Global Expansion</h3>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    We are constantly striving to excel and venture into exciting, uncharted territories within the Reinsurance Market.
                  </p>
                </div>

                {/* Image Right */}
                <div className="w-full md:w-[45%] pl-16 md:pl-12">
                  <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] group-hover:shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:-translate-y-2">
                    <div className="absolute inset-0 bg-white/5 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Image src="/assets/image6.jpeg" alt="Global Reinsurance Expansion" fill className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Sticky Feature Text */}
          <div className="mt-32">
            <ScrollReveal direction="up" delay={0.4}>
              <div className="rounded-[3rem] bg-gradient-to-br from-[#00E5FF]/10 via-transparent to-transparent border border-[#00E5FF]/20 p-10 md:p-16 lg:p-20 backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity duration-700 group-hover:rotate-12 group-hover:scale-110">
                  <Building2 size={200} className="text-[#00E5FF]" />
                </div>
                <div className="grid lg:grid-cols-2 gap-12 relative z-10">
                  <div>
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                      Unmatched Efficiency & Speed
                    </h3>
                    <p className="text-xl text-slate-300 leading-relaxed font-medium">
                      With us by your side, you can rest assured that all of your insurance needs will be met with speed and efficiency. Be it endorsements or new quotes for your company, we have you covered perfectly.
                    </p>
                  </div>
                  <div className="flex flex-col justify-center space-y-6">
                    {["Licensed by IRDAI", "15+ Years Experience", "Client-First Approach", "Tailored Risk Solutions"].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-white/5 rounded-full px-6 py-4 border border-white/5 hover:border-[#00E5FF]/30 transition-colors">
                        <CheckCircle2 className="text-[#00E5FF] shrink-0" size={24} />
                        <span className="text-slate-200 font-semibold text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* 3. Ultra-Premium Mission & Vision Section with Background Images */}
      <section className="relative py-16 md:py-20 bg-[#020b0e] overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00E5FF]/20 to-transparent" />
        
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Mission Panel */}
            <ScrollReveal direction="up" delay={0.2} className="h-full">
              <div className="group relative h-full rounded-[3rem] border border-white/10 p-12 overflow-hidden transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_100px_-20px_rgba(0,229,255,0.25)] flex flex-col items-start min-h-[450px]">
                {/* Background Image */}
                <Image src="/assets/image2.jpeg" alt="Mission" fill className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020b0e] via-[#020b0e]/50 to-transparent" />
                
                {/* Glow Effect */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#00E5FF] rounded-full mix-blend-screen filter blur-[100px] opacity-20 group-hover:opacity-50 transition-opacity duration-700" />
                
                <div className="mt-auto relative z-10 w-full">
                  <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00B4D8] to-[#00E5FF] shadow-[0_10px_30px_rgba(0,229,255,0.3)] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    <Target className="h-10 w-10 text-[#04151a]" />
                  </div>
                  
                  <h3 className="mb-6 font-display text-4xl font-bold text-white flex items-center gap-4">
                    Our Mission
                    <span className="h-px flex-1 bg-gradient-to-r from-[#00E5FF]/50 to-transparent" />
                  </h3>
                  
                  <p className="text-xl leading-relaxed text-slate-300 group-hover:text-white transition-colors duration-500">
                    To provide exceptional service to our clients while setting the industry standard for risk management consultation and reinsurance service.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Vision Panel */}
            <ScrollReveal direction="up" delay={0.4} className="h-full">
              <div className="group relative h-full rounded-[3rem] border border-white/10 p-12 overflow-hidden transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_100px_-20px_rgba(0,180,216,0.25)] flex flex-col items-start min-h-[450px]">
                {/* Background Image */}
                <Image src="/assets/image3.jpeg" alt="Vision" fill className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020b0e] via-[#020b0e]/50 to-transparent" />
                
                {/* Glow Effect */}
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#00B4D8] rounded-full mix-blend-screen filter blur-[100px] opacity-20 group-hover:opacity-50 transition-opacity duration-700" />
                
                <div className="mt-auto relative z-10 w-full">
                  <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-slate-300 shadow-[0_10px_30px_rgba(255,255,255,0.2)] group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                    <Globe2 className="h-10 w-10 text-[#04151a]" />
                  </div>
                  
                  <h3 className="mb-6 font-display text-4xl font-bold text-white flex items-center gap-4">
                    Our Vision
                    <span className="h-px flex-1 bg-gradient-to-r from-white/30 to-transparent" />
                  </h3>
                  
                  <p className="text-xl leading-relaxed text-slate-300 group-hover:text-white transition-colors duration-500">
                    With the aim of becoming a premier insurance broker in India, we strive to cultivate connections domestically and globally. We endeavor to expand into untapped regions, solidifying our position as a premier force.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </div>
  );
}
