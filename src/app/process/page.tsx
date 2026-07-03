"use client";

import React, { useRef } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { processSteps } from "@/lib/content/pages";
import { motion, useInView } from "framer-motion";

// Quadratic bezier point
function qBez(t: number, p0: number, p1: number, p2: number) {
  return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
}

// Build keyframe arrays for ball along curve
function buildBallKeyframes(curveLeft: boolean, steps = 40) {
  const p0 = { x: 200, y: 0 };
  const p1 = curveLeft ? { x: 80, y: 50 } : { x: 320, y: 50 };
  const p2 = { x: 200, y: 100 };
  const cx: number[] = [];
  const cy: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    cx.push(qBez(t, p0.x, p1.x, p2.x));
    cy.push(qBez(t, p0.y, p1.y, p2.y));
  }
  return { cx, cy };
}

// ─── Snake Connector between steps ────────────────────────────────────────────
function SnakeConnector({ stepIndex }: { stepIndex: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // once: false → re-animates every time it enters/leaves view
  const isInView = useInView(ref, { once: false, margin: "-20px" });

  const curveLeft = stepIndex % 2 === 0;
  const p1x = curveLeft ? 80 : 320;
  const pathD = `M 200 0 Q ${p1x} 50 200 100`;
  const { cx, cy } = buildBallKeyframes(curveLeft);

  return (
    <div ref={ref} className="hidden md:block w-full h-24 my-0">
      <svg
        viewBox="0 0 400 100"
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`sg${stepIndex}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#115E59" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#00B4D8" stopOpacity="0.5" />
          </linearGradient>
          <filter id={`gf${stepIndex}`} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Static dim track */}
        <path d={pathD} fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />

        {/* Animated draw */}
        <motion.path
          d={pathD}
          fill="none"
          stroke={`url(#sg${stepIndex})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />

        {/* Glowing ball */}
        <motion.circle
          r="6"
          fill="#115E59"
          filter={`url(#gf${stepIndex})`}
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? { cx, cy, opacity: [0, 1, 1, 1, 0] }
              : { opacity: 0 }
          }
          transition={isInView ? { duration: 1.0, ease: "easeInOut", delay: 0.1 } : { duration: 0 }}
        />

        {/* Trailing glow dot */}
        <motion.circle
          r="3"
          fill="#00B4D8"
          filter={`url(#gf${stepIndex})`}
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? { cx, cy, opacity: [0, 0.6, 0.4, 0.2, 0] }
              : { opacity: 0 }
          }
          transition={isInView ? { duration: 1.0, ease: "easeInOut", delay: 0.2 } : { duration: 0 }}
        />
      </svg>
    </div>
  );
}

// ─── Step Card ─────────────────────────────────────────────────────────────────
function StepCard({ step, i }: { step: typeof processSteps[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isEven = i % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-4 md:gap-6 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Desktop alternating spacer */}
      <div className="hidden flex-1 md:block" />

      {/* Bubble */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 350, damping: 16 }}
        className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#115E59] to-[#00B4D8] text-white text-sm font-extrabold shadow-[0_4px_20px_rgba(17,94,89,0.5)]"
      >
        <span className="relative z-10">{step.step}</span>
        <motion.span
          animate={{ scale: [1, 1.7, 1], opacity: [0.45, 0, 0.45] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-[#115E59]/35"
        />
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.6,
          ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
          delay: 0.1,
        }}
        whileHover={{ y: -5, transition: { duration: 0.22 } }}
        className="flex-1 ml-4 md:ml-0 rounded-2xl border border-slate-200 bg-white p-5 md:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(17,94,89,0.15)] hover:border-[#115E59]/30 transition-colors duration-300"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.28 }}
          className="inline-block mb-1.5 text-[10px] font-bold tracking-[0.22em] text-[#115E59] uppercase"
        >
          Step {step.step}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.34 }}
          className="text-lg font-bold text-slate-900 mb-1.5"
        >
          {step.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.42 }}
          className="text-sm leading-relaxed text-slate-500"
        >
          {step.description}
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ originX: isEven ? 0 : 1 }}
          className="mt-4 h-[2px] rounded-full bg-gradient-to-r from-[#115E59] to-[#00B4D8]"
        />
      </motion.div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function ProcessPage() {
  return (
    <div className="min-h-screen">
      {/* Dark hero */}
      <div className="bg-[#04151a] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-[#00E5FF]/5 blur-[120px]" />
          <div className="absolute top-1/3 -left-1/4 h-[600px] w-[600px] rounded-full bg-[#0c494f]/10 blur-[150px]" />
        </div>
        <PageHero
          eyebrow="Process"
          title="A structured approach to insurance advisory"
          description="From initial discovery through renewal management — every engagement follows a disciplined, documented workflow."
          align="center"
        />
      </div>

      {/* Steps */}
      <section className="relative bg-slate-50 pt-14 pb-24">
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#04151a] to-slate-50 pointer-events-none" />
        <div className="mx-auto max-w-4xl px-6">
          {processSteps.map((step, i) => (
            <React.Fragment key={step.step}>
              <StepCard step={step} i={i} />
              {i < processSteps.length - 1 && <SnakeConnector stepIndex={i} />}
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}
