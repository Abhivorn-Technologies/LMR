'use client';
import React from 'react';

export function RichTextBlock({ content }: { content?: any }) {
  if (!content) return null;

  return (
    <section className="w-full py-12 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {content.title && (
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-syne">
            {content.title}
          </h2>
        )}
        {content.text && (
          <div 
            className="prose prose-lg text-slate-600 prose-headings:font-syne prose-a:text-[#00A3A0]"
            dangerouslySetInnerHTML={{ __html: content.text }} 
          />
        )}
      </div>
    </section>
  );
}
