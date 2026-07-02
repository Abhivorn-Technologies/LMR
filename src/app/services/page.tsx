import { createPageMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { Shield, Users, Briefcase, Activity, Target, ArrowRight } from "lucide-react";

export const metadata = createPageMetadata({
  title: "Services",
  description: "Comprehensive insurance and risk management services by LMB Insurance Brokers.",
  path: "/services",
});

const mainServices = [
  {
    title: "General Insurance",
    description: "Comprehensive coverage solutions tailored to protect your business assets and liabilities against all unforeseen risks.",
    icon: Shield,
    image: "/assets/image1.jpeg",
    link: "/services/general-insurance"
  },
  {
    title: "Reinsurance",
    description: "Strategic risk transfer and capital relief solutions designed to protect insurers against major catastrophic losses.",
    icon: Briefcase,
    image: "/assets/image2.jpeg",
    link: "/reinsurance"
  },
  {
    title: "Life Insurance",
    description: "Bespoke life and health insurance portfolios securing the financial future of your loved ones and key personnel.",
    icon: Users,
    image: "/assets/blocks.jpeg",
    link: "/services/life-insurance"
  },
  {
    title: "Risk Management",
    description: "Meticulous evaluation and tailored mitigation strategies ensuring complete protection across all operational domains.",
    icon: Target,
    image: "/assets/image3.jpeg",
    link: "/services/risk-management"
  },
  {
    title: "Consulting",
    description: "Expert advisory on complex insurance planning, comprehensive policy audits, and dedicated claims management.",
    icon: Activity,
    image: "/assets/image5.jpeg",
    link: "/services/consulting"
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 relative z-0 selection:bg-[#115E59] selection:text-white">
      
      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-48 lg:pt-40 lg:pb-56 w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/blocks.jpeg" 
            alt="LMB Services Background" 
            fill 
            className="object-cover"
            priority
          />
          {/* Cool, elegant brand gradient overlay */}
          <div className="absolute inset-0 bg-slate-900/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-[#115E59]/20" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-6 py-2 mb-8 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#00E5FF]" />
              <span className="text-sm font-bold tracking-[0.2em] text-white uppercase">Our Expertise</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8">
              Comprehensive <br />
              <span className="text-[#00E5FF] font-serif italic">Insurance Solutions.</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
              Tailored risk management and elite insurance broking services designed to protect what matters most to you and your enterprise.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Elegant Service Cards with Images */}
      <section className="relative z-20 -mt-32 max-w-7xl mx-auto px-6 mb-32">
        <div className="flex flex-wrap justify-center gap-8">
          {mainServices.map((service, index) => (
            <div key={service.title} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
              <ScrollReveal direction="up" delay={0.1 * (index + 1)} className="h-full">
                <Link href={service.link} className="block h-full group">
                  <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl hover:shadow-2xl hover:shadow-[#115E59]/10 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden flex flex-col h-full">
                    
                    {/* Image Header */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image 
                        src={service.image} 
                        alt={service.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-8 pt-10 flex flex-col flex-grow relative">
                      {/* Floating Icon */}
                      <div className="absolute -top-10 left-8 w-16 h-16 rounded-2xl bg-white flex items-center justify-center border-4 border-white shadow-sm group-hover:bg-[#115E59] group-hover:border-[#115E59] transition-colors duration-500 z-10">
                        <service.icon size={24} className="text-[#115E59] group-hover:text-white transition-colors duration-500" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#115E59] transition-colors duration-300">
                        {service.title}
                      </h3>
                      
                      <p className="text-slate-600 font-light leading-relaxed mb-8 flex-grow">
                        {service.description}
                      </p>
                      
                      <div className="mt-auto flex items-center text-[#115E59] font-medium text-sm tracking-wide">
                        Explore Service 
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>

                  </div>
                </Link>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology Section - Professional Redesign */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-2 mb-8 shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-[#115E59]" />
                  <span className="text-xs font-bold tracking-[0.2em] text-[#115E59] uppercase">Our Methodology</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-[1.1] tracking-tight">
                  Partnering in <br />
                  <span className="text-[#115E59] font-serif italic">Your Success.</span>
                </h2>
                
                <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed">
                  <p>
                    Our team of highly proficient risk management specialists conducts a meticulous evaluation of our clients&apos; needs, acquiring a detailed understanding of operations, assets, and potential liabilities.
                  </p>
                  <p>
                    Utilizing this information, we determine the optimal choices for risk retention and transfer, executing a thorough cost-benefit analysis to develop solutions that provide comprehensive coverage in a financially sound manner.
                  </p>
                </div>
                
                <div className="mt-10 flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 bg-white px-5 py-3.5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <Target className="text-[#115E59]" size={20} />
                    <span className="text-sm font-semibold text-slate-700">Meticulous Evaluation</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white px-5 py-3.5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <Shield className="text-[#115E59]" size={20} />
                    <span className="text-sm font-semibold text-slate-700">Comprehensive Coverage</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="h-full">
              <div className="relative h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl group">
                <Image 
                  src="/assets/image5.jpeg" 
                  alt="Partnering in Success" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
                
                {/* Floating Premium Badge */}
                <div className="absolute bottom-8 left-8 right-8 md:right-auto bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white max-w-[300px]">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-[#115E59]/10 flex items-center justify-center">
                      <Activity className="text-[#115E59]" size={24} />
                    </div>
                    <div className="text-3xl font-bold text-slate-900 tracking-tight">100%</div>
                  </div>
                  <div className="text-sm font-medium text-slate-600 leading-relaxed">
                    Committed to establishing the industry benchmark for risk management.
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
          </div>
        </div>
      </section>

    </div>
  );
}
