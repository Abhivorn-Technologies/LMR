'use client';

import React from 'react';

export function ParagraphBlock({ 
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
  const { text = 'Enter your paragraph text here...', alignment = 'left', color = '#4B5563', size = 'text-base' } = content || {};
  
  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right",
    justify: "text-justify"
  }[alignment as string] || "text-left";

  const sizeClasses = {
    small: "text-sm",
    normal: "text-base",
    large: "text-lg",
    xlarge: "text-xl md:text-2xl"
  }[size as string] || "text-base";

  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div 
      className="w-full max-w-7xl mx-auto px-6 py-2"
      onDoubleClick={() => {
        if (isEditMode) setIsEditing(true);
      }}
    >
      <p 
        className={`leading-relaxed ${sizeClasses} ${alignClasses} ${isEditMode ? 'outline-none transition-colors' : ''} ${isEditing ? 'cursor-text ring-2 ring-[#00A3A0]/50 rounded p-2' : isEditMode ? 'cursor-pointer hover:bg-gray-50 p-2 -m-2 rounded' : ''} ${isActive && !isEditing ? 'border-b-2 border-dashed border-[#00A3A0]/50 hover:border-[#00A3A0]' : ''}`} 
        style={{ color }}
        contentEditable={isEditMode && isEditing}
        suppressContentEditableWarning={true}
        onBlur={(e: React.FocusEvent<HTMLElement>) => {
          setIsEditing(false);
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
      </p>
    </div>
  );
}
