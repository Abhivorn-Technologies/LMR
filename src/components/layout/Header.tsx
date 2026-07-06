"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { siteConfig } from "@/lib/content/company";
import { Button } from "@/components/ui/Button";
import ShinyText from "@/components/ui/ShinyText";

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
    { name: "Our Services", path: "/services" },
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
        <Link href="/" className="flex items-center h-10 md:h-12 w-[180px] md:w-[260px] relative shrink-0 ml-0 md:ml-4 xl:ml-8">
          <Image 
            src={siteConfig.logo} 
            alt={siteConfig.name} 
            fill
            sizes="(max-width: 768px) 180px, 260px"
            className="object-contain object-left scale-[2] md:scale-[2.8] origin-left drop-shadow-sm pointer-events-none" 
            priority 
          />
        </Link>

        <div className={`relative z-10 flex gap-2 xl:gap-3 items-center max-lg:fixed max-lg:top-0 max-lg:z-[1010] max-lg:bg-white max-lg:flex-col max-lg:items-start max-lg:p-8 max-lg:h-screen max-lg:w-[72%] max-lg:sm:w-[340px] max-lg:shadow-[-20px_0_60px_rgba(0,0,0,0.2)] max-lg:transition-transform max-lg:duration-500 max-lg:ease-in-out max-lg:overflow-y-auto ${mobileOpen ? 'max-lg:right-0 max-lg:translate-x-0' : 'max-lg:-right-full max-lg:translate-x-full'}`}>
          
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
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`font-bold uppercase tracking-widest whitespace-nowrap px-6 py-5 lg:py-2.5 max-lg:w-full max-lg:text-left max-lg:mb-2 max-lg:text-[14px] lg:text-[12px] xl:text-[13px] ${
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
            <a href="tel:04712432301" className="flex items-center justify-center gap-2 text-[#0c494f] font-bold text-[16px]">
              <Phone size={20} />
              (0471) 2432301
            </a>
            <Link href="/contact" className="w-full" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-[#115E59] hover:bg-[#083135] text-white shadow-xl shadow-[#115E59]/20 rounded-2xl font-bold text-[14px] uppercase tracking-widest h-14 transition-all" size="lg">
                Join Now
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 xl:gap-6">
          <a href="tel:04712432301" className="hidden lg:flex items-center gap-2 text-[#0c494f] font-bold text-[15px] hover:text-[#115E59] transition-colors whitespace-nowrap">
            <Phone size={18} />
            (0471) 2432301
          </a>
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
