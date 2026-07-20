'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CallToActionBlock({ content }: { content?: any }) {
  if (!content) return null;

  return (
    <section className="w-full py-20 bg-[#00A3A0] text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {content.title && (
          <h2 className="text-3xl md:text-5xl font-bold font-syne mb-6">
            {content.title}
          </h2>
        )}
        {content.description && (
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            {content.description}
          </p>
        )}
        {content.buttonText && content.buttonLink && (
          <Link 
            href={content.buttonLink}
            className="inline-flex items-center gap-2 bg-white text-[#00A3A0] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl hover:shadow-2xl"
          >
            {content.buttonText}
            <ArrowRight size={20} />
          </Link>
        )}
      </div>
    </section>
  );
}
