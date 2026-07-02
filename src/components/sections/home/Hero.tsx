"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { companyProfile } from "@/lib/content/company";
import ShinyText from "@/components/ui/ShinyText";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#04151a] pt-28 pb-20 lg:pt-36">
      {/* Geometric Abstract Background Combo: Black & Cyan */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Geometric split background mimicking the uploaded image */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#020b0e] via-[#04151a] to-[#0a2b33] opacity-90" />
        <div className="absolute right-0 top-0 w-[60%] h-full bg-gradient-to-bl from-[#00E5FF]/20 to-transparent skew-x-[-25deg] origin-top-right transform -translate-x-10" />
        
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]" />
        
        {/* Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[#0a2b33]/60 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            x: [0, -60, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 -right-40 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#00B4D8]/30 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/4 h-[400px] w-[800px] rounded-full bg-[#00E5FF]/10 blur-[150px]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTA */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left"
          >
            <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00E5FF]/30 bg-[#00B4D8]/10 px-4 py-2 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-[#00E5FF] uppercase">
                Composite Insurance Broking
              </span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-[5.5rem] lg:leading-[1.05]">
                Insurance advisory <br />
                <ShinyText 
                  text="built on trust." 
                  speed={3} 
                  color="#ffffff" 
                  shineColor="#00E5FF" 
                  className="bg-gradient-to-r from-[#00B4D8] to-[#00E5FF] bg-clip-text text-transparent inline-block pb-2" 
                />
              </h1>
            </motion.div>

            <motion.p variants={itemVariants} className="mt-8 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">
              {companyProfile.tagline}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4 w-full">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-[#00B4D8] to-[#00E5FF] hover:from-[#0096B4] hover:to-[#00D1FF] text-[#04151a] shadow-[0_4px_20px_rgba(0,180,216,0.4)] rounded-xl px-8 py-6 font-bold uppercase tracking-wider h-auto border-none">
                  Request Consultation
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-md rounded-xl px-8 py-6 font-bold uppercase tracking-wider h-auto transition-all">
                  Explore Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Floating Cards Animation to fill the gap */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="hidden lg:block relative h-full min-h-[500px]"
          >
            {/* Center Decorative Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full border border-[#00E5FF]/20 border-dashed animate-[spin_40s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full border border-[#00B4D8]/30 animate-[spin_30s_linear_infinite_reverse]" />
            
            {/* Card 1 */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] right-[10%] w-64 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl"
            >
              <div className="mb-4 inline-flex rounded-lg bg-[#00B4D8]/20 p-3 text-[#00E5FF]">
                <ShieldCheck size={24} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">Risk Management</h3>
              <p className="text-sm text-slate-400">Comprehensive analysis to protect your business assets.</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[45%] -left-[5%] w-72 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl"
            >
              <div className="mb-4 inline-flex rounded-lg bg-[#00E5FF]/20 p-3 text-[#00E5FF]">
                <Users size={24} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">Client-Centric</h3>
              <p className="text-sm text-slate-400">Tailored advisory focused entirely on your specific needs.</p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-[0%] right-[20%] w-60 rounded-2xl border border-white/10 bg-gradient-to-br from-[#00B4D8]/10 to-[#00E5FF]/10 p-6 backdrop-blur-xl shadow-2xl"
            >
              <div className="mb-4 inline-flex rounded-lg bg-[#00B4D8]/30 p-3 text-white">
                <TrendingUp size={24} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">Global Reach</h3>
              <p className="text-sm text-slate-400">Placing complex risks across international markets.</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
