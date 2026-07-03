import Link from "next/link";
import Image from "next/image";
import { TriangleAlert, Home } from "lucide-react";
import { siteConfig } from "@/lib/content/company";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#Fdfcf7] flex flex-col items-center justify-center p-6 font-sans">
      <style dangerouslySetInnerHTML={{ __html: `nav, footer { display: none !important; }` }} />
      <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-10 max-w-[480px] w-full flex flex-col items-center text-center">
        {/* Logo */}
        <Link href="/" className="relative h-36 w-full max-w-[340px] -mb-8 hover:opacity-80 transition-opacity flex items-center justify-center">
          <Image 
            src={siteConfig.logo} 
            alt={siteConfig.name} 
            fill
            className="object-contain scale-[1.25]" 
            priority 
          />
        </Link>

        {/* 404 text with icon */}
        <div className="flex items-center justify-center text-[#0c494f] font-black text-8xl mb-6 tracking-tighter">
          <span>4</span>
          <TriangleAlert className="w-20 h-20 stroke-[3px] -mt-1 mx-0.5" />
          <span>4</span>
        </div>

        {/* Heading */}
        <h1 className="text-[28px] font-bold text-slate-900 mb-3 tracking-tight">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-slate-500 mb-8 max-w-[320px] leading-relaxed text-[15px]">
          We couldn&apos;t find the page you were looking for. Please check the URL or return to the homepage.
        </p>

        {/* Button */}
        <Link 
          href="/" 
          className="bg-[#0c494f] hover:bg-[#083135] text-white flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 w-full shadow-[0_4px_12px_rgba(12,73,79,0.25)] hover:shadow-[0_6px_20px_rgba(12,73,79,0.4)] hover:-translate-y-0.5 active:translate-y-0"
        >
          <Home className="w-5 h-5 stroke-[2.5px]" />
          Return to Homepage
        </Link>
      </div>
    </main>
  );
}
