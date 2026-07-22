'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { 
  FileText, 
  FolderTree, 
  ShieldCheck, 
  Globe, 
  ArrowRight, 
  Edit, 
  Clock, 
  Search
} from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

// Fallback main pages when localStorage is empty
const DEFAULT_MAIN_PAGES = [
  { key: '/services/risk-management', title: 'Risk Management Solutions', category: 'Services', timestamp: 'Just now' },
  { key: '/about', title: 'About Us', category: 'Corporate', timestamp: '10m ago' },
  { key: '/', title: 'Home Page', category: 'Main', timestamp: '1h ago' },
  { key: '/reinsurance', title: 'Reinsurance Advisory', category: 'Services', timestamp: '2h ago' },
  { key: '/services/general-insurance/motor/car', title: 'Car Motor Insurance', category: 'General Insurance', timestamp: '3h ago' },
];

export default function AdminDashboardHome() {
  const [recentVisitedPages, setRecentVisitedPages] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch live site sections total count from SWR
  const { data } = useSWR('/api/admin/pages', fetcher, {
    revalidateOnFocus: false
  });
  
  const siteSections = data?.success && data?.data ? data.data : [];

  // Load actual recent pages from localStorage dynamically
  useEffect(() => {
    try {
      const raw = localStorage.getItem('lmb_recent_pages');
      if (raw) {
        const parsed = JSON.parse(raw);
        // Filter out dummy/test pages like hey, jyo, sadik, jyothi
        const clean = parsed.filter((item: any) => 
          item.title && 
          !['hey', 'jyo', 'sadik', 'jyothi'].includes(item.title.toLowerCase()) &&
          !item.key.includes('hey') && !item.key.includes('jyo') && !item.key.includes('sadik')
        );

        if (clean.length > 0) {
          setRecentVisitedPages(clean.map((item: any) => ({
            key: item.key,
            title: item.title,
            category: item.key.startsWith('/services/') ? 'Services' : 'Main',
            timestamp: getRelativeTime(item.timestamp)
          })));
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }
    // No fallback - truly dynamic empty state
    setRecentVisitedPages([]);
  }, []);

  // Helper for relative timestamps
  function getRelativeTime(isoString?: string) {
    if (!isoString) return 'Recently';
    const diff = Math.floor((new Date().getTime() - new Date(isoString).getTime()) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  // Filtered recent pages
  const filteredRecent = recentVisitedPages.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {/* Executive Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Welcome back, Administrator. Platform analytics and recent page sessions.
          </p>
        </div>

        {/* Quick Shortcut Buttons Header Bar */}
        <div className="flex items-center gap-2 shrink-0 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <Link 
            href="/admin/pages/editor?key=/"
            className="px-3 py-1.5 bg-white border border-slate-200 hover:border-[#00A3A0]/40 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#00A3A0] transition-colors whitespace-nowrap"
          >
            Home Page
          </Link>
          <Link 
            href="/admin/pages/editor?key=/about"
            className="px-3 py-1.5 bg-white border border-slate-200 hover:border-[#00A3A0]/40 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#00A3A0] transition-colors whitespace-nowrap"
          >
            About Us
          </Link>
          <Link 
            href="/admin/pages/editor?key=/services/risk-management"
            className="px-3 py-1.5 bg-[#00A3A0] hover:bg-[#008f8c] text-white rounded-lg text-xs font-bold transition-colors shadow-2xs whitespace-nowrap"
          >
            Risk Management
          </Link>
        </div>
      </div>

      {/* Integrated Executive Metric Strip (Single compact grid) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs grid grid-cols-2 lg:grid-cols-4 divide-y divide-x-0 sm:divide-y-0 sm:divide-x divide-slate-100">
        <div className="p-3.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00A3A0]/10 text-[#00A3A0] flex items-center justify-center shrink-0 border border-[#00A3A0]/20">
            <FileText size={16} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Live Pages</span>
            <div className="text-base md:text-lg font-extrabold text-slate-900 leading-none mt-0.5">
              {siteSections.length || 0} <span className="text-[11px] font-normal text-slate-400">Total</span>
            </div>
          </div>
        </div>

        <div className="p-3.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00A3A0]/10 text-[#00A3A0] flex items-center justify-center shrink-0 border border-[#00A3A0]/20">
            <FolderTree size={16} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Collections</span>
            <div className="text-base md:text-lg font-extrabold text-slate-900 leading-none mt-0.5">
              0 <span className="text-[11px] font-normal text-slate-400">Schemas</span>
            </div>
          </div>
        </div>

        <div className="p-3.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/80">
            <ShieldCheck size={16} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">System Status</span>
            <div className="text-sm md:text-base font-extrabold text-emerald-700 leading-none mt-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              100% Operational
            </div>
          </div>
        </div>

        <div className="p-3.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00A3A0]/10 text-[#00A3A0] flex items-center justify-center shrink-0 border border-[#00A3A0]/20">
            <Globe size={16} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Monthly Visitors</span>
            <div className="text-base md:text-lg font-extrabold text-slate-900 leading-none mt-0.5">
              0 <span className="text-[11px] font-bold text-emerald-600">+0.0%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dynamic Table Container */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Table Header Controls */}
        <div className="px-4 py-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-slate-50/70">
          <div>
            <h3 className="font-extrabold text-slate-900 text-xs md:text-sm">Recently Visited & Edited Pages</h3>
            <p className="text-[11px] text-slate-500 font-medium">Real-time session activity from your Visual Editor.</p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative w-full sm:w-56">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input 
                type="text"
                placeholder="Filter recent sessions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 font-medium placeholder:text-slate-400 outline-none focus:border-[#00A3A0] transition-colors"
              />
            </div>

            <Link 
              href="/admin/pages"
              className="text-xs font-bold text-[#00A3A0] hover:text-[#008f8c] flex items-center gap-1 shrink-0 transition-colors"
            >
              All Sections <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Clean Activity Data Table - Responsive */}
        <div>
          {/* Mobile View: Stacked Cards */}
          <div className="md:hidden divide-y divide-slate-100">
            {filteredRecent.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs font-medium">
                No recent page history found. Open the Visual Editor to track pages dynamically!
              </div>
            ) : (
              filteredRecent.map((item, idx) => (
                <div key={idx} className="p-4 bg-white flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-md bg-[#00A3A0]/10 text-[#00A3A0] flex items-center justify-center shrink-0 border border-[#00A3A0]/20">
                        <FileText size={15} />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block text-sm leading-tight">
                          {item.title}
                        </span>
                        <span className="font-mono text-slate-500 text-[10px] mt-0.5 block truncate max-w-[180px]">
                          {item.key}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">
                        {item.category || 'Main'}
                      </span>
                      <div className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                        <Clock size={11} className="text-slate-400" />
                        {item.timestamp}
                      </div>
                    </div>
                    
                    <Link 
                      href={`/admin/pages/editor?key=${encodeURIComponent(item.key)}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold text-white bg-[#00A3A0] hover:bg-[#008f8c] transition-all shadow-2xs"
                    >
                      <Edit size={13} />
                      Edit
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-100 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <th className="px-4 py-2.5">Page Title</th>
                  <th className="px-4 py-2.5">URL Key</th>
                  <th className="px-4 py-2.5 text-center">Category</th>
                  <th className="px-4 py-2.5 text-center">Last Accessed</th>
                  <th className="px-4 py-2.5 text-right">Option</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredRecent.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500 text-sm font-medium">
                      No recent page history found. Open the Visual Editor to track pages dynamically!
                    </td>
                  </tr>
                ) : (
                  filteredRecent.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-md bg-[#00A3A0]/10 text-[#00A3A0] flex items-center justify-center shrink-0 border border-[#00A3A0]/20">
                            <FileText size={13} />
                          </div>
                          <span className="font-bold text-slate-900 group-hover:text-[#00A3A0] transition-colors">
                            {item.title}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3 font-mono text-slate-500 text-[11px]">
                        {item.key}
                      </td>

                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-semibold">
                          {item.category || 'Main'}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-center text-slate-500 font-medium">
                        <div className="inline-flex items-center gap-1 text-[11px]">
                          <Clock size={12} className="text-slate-400" />
                          {item.timestamp}
                        </div>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <Link 
                          href={`/admin/pages/editor?key=${encodeURIComponent(item.key)}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:border-[#00A3A0] hover:text-[#00A3A0] transition-all shadow-2xs"
                        >
                          <Edit size={12} />
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
