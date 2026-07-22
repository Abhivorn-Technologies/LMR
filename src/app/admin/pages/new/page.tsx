'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, LayoutTemplate } from 'lucide-react';
import Link from 'next/link';

export default function NewPageCreator() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    if (newTitle.trim() === '') {
      setSlug('');
      return;
    }
    
    const generatedSlug = '/' + newTitle
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
      
    setSlug(generatedSlug);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const parentNav = formData.get('parentNav') as string;

    try {
      const res = await fetch('/api/admin/pages/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug, parentNav })
      });
      
      const result = await res.json();
      
      if (result.success) {
        router.push(`/admin/pages/editor?key=${result.key}`);
      } else {
        setError(result.error || 'Failed to create page');
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <div className="flex items-center gap-4 mb-5">
        <Link href="/admin" className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <LayoutTemplate className="text-[#00A3A0]" />
            Create New Page
          </h1>
          <p className="text-gray-500 text-xs md:text-sm mt-1">Design a brand new customizable page and place it in the navigation.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Page Title</label>
            <input 
              name="title"
              type="text" 
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="e.g. Our New Campaign"
              className="w-full px-3 py-2 text-gray-900 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A3A0]/20 focus:border-[#00A3A0] transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">URL Slug</label>
            <div className="flex items-center">
              <span className="px-3 py-2 bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg text-gray-500 font-mono text-xs">
                lmb-insurance.com
              </span>
              <input 
                name="slug"
                type="text" 
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="/our-new-campaign"
                className="flex-1 px-3 py-2 text-gray-900 rounded-r-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A3A0]/20 focus:border-[#00A3A0] transition-colors font-mono text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Navigation Placement (Parent)</label>
            <div className="relative">
              <select 
                name="parentNav"
                defaultValue="None"
                className="peer w-full px-3 py-2 text-gray-900 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A3A0]/20 focus:border-[#00A3A0] transition-colors text-sm appearance-none cursor-pointer"
              >
                <option value="None">Do not add to Navigation</option>
                <option value="Home">Home</option>
                <option value="About Us">About Us</option>
                <option value="Life insurance">Life Insurance</option>
                <option value="General insurance">General Insurance</option>
                <option value="Risk Management">Risk Management</option>
                <option value="Claims Consultancy">Claims Consultancy</option>
                <option value="Reinsurance">Reinsurance</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none peer-focus:rotate-180 transition-transform duration-200">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 mt-1.5 leading-tight">Selecting a parent will automatically inject this new page into the live navigation menu next to or under the selected item.</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
          <button 
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-[#00A3A0] hover:bg-[#008f8c] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {loading ? 'Creating...' : 'Create & Open Editor'}
          </button>
        </div>
      </form>
    </div>
  );
}
