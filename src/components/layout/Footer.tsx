"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, AnimatePresence, type Variants } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUp, Building2, FileText, Calendar, Award, ChevronDown } from 'lucide-react';
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

const FooterServiceDropdown = ({ link }: { link: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChild, setActiveChild] = useState<any>(link.children[0]);

  return (
    <li className="flex flex-col relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center justify-between text-[#c4e0e6] text-[0.95rem] hover:text-white transition-colors duration-300 w-full text-left"
      >
        <div className="flex items-center">
          <span className="h-[2px] w-0 bg-[#00E5FF] transition-all duration-300 group-hover:w-3 group-hover:mr-2 rounded-full"></span>
          {link.label}
        </div>
        <ChevronDown 
          size={14} 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#00E5FF]' : ''}`} 
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 lg:-left-24 bottom-full mb-2 w-[500px] z-[100]"
          >
            {/* Side by side layout for mega menu */}
            <div className="flex bg-[#ffffff] text-slate-800 rounded-xl border border-slate-200 overflow-hidden shadow-2xl">
              
              {/* Left Column - Categories */}
              <ul className="w-[45%] border-r border-slate-200 p-2 flex flex-col gap-1 bg-slate-50">
                {link.children.map((child: any) => (
                  <li key={child.label}>
                    <button
                      onClick={() => setActiveChild(child)}
                      onMouseEnter={() => setActiveChild(child)}
                      className={`w-full text-left flex items-center text-[0.85rem] transition-colors duration-300 p-3 rounded-lg ${
                        activeChild?.label === child.label 
                          ? "bg-white text-[#F57C00] font-medium shadow-sm" 
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {child.label}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Right Column - Sub Categories */}
              <ul className="w-[55%] p-4 flex flex-col gap-3 bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeChild?.label}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 5 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col gap-3"
                  >
                    {activeChild?.children ? (
                      activeChild.children.map((subChild: any) => (
                        <div key={subChild.label} className="mb-1 last:mb-0">
                          <Link href={subChild.href} className="group flex items-center text-slate-600 text-[0.85rem] hover:text-[#F57C00] transition-colors duration-300">
                            {subChild.label}
                          </Link>
                        </div>
                      ))
                    ) : (
                      <div className="mb-1">
                        <Link href={activeChild?.href || "#"} className="group flex items-center text-slate-600 text-[0.85rem] hover:text-[#F57C00] transition-colors duration-300">
                          Explore {activeChild?.label}
                        </Link>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </ul>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

import { usePathname } from 'next/navigation';

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });
  const pathname = usePathname();

  if (pathname.startsWith('/admin') || pathname.startsWith('/login') || pathname.startsWith('/register')) {
    return null;
  }

  return (
    <footer ref={footerRef} className="relative bg-background text-white pt-10 lg:pt-16 pb-8 border-t border-border">
      {/* Background Decorators */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-7xl px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8 lg:gap-10 mb-12"
      >
        {/* Column 1: Company Paragraph (Wider) */}
        <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col">
          <Link href="/" className="inline-block group mb-5">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative h-12 md:h-14 w-[160px] md:w-[180px] shrink-0 overflow-hidden"
            >
              <Image 
                src={siteConfig.logo} 
                alt={siteConfig.name} 
                fill
                sizes="180px"
                className="object-contain object-left scale-[2] md:scale-[2.8] origin-left pointer-events-none brightness-0 invert" 
              />
            </motion.div>
          </Link>
          <div className="text-[#c4e0e6] leading-relaxed text-[0.85rem] pr-4">
            <p className="text-left">
              L M B Insurance Brokers Pvt. Ltd., is a Private Limited Company incorporated under the Companies Act, 1956, and registered with the Insurance Regulatory and Development Authority of India (IRDAI) vide Certificate of Registration (CoR) No: 116 to solicit insurance (Direct (Life & General) and Reinsurance) business as per IRDAI (Insurance Brokers) Regulations and such other applicable Regulations as issued/amended by the Authority (IRDAI) from time to time.
            </p>
          </div>
        </motion.div>

        {/* Column 2: Company Data Cards */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <div className="flex flex-col gap-2.5">
            <div className="bg-[#0c494f]/40 border border-[#00E5FF]/20 rounded-lg px-2.5 py-2 hover:bg-[#0c494f]/60 transition-colors">
              <div className="text-[0.6rem] uppercase tracking-wider text-[#00E5FF] mb-0.5 flex items-center gap-1.5 font-bold">
                 <Building2 size={11} /> CIN
              </div>
              <div className="text-[0.65rem] xl:text-[0.7rem] font-medium text-white tracking-tight">U66010KL2002PTC015686</div>
            </div>
            <div className="bg-[#0c494f]/40 border border-[#00E5FF]/20 rounded-lg px-2.5 py-2 hover:bg-[#0c494f]/60 transition-colors">
              <div className="text-[0.6rem] uppercase tracking-wider text-[#00E5FF] mb-0.5 flex items-center gap-1.5 font-bold">
                 <FileText size={11} /> MCA REG NO
              </div>
              <div className="text-[0.65rem] xl:text-[0.7rem] font-medium text-white tracking-tight">015686 (RoC Ernakulam)</div>
            </div>
            <div className="bg-[#0c494f]/40 border border-[#00E5FF]/20 rounded-lg px-2.5 py-2 hover:bg-[#0c494f]/60 transition-colors">
              <div className="text-[0.6rem] uppercase tracking-wider text-[#00E5FF] mb-0.5 flex items-center gap-1.5 font-bold">
                 <Calendar size={11} /> INCORPORATION
              </div>
              <div className="text-[0.65rem] xl:text-[0.7rem] font-medium text-white tracking-tight">08/10/2002</div>
            </div>
            <div className="bg-[#0c494f]/40 border border-[#00E5FF]/20 rounded-lg px-2.5 py-2 hover:bg-[#0c494f]/60 transition-colors">
              <div className="text-[0.6rem] uppercase tracking-wider text-[#00E5FF] mb-0.5 flex items-center gap-1.5 font-bold">
                 <Award size={11} /> IRDAI LICENSE
              </div>
              <div className="text-[0.65rem] xl:text-[0.7rem] font-medium text-white tracking-tight">18-02-2003 (First Issued)</div>
            </div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants}>
          <h4 className="text-white font-bold tracking-widest uppercase mb-4 text-sm">
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
          <h4 className="text-white font-bold tracking-widest uppercase mb-4 text-sm">
            Services
          </h4>
          <ul className="space-y-3.5">
            {footerNavigation.services.map((link) => {
              const href = link.label === "General Insurance" && link.href === "#" ? "/services/general-insurance" : link.href;
              return (
                <li key={link.label}>
                  <Link href={href} className="group flex items-center text-[#c4e0e6] text-[0.95rem] hover:text-white transition-colors duration-300">
                    <span className="h-[2px] w-0 bg-[#00E5FF] transition-all duration-300 group-hover:w-3 group-hover:mr-2 rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div variants={itemVariants}>
          <h4 className="text-white font-bold tracking-widest uppercase mb-4 text-sm">
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
                className="flex items-start gap-4 text-[#c4e0e6] p-2 -ml-2 rounded-lg cursor-default transition-colors duration-300 group hover:bg-white/5 hover:translate-x-1"
              >
                <div className="w-8 h-8 rounded-full bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF] group-hover:bg-[#00E5FF] group-hover:text-white transition-colors duration-300 shrink-0 mt-0.5">
                  <item.icon size={14} className="group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <span className="text-[0.85rem] md:text-[0.8rem] leading-tight">{item.text}</span>
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
