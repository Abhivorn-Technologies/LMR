'use client';
import React from 'react';
import Link from 'next/link';
import * as Icons from 'lucide-react';

export function GenericCardGrid({ content }: { content?: any }) {
  if (!content) return null;

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-12">
          {content.headline && <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-syne mb-4">{content.headline}</h2>}
          {content.subheadline && <p className="text-lg text-slate-600 max-w-2xl mx-auto">{content.subheadline}</p>}
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${content.columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6`}>
          {content.cards?.map((card: any, idx: number) => {
            const Icon = card.icon ? (Icons as any)[card.icon] : null;
            return (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col">
                {Icon && (
                  <div className="w-14 h-14 bg-[#00A3A0]/10 text-[#00A3A0] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={28} />
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                <p className="text-slate-600 mb-6 flex-1">{card.description}</p>
                {card.buttonText && card.buttonLink && (
                  <Link href={card.buttonLink} className="text-[#00A3A0] font-semibold flex items-center hover:text-[#008f8c]">
                    {card.buttonText}
                    <Icons.ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
