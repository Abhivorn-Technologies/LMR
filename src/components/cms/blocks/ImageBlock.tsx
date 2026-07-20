'use client';
import React from 'react';
import Image from 'next/image';

export function ImageBlock({ content }: { content?: any }) {
  if (!content || !content.src) return null;

  return (
    <section className={`w-full ${content.fullWidth ? '' : 'py-12 max-w-6xl mx-auto px-6'}`}>
      <div className={`relative w-full overflow-hidden ${content.fullWidth ? 'h-[500px]' : 'h-[400px] rounded-2xl shadow-xl'}`}>
        <Image 
          src={content.src} 
          alt={content.alt || "CMS Image"}
          fill
          className="object-cover"
        />
        {content.caption && (
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white font-medium max-w-3xl mx-auto">{content.caption}</p>
          </div>
        )}
      </div>
    </section>
  );
}
