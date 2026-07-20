'use client';

import React from 'react';

export function HeadingBlock({ 
  content, 
  isEditMode, 
  isActive, 
  onContentChange 
}: { 
  content: any,
  isEditMode?: boolean,
  isActive?: boolean,
  onContentChange?: (content: any) => void
}) {
  const { text = '', level = 'h2', alignment = 'left', color = '#111827' } = content || {};
  
  const Tag = level as any;
  
  const baseClasses = "font-bold mb-6";
  const sizeMap: Record<string, string> = {
    h1: "text-4xl md:text-5xl lg:text-6xl",
    h2: "text-3xl md:text-4xl lg:text-5xl",
    h3: "text-2xl md:text-3xl lg:text-4xl",
    h4: "text-xl md:text-2xl",
    h5: "text-lg md:text-xl",
    h6: "text-base font-bold uppercase tracking-wider"
  };
  const sizeClasses = sizeMap[level as string] || sizeMap.h2;

  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right"
  }[alignment as string] || "text-left";

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-4">
      <Tag 
        className={`${baseClasses} ${sizeClasses} ${alignClasses} ${isEditMode ? 'outline-none cursor-text transition-colors' : ''} ${isActive ? 'border-b-2 border-dashed border-[#00A3A0]/50 hover:border-[#00A3A0]' : ''}`} 
        style={{ color }}
        contentEditable={isEditMode}
        suppressContentEditableWarning={true}
        onBlur={(e: React.FocusEvent<HTMLElement>) => {
          if (onContentChange && e.currentTarget.textContent !== text) {
            onContentChange({ text: e.currentTarget.textContent });
          }
        }}
        onPaste={(e: React.ClipboardEvent) => {
          e.preventDefault();
          const text = e.clipboardData.getData('text/plain');
          document.execCommand('insertText', false, text);
        }}
      >
        {text}
      </Tag>
    </div>
  );
}
