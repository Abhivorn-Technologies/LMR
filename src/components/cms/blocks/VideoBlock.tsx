'use client';

import React from 'react';

export function VideoBlock({ content }: { content: any }) {
  const { videoUrl = '', autoplay = false, loop = false, controls = true } = content || {};

  if (!videoUrl) {
    return (
      <div className="w-full h-64 bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl">
        <p className="text-gray-500 font-medium">No video URL provided.</p>
      </div>
    );
  }

  // Handle YouTube or Vimeo embed URLs
  const isEmbed = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') || videoUrl.includes('vimeo.com');

  if (isEmbed) {
    // Basic conversion for youtu.be to embed format
    let embedUrl = videoUrl;
    if (videoUrl.includes('youtu.be/')) {
      const id = videoUrl.split('youtu.be/')[1]?.split('?')[0];
      embedUrl = `https://www.youtube.com/embed/${id}`;
    }

    return (
      <div className="w-full max-w-5xl mx-auto px-6 py-8">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg bg-black">
          <iframe 
            src={`${embedUrl}${embedUrl.includes('?') ? '&' : '?'}autoplay=${autoplay ? 1 : 0}&loop=${loop ? 1 : 0}`} 
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  // Render native HTML5 video player for direct uploads (.mp4, .webm)
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-8">
      <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-black">
        <video 
          src={videoUrl}
          controls={controls}
          autoPlay={autoplay}
          loop={loop}
          muted={autoplay} // Autoplay usually requires muted to work in modern browsers
          playsInline
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}
