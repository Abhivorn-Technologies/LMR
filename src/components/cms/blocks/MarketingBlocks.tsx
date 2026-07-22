'use client';

import React from 'react';

export function PricingBlock({ content }: { content: any }) {
  const plans = content?.plans || [
    { name: 'Basic', price: '$9', features: ['Feature 1', 'Feature 2'], isPopular: false },
    { name: 'Pro', price: '$29', features: ['Feature 1', 'Feature 2', 'Feature 3'], isPopular: true },
    { name: 'Enterprise', price: '$99', features: ['All Features', 'Support'], isPopular: false }
  ];

  return (
    <div className="py-12 px-4 w-full">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">{content?.title || 'Pricing Plans'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan: any, i: number) => (
            <div key={i} className={`p-6 rounded-xl border bg-white ${plan.isPopular ? 'border-[#00A3A0] shadow-xl relative' : 'border-gray-200'}`}>
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00A3A0] text-white px-3 py-1 text-xs font-bold rounded-full">
                  RECOMMENDED
                </div>
              )}
              <h3 className="text-xl font-bold mb-2 text-gray-900">{plan.name}</h3>
              <div className="text-4xl font-extrabold mb-4 text-gray-900">{plan.price}</div>
              <ul className="space-y-2 mb-6">
                {(Array.isArray(plan.features) ? plan.features : typeof plan.features === 'string' ? plan.features.split(',').map(s => s.trim()) : []).map((f: string, j: number) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00A3A0" strokeWidth="2"><path d="M5 12l5 5L20 7"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2 rounded-lg font-bold ${plan.isPopular ? 'bg-[#00A3A0] text-white' : 'bg-gray-100 text-gray-800'}`}>
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TestimonialsBlock({ content }: { content: any }) {
  const testimonials = content?.reviews || content?.testimonials || [
    { quote: "Amazing service! Highly recommended.", author: "Jane Doe", role: "CEO" },
    { quote: "The best experience we've had.", author: "John Smith", role: "Director" }
  ];

  return (
    <div className="py-12 bg-gray-50 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">{content?.title || 'What Our Clients Say'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t: any, i: number) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex text-amber-400 mb-4">
                {[...Array(t.rating || 5)].map((_, s) => <svg key={s} width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
              </div>
              <p className="text-gray-700 italic mb-4">"{t.text || t.quote}"</p>
              <div className="font-bold text-gray-900">{t.author}</div>
              <div className="text-sm text-gray-500">{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TeamBlock({ content }: { content: any }) {
  const members = content?.members || [
    { name: "Alice Johnson", role: "Founder", image: "" },
    { name: "Bob Smith", role: "Lead Engineer", image: "" }
  ];

  return (
    <div className="py-12 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">{content?.title || 'Meet Our Team'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {members.map((m: any, i: number) => (
            <div key={i} className="text-center">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4 overflow-hidden">
                {m.image && <img src={m.image} alt={m.name} className="w-full h-full object-cover" />}
              </div>
              <h3 className="font-bold text-lg text-gray-900">{m.name}</h3>
              <p className="text-sm text-[#00A3A0]">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BlogListBlock({ content }: { content: any }) {
  const posts = content?.posts || [
    { title: "Getting Started", excerpt: "Learn the basics of our platform.", date: "Oct 1, 2023" },
    { title: "Advanced Techniques", excerpt: "Take your skills to the next level.", date: "Oct 5, 2023" }
  ];

  return (
    <div className="py-12 bg-white w-full">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">{content?.title || 'Latest Articles'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p: any, i: number) => (
            <div key={i} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="h-40 bg-gray-100"></div>
              <div className="p-5">
                <div className="text-xs text-gray-500 mb-2">{p.date}</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{p.title}</h3>
                <p className="text-sm text-gray-600">{p.excerpt}</p>
                <button className="text-[#00A3A0] text-sm font-bold mt-4">Read More &rarr;</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
