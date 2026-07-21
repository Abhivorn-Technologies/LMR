import { FadeIn } from "@/components/motion/FadeIn";
import * as LucideIcons from "lucide-react";

const DynamicIcon = ({ name, className, strokeWidth }: { name: string, className?: string, strokeWidth?: number }) => {
  // @ts-ignore
  const IconComponent = LucideIcons[name] || LucideIcons.HelpCircle;
  return <IconComponent className={className} strokeWidth={strokeWidth} />;
};

const defaultPoints = [
    {
      title: "Composite Broker",
      description: "Single advisory relationship across general insurance, reinsurance, life insurance, and risk management.",
      icon: "Shield",
    },
    {
      title: "Licensed Operations",
      description: "Regulated insurance broking practice operating within applicable IRDAI licensing requirements.",
      icon: "FileText",
    },
    {
      title: "Dedicated Advisory",
      description: "Account-focused engagement — structured communication, documented recommendations, responsive service.",
      icon: "Target",
    },
    {
      title: "Market Access",
      description: "Relationships with domestic and international insurers and reinsurers to secure competitive capacity.",
      icon: "Globe",
    },
];

export function WhyPreview({ 
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
  const points = content?.points?.length > 0 ? content.points : defaultPoints;

  return (
    <section className="py-24 bg-[#fafcff] relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 
            className={`text-4xl md:text-5xl font-extrabold text-[#0c494f] mb-4 relative inline-block ${isEditMode ? 'outline-none border-b border-dashed border-transparent hover:border-[#0c494f] cursor-text' : ''}`}
            contentEditable={isEditMode}
            suppressContentEditableWarning
            onBlur={(e) => onContentChange?.({ ...content, title: e.currentTarget.textContent })}
          >
            {content?.title || "Why choose LMB?"}
            {!isEditMode && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-3 bg-[#ffb800] rounded-full -z-10 opacity-80" style={{ marginLeft: '100px' }} />
            )}
          </h2>
          <p 
            className={`text-[16px] text-slate-500 font-medium max-w-2xl mx-auto mt-2 ${isEditMode ? 'outline-none border border-dashed border-transparent hover:border-slate-500 p-1 -m-1 rounded cursor-text' : ''}`}
            contentEditable={isEditMode}
            suppressContentEditableWarning
            onBlur={(e) => onContentChange?.({ ...content, description: e.currentTarget.textContent })}
          >
            {content?.description || "A composite broker's duty of care runs to you, the client — that changes everything."}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((point: any, i: number) => (
            <FadeIn key={point.title || i} delay={i * 0.1} className="h-full">
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col items-center text-center h-full group">
                
                <div className="w-16 h-16 rounded-full bg-[#fff8e7] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <DynamicIcon name={point.icon || "Shield"} className="w-7 h-7 text-[#0c494f]" strokeWidth={2} />
                </div>
                
                <h3 
                  className={`text-[18px] font-bold text-[#0c494f] mb-3 tracking-tight ${isEditMode ? 'outline-none border-b border-dashed border-transparent hover:border-[#0c494f] cursor-text' : ''}`}
                  contentEditable={isEditMode}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    if (onContentChange) {
                      const newPoints = [...points];
                      newPoints[i] = { ...newPoints[i], title: e.currentTarget.textContent };
                      onContentChange({ ...content, points: newPoints });
                    }
                  }}
                >
                  {point.title}
                </h3>
                
                <p 
                  className={`text-[13px] text-slate-500 font-medium leading-relaxed flex-grow ${isEditMode ? 'outline-none border border-dashed border-transparent hover:border-slate-500 p-1 -m-1 rounded cursor-text' : ''}`}
                  contentEditable={isEditMode}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    if (onContentChange) {
                      const newPoints = [...points];
                      newPoints[i] = { ...newPoints[i], description: e.currentTarget.textContent };
                      onContentChange({ ...content, points: newPoints });
                    }
                  }}
                >
                  {point.description}
                </p>

              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
