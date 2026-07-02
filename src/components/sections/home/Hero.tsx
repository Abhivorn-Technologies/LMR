"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
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

          {/* Right Column: Premium Glassmorphic Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative h-[550px] w-full group"
          >
            {/* Decorative background glow for depth */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full bg-gradient-to-tr from-[#00B4D8]/20 to-[#0c494f]/20 blur-[80px] -z-10 group-hover:opacity-100 transition-opacity duration-1000" 
            />
            
            {/* Main Image Container with 3D Float effect and Glass Frame */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: [-8, 8, -8], opacity: 1 }}
              transition={{ 
                y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 },
                opacity: { duration: 0.8, delay: 0.3 }
              }}
              className="absolute inset-0 rounded-[2.5rem] shadow-[0_20px_50px_rgba(12,73,79,0.15)] border border-white/60 bg-white/20 p-2 backdrop-blur-md"
            >
              {/* Mask reveal animation for the image */}
              <motion.div 
                initial={{ clipPath: "inset(100% 0 0 0 round 2rem)" }}
                animate={{ clipPath: "inset(0% 0 0 0 round 2rem)" }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full overflow-hidden"
              >
                <motion.div
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <Image
                    src="/assets/image1.jpeg"
                    alt="Professional Insurance Advisory"
                    fill
                    className="object-cover object-center group-hover:scale-100 transition-transform duration-1000"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0c494f]/30 via-transparent to-white/20 mix-blend-overlay" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Ultra-minimal floating element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
              transition={{ 
                opacity: { duration: 0.5, delay: 1.2 },
                scale: { duration: 0.5, delay: 1.2, type: "spring", bounce: 0.4 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.7 }
              }}
              className="absolute -right-6 top-1/4 rounded-2xl border border-white/50 bg-white/90 p-3 shadow-xl backdrop-blur-xl flex items-center gap-4 z-20"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0c494f] to-[#00869e] text-white shadow-md">
                <ShieldCheck size={20} />
              </div>
              <div className="pr-4">
                <div className="text-sm font-bold text-[#04151a]">100% Secure</div>
                <div className="text-xs text-[#3a7080] font-medium">Risk Protection</div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
