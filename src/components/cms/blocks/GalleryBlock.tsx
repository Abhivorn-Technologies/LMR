'use client';

import React from 'react';
import Image from 'next/image';

export function GalleryBlock({ 
  content, 
  isEditMode,
  isActive
}: { 
  content: any,
  isEditMode?: boolean,
  isActive?: boolean
}) {
  const { 
    title = 'Image Gallery', 
    columns = 3, 
    images = [
      { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', alt: 'Gallery Image 1' },
      { src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800', alt: 'Gallery Image 2' },
      { src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800', alt: 'Gallery Image 3' }
    ] 
  } = content || {};

  const getGridCols = () => {
    switch(Number(columns)) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      case 5: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
      case 3:
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <section className="w-full py-16 px-6 max-w-7xl mx-auto">
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
          {title}
        </h2>
      )}
      
      {(!images || images.length === 0) ? (
        <div className="w-full p-12 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-500 bg-gray-50">
          <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="font-medium text-lg">No Images Found</p>
          <p className="text-sm mt-1 text-gray-400">Add images in the sidebar to populate this gallery.</p>
        </div>
      ) : (
        <div className={`grid gap-6 ${getGridCols()}`}>
          {images.map((img: any, idx: number) => (
            <div 
              key={idx} 
              className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group bg-gray-100"
            >
              <img
                src={img.src || 'https://via.placeholder.com/800'}
                alt={img.alt || `Gallery Image ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
