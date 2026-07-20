"use client";

import { FadeIn } from "@/components/motion/FadeIn";

const defaultStats = [
  { value: "200+", label: "Years of cumulative experience" },
  { value: "500+", label: "Clients Served" },
  { value: "2003", label: "First IRDAI License" }
];

export function StatsBar({ 
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
  const stats = content?.stats?.length > 0 ? content.stats : defaultStats;

  return (
    <section className="relative z-20 bg-white w-full">
      <div className="-mt-16 md:-mt-24 px-6 max-w-[1400px] mx-auto w-full">
        <FadeIn delay={0.2}>
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 py-8 px-4 md:px-12 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          
          {stats.map((stat: any, idx: number) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center">
              <div 
                className={`text-4xl font-extrabold text-[#ffb800] mb-1 ${isEditMode ? 'outline-none border-b border-dashed border-transparent hover:border-[#ffb800] cursor-text' : ''}`}
                contentEditable={isEditMode}
                suppressContentEditableWarning
                onBlur={(e) => {
                  if (onContentChange) {
                    const newStats = [...stats];
                    newStats[idx] = { ...newStats[idx], value: e.currentTarget.textContent };
                    onContentChange({ ...content, stats: newStats });
                  }
                }}
              >
                {stat.value}
              </div>
              <div 
                className={`text-[13px] font-semibold text-[#64748b] ${isEditMode ? 'outline-none border border-dashed border-transparent hover:border-[#64748b] p-1 -m-1 rounded cursor-text' : ''}`}
                contentEditable={isEditMode}
                suppressContentEditableWarning
                onBlur={(e) => {
                  if (onContentChange) {
                    const newStats = [...stats];
                    newStats[idx] = { ...newStats[idx], label: e.currentTarget.textContent };
                    onContentChange({ ...content, stats: newStats });
                  }
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}

        </div>
      </FadeIn>
      </div>
    </section>
  );
}

