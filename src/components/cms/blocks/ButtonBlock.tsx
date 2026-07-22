'use client';

import React from 'react';
import Link from 'next/link';

export function ButtonBlock({ 
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
  const { text = 'Click Me', link = '/', style = 'primary' } = content || {};

  const getStyleClasses = () => {
    switch (style) {
      case 'secondary':
        return 'bg-white text-[#00A3A0] border-2 border-[#00A3A0] hover:bg-gray-50';
      case 'outline':
        return 'bg-transparent text-gray-900 border-2 border-gray-900 hover:bg-gray-100';
      case 'text':
        return 'bg-transparent text-[#00A3A0] hover:underline px-0';
      case 'primary':
      default:
        return 'bg-[#00A3A0] text-white hover:bg-[#008f8c] shadow-md hover:shadow-lg';
    }
  };

  const buttonClasses = `inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${getStyleClasses()} ${isActive ? 'ring-4 ring-[#00A3A0]/30' : ''}`;

  const [isEditing, setIsEditing] = React.useState(false);

  const InnerContent = () => (
    <span
      contentEditable={isEditMode && isEditing}
      suppressContentEditableWarning={true}
      className={isEditMode ? 'outline-none transition-colors' : ''}
      style={{ cursor: isEditing ? 'text' : isEditMode ? 'pointer' : 'inherit' }}
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
      onClick={(e) => {
        if (isEditMode) e.preventDefault();
      }}
      onDoubleClick={() => {
        if (isEditMode) setIsEditing(true);
      }}
    >
      {text}
    </span>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center">
      {isEditMode ? (
        <div className={buttonClasses}>
          <InnerContent />
        </div>
      ) : (
        <Link href={link} className={buttonClasses}>
          <InnerContent />
        </Link>
      )}
    </div>
  );
}
