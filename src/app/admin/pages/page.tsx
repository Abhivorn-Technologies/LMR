'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { 
  FileText, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Layers, 
  Loader2, 
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function SiteSectionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 5 records per page as requested

  const [sectionToDelete, setSectionToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Fetch live site sections from SWR
  const { data, isLoading, mutate } = useSWR('/api/admin/pages', fetcher, {
    revalidateOnFocus: false
  });

  const siteSections = data?.success && data?.data ? data.data : [];

  // Available categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    siteSections.forEach((s: any) => {
      if (s.category) set.add(s.category);
    });
    return ['All Categories', ...Array.from(set)];
  }, [siteSections]);

  // Filtered sections
  const filteredSections = useMemo(() => {
    return siteSections.filter((section: any) => {
      const matchesSearch = section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            section.key?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || section.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [siteSections, searchQuery, selectedCategory]);

  // Pagination calculation (5 records per page)
  const totalPages = Math.ceil(filteredSections.length / itemsPerPage) || 1;

  const paginatedSections = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSections.slice(start, start + itemsPerPage);
  }, [filteredSections, currentPage, itemsPerPage]);

  // Clean condensed pagination layout generator (1 2 3 ... 14)
  const paginationGroup = useCallback(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage, '...', totalPages];
  }, [totalPages, currentPage])();

  // Delete Section Handler
  const handleDeleteSection = async () => {
    if (!sectionToDelete) return;
    setIsDeleting(sectionToDelete);
    try {
      const res = await fetch(`/api/admin/pages?id=${sectionToDelete}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) {
        mutate({ success: true, data: siteSections.filter((s: any) => s._id !== sectionToDelete) }, false);
        toast.success('Section deleted successfully');
      } else {
        toast.error(result.error || 'Failed to delete section');
      }
    } catch (err) {
      toast.error('Error deleting section');
    } finally {
      setIsDeleting(null);
      setSectionToDelete(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="p-1.5 bg-[#00A3A0]/10 text-[#00A3A0] rounded-xl flex items-center justify-center">
              <Layers size={20} />
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Site Sections Directory</h1>
          </div>
          <p className="text-xs md:text-sm font-medium text-gray-500 pl-0.5">
            Browse and manage all website pages, service templates, and layout navigation schemas.
          </p>
        </div>

        <div className="px-3.5 py-1.5 bg-teal-50 border border-teal-200/80 rounded-full text-xs font-bold text-[#00A3A0] flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#00A3A0] animate-pulse" />
          {siteSections.length} Pages Listed
        </div>
      </div>

      {/* Main Table Container (Exact Dashboard UI Style) */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
        {/* Controls: Search & Category Filter Bar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50/50">
          <div className="relative w-full sm:w-80">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input 
              type="text"
              placeholder="Search sections or page paths..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-1.5 text-xs md:text-sm bg-white border border-gray-200 rounded-full text-gray-900 font-medium placeholder:text-gray-400 outline-none focus:outline-none focus:ring-0 focus:border-[#00A3A0] transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="relative w-full sm:w-48 shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                className="peer w-full appearance-none bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700 py-1.5 pl-3 pr-8 outline-none focus:border-[#00A3A0] cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none peer-focus:rotate-180 transition-transform duration-200" />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-48 gap-2">
              <Loader2 className="w-7 h-7 text-[#00A3A0] animate-spin" />
              <p className="text-xs font-semibold text-gray-500">Loading catalog records...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="px-6 py-3.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Section Title</th>
                  <th className="px-6 py-3.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Section Type</th>
                  <th className="px-6 py-3.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Category</th>
                  <th className="px-6 py-3.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                  <th className="px-6 py-3.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">Option</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedSections.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium text-sm">
                      No matching site sections found.
                    </td>
                  </tr>
                ) : (
                  paginatedSections.map((section: any, index: number) => {
                    const rowNumber = (currentPage - 1) * itemsPerPage + index + 1;
                    return (
                      <tr key={section._id || section.key} className="hover:bg-gray-50/80 transition-colors group">
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-gray-400 w-5">{rowNumber}</span>
                            <div>
                              <p className="font-bold text-gray-900 text-sm group-hover:text-[#00A3A0] transition-colors">
                                {section.title}
                              </p>
                              <p className="text-[11px] font-mono text-gray-400">{section.key}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-3.5 text-center">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-700">
                            <FileText size={12} className="mr-1 text-gray-500" />
                            {section.type || 'Page'}
                          </span>
                        </td>

                        <td className="px-6 py-3.5 text-center">
                          <span className="text-xs font-semibold text-gray-600">
                            {section.category || 'General'}
                          </span>
                        </td>

                        <td className="px-6 py-3.5 text-center">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                            <CheckCircle size={12} className="text-emerald-600" />
                            Active
                          </span>
                        </td>

                        <td className="px-6 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link 
                              href={`/admin/pages/editor?key=${encodeURIComponent(section.key)}`}
                              className="p-1.5 text-[#00A3A0] bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors border border-teal-200/60"
                              title="Open Visual Editor"
                            >
                              <Edit size={14} />
                            </Link>
                            <button 
                              onClick={() => setSectionToDelete(section._id)}
                              className="p-1.5 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200/60"
                              title="Delete Section"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Clean Footer Pagination Controls (Condensed 1 2 3 ... 14 layout) */}
        <div className="px-6 py-3.5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50/50">
          <span className="text-xs text-gray-500 font-semibold">
            Showing {filteredSections.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredSections.length)} of {filteredSections.length} records (5 per page)
          </span>

          <div className="flex items-center gap-1">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold transition-all"
            >
              <ChevronLeft size={15} />
            </button>

            {paginationGroup.map((item, i) => {
              if (item === '...') {
                return (
                  <button 
                    key={`dots-${i}`} 
                    onClick={() => {
                      if (i === 1) {
                        setCurrentPage(prev => Math.max(prev - 3, 1));
                      } else {
                        setCurrentPage(prev => Math.min(prev + 3, totalPages));
                      }
                    }}
                    className="px-1.5 text-xs font-bold text-gray-400 hover:text-[#00A3A0] transition-colors cursor-pointer"
                    title={i === 1 ? "Previous 3 Pages" : "Next 3 Pages"}
                  >
                    ...
                  </button>
                );
              }
              return (
                <button
                  key={`page-${item}`}
                  onClick={() => setCurrentPage(item as number)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${currentPage === item ? 'bg-[#00A3A0] text-white shadow-2xs' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                >
                  {item}
                </button>
              );
            })}

            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold transition-all"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {sectionToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2 bg-rose-50 rounded-xl">
                <AlertTriangle size={20} />
              </div>
              <h3 className="font-extrabold text-gray-900 text-base">Delete Section</h3>
            </div>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              Are you sure you want to delete this section? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button 
                onClick={() => setSectionToDelete(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteSection}
                disabled={isDeleting === sectionToDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
              >
                {isDeleting === sectionToDelete ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
