"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Clock } from "lucide-react";

export function TrustMockupPreview() {
  return (
    <section className="relative w-full bg-white flex flex-col lg:flex-row overflow-hidden">
      
      {/* Left Content Area (White Background) */}
      <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-end py-12 lg:py-16 px-6 lg:px-12 xl:px-24">
        {/* We use max-w-2xl and left alignment so it looks nice on large screens and lines up */}
        <div className="w-full max-w-2xl lg:ml-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#F8FBFC] border border-[#E7EEF2] shadow-sm mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-[#19C8D6] animate-pulse" />
            <span className="text-[#0E6D73] font-bold text-xs tracking-[0.2em] uppercase">Trusted Legacy</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-[#17233A] mb-6 tracking-tight leading-[1.1]"
          >
            Over Two Decades of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0E6D73] to-[#19C8D6]">Excellence.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#58667E] leading-relaxed mb-10 max-w-xl font-medium"
          >
            Registered with IRDAI since 2003, LMB Insurance Brokers has built an unbreakable legacy of trust, transparency, and unparalleled advisory. Our commitment to securing your future is sealed with absolute integrity.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <div className="flex-1 p-6 rounded-2xl bg-[#F8FBFC] border border-[#E7EEF2] group hover:bg-white hover:border-[#19C8D6]/30 hover:shadow-[0_20px_40px_rgba(14,109,115,0.08)] hover:-translate-y-2 transition-all duration-500">
              <div className="w-10 h-10 rounded-full bg-[#19C8D6]/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#19C8D6] transition-all duration-300">
                <Shield className="w-5 h-5 text-[#0E6D73] group-hover:text-white transition-colors" />
              </div>
              <p className="font-extrabold text-[#17233A] text-xl md:text-2xl mb-1">CoR No: 116</p>
              <p className="text-[#58667E] text-xs font-bold uppercase tracking-wider">IRDAI Certified</p>
            </div>
            
            <div className="flex-1 p-6 rounded-2xl bg-[#F8FBFC] border border-[#E7EEF2] group hover:bg-white hover:border-[#19C8D6]/30 hover:shadow-[0_20px_40px_rgba(14,109,115,0.08)] hover:-translate-y-2 transition-all duration-500">
              <div className="w-10 h-10 rounded-full bg-[#19C8D6]/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#19C8D6] transition-all duration-300">
                <Clock className="w-5 h-5 text-[#0E6D73] group-hover:text-white transition-colors" />
              </div>
              <p className="font-extrabold text-[#17233A] text-xl md:text-2xl mb-1">Since 2003</p>
              <p className="text-[#58667E] text-xs font-bold uppercase tracking-wider">First License</p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Right Image Area (Smaller boxed image) */}
      <div className="w-full lg:w-1/2 relative bg-[#F8FBFC] flex items-center justify-center p-8 lg:p-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateY: 10, y: 30 }} 
          whileInView={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          whileHover={{ scale: 1.03, y: -10, rotateY: 0 }}
          className="relative w-full max-w-lg aspect-square rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(14,109,115,0.15)] border-4 border-white cursor-pointer"
        >
          <Image 
            src="/assets/minimal_corporate_architecture_1783160853048.png"
            alt="LMB Insurance Brokers Legacy"
            fill
            className="object-cover object-center transition-transform duration-1000 hover:scale-110"
          />
        </motion.div>
      </div>

    </section>
  );
}
