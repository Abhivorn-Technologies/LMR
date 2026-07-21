'use client';

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { FadeIn } from '@/components/motion/FadeIn';

export function FAQAccordionBlock({ 
  content,
  isEditMode,
  isActive,
  onContentChange 
}: { 
  content?: any;
  isEditMode?: boolean;
  isActive?: boolean;
  onContentChange?: (content: any) => void;
}) {
  const { title = 'Disclaimers & important info', faqs = [] } = content || {};
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  // Function to render the title with the yellow underline for specific keywords like "important info"
  const renderTitle = (text: string) => {
    if (text.toLowerCase().includes('important info')) {
      const parts = text.split(/important info/i);
      return (
        <>
          {parts[0]}
          <span className="relative inline-block">
            important info
            <div className="absolute -bottom-2 left-0 w-full h-3 bg-[#ffb800] rounded-full -z-10 opacity-80" />
          </span>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <section className="bg-[#f4f9f9] py-20 px-6">
      <div className="w-full max-w-5xl mx-auto">
        <FadeIn>
          <h2 
            className={`text-4xl md:text-5xl font-extrabold text-[#0c494f] text-center mb-16 tracking-tight ${isEditMode ? 'outline-none border-b border-dashed border-transparent hover:border-[#0c494f] cursor-text' : ''}`}
            contentEditable={isEditMode}
            suppressContentEditableWarning
            onBlur={(e) => onContentChange?.({ ...content, title: e.currentTarget.textContent })}
          >
            {isEditMode ? title : renderTitle(title)}
          </h2>
        </FadeIn>
        
        <div className="space-y-6">
          {faqs.map((faq: any, index: number) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div 
                className={`border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm transition-all duration-300 ${openIndex === index ? 'shadow-md ring-1 ring-slate-100' : 'hover:shadow-md'}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:bg-slate-50 hover:bg-slate-50 transition-colors"
                >
                  <span 
                    className={`font-bold text-[17px] text-[#0c494f] pr-8 ${isEditMode ? 'outline-none border-b border-dashed border-transparent hover:border-[#0c494f] cursor-text' : ''}`}
                    contentEditable={isEditMode}
                    suppressContentEditableWarning
                    onClick={(e) => isEditMode && e.stopPropagation()}
                    onBlur={(e) => {
                      if (!onContentChange) return;
                      const newFaqs = [...faqs];
                      newFaqs[index] = { ...newFaqs[index], question: e.currentTarget.textContent };
                      onContentChange({ ...content, faqs: newFaqs });
                    }}
                  >
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <X className="text-[#ffb800] flex-shrink-0" strokeWidth={3} size={20} />
                  ) : (
                    <Plus className="text-[#ffb800] flex-shrink-0" strokeWidth={3} size={20} />
                  )}
                </button>
                
                {openIndex === index && (
                  <div 
                    className={`px-8 pb-8 text-slate-500 font-medium leading-[1.8] pt-2 ${isEditMode ? 'outline-none border border-dashed border-transparent hover:border-slate-500 p-2 cursor-text' : ''}`}
                    contentEditable={isEditMode}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      if (!onContentChange) return;
                      const newFaqs = [...faqs];
                      newFaqs[index] = { ...newFaqs[index], answer: e.currentTarget.innerHTML };
                      onContentChange({ ...content, faqs: newFaqs });
                    }}
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
