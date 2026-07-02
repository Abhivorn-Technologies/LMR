"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, AnimatePresence, type Variants } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { siteConfig, contactInfo } from "@/lib/content/company";
import { footerNavigation } from "@/lib/content/navigation";

// --- Scroll To Top Button ---
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 40, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.5 }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(14,165,233,0.4)" }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[100] w-12 h-12 rounded-full bg-[#0c494f] text-white flex items-center justify-center shadow-[0_10px_20px_rgba(12,73,79,0.4)] border border-white/10 backdrop-blur-md overflow-hidden group hover:bg-[#0a3a3f] transition-colors duration-300"
        >
          {/* Ripple Effect */}
          <div className="absolute inset-0 bg-white/20 scale-0 group-active:scale-[2] transition-transform duration-500 rounded-full" />
          <ArrowUp size={20} className="relative z-10 group-hover:-translate-y-1 transition-transform duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// --- Framer Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  return (
    <footer ref={footerRef} className="relative bg-background text-white pt-24 pb-8 overflow-hidden border-t border-border">
      {/* Background Decorators */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-7xl px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16"
      >
        {/* Company Section (2 Cols width) */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Link href="/" className="inline-block group mb-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative h-14 w-[180px] shrink-0 overflow-hidden"
            >
              <Image 
                src={siteConfig.logo} 
                alt={siteConfig.name} 
                fill
                sizes="180px"
                className="object-contain object-left scale-[2.8] origin-left ml-4 pointer-events-none brightness-0 invert" 
              />
            </motion.div>
          </Link>
          <div className="text-[#c4e0e6] mb-8 max-w-[380px] leading-relaxed text-[0.8rem] space-y-4">
            <p>
              LMB Insurance Brokers Pvt. Ltd is a company incorporated under the Companies Act, 1956. Licensed by Insurance Regulatory and Development Authority (IRDA), as per IRDA Act, 1999 and IRDA (Insurance Brokers) Regulations 2002.
            </p>
            <p className="text-[#00E5FF] font-semibold pt-2">
              IRDAI License No: 116
            </p>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants}>
          <h4 className="text-white font-bold tracking-widest uppercase mb-6 text-sm">
            Quick Links
          </h4>
          <ul className="space-y-3.5">
            {footerNavigation.quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="group flex items-center text-[#c4e0e6] text-[0.95rem] hover:text-white transition-colors duration-300">
                  <span className="h-[2px] w-0 bg-[#00E5FF] transition-all duration-300 group-hover:w-3 group-hover:mr-2 rounded-full"></span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Services */}
        <motion.div variants={itemVariants}>
          <h4 className="text-white font-bold tracking-widest uppercase mb-6 text-sm">
            Services
          </h4>
          <ul className="space-y-3.5">
            {footerNavigation.services.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="group flex items-center text-[#c4e0e6] text-[0.95rem] hover:text-white transition-colors duration-300">
                  <span className="h-[2px] w-0 bg-[#00E5FF] transition-all duration-300 group-hover:w-3 group-hover:mr-2 rounded-full"></span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div variants={itemVariants}>
          <h4 className="text-white font-bold tracking-widest uppercase mb-6 text-sm">
            Contact Us
          </h4>
          <ul className="space-y-1.5">
            {[
              { icon: MapPin, text: contactInfo.address },
              { icon: Phone, text: contactInfo.phone },
              { icon: Mail, text: contactInfo.email }
            ].map((item, i) => (
              <li 
                key={i} 
                className="flex items-center gap-4 text-[#c4e0e6] p-2 -ml-2 rounded-lg cursor-default transition-colors duration-300 group hover:bg-white/5 hover:translate-x-1"
              >
                <div className="w-8 h-8 rounded-full bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF] group-hover:bg-[#00E5FF] group-hover:text-white transition-colors duration-300 shrink-0">
                  <item.icon size={14} className="group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <span className="text-[0.8rem] leading-tight">{item.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>

      </motion.div>

      {/* Bottom Copyright Bar */}
      <motion.div 
        variants={itemVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-7xl px-6 relative z-10"
      >
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6 text-[0.85rem] text-slate-500">
          
          <div>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span>Developed by</span>
            <a 
              href="https://www.abhivorn.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center font-bold text-[#138A99] hover:text-white transition-colors duration-300"
            >
              Abhivorn Technologies Pvt Ltd
            </a>
          </div>

        </div>
      </motion.div>

      <ScrollToTop />
    </footer>
  );
}
