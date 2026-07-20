'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function FAQAccordionBlock({ content }: { content: any }) {
  const { title = 'Frequently Asked Questions', faqs = [] } = content || {};
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-16">
      {title && (
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          {title}
        </h2>
      )}
      
      <div className="space-y-4">
        {faqs.map((faq: any, index: number) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm transition-all duration-200"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:bg-gray-50 hover:bg-gray-50 transition-colors"
            >
              <span className="font-bold text-gray-800 pr-8">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="text-[#00A3A0] flex-shrink-0" size={20} />
              ) : (
                <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
              )}
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
