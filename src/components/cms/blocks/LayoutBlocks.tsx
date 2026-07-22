'use client';

import React from 'react';
import { BlockRenderer } from '../BlockRenderer';

export function ContainerBlock({ content }: { content: any }) {
  const { maxWidth = '1200px', blocks = [] } = content || {};
  return (
    <div className="mx-auto w-full px-6" style={{ maxWidth }}>
      <BlockRenderer blocks={blocks} />
    </div>
  );
}

export function SectionBlock({ content }: { content: any }) {
  const { backgroundColor = '#ffffff', padding = '64px 0', blocks = [] } = content || {};
  return (
    <section style={{ backgroundColor, padding }} className="w-full">
      <BlockRenderer blocks={blocks} />
    </section>
  );
}

export function ColumnsBlock({ content }: { content: any }) {
  const { layout = '50/50', gap = '24px', leftBlocks = [], rightBlocks = [] } = content || {};
  
  const getGridCols = () => {
    if (layout === '33/67') return 'md:grid-cols-[1fr_2fr]';
    if (layout === '67/33') return 'md:grid-cols-[2fr_1fr]';
    if (layout === '25/75') return 'md:grid-cols-[1fr_3fr]';
    if (layout === '75/25') return 'md:grid-cols-[3fr_1fr]';
    return 'md:grid-cols-2'; // 50/50 default
  };

  return (
    <div className={`w-full max-w-7xl mx-auto px-6 grid grid-cols-1 ${getGridCols()}`} style={{ gap }}>
      <div className="flex flex-col w-full">
        <BlockRenderer blocks={leftBlocks} />
      </div>
      <div className="flex flex-col w-full">
        <BlockRenderer blocks={rightBlocks} />
      </div>
    </div>
  );
}

export function HeaderBlock({ content }: { content: any }) {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200 py-4 px-6 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="font-bold text-xl text-[#00A3A0]">
          {content?.logoText || 'LMB Insurance'}
        </div>
        <nav className="hidden md:flex gap-6">
          {(content?.links || ['Home', 'About Us', 'Services', 'Contact']).map((link: string, i: number) => (
            <a key={i} href="#" className="text-sm font-medium text-gray-600 hover:text-[#00A3A0] transition">
              {link}
            </a>
          ))}
        </nav>
        <button className="bg-[#00A3A0] hover:bg-[#008f8c] text-white px-5 py-2 rounded-lg text-sm font-bold transition">
          {content?.ctaText || 'Get a Quote'}
        </button>
      </div>
    </header>
  );
}

export function FooterBlock({ content }: { content: any }) {
  const quickLinks = content?.quickLinks || ['Home', 'About Us', 'Services', 'Contact'];
  const contactInfo = content?.contactInfo || ['123 Insurance Ave, NY 10001', 'info@lmb-insurance.com', '+1 (555) 123-4567'];

  return (
    <footer className="w-full bg-gray-900 text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-1 md:col-span-2">
          <h3 className="font-bold text-xl mb-4 text-[#00A3A0]">{content?.title || 'LMB Insurance'}</h3>
          <p className="text-gray-400 max-w-sm">
            {content?.description || 'Providing comprehensive insurance solutions tailored to your unique needs since 2005.'}
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            {quickLinks.map((link: string, i: number) => (
              <li key={i}><a href="#" className="hover:text-white transition">{link}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Contact Info</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            {contactInfo.map((info: string, i: number) => (
              <li key={i}>{info}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} LMB Insurance Brokers. All rights reserved.
      </div>
    </footer>
  );
}
