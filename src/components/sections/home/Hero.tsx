"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { companyProfile } from "@/lib/content/company";

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section
      className="relative flex items-center overflow-hidden pt-28 pb-20 lg:pt-32 lg:pb-24"
      style={{
        background:
          "linear-gradient(150deg, #f0f9fc 0%, #d8eff4 40%, #a8d5df 70%, #5a8a96 100%)",
      }}
    >
      {/* Subtle radial glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 right-0 w-[600px] h-[600px] rounded-full bg-[#00B4D8]/10 blur-[100px]" />
        <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-[#0c494f]/10 blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left"
          >
            {/* Eyebrow badge */}
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0c494f]/25 bg-[#0c494f]/8 px-4 py-2"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#0c494f] animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-[#0c494f] uppercase">
                Composite Insurance Broking
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants}>
              <h1 className="font-display text-5xl font-extrabold leading-[1.1] tracking-tight text-[#04151a] md:text-6xl lg:text-[5rem] lg:leading-[1.05]">
                Insurance advisory{" "}
                <br />
                <span className="bg-gradient-to-r from-[#0c494f] via-[#00869e] to-[#00B4D8] bg-clip-text text-transparent inline-block pb-2">
                  built on trust.
                </span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-lg leading-relaxed text-[#1e4a53] md:text-xl font-medium"
            >
              {companyProfile.tagline}
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap gap-4 w-full"
            >
              <Link href="/contact">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#0c494f] hover:bg-[#083a40] text-white shadow-[0_6px_20px_rgba(12,73,79,0.35)] rounded-xl px-8 py-6 font-bold uppercase tracking-wider h-auto border-0 transition-all"
                >
                  Request Consultation
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white/70 hover:bg-white text-[#0c494f] border border-[#0c494f]/25 rounded-xl px-8 py-6 font-bold uppercase tracking-wider h-auto transition-all shadow-sm"
                >
                  Explore Services
                </Button>
              </Link>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-6 pt-6 border-t border-[#0c494f]/15"
            >
              <div className="text-center">
                <div className="text-2xl font-extrabold text-[#0c494f]">20+</div>
                <div className="text-xs font-semibold text-[#3a7080] uppercase tracking-wide mt-0.5">Years Experience</div>
              </div>
              <div className="h-8 w-px bg-[#0c494f]/20" />
              <div className="text-center">
                <div className="text-2xl font-extrabold text-[#0c494f]">500+</div>
                <div className="text-xs font-semibold text-[#3a7080] uppercase tracking-wide mt-0.5">Clients Served</div>
              </div>
              <div className="h-8 w-px bg-[#0c494f]/20" />
              <div className="text-center">
                <div className="text-2xl font-extrabold text-[#0c494f]">IRDAI</div>
                <div className="text-xs font-semibold text-[#3a7080] uppercase tracking-wide mt-0.5">Licensed Broker</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="hidden lg:block relative h-full min-h-[480px]"
          >
            {/* Decorative rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full border border-[#0c494f]/10 border-dashed animate-[spin_40s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full border border-[#00B4D8]/15 animate-[spin_30s_linear_infinite_reverse]" />

            {/* Card 1 */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[8%] right-[5%] w-64 rounded-2xl border border-[#0c494f]/10 bg-white/90 p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(12,73,79,0.15)]"
            >
              <div className="mb-4 inline-flex rounded-lg bg-[#0c494f]/8 p-3 text-[#0c494f]">
                <ShieldCheck size={22} />
              </div>
              <h3 className="mb-2 text-base font-bold text-[#04151a]">Risk Management</h3>
              <p className="text-sm text-[#3a7080] leading-relaxed">Comprehensive analysis to protect your business assets.</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              animate={{ y: [0, 18, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[42%] -left-[5%] w-72 rounded-2xl border border-[#00B4D8]/15 bg-white/90 p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,180,216,0.12)]"
            >
              <div className="mb-4 inline-flex rounded-lg bg-[#00B4D8]/8 p-3 text-[#00869e]">
                <Users size={22} />
              </div>
              <h3 className="mb-2 text-base font-bold text-[#04151a]">Client-Centric</h3>
              <p className="text-sm text-[#3a7080] leading-relaxed">Tailored advisory focused entirely on your specific needs.</p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-[4%] right-[18%] w-60 rounded-2xl border border-[#5a8a96]/15 bg-white/90 p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(90,138,150,0.12)]"
            >
              <div className="mb-4 inline-flex rounded-lg bg-[#5a8a96]/10 p-3 text-[#3a7080]">
                <TrendingUp size={22} />
              </div>
              <h3 className="mb-2 text-base font-bold text-[#04151a]">Global Reach</h3>
              <p className="text-sm text-[#3a7080] leading-relaxed">Placing complex risks across international markets.</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
