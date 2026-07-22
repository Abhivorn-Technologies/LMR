'use client';

import React from 'react';

export function ImageGalleryBlock({ content }: { content: any }) {
  const images = content?.images || [
    { url: 'https://via.placeholder.com/600x400', alt: 'Gallery Image 1' },
    { url: 'https://via.placeholder.com/600x400', alt: 'Gallery Image 2' },
    { url: 'https://via.placeholder.com/600x400', alt: 'Gallery Image 3' },
    { url: 'https://via.placeholder.com/600x400', alt: 'Gallery Image 4' }
  ];

  const columns = content?.columns || 2;

  return (
    <div className="py-8 px-4 w-full">
      <div className="max-w-6xl mx-auto">
        {content?.title && <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">{content.title}</h2>}
        <div 
          className="grid gap-4" 
          style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${columns === 2 ? '400px' : '250px'}), 1fr))` }}
        >
          {images.map((img: any, i: number) => (
            <div key={i} className="rounded-xl overflow-hidden aspect-video bg-gray-100 group relative">
              <img 
                src={img.url || img} 
                alt={img.alt || `Gallery image ${i+1}`} 
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
              />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LogoSliderBlock({ content }: { content: any }) {
  const logos = content?.logos || [
    { url: 'https://via.placeholder.com/150x80?text=Logo+1' },
    { url: 'https://via.placeholder.com/150x80?text=Logo+2' },
    { url: 'https://via.placeholder.com/150x80?text=Logo+3' },
    { url: 'https://via.placeholder.com/150x80?text=Logo+4' }
  ];

  return (
    <div className="py-12 bg-white w-full border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {content?.title && <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">{content.title}</p>}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo: any, i: number) => (
            <div key={i} className="w-32 h-16 relative flex items-center justify-center">
              <img 
                src={logo.url || logo} 
                alt={logo.alt || `Logo ${i+1}`} 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
