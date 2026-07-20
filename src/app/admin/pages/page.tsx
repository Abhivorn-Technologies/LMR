import Link from 'next/link';
import { Plus, Edit, Trash2, CheckCircle, FileText, Grid, Image as ImageIcon, Settings, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export default function SiteSectionsPage() {
  const siteSections = [
    { id: 1, title: 'Home Page Hero', type: 'Page Section', icon: FileText, category: 'Home', status: 'Active', key: 'home:hero' },
    { id: 2, title: 'Footer Navigation', type: 'Global', icon: Settings, category: 'Layout', status: 'Active', key: 'nav:footer' },
    { id: 3, title: 'Main Navigation', type: 'Global', icon: Settings, category: 'Layout', status: 'Active', key: 'nav:main' },
    { id: 4, title: 'Reinsurance Page', type: 'Page', icon: FileText, category: 'Services', status: 'Active', key: 'page:reinsurance' },
    { id: 5, title: 'Our Process', type: 'List', icon: Grid, category: 'Components', status: 'Active', key: 'list:process' },
    { id: 6, title: 'Why Choose LMB', type: 'List', icon: Grid, category: 'Components', status: 'Active', key: 'list:why' },
    { id: 7, title: 'FAQ Items', type: 'List', icon: Grid, category: 'Components', status: 'Active', key: 'list:faq' },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Site Sections</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center">
            <Link href="/admin" className="hover:text-[#00A3A0] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-400">Webmaster</span>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">Site Sections</span>
          </p>
        </div>
        <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#00A3A0] hover:bg-[#008f8c] rounded-lg shadow-sm transition-colors group">
          <Plus className="w-4 h-4 mr-2" />
          New section
        </button>
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                <th className="py-5 px-6 w-12 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-[#00A3A0] focus:ring-[#00A3A0]" />
                </th>
                <th className="py-4 px-6">Section Title</th>
                <th className="py-4 px-6 text-center">Section type</th>
                <th className="py-4 px-6 text-center">Categories</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-center">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {siteSections.map((section, index) => (
                <tr key={section.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="py-5 px-6 text-center">
                    <input type="checkbox" className="rounded border-gray-300 text-[#00A3A0] focus:ring-[#00A3A0]" />
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-300 font-medium text-sm">{index + 1}</span>
                      <span className="font-semibold text-gray-800">{section.title}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-50 text-gray-500 border border-gray-100">
                      <section.icon className="w-3.5 h-3.5 mr-1.5 opacity-60" />
                      {section.type}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <span className="text-sm font-medium text-gray-500">{section.category}</span>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <CheckCircle className="w-5 h-5 text-[#00A3A0] mx-auto opacity-80" />
                  </td>
                  <td className="py-5 px-6 text-center">
                    <div className="flex items-center justify-center space-x-2 transition-opacity">
                      <Link href={`/admin/pages/editor?key=${section.key}`} className="p-1.5 text-[#00A3A0] bg-[#00A3A0]/10 hover:bg-[#00A3A0]/20 rounded-md transition-colors inline-block" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button className="p-1.5 text-[#00A3A0] bg-[#00A3A0]/10 hover:bg-[#00A3A0]/20 rounded-md transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer Actions & Pagination */}
        <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between bg-gray-50/50 gap-4">
          <div className="flex items-center space-x-3">
            <select className="text-sm font-medium border-gray-300 rounded-lg shadow-sm focus:border-[#00A3A0] focus:ring-1 focus:ring-[#00A3A0] outline-none pl-3 pr-8 py-2 bg-white text-gray-700">
              <option>Bulk action</option>
              <option>Delete selected</option>
            </select>
            <button className="px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:text-gray-900 transition-colors">
              Apply
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 font-medium mr-4 hidden md:inline-block">
              Showing 1-7 of 74 records
            </span>
            <nav className="flex items-center space-x-1">
              <button className="p-2 rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50 text-sm font-medium">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#00A3A0] text-white text-sm font-bold shadow-sm">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-[#00A3A0] text-sm font-medium transition-all">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-[#00A3A0] text-sm font-medium transition-all">3</button>
              <span className="text-gray-400 px-1 flex items-center justify-center">
                <MoreHorizontal className="w-4 h-4" />
              </span>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-[#00A3A0] text-sm font-medium transition-all">11</button>
              <button className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-[#00A3A0] bg-white text-sm font-medium transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
