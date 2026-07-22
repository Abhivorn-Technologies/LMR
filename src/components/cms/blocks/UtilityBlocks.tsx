'use client';

import React from 'react';

export function ContactFormBlock({ content }: { content: any }) {
  return (
    <div className="py-16 w-full bg-white">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">{content?.title || 'Get In Touch'}</h2>
        <p className="text-gray-500 text-center mb-8">{content?.subtitle || 'Send us a message and we will get back to you shortly.'}</p>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" className="w-full border-gray-300 rounded-lg p-3 border focus:ring-[#00A3A0] focus:border-[#00A3A0]" placeholder="John" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" className="w-full border-gray-300 rounded-lg p-3 border focus:ring-[#00A3A0] focus:border-[#00A3A0]" placeholder="Doe" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full border-gray-300 rounded-lg p-3 border focus:ring-[#00A3A0] focus:border-[#00A3A0]" placeholder="john@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea rows={4} className="w-full border-gray-300 rounded-lg p-3 border focus:ring-[#00A3A0] focus:border-[#00A3A0]" placeholder="How can we help you?"></textarea>
          </div>
          <button type="button" className="w-full bg-[#00A3A0] hover:bg-[#008f8c] text-white font-bold py-3 rounded-lg transition-colors">
            {content?.buttonText || 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}

export function NewsletterBlock({ content }: { content: any }) {
  return (
    <div className="py-16 w-full bg-[#f8f9fa] border-y border-gray-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-3 text-gray-900">{content?.title || 'Subscribe to our Newsletter'}</h2>
        <p className="text-gray-600 mb-6">{content?.subtitle || 'Get the latest updates and offers directly to your inbox.'}</p>
        <form className="flex flex-col sm:flex-row gap-2 justify-center max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Enter your email address" className="flex-1 border-gray-300 rounded-lg p-3 border focus:ring-[#00A3A0]" />
          <button type="button" className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export function MapBlock({ content }: { content: any }) {
  const address = content?.address || 'New York, NY';
  const encodedAddress = encodeURIComponent(address);
  
  return (
    <div className="w-full bg-gray-100 min-h-[400px]">
      <iframe
        width="100%"
        height={content?.height || 400}
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={`https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
      ></iframe>
    </div>
  );
}

export function TableBlock({ content }: { content: any }) {
  const rows = content?.rows || [
    ['Header 1', 'Header 2', 'Header 3'],
    ['Row 1 Cell 1', 'Row 1 Cell 2', 'Row 1 Cell 3'],
    ['Row 2 Cell 1', 'Row 2 Cell 2', 'Row 2 Cell 3']
  ];

  if (!Array.isArray(rows) || rows.length === 0 || !Array.isArray(rows[0])) return null;

  return (
    <div className="py-10 px-4 w-full max-w-5xl mx-auto">
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-50">
            <tr>
              {rows[0].map((header: string, i: number) => (
                <th key={i} className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.slice(1).map((row: any, i: number) => (
              <tr key={i} className="hover:bg-gray-50">
                {Array.isArray(row) ? row.map((cell: string, j: number) => (
                  <td key={j} className="whitespace-nowrap px-4 py-3 text-gray-700">
                    {cell}
                  </td>
                )) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function CustomHtmlBlock({ content }: { content: any }) {
  if (!content?.html) {
    return (
      <div className="p-8 border border-dashed border-gray-300 bg-gray-50 text-center text-gray-500 rounded-lg m-4">
        Custom HTML Block (Empty)
      </div>
    );
  }

  return (
    <div 
      className="w-full"
      dangerouslySetInnerHTML={{ __html: content.html }}
    />
  );
}
