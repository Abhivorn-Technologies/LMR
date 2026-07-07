"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown, Shield, PiggyBank, Coins, Users, FileText } from "lucide-react";
import { siteConfig } from "@/lib/content/company";
import { footerNavigation } from "@/lib/content/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import ShinyText from "@/components/ui/ShinyText";

const iconMap: Record<string, any> = { Shield, PiggyBank, Coins, Users, FileText };

const HeaderMegaMenu = ({ link, isActive, setMobileOpen }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const serviceData = footerNavigation.services.find(s => s.label.toLowerCase() === link.name.toLowerCase()) as any;
  const [activeChild, setActiveChild] = useState<any>(serviceData?.children?.[0]);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={link.path}
        className={`font-bold uppercase tracking-widest whitespace-nowrap px-6 py-5 lg:py-1.5 lg:px-1.5 xl:px-2.5 flex items-center max-lg:w-full max-lg:text-left max-lg:mb-2 max-lg:text-[14px] lg:text-[10px] xl:text-[11px] ${
          isActive 
            ? 'max-lg:bg-[#115E59]/10 max-lg:text-[#115E59] max-lg:rounded-2xl lg:bg-[#0c494f] lg:shadow-[0_4px_12px_rgba(12,73,79,0.3)] lg:ring-1 lg:ring-white/20 lg:rounded-full lg:text-white' 
            : 'text-slate-500 max-lg:hover:bg-slate-50 max-lg:hover:text-slate-900 max-lg:hover:translate-x-2 lg:hover:bg-slate-50 hover:text-[#0c494f] max-lg:rounded-2xl lg:rounded-full transition-all duration-300'
        }`}
        onClick={() => {
          if (window.innerWidth < 1024) {
            setIsOpen(!isOpen);
          } else {
            setMobileOpen(false);
          }
        }}
      >
        {isActive ? (
          <>
            <span className="max-lg:hidden">
              <ShinyText 
                text={link.name} 
                speed={2} 
                delay={0}
                color="#ffffff" 
                shineColor="#a5f3fc" 
                spread={120}
                direction="left"
              />
            </span>
            <span className="lg:hidden text-[#115E59] flex items-center">
              {link.name}
            </span>
          </>
        ) : (
          link.name
        )}
        <ChevronDown size={14} className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Link>

      <AnimatePresence>
        {isOpen && serviceData?.children && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[550px] z-[1000] max-lg:static max-lg:w-full max-lg:translate-x-0 max-lg:mt-0"
          >
            <div className="flex bg-white text-slate-800 rounded-xl border border-slate-200 overflow-hidden shadow-2xl max-lg:flex-col max-lg:shadow-none max-lg:border-none max-lg:bg-transparent">
              
              <ul className="w-[45%] border-r border-slate-200 p-2 flex flex-col gap-1 bg-slate-50 max-lg:w-full max-lg:border-none max-lg:bg-transparent">
                {serviceData.children.map((child: any) => {
                  const Icon = child.icon ? iconMap[child.icon] : null;
                  return (
                  <li key={child.label}>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveChild(child);
                      }}
                      onMouseEnter={() => setActiveChild(child)}
                      className={`w-full text-left flex items-center gap-3 text-[0.85rem] transition-colors duration-300 p-3 rounded-lg ${
                        activeChild?.label === child.label 
                          ? "bg-white text-[#F57C00] font-medium shadow-sm max-lg:bg-slate-100" 
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {Icon && <Icon size={18} className={activeChild?.label === child.label ? "text-[#F57C00]" : "text-slate-400"} />}
                      {child.label}
                    </button>
                  </li>
                  );
                })}
              </ul>

              <ul className="w-[55%] p-4 flex flex-col gap-3 bg-white max-lg:w-full max-lg:pl-8 max-lg:pt-2 max-lg:bg-transparent max-lg:hidden">
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
                          <Link href={subChild.href} onClick={() => setMobileOpen(false)} className="group flex items-center text-slate-600 text-[0.85rem] hover:text-[#F57C00] transition-colors duration-300">
                            {subChild.label}
                          </Link>
                        </div>
                      ))
                    ) : (
                      <div className="mb-1">
                        <Link href={activeChild?.href || "#"} onClick={() => setMobileOpen(false)} className="group flex items-center text-slate-600 text-[0.85rem] hover:text-[#F57C00] transition-colors duration-300">
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
    </div>
  );
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Life insurance", path: "/services/life-insurance" },
    { name: "General insurance", path: "/services/general-insurance" },
    { name: "Risk Management", path: "/services/risk-management" },
    { name: "Claims Consultancy", path: "/services/claims-consultancy" },
    { name: "Reinsurance", path: "/reinsurance" },
    { name: "Clients", path: "/clients" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${scrolled ? 'shadow-[0_4px_25px_rgba(0,0,0,0.06)] bg-white/95 backdrop-blur-md' : 'shadow-sm bg-white'}`}>
      {/* Mobile Menu Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[990] lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
      />

      <div className="mx-auto max-w-[1600px] relative z-[1000] flex justify-between items-center py-2 lg:py-3 px-6 xl:px-10">
        <div className="flex-shrink-0 flex items-center">
          <Link href="/" className="flex items-center h-10 md:h-12 w-[180px] md:w-[260px] relative shrink-0 ml-0">
            <Image 
              src={siteConfig.logo} 
              alt={siteConfig.name} 
              fill
              sizes="(max-width: 768px) 180px, 260px"
              className="object-contain object-left scale-[2] md:scale-[2.8] origin-left drop-shadow-sm pointer-events-none" 
              priority 
            />
          </Link>
        </div>

        <div className={`relative z-10 flex-1 flex justify-center gap-1 xl:gap-2 items-center max-lg:fixed max-lg:top-0 max-lg:z-[1010] max-lg:bg-white max-lg:flex-col max-lg:items-start max-lg:p-8 max-lg:h-screen max-lg:w-[72%] max-lg:sm:w-[340px] max-lg:shadow-[-20px_0_60px_rgba(0,0,0,0.2)] max-lg:transition-transform max-lg:duration-500 max-lg:ease-in-out max-lg:overflow-y-auto ${mobileOpen ? 'max-lg:right-0 max-lg:translate-x-0' : 'max-lg:-right-full max-lg:translate-x-full'}`}>
          
          {/* Mobile Sidebar Header */}
          <div className="lg:hidden flex items-center justify-between w-full mb-10 pb-4 border-b border-slate-100">
            <div className="relative h-10 w-[180px] -ml-2">
              <Image src={siteConfig.logo} alt={siteConfig.name} fill priority sizes="150px" className="object-contain object-left scale-[2] origin-left pointer-events-none" />
            </div>
            <button className="text-slate-400 hover:text-slate-700 p-2.5 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors" onClick={() => setMobileOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {navLinks.map((link) => {
            const isActive = pathname === link.path || (pathname.startsWith(link.path) && link.path !== "/");
            
            if (link.name === "General insurance" || link.name === "Life insurance") {
              return <HeaderMegaMenu key={link.path} link={link} isActive={isActive} setMobileOpen={setMobileOpen} />;
            }
            
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`font-bold uppercase tracking-widest whitespace-nowrap px-6 py-5 lg:py-1.5 lg:px-1.5 xl:px-2.5 max-lg:w-full max-lg:text-left max-lg:mb-2 max-lg:text-[14px] lg:text-[10px] xl:text-[11px] ${
                  isActive 
                    ? 'max-lg:bg-[#115E59]/10 max-lg:text-[#115E59] max-lg:rounded-2xl lg:bg-[#0c494f] lg:shadow-[0_4px_12px_rgba(12,73,79,0.3)] lg:ring-1 lg:ring-white/20 lg:rounded-full lg:text-white' 
                    : 'text-slate-500 max-lg:hover:bg-slate-50 max-lg:hover:text-slate-900 max-lg:hover:translate-x-2 lg:hover:bg-slate-50 hover:text-[#0c494f] max-lg:rounded-2xl lg:rounded-full transition-all duration-300'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {isActive ? (
                  <>
                    <span className="max-lg:hidden">
                      <ShinyText 
                        text={link.name} 
                        speed={2} 
                        delay={0}
                        color="#ffffff" 
                        shineColor="#a5f3fc" 
                        spread={120}
                        direction="left"
                        yoyo={false}
                        pauseOnHover={false}
                        disabled={false}
                      />
                    </span>
                    <span className="lg:hidden text-[#115E59] flex items-center">
                      {link.name}
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#115E59]" />
                    </span>
                  </>
                ) : (
                  link.name
                )}
              </Link>
            );
          })}
          <div className="lg:hidden w-full mt-auto pt-6 pb-4 flex flex-col gap-4">

            <Link href="/contact" className="w-full" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-[#115E59] hover:bg-[#083135] text-white shadow-xl shadow-[#115E59]/20 rounded-2xl font-bold text-[14px] uppercase tracking-widest h-14 transition-all" size="lg">
                Join Now
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center justify-end gap-4 xl:gap-6">

          <Link href="/contact" className="max-lg:hidden whitespace-nowrap">
            <Button className="bg-[#0c494f] hover:bg-[#083135] text-white shadow-[0_4px_12px_rgba(12,73,79,0.3)] rounded-full px-8 py-3 font-bold text-[12px] xl:text-[13px] uppercase tracking-widest h-auto whitespace-nowrap">
              Join Now
            </Button>
          </Link>
          <button className="lg:hidden text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => setMobileOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </div>
    </nav>
  );
}
