import { Shield, FileText, Target, Globe } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { whyLmbPoints } from "@/lib/content/pages";

export function WhyPreview() {
  const icons = [Shield, FileText, Target, Globe];

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0c494f] mb-6">
            Why choose LMB?
          </h2>
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            A composite broker's duty of care runs to you, the client — that changes everything.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 md:mb-24">
          {whyLmbPoints.slice(0, 4).map((point, i) => {
            const Icon = icons[i];
            return (
              <FadeIn key={point.title} delay={i * 0.1} className="h-full">
                <div className="h-full flex flex-col items-center text-center rounded-[1.5rem] border border-slate-100 bg-white p-8 md:p-10 transition-all duration-300 hover:border-[#0c494f]/20 hover:shadow-2xl hover:shadow-[#0c494f]/5 hover:-translate-y-2">
                  <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#115E59]/10">
                    <Icon className="h-8 w-8 text-[#0c494f]" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-4 text-[17px] font-bold text-[#0c494f]">
                    {point.title}
                  </h3>
                  <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Quote Section */}
        <FadeIn delay={0.4}>
          <div className="bg-[#0c494f] rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-start gap-6 md:gap-8 shadow-2xl shadow-[#0c494f]/20">
            <span className="text-white/30 text-6xl md:text-7xl font-serif leading-none mt-[-10px] md:mt-[-15px]">"</span>
            <p className="text-white/90 text-sm md:text-base font-medium leading-loose flex-1">
              With us by your side, you can rest assured that all of your insurance needs will be met with speed and efficiency. Be it endorsements or new quotes for your company, we have you covered. As a Reinsurance Broker, we are constantly striving to not only excel in what we do best, but also to venture into exciting, uncharted territories within the Reinsurance Market.
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
