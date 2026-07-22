import React from 'react';
import * as LucideIcons from 'lucide-react';

export function IconBlock({ content }: { content: any }) {
  const { iconName = 'Star', size = '24px', color = '#00A3A0', align = 'center' } = content || {};

  // If the user uploaded an image, iconName will be a URL starting with / or http
  const isImageUrl = iconName?.startsWith('/') || iconName?.startsWith('http');

  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  }[align as 'left' | 'center' | 'right'] || 'justify-center';

  if (isImageUrl) {
    return (
      <div className={`flex items-center w-full py-4 ${alignClasses}`}>
        <img 
          src={iconName} 
          alt="Icon" 
          style={{ width: size, height: size, objectFit: 'contain' }} 
        />
      </div>
    );
  }

  // Otherwise, attempt to render a Lucide icon
  const IconComponent = (LucideIcons as any)[iconName];
  
  if (!IconComponent) {
    return (
      <div className={`flex items-center w-full py-4 ${alignClasses}`}>
        <div className="text-red-400 text-sm italic">Icon "{iconName}" not found</div>
      </div>
    );
  }

  return (
    <div className={`flex items-center w-full py-4 ${alignClasses}`}>
      <IconComponent 
        style={{ width: size, height: size, color }} 
      />
    </div>
  );
}
