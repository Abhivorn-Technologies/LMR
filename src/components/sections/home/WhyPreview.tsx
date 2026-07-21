import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/ui/SplitText";

const defaultPoints = [
    {
      title: "Super-Simple Claims",
      description: "Smartphone enabled Self Inspection done in minutes!",
      image: "/images/illustrations/rocket_claim.png",
    },
    {
      title: "Simple Documents",
      description: "We are trusted by leading enterprises and corporate clients.",
      image: "/images/illustrations/thumbs_up_man.png",
    },
    {
      title: "Totally Paperless",
      description: "Digital and real-time processes with zero paper work.",
      image: "/images/illustrations/paperless_tablet.png",
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
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6">
        
        {/* Header Section */}
        <div className="text-center mb-20 relative">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#ffb800]/20 -z-10 -translate-y-1/2" />
          <h2 
            className={`inline-block bg-white px-8 text-4xl md:text-5xl font-extrabold text-slate-900 ${isEditMode ? 'outline-none border-b border-dashed border-transparent hover:border-slate-900 cursor-text' : ''}`}
            contentEditable={isEditMode}
            suppressContentEditableWarning
            onBlur={(e) => onContentChange?.({ ...content, title: e.currentTarget.textContent })}
          >
            {content?.title || "Why Choose Us?"}
          </h2>
        </div>

        {/* Illustrations Grid */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-16 text-center">
          {points.map((point: any, i: number) => (
            <FadeIn key={point.title || i} delay={i * 0.2}>
              <div className="flex flex-col items-center w-full sm:w-[320px]">
                <div className="relative w-64 h-64 mb-6">
                  {/* Soft background shape */}
                  <div className="absolute inset-4 bg-slate-50 rounded-full scale-105" />
                  <Image 
                    src={point.image || defaultPoints[i]?.image || '/images/illustrations/rocket_claim.png'}
                    alt={point.title || "Illustration"}
                    fill
                    className="object-contain relative z-10"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 
                  className={`text-[22px] font-bold text-slate-900 mb-3 tracking-tight ${isEditMode ? 'outline-none border-b border-dashed border-transparent hover:border-slate-900 cursor-text' : ''}`}
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
                  className={`text-[15px] text-slate-500 font-medium max-w-[280px] ${isEditMode ? 'outline-none border border-dashed border-transparent hover:border-slate-500 p-1 -m-1 rounded cursor-text' : ''}`}
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
