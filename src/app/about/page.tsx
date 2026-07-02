import { createPageMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Globe2, Target, Award, Briefcase } from "lucide-react";

export const metadata = createPageMetadata({
  title: "About Us | LMB Insurance Brokers",
  description: "Learn about LMB Insurance Brokers — composite insurance broking, mission, values, and corporate philosophy.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-600 relative z-0 selection:bg-[#115E59] selection:text-white">
      
      {/* 1. Refined Corporate Hero Section */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-20 overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Text Content */}
            <div className="max-w-2xl">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="mb-6 inline-flex items-center gap-3">
                  <span className="h-px w-8 bg-[#115E59]" />
                  <span className="text-sm font-semibold tracking-widest text-[#115E59] uppercase">Our Legacy</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                  A Tradition of <span className="text-[#115E59] font-serif italic">Trust</span> <br />
                  & <span className="text-[#115E59]">Excellence.</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
                  For over two decades, LMB Insurance Brokers has delivered unparalleled direct and reinsurance solutions, redefining risk management with unwavering integrity and a commitment to our clients&apos; success.
                </p>
              </ScrollReveal>
            </div>

            {/* Hero Image */}
            <ScrollReveal direction="left" delay={0.4}>
              <div className="relative h-[400px] lg:h-[520px] w-full rounded-tl-[4rem] rounded-br-[4rem] overflow-hidden shadow-2xl lg:mt-6">
                <Image 
                  src="/assets/blocks.jpeg" 
                  alt="LMB Corporate Family" 
                  fill 
                  className="object-cover object-[50%_80%] hover:scale-105 transition-transform duration-1000"
                  priority
                />
                <div className="absolute inset-0 bg-[#115E59]/10 mix-blend-multiply" />
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 2. Professional Timeline Section */}
      <section className="py-20 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Our Journey
              </h2>
              <p className="text-lg text-slate-600">
                Milestones that define our commitment to excellence and our continuous evolution in the global insurance landscape.
              </p>
            </ScrollReveal>
          </div>

          <div className="space-y-16 relative before:absolute before:inset-0 before:ml-[1.1rem] md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-slate-200">
            
            {/* Timeline Item 1 */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="relative flex flex-col md:flex-row items-center justify-between group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#115E59] shadow-sm z-10 shrink-0 absolute left-0 md:left-1/2 -translate-x-1/2">
                  <ShieldCheck size={16} className="text-white" />
                </div>
                
                <div className="w-full md:w-[45%] pl-16 md:pl-0 md:pr-12 md:text-right">
                  <span className="text-[#115E59] font-bold tracking-widest text-sm mb-2 block">2003</span>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Incorporation</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Founded with a vision to lead, LMB Insurance Brokers became the first Direct Insurance Broker in Kerala, India, setting a new benchmark for regional brokerage services.
                  </p>
                </div>

                <div className="w-full md:w-[45%] pl-16 md:pl-12 mt-8 md:mt-0">
                  <div className="relative h-56 w-full rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-500">
                    <Image src="/assets/image1.jpeg" alt="Incorporation in 2003" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Timeline Item 2 */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="relative flex flex-col md:flex-row-reverse items-center justify-between group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#115E59] shadow-sm z-10 shrink-0 absolute left-0 md:left-1/2 -translate-x-1/2">
                  <Award size={16} className="text-white" />
                </div>
                
                <div className="w-full md:w-[45%] pl-16 md:pl-12">
                  <span className="text-[#115E59] font-bold tracking-widest text-sm mb-2 block">2018</span>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Composite License</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Successfully upgraded to a Composite Broking License, expanding our strategic capabilities to navigate and serve complex direct and reinsurance markets globally.
                  </p>
                </div>

                <div className="w-full md:w-[45%] pl-16 md:pl-0 md:pr-12 mt-8 md:mt-0">
                  <div className="relative h-56 w-full rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-500">
                    <Image src="/assets/image5.jpeg" alt="Composite License" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Timeline Item 3 */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="relative flex flex-col md:flex-row items-center justify-between group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-800 shadow-sm z-10 shrink-0 absolute left-0 md:left-1/2 -translate-x-1/2">
                  <Globe2 size={16} className="text-white" />
                </div>
                
                <div className="w-full md:w-[45%] pl-16 md:pl-0 md:pr-12 md:text-right">
                  <span className="text-slate-500 font-bold tracking-widest text-sm mb-2 block">PRESENT</span>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Global Expansion</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Continuously striving for excellence, we are actively venturing into uncharted global territories, providing bespoke reinsurance solutions to a worldwide clientele.
                  </p>
                </div>

                <div className="w-full md:w-[45%] pl-16 md:pl-12 mt-8 md:mt-0">
                  <div className="relative h-56 w-full rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-500">
                    <Image src="/assets/image6.jpeg" alt="Global Reinsurance Expansion" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 3. Core Values & Efficiency */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <ScrollReveal direction="up">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Unmatched Efficiency & Strategic Speed
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-10">
                  Time is a critical asset in risk management. Partnering with LMB ensures that your insurance requirements are executed with precision and promptness. From intricate endorsements to comprehensive new quotes, our streamlined processes guarantee flawless coverage.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    "Licensed by IRDAI", 
                    "20+ Years of Expertise", 
                    "Client-Centric Approach", 
                    "Tailored Risk Solutions"
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#115E59] shrink-0 mt-1" size={20} />
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.2}>
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-xl">
                <Image src="/assets/image4.jpeg" alt="Professional Efficiency" fill className="object-cover" />
                <div className="absolute inset-0 bg-slate-900/20" />
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 4. Mission & Vision */}
      <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-40 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-b from-[#115E59]/5 to-transparent blur-3xl" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-t from-[#115E59]/5 to-transparent blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                Our Guiding Principles
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-slate-300" />
                <span className="h-2 w-2 rounded-full bg-[#115E59]" />
                <span className="h-px w-12 bg-slate-300" />
              </div>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Mission - Dark Premium Card */}
            <ScrollReveal direction="up" delay={0.1} className="h-full">
              <div className="group relative h-full bg-[#115E59] rounded-[2.5rem] p-10 md:p-14 overflow-hidden shadow-2xl hover:shadow-[#115E59]/20 transition-all duration-500 hover:-translate-y-2">
                {/* Decorative large icon watermark */}
                <Target className="absolute -right-8 -bottom-8 text-white/5 w-64 h-64 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-10 border border-white/20 group-hover:bg-white/20 transition-colors">
                    <Target className="text-white" size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6 tracking-wide">Our Mission</h3>
                  <p className="text-white/80 leading-relaxed text-lg md:text-xl font-light">
                    To deliver exceptional, personalized service to our clients while establishing the industry benchmark for risk management consultation and innovative reinsurance solutions. We exist to protect what matters most to you.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Vision - Light Premium Card */}
            <ScrollReveal direction="up" delay={0.2} className="h-full">
              <div className="group relative h-full bg-white rounded-[2.5rem] p-10 md:p-14 overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Decorative large icon watermark */}
                <Briefcase className="absolute -right-8 -bottom-8 text-slate-50 w-64 h-64 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-10 border border-slate-100 group-hover:bg-[#115E59]/5 transition-colors">
                    <Briefcase className="text-[#115E59]" size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-6 tracking-wide">Our Vision</h3>
                  <p className="text-slate-600 leading-relaxed text-lg md:text-xl font-light">
                    To be the preeminent insurance broker in India and beyond, cultivating robust connections both domestically and globally. We continuously endeavor to expand into untapped markets, solidifying our reputation as a globally trusted force.
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
