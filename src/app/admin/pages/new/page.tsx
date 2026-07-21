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
    <div className="max-w-2xl mx-auto py-10 px-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <LayoutTemplate className="text-[#00A3A0]" />
            Create New Page
          </h1>
          <p className="text-gray-500 text-sm mt-1">Design a brand new customizable page and place it in the navigation.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Page Title</label>
            <input 
              name="title"
              type="text" 
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="e.g. Our New Campaign"
              className="w-full px-4 py-3 text-gray-900 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A3A0]/20 focus:border-[#00A3A0] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">URL Slug</label>
            <div className="flex items-center">
              <span className="px-4 py-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg text-gray-500 font-mono text-sm">
                lmb-insurance.com
              </span>
              <input 
                name="slug"
                type="text" 
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="/our-new-campaign"
                className="flex-1 px-4 py-3 text-gray-900 rounded-r-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A3A0]/20 focus:border-[#00A3A0] transition-colors font-mono text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Navigation Placement (Parent)</label>
            <select 
              name="parentNav"
              defaultValue="None"
              className="w-full px-4 py-3 text-gray-900 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A3A0]/20 focus:border-[#00A3A0] transition-colors"
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
            <p className="text-xs text-gray-400 mt-2">Selecting a parent will automatically inject this new page into the live navigation menu next to or under the selected item.</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
          <button 
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-[#00A3A0] hover:bg-[#008f8c] text-white font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {loading ? 'Creating...' : 'Create & Open Editor'}
          </button>
        </div>
      </form>
    </div>
  );
}
