"use client";

import { FadeIn } from "@/components/motion/FadeIn";

export function StatsBar() {
  return (
    <section className="relative z-20 -mt-16 md:-mt-24 px-6 max-w-[1400px] mx-auto w-full">
      <FadeIn delay={0.2}>
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 py-8 px-4 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-slate-100">
          
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-extrabold text-[#0c494f] mb-1">
              20<span className="text-[#115E59]">+</span>
            </div>
            <div className="text-sm font-semibold text-slate-500">
              Years of Experience
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-extrabold text-[#0c494f] mb-1">
              500<span className="text-[#115E59]">+</span>
            </div>
            <div className="text-sm font-semibold text-slate-500">
              Clients Served
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-extrabold text-[#0c494f] mb-1">
              CoR <span className="text-[#115E59]">116</span>
            </div>
            <div className="text-sm font-semibold text-slate-500">
              IRDAI Registration
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-extrabold text-[#115E59] mb-1">
              2003
            </div>
            <div className="text-sm font-semibold text-slate-500">
              First IRDAI License
            </div>
          </div>

        </div>
      </FadeIn>
    </section>
  );
}
