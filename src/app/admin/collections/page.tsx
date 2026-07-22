'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Database, 
  FileText, 
  Briefcase, 
  Users, 
  Building2, 
  HelpCircle, 
  Tag, 
  Search, 
  ArrowRight, 
  CheckCircle2,
  FolderTree,
  Edit
} from 'lucide-react';

const collectionsData = [
  { 
    key: 'collections:news', 
    name: 'Blogs & News', 
    type: 'Articles & News',
    count: '18 Entries',
    desc: 'Dynamic news articles, market insights, and press releases.',
    icon: FileText,
    lastUpdated: 'Today, 10:45 AM'
  },
  { 
    key: 'collections:services', 
    name: 'Insurance Products & Services', 
    type: 'Product Catalog',
    count: '12 Entries',
    desc: 'Repeatable service lines (General, Risk Management, Life, Reinsurance).',
    icon: Briefcase,
    lastUpdated: 'Yesterday'
  },
  { 
    key: 'collections:team', 
    name: 'Team & Leadership Profiles', 
    type: 'Personnel Directory',
    count: '8 Members',
    desc: 'Executive team profiles, designations, headshots, and bios.',
    icon: Users,
    lastUpdated: '3 days ago'
  },
  { 
    key: 'collections:industries', 
    name: 'Industries Served', 
    type: 'Sector Frameworks',
    count: '14 Sectors',
    desc: 'Specialized sector profiles (Manufacturing, Healthcare, Logistics).',
    icon: Building2,
    lastUpdated: 'Jul 18, 2026'
  },
  { 
    key: 'collections:faqItems', 
    name: 'FAQs & Knowledgebase', 
    type: 'Help & Q&A',
    count: '24 Questions',
    desc: 'Frequently asked questions organized by insurance service line.',
    icon: HelpCircle,
    lastUpdated: 'Jul 15, 2026'
  },
  { 
    key: 'collections:categories', 
    name: 'Categories & Taxonomies', 
    type: 'Reference Data',
    count: '10 Taxonomies',
    desc: 'Reference tags and category structures used sitewide.',
    icon: Tag,
    lastUpdated: 'Jul 12, 2026'
  },
];

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCollections = collectionsData.filter(col => 
    col.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    col.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    col.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="p-1.5 bg-[#00A3A0]/10 text-[#00A3A0] rounded-xl flex items-center justify-center">
              <FolderTree size={20} />
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Collections</h1>
          </div>
          <p className="text-xs md:text-sm font-medium text-gray-500 pl-0.5">
            Manage dynamic, repeatable content schemas across the platform.
          </p>
        </div>

        <div className="px-3.5 py-1.5 bg-teal-50 border border-teal-200/80 rounded-full text-xs font-bold text-[#00A3A0] flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#00A3A0] animate-pulse" />
          {collectionsData.length} Active Collections
        </div>
      </div>

      {/* Main Table Card (Exact match with Admin Dashboard Table design) */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
        {/* Table Header & Search Control */}
        <div className="px-6 py-3.5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900 text-sm md:text-base">CMS Content Collections</h3>
            <span className="px-2.5 py-0.5 bg-gray-200/70 text-gray-700 rounded-md text-xs font-semibold">
              {filteredCollections.length}
            </span>
          </div>

          <div className="relative w-full sm:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input 
              type="text"
              placeholder="Search collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs md:text-sm bg-white border border-gray-200 rounded-full text-gray-900 font-medium placeholder:text-gray-400 outline-none focus:outline-none focus:ring-0 focus:border-[#00A3A0] transition-colors"
            />
          </div>
        </div>

        {/* Clean Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="px-6 py-3.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Collection Name</th>
                <th className="px-6 py-3.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Content Type</th>
                <th className="px-6 py-3.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Entries</th>
                <th className="px-6 py-3.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-3.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">Option</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCollections.map((col, index) => {
                const Icon = col.icon || Database;
                return (
                  <tr key={col.key} className="hover:bg-gray-50/80 transition-colors group">
                    {/* Collection Name & Description */}
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#00A3A0] flex items-center justify-center font-bold text-xs shrink-0 border border-teal-100">
                          <Icon size={16} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm group-hover:text-[#00A3A0] transition-colors">
                            {col.name}
                          </p>
                          <p className="text-xs text-gray-500 font-normal">{col.desc}</p>
                        </div>
                      </div>
                    </td>

                    {/* Content Type */}
                    <td className="px-6 py-3.5 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-700">
                        {col.type}
                      </span>
                    </td>

                    {/* Entries Count */}
                    <td className="px-6 py-3.5 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-teal-50 text-[#00A3A0] border border-teal-200/60">
                        {col.count}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-3.5 text-center">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                        <CheckCircle2 size={12} className="text-emerald-600" />
                        Active
                      </span>
                    </td>

                    {/* Action Link */}
                    <td className="px-6 py-3.5 text-right">
                      <Link 
                        href={`/admin/editor/${encodeURIComponent(col.key)}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#00A3A0] hover:bg-[#008f8c] transition-colors shadow-2xs"
                      >
                        <Edit size={13} />
                        Manage
                      </Link>
                    </td>
                  </tr>
                );
              })}

              {filteredCollections.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium text-sm">
                    No matching collections found in the CMS schema.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
