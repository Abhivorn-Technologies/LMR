import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { industries } from "@/lib/content/industries";

export function IndustriesPreview({ 
  content,
  isEditMode,
  isActive,
  onContentChange
}: { 
  content?: any;
  isEditMode?: boolean;
  isActive?: boolean;
  onContentChange?: (content: any) => void;
}) {
  return (
    <section className="relative overflow-hidden bg-[#f4f9f9] pt-24 md:pt-32 pb-24">
      <div className="relative mx-auto max-w-[1400px] px-6">
        
        {/* Header Section */}
        <div className="relative mb-16">
          <div className="flex flex-col items-center text-center gap-6">
            <FadeIn className="max-w-3xl flex flex-col items-center">
              <h2 
                className={`text-4xl md:text-5xl font-extrabold text-[#0c494f] mb-4 ${isEditMode ? 'outline-none border-b border-dashed border-transparent hover:border-[#0c494f] cursor-text' : ''}`}
                contentEditable={isEditMode}
                suppressContentEditableWarning
                onBlur={(e) => onContentChange?.({ ...content, title: e.currentTarget.textContent })}
              >
                {content?.title || "Specialized sector expertise"}
              </h2>
              <p 
                className={`text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-3xl ${isEditMode ? 'outline-none border border-dashed border-transparent hover:border-slate-500 p-1 -m-1 rounded cursor-text' : ''}`}
                contentEditable={isEditMode}
                suppressContentEditableWarning
                onBlur={(e) => onContentChange?.({ ...content, description: e.currentTarget.textContent })}
              >
                {content?.description || "Insurance programs meticulously tailored to your industry's exposures."}
              </p>
            </FadeIn>
          </div>
          
          <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2">
            <FadeIn delay={0.2}>
              <Link href="/industries" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-[#115E59]/30 text-[#115E59] font-bold rounded-xl hover:bg-[#115E59] hover:text-white transition-all duration-300 shadow-sm text-sm">
                View All Industries <ArrowRight size={16} />
              </Link>
            </FadeIn>
          </div>
        </div>
          
        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 mb-12 items-stretch">
          {industries.slice(0, 5).map((industry, i) => {
            const Icon = industry.icon;
            return (
              <FadeIn key={industry.id} delay={i * 0.1} className="h-full">
                <div className="h-full bg-white rounded-2xl p-5 md:p-6 flex flex-col items-center text-center border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 hover:border-[#115E59]/30 transition-all duration-300">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 border border-slate-100 shrink-0">
                    <Icon className="h-5 w-5 text-[#0c494f]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-[15px] lg:text-[16px] font-bold text-[#0c494f] mb-2.5 leading-tight">
                    {industry.title}
                  </h3>
                  <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="flex lg:hidden justify-center mb-12">
          <Link href="/industries" className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#115E59]/30 text-[#115E59] font-bold rounded-xl hover:bg-[#115E59] hover:text-white transition-all duration-300 shadow-sm">
            View All Industries <ArrowRight size={18} />
          </Link>
        </div>

        {/* Bottom CTA Banner */}
        <FadeIn delay={0.4}>
          <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <h4 
              className={`text-lg md:text-[20px] font-bold text-[#0c494f] text-center sm:text-left ${isEditMode ? 'outline-none border-b border-dashed border-transparent hover:border-[#0c494f] cursor-text' : ''}`}
              contentEditable={isEditMode}
              suppressContentEditableWarning
              onBlur={(e) => onContentChange?.({ ...content, ctaText: e.currentTarget.textContent })}
            >
              {content?.ctaText || "Don't see your industry listed?"}
            </h4>
            <Link href="/contact" className="shrink-0 bg-[#115E59] hover:bg-[#0c494f] text-white font-bold py-3.5 px-8 rounded-xl transition-colors shadow-lg shadow-[#115E59]/20 flex items-center justify-center text-[15px]">
              <span
                contentEditable={isEditMode}
                suppressContentEditableWarning
                className={isEditMode ? 'outline-none border-b border-dashed border-transparent hover:border-white cursor-text' : ''}
                onBlur={(e) => onContentChange?.({ ...content, ctaButtonText: e.currentTarget.textContent })}
              >
                {content?.ctaButtonText || "Consult With Our Experts"}
              </span> <span className="ml-2 font-normal">→</span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
