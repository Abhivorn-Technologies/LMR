import { createPageMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { MethodologySection } from "@/components/sections/MethodologySection";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Globe2, Target, Award, Briefcase } from "lucide-react";

import { getPageContent } from '@/lib/cms';
import { aboutPageContent } from '@/lib/content/about';
import { checkIsAdmin } from '@/lib/auth';
import { AdminEditOverlay } from '@/components/admin/AdminEditOverlay';

export const metadata = createPageMetadata({
  title: "About Us | LMB Insurance Brokers",
  description: "Learn about LMB Insurance Brokers, our legacy, team, and commitment to excellence.",
  path: "/about",
});

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  // Fetch live JSON data from MongoDB (falls back to defaults if empty)
  const content = await getPageContent('page:about', aboutPageContent);
  const isAdmin = await checkIsAdmin();

  return (
    <div className="min-h-screen bg-white text-slate-600 relative z-0 selection:bg-[#115E59] selection:text-white">
      
      {/* 1. Refined Corporate Hero Section */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Text Content */}
            <div className="max-w-2xl">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="mb-6 inline-flex items-center gap-3">
                  <span className="h-px w-8 bg-[#115E59]" />
                  <span className="text-sm font-semibold tracking-widest text-[#115E59] uppercase">{content.hero.tagline}</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.2}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-4 sm:mb-6 leading-tight">
                  <TextReveal delay={0.3}>{content.hero.titleLine1}</TextReveal>
                  <span className="text-[#115E59] font-serif italic"><TextReveal delay={0.4}>{content.hero.titleHighlight}</TextReveal></span>
                  <br />
                  <TextReveal delay={0.5}>{content.hero.titleLine2}</TextReveal>
                  <span className="text-[#115E59]"><TextReveal delay={0.6}>{content.hero.titleLine3}</TextReveal></span>
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
                  {content.hero.description}
                </p>
              </ScrollReveal>
            </div>

            {/* Hero Image */}
            <ScrollReveal direction="left" delay={0.4}>
              <div className="relative h-[250px] sm:h-[400px] lg:h-[520px] w-full rounded-tl-[3rem] rounded-br-[3rem] lg:rounded-tl-[4rem] lg:rounded-br-[4rem] overflow-hidden shadow-2xl mt-4 lg:mt-6">
                <Image 
                  src={content.hero.image} 
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
      <section className="pt-12 pb-20 md:pt-16 md:pb-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {content.journey.title}
              </h2>
              <p className="text-lg text-slate-600">
                {content.journey.description}
              </p>
            </ScrollReveal>
          </div>

          <div className="space-y-16 relative before:absolute before:inset-0 before:ml-[1.1rem] md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-slate-200">
            
            {content.journey.milestones.map((milestone, index) => {
              // Alternate icons based on index
              const icons = [ShieldCheck, Award, Globe2];
              const Icon = icons[index % icons.length];
              
              const isEven = index % 2 === 0;

              return (
                <ScrollReveal key={index} direction="up" delay={0.1 + (index * 0.1)}>
                  <div className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between group`}>
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${isEven ? 'bg-[#115E59]' : 'bg-slate-800'} shadow-sm z-10 shrink-0 absolute left-0 md:left-1/2 -translate-x-1/2`}>
                      <Icon size={16} className="text-white" />
                    </div>
                    
                    <div className={`w-full md:w-[45%] ${isEven ? 'pl-16 md:pl-0 md:pr-12 md:text-right' : 'pl-16 md:pl-12'}`}>
                      <span className={`${isEven ? 'text-[#115E59]' : 'text-slate-500'} font-bold tracking-widest text-sm mb-2 block`}>{milestone.year}</span>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{milestone.title}</h3>
                      <p className="text-slate-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>

                    <div className={`w-full md:w-[45%] ${isEven ? 'pl-16 md:pl-12 mt-6 md:mt-0' : 'pl-16 md:pl-0 md:pr-12 mt-6 md:mt-0'}`}>
                      <div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-500">
                        <Image src={milestone.image} alt={milestone.title} fill className="object-cover" />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}

          </div>
        </div>
      </section>

      {/* 3. Company Profile / Methodology */}
      <MethodologySection />

      {/* 4. Mission & Vision */}
      <section className="py-24 md:py-32 bg-[#F8FBFC] relative overflow-hidden">
        {/* Cinematic Background Glows */}
        <div className="absolute top-0 left-0 w-full h-[800px] z-0 pointer-events-none">
          <div className="absolute top-[10%] right-[20%] h-[500px] w-[500px] rounded-full bg-[#00B4D8]/10 blur-[100px] animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-[10%] left-[20%] h-[600px] w-[600px] rounded-full bg-[#115E59]/10 blur-[120px] animate-[pulse_10s_ease-in-out_infinite_reverse]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00B4D8]/20 bg-[#00B4D8]/5 px-4 py-2 mb-6 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#00B4D8] animate-pulse" />
                <span className="text-xs font-bold tracking-[0.2em] text-[#00B4D8] uppercase">{content.principles.tagline}</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#04151a] mb-6 tracking-tight leading-tight">
                {content.principles.title} <span className="text-[#115E59] font-serif italic">{content.principles.titleHighlight}</span>
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            
            {/* Mission Card */}
            <ScrollReveal direction="up" delay={0.1} className="h-full">
              <div className="group relative h-full rounded-[2.5rem] bg-gradient-to-br from-[#115E59] to-[#083A38] p-10 md:p-12 overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(17,94,89,0.3)] flex flex-col justify-between">
                {/* Number Watermark */}
                <div className="absolute -right-4 top-4 text-[150px] font-extrabold text-white/[0.03] leading-none select-none group-hover:scale-110 group-hover:-translate-x-4 transition-transform duration-700">01</div>
                {/* Glow */}
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#00B4D8]/20 blur-3xl rounded-full group-hover:bg-[#00B4D8]/30 transition-colors duration-700" />
                
                <div className="relative z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg mb-8 group-hover:scale-110 group-hover:bg-white group-hover:text-[#115E59] transition-all duration-500">
                    <Target className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                    {content.principles.mission.title}
                  </h3>
                  <p className="text-[#a8d5df] leading-relaxed text-lg md:text-xl font-medium">
                    {content.principles.mission.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Vision Card */}
            <ScrollReveal direction="up" delay={0.2} className="h-full">
              <div className="group relative h-full rounded-[2.5rem] bg-white/60 backdrop-blur-2xl border border-white/80 p-10 md:p-12 overflow-hidden shadow-[0_8px_30px_rgba(12,73,79,0.06)] transition-all duration-700 hover:-translate-y-2 hover:bg-white/90 hover:shadow-[0_20px_50px_rgba(0,180,216,0.15)] flex flex-col justify-between">
                {/* Number Watermark */}
                <div className="absolute -right-4 top-4 text-[150px] font-extrabold text-[#115E59]/[0.03] leading-none select-none group-hover:scale-110 group-hover:-translate-x-4 transition-transform duration-700">02</div>
                
                <div className="relative z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00B4D8]/10 border border-[#00B4D8]/20 text-[#00869e] shadow-sm mb-8 group-hover:scale-110 group-hover:bg-[#00B4D8] group-hover:text-white transition-all duration-500">
                    <Briefcase className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-[#04151a] mb-6">
                    {content.principles.vision.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg md:text-xl font-medium group-hover:text-slate-800 transition-colors">
                    {content.principles.vision.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>
      
      {isAdmin && <AdminEditOverlay pageKey="page:about" />}
    </div>
  );
}
