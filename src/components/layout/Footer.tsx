"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, AnimatePresence, type Variants } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { siteConfig, contactInfo } from "@/lib/content/company";
import { footerNavigation } from "@/lib/content/navigation";

const FacebookIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const YoutubeIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

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
        className="mx-auto max-w-7xl px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-16"
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
                className="object-contain object-left scale-[2.8] origin-left ml-4 pointer-events-none brightness-0 invert" 
              />
            </motion.div>
          </Link>
          <div className="text-[#c4e0e6] mb-8 max-w-[380px] leading-relaxed text-[0.8rem] space-y-4">
            <p>
              LMB Insurance Brokers Pvt. Ltd is a company incorporated under the Companies Act, 1956. Licensed by Insurance Regulatory and Development Authority (IRDA), as per IRDA Act, 1999 and IRDA (Insurance Brokers) Regulations 2002.
            </p>
            <div className="pt-4 border-t border-white/10 space-y-2 text-[0.78rem]">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400 font-medium">IRDAI License No:</span>
                <span className="text-[#00E5FF] font-semibold">116</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400 font-medium">CIN:</span>
                <span className="text-white font-mono">U66010KL2002PTC015686</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400 font-medium">Category:</span>
                <span className="text-white font-medium">Composite Insurance Brokers</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400 font-medium">Period of License:</span>
                <span className="text-white">18.02.2021 to 17.02.2024</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            {[ 
              { icon: FacebookIcon, key: 'fb' }, 
              { icon: InstagramIcon, key: 'ig' }, 
              { icon: TwitterIcon, key: 'tw' },
              { icon: YoutubeIcon, key: 'yt' }
            ].map((social) => (
              <a 
                key={social.key} 
                href="#" 
                className="relative w-11 h-11 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center text-slate-400 border border-white/10 group overflow-hidden transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:rotate-3"
              >
                {/* Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan/40 to-cyan-bright/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <social.icon size={18} className="relative z-10 group-hover:text-white transition-colors duration-300" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Company Links */}
        <motion.div variants={itemVariants}>
          <h4 className="text-white font-bold tracking-widest uppercase mb-6 text-sm">
            Company
          </h4>
          <ul className="space-y-3.5">
            {footerNavigation.company.map((link) => (
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

        {/* Resources & Legal */}
        <motion.div variants={itemVariants}>
          <h4 className="text-white font-bold tracking-widest uppercase mb-6 text-sm">
            Resources
          </h4>
          <ul className="space-y-3.5">
            {[...footerNavigation.resources, ...footerNavigation.legal].map((link) => (
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
                <div className="w-8 h-8 rounded-full bg-cyan/10 flex items-center justify-center text-cyan group-hover:bg-cyan group-hover:text-white transition-colors duration-300 shrink-0">
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
