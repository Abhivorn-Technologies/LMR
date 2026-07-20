import React from 'react';

export function DividerBlock({ content }: { content: any }) {
  const { style = 'solid', thickness = 1, color = '#e2e8f0' } = content || {};
  
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-center">
      <div 
        style={{ 
          borderTopStyle: style, 
          borderTopWidth: `${thickness}px`, 
          borderTopColor: color,
          width: '100%' 
        }} 
      />
    </div>
  );
}
