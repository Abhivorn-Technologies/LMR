"use client";

import { FadeIn } from "@/components/motion/FadeIn";

export function StatsBar() {
  return (
    <section className="relative z-20 bg-white w-full">
      <div className="-mt-16 md:-mt-24 px-6 max-w-[1400px] mx-auto w-full">
        <FadeIn delay={0.2}>
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 py-8 px-4 md:px-12 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-extrabold text-[#ffb800] mb-1">
              200+
            </div>
            <div className="text-[13px] font-semibold text-[#64748b]">
              Years of cumulative experience
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-extrabold text-[#ffb800] mb-1">
              500+
            </div>
            <div className="text-[13px] font-semibold text-[#64748b]">
              Clients Served
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-extrabold text-[#ffb800] mb-1">
              2003
            </div>
            <div className="text-[13px] font-semibold text-[#64748b]">
              First IRDAI License
            </div>
          </div>

        </div>
      </FadeIn>
      </div>
    </section>
  );
}

