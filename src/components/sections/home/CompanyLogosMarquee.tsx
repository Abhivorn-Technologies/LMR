"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const defaultCompanies = [
  {
    name: "Hindustan Latex Limited",
    category: "Central PSU — Healthcare",
    logo: "/assets/Company logos/Hindustan Latex Limited.png",
    initials: "HL",
    bgColor: "bg-[#2b5a7a]",
  },
  {
    name: "Hindustan Insecticides Limited",
    category: "Central PSU — Agro-chemicals",
    logo: "/assets/Company logos/Hindustan Insecticides Limited.png",
    initials: "HI",
    bgColor: "bg-[#0b3b60]",
  },
  {
    name: "Kerala State Film Development Corporation",
    category: "State PSU — Media",
    logo: "/assets/Company logos/Kerala State Film Development Corporation (KSFDC).jpg",
    initials: "KS",
    bgColor: "bg-[#06395b]",
  },
  {
    name: "Kerala Minerals and Metals Limited",
    category: "State PSU — Minerals",
    logo: "/assets/Company logos/Travancore Titanium Products Limited.png",
    initials: "KM",
    bgColor: "bg-[#06395b]",
  },
  {
    name: "Cochin Shipyard Limited",
    category: "Central PSU — Shipping",
    logo: "/assets/Company logos/Cochin Shipyard Limited.png",
    initials: "CS",
    bgColor: "bg-[#0b3b60]",
  },
  {
    name: "KIOCL Limited",
    category: "Central PSU — Iron Ore",
    logo: "/assets/Company logos/KIOCL Limited.png",
    initials: "KL",
    bgColor: "bg-[#2b5a7a]",
  },
  {
    name: "Government of Kerala",
    category: "State Government",
    logo: "/assets/Company logos/Government of Kerala.webp",
    initials: "GK",
    bgColor: "bg-[#0b3b60]",
  },
  {
    name: "KTDC",
    category: "State PSU — Tourism",
    logo: "/assets/Company logos/KTDC (Kerala Tourism Development Corporation).jpg",
    initials: "KT",
    bgColor: "bg-[#06395b]",
  },
  {
    name: "Kerala Automobiles Limited",
    category: "State PSU — Automobiles",
    logo: "/assets/Company logos/Kerala Automobiles Limited.png",
    initials: "KA",
    bgColor: "bg-[#2b5a7a]",
  },
  {
    name: "Milma (KCMMF)",
    category: "State Cooperative — Dairy",
    logo: "/assets/Company logos/Milma (KCMMF).png",
    initials: "MI",
    bgColor: "bg-[#0b3b60]",
  },
  {
    name: "NLC India Limited",
    category: "Central PSU — Energy",
    logo: "/assets/Company logos/Nyveli Lignite Corporation.jpg",
    initials: "NL",
    bgColor: "bg-[#06395b]",
  },
  {
    name: "Rajiv Gandhi Centre for Biotechnology",
    category: "Autonomous Institute",
    logo: "/assets/Company logos/Rajiv Gandhi Centre for Biotechnology (RGCB).png",
    initials: "RG",
    bgColor: "bg-[#2b5a7a]",
  },
];

export function CompanyLogosMarquee({ 
  content,
  isEditMode,
  isActive,
  onContentChange
}: { 
  content?: any;
  isEditMode?: boolean;
  isActive?: boolean;
  onContentChange?: (content: any) => void;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const companies = content?.logos || defaultCompanies;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section id="clients" className="scroll-mt-24 py-16 overflow-hidden bg-[#f4f9f9] relative border-t border-b border-[#e5f0f0]">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col items-center text-center">
        <h2 
          className={`text-3xl md:text-4xl font-extrabold text-[#0c494f] mb-4 ${isEditMode ? 'outline-none border-b border-dashed border-transparent hover:border-[#0c494f] cursor-text' : ''}`}
          contentEditable={isEditMode}
          suppressContentEditableWarning
          onBlur={(e) => onContentChange?.({ ...content, title: e.currentTarget.textContent })}
        >
          {content?.title || "Our notable clients"}
        </h2>
        <p 
          className={`text-slate-500 max-w-2xl font-medium ${isEditMode ? 'outline-none border border-dashed border-transparent hover:border-[#0c494f] p-1 -m-1 rounded cursor-text' : ''}`}
          contentEditable={isEditMode}
          suppressContentEditableWarning
          onBlur={(e) => onContentChange?.({ ...content, description: e.currentTarget.textContent })}
        >
          {content?.description || "Government departments, PSUs and public corporations we are proud to serve."}
        </p>
      </div>

      <div className="flex w-full overflow-hidden relative">
        <div className="flex animate-marquee whitespace-nowrap gap-4 pl-4 w-max">
          {[...companies, ...companies, ...companies, ...companies].map((company, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-white rounded-xl p-3 shadow-sm min-w-[300px] border border-[#e8f1f5]"
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 overflow-hidden bg-white relative">
                {company.logo ? (
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-contain p-0.5"
                  />
                ) : (
                  <div className="w-full h-full bg-[#0c494f] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {company.initials}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[#0c494f] font-bold text-[13px] truncate w-[220px] tracking-tight">
                  {company.name}
                </span>
                <span className="text-[#64748b] text-[11px] mt-0.5 truncate w-full">
                  {company.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
