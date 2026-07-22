"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const defaultCompanies = [
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
  const activeCompanies = content?.logos?.length > 0 ? content.logos : defaultCompanies;

  // Split into two rows
  const half = Math.ceil(activeCompanies.length / 2);
  const row1 = activeCompanies.slice(0, half);
  const row2 = activeCompanies.slice(half);

  // If there are very few companies, we might just duplicate them so the marquee still works
  const displayRow1 = row1.length > 0 ? [...row1, ...row1, ...row1, ...row1, ...row1, ...row1] : [];
  const displayRow2 = row2.length > 0 ? [...row2, ...row2, ...row2, ...row2, ...row2, ...row2] : displayRow1;

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

      <div className="flex flex-col gap-6 w-full overflow-hidden relative">
        <div className="flex animate-marquee whitespace-nowrap gap-6 pl-6 w-max">
          {displayRow1.map((company, i) => (
            <div
              key={`r1-${i}`}
              className="flex items-center gap-4 bg-white rounded-xl p-3 shadow-sm min-w-[320px] max-w-[350px] border border-[#e8f1f5]"
            >
              <div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 overflow-hidden bg-white relative">
                {(company.logo || company.src || company.url) ? (
                  <Image
                    src={company.logo || company.src || company.url}
                    alt={company.name || company.alt || "Logo"}
                    fill
                    className="object-contain p-0.5"
                  />
                ) : (
                  <div className="w-full h-full bg-[#0c494f] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {company.initials || (company.name || company.alt || "LG").substring(0,2).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[#0c494f] font-bold text-[14px] truncate w-[230px] tracking-tight">
                  {company.name || company.alt || "Client Logo"}
                </span>
                <span className="text-[#64748b] text-[12px] mt-0.5 truncate w-full">
                  {company.category || "Client"}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex animate-marquee-reverse whitespace-nowrap gap-6 pl-6 w-max -ml-[300px]">
          {displayRow2.map((company, i) => (
            <div
              key={`r2-${i}`}
              className="flex items-center gap-4 bg-white rounded-xl p-3 shadow-sm min-w-[320px] max-w-[350px] border border-[#e8f1f5]"
            >
              <div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 overflow-hidden bg-white relative">
                {(company.logo || company.src || company.url) ? (
                  <Image
                    src={company.logo || company.src || company.url}
                    alt={company.name || company.alt || "Logo"}
                    fill
                    className="object-contain p-0.5"
                  />
                ) : (
                  <div className="w-full h-full bg-[#0c494f] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {company.initials || (company.name || company.alt || "LG").substring(0,2).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[#0c494f] font-bold text-[14px] truncate w-[230px] tracking-tight">
                  {company.name || company.alt || "Client Logo"}
                </span>
                <span className="text-[#64748b] text-[12px] mt-0.5 truncate w-full">
                  {company.category || "Client"}
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
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 60s linear infinite;
        }
        .animate-marquee:hover, .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
