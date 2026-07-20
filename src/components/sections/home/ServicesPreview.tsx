import * as LucideIcons from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

const DynamicIcon = ({ name, className, strokeWidth }: { name: string, className?: string, strokeWidth?: number }) => {
  // @ts-ignore
  const IconComponent = LucideIcons[name] || LucideIcons.HelpCircle;
  return <IconComponent className={className} strokeWidth={strokeWidth} />;
};

const defaultServices = [
  {
    id: "gi", title: "General Insurance", icon: "Home",
    shortDescription: "Protect your assets, operations, and liabilities with tailored non-life insurance programs.",
    homePoints: ["Property & Asset Coverage", "Liability Protection", "Fleet & Motor Fleet"]
  },
  {
    id: "life", title: "Life Insurance", icon: "Heart",
    shortDescription: "Secure your family's financial future and your employees' well-being.",
    homePoints: ["Term Life Policies", "Group Mediclaim", "Keyman Insurance"]
  },
  {
    id: "reinsurance", title: "Reinsurance", icon: "Shield",
    shortDescription: "Risk transfer solutions for insurance companies and large conglomerates.",
    homePoints: ["Treaty Reinsurance", "Facultative Support", "Risk Modeling"]
  },
  {
    id: "claims", title: "Claim Services", icon: "FileText",
    shortDescription: "End-to-end dedicated claims management and advocacy when you need it most.",
    homePoints: ["24/7 Claims Desk", "Surveyor Liaison", "Dispute Resolution"]
  },
  {
    id: "risk", title: "Risk Management", icon: "Target",
    shortDescription: "Identify, quantify, and mitigate enterprise-level risks proactively.",
    homePoints: ["Site Inspections", "Valuation Services", "Safety Audits"]
  },
  {
    id: "consulting", title: "Consulting", icon: "Users",
    shortDescription: "Strategic advisory on policy structuring, portfolio reviews, and compliance.",
    homePoints: ["Portfolio Optimization", "Policy Auditing", "Regulatory Guidance"]
  }
];

export function ServicesPreview({ 
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
    <section id="life-insurance" className="relative py-20 bg-white">
      <div className="mx-auto max-w-[1400px] px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <FadeIn>
            <h2 
              key={`title-${content?.title || 'default'}`}
              className={`text-4xl md:text-5xl font-extrabold text-[#0f172a] mb-4 ${isEditMode ? 'outline-none border-b border-dashed border-transparent hover:border-[#0f172a] cursor-text' : ''}`}
              contentEditable={isEditMode}
              suppressContentEditableWarning
              onBlur={(e) => onContentChange?.({ ...content, title: e.currentTarget.textContent })}
            >
              {content?.title || "What would you like us to take care of?"}
            </h2>
            <p 
              key={`desc-${content?.description || 'default'}`}
              className={`text-lg md:text-xl text-[#64748b] font-medium max-w-3xl mx-auto ${isEditMode ? 'outline-none border border-dashed border-transparent hover:border-[#64748b] p-1 -m-1 rounded cursor-text' : ''}`}
              contentEditable={isEditMode}
              suppressContentEditableWarning
              onBlur={(e) => onContentChange?.({ ...content, description: e.currentTarget.textContent })}
            >
              {content?.description || "Comprehensive broking across general insurance, life insurance, reinsurance, and risk management."}
            </p>
          </FadeIn>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(content?.services || defaultServices).map((service: any, i: number) => {
            return (
              <FadeIn key={service.id || i} delay={i * 0.1} className="h-full">
                <div className="block h-full group">
                  <div className="bg-white hover:bg-[#115E59] rounded-3xl border border-slate-200 hover:border-[#115E59] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(17,94,89,0.25)] transition-all duration-700 ease-out relative overflow-hidden flex flex-col h-full z-10">
                    
                    {/* Top Icon Area */}
                    <div className="mb-6 flex justify-between items-start">
                      <div className="w-16 h-16 rounded-2xl bg-[#f8fafc] group-hover:bg-gradient-to-br group-hover:from-white/10 group-hover:to-white/0 flex items-center justify-center border border-slate-100 group-hover:border-white/20 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-700 ease-out">
                        <div className="transition-all duration-700 ease-out group-hover:scale-[1.2] group-hover:-translate-y-1 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                          <DynamicIcon name={service.icon} className="h-8 w-8 text-[#0f172a] group-hover:text-white transition-colors duration-700" strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Title & Description */}
                    <h3 
                      key={`stitle-${service.title || 'default'}`}
                      className={`text-[22px] font-bold text-[#0f172a] group-hover:text-white mb-3 tracking-tight transition-colors duration-700 ${isEditMode ? 'outline-none border-b border-dashed border-transparent hover:border-[#0f172a] cursor-text' : ''}`}
                      contentEditable={isEditMode}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        if (onContentChange) {
                          const newServices = [...(content?.services || defaultServices)];
                          newServices[i] = { ...newServices[i], title: e.currentTarget.textContent };
                          onContentChange({ ...content, services: newServices });
                        }
                      }}
                    >
                      {service.title}
                    </h3>
                    <p 
                      key={`sdesc-${service.shortDescription || 'default'}`}
                      className={`text-[14px] text-[#64748b] group-hover:text-white/90 font-medium leading-relaxed mb-8 flex-grow transition-colors duration-700 ${isEditMode ? 'outline-none border border-dashed border-transparent hover:border-[#64748b] p-1 -m-1 rounded cursor-text' : ''}`}
                      contentEditable={isEditMode}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        if (onContentChange) {
                          const newServices = [...(content?.services || defaultServices)];
                          newServices[i] = { ...newServices[i], shortDescription: e.currentTarget.textContent };
                          onContentChange({ ...content, services: newServices });
                        }
                      }}
                    >
                      {service.shortDescription}
                    </p>

                    {/* Feature List */}
                    <ul className="space-y-3.5 mb-2 mt-auto">
                      {(service.homePoints || []).map((point: string, idx: number) => (
                        <li key={idx} className="flex items-start text-[13px] font-semibold text-[#0f172a] group-hover:text-white transition-colors duration-700">
                          <div className="mt-0.5 mr-3 flex shrink-0 h-[18px] w-[18px] rounded-full bg-[#10b981] group-hover:bg-white group-hover:text-[#115E59] items-center justify-center transition-colors duration-700">
                            <CheckCircle2 className="w-3 h-3 text-white group-hover:text-[#115E59] transition-colors duration-700" strokeWidth={3} />
                          </div>
                          <span
                            key={`spoint-${point || 'default'}`}
                            contentEditable={isEditMode}
                            suppressContentEditableWarning
                            className={isEditMode ? 'outline-none border-b border-dashed border-transparent hover:border-[#0f172a] cursor-text flex-1' : 'flex-1'}
                            onBlur={(e) => {
                              if (onContentChange) {
                                const newServices = [...(content?.services || defaultServices)];
                                const newPoints = [...(newServices[i].homePoints || [])];
                                newPoints[idx] = e.currentTarget.textContent || '';
                                newServices[i] = { ...newServices[i], homePoints: newPoints };
                                onContentChange({ ...content, services: newServices });
                              }
                            }}
                          >
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>

                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
