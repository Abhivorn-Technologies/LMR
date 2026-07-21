'use client';

import { ArrowUpRight, CheckCircle2, FileText, Settings, Grid, Edit, Trash2, Search, ChevronLeft, ChevronRight, ChevronDown, MoreHorizontal, Plus, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useMemo, useCallback } from 'react';
import useSWR from 'swr';

// Icon mapper helper
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Settings': return Settings;
    case 'Grid': return Grid;
    default: return FileText;
  }
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function AdminDashboardHome() {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // New Section Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newSection, setNewSection] = useState({
    title: '', category: 'Life Insurance', type: 'Page', key: ''
  });

  // Fetch using SWR for memoization and caching
  const { data, error, isLoading, mutate } = useSWR('/api/admin/pages', fetcher, {
    revalidateOnFocus: false
  });
  
  const siteSections = data?.success && data?.data ? data.data : [];

  // Reset to page 1 whenever search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Handle Add New Section
  const handleSaveNewSection = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSection)
      });
      const data = await res.json();
      if (data.success) {
        mutate({ success: true, data: [data.data, ...siteSections] }, false);
        setIsModalOpen(false);
        setNewSection({ title: '', category: 'Life Insurance', type: 'Page', key: '' });
      } else {
        alert(data.error || 'Failed to create section');
      }
    } catch (err) {
      alert('An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete Section
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this page?')) return;
    
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/admin/pages/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        mutate({ success: true, data: siteSections.filter((s: any) => s._id !== id) }, false);
      }
    } catch (err) {
      alert('Failed to delete');
    } finally {
      setIsDeleting(null);
    }
  };

  // Memoized Filter logic
  const filteredSections = useMemo(() => {
    return siteSections.filter((section: any) => {
      const matchesSearch = section.title.toLowerCase().includes(searchQuery.toLowerCase()) || section.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || section.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [siteSections, searchQuery, selectedCategory]);

  // Memoized Pagination variables
  const totalPages = useMemo(() => Math.ceil(filteredSections.length / itemsPerPage), [filteredSections.length, itemsPerPage]);
  
  const currentSections = useMemo(() => {
    return filteredSections.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredSections, currentPage, itemsPerPage]);

  // Memoized Pagination layout generator
  const getPaginationGroup = useCallback(() => {
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
  }, [totalPages, currentPage]);

  return (
    <div className="space-y-6 max-w-full relative">
      
      {/* New Section Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Section</h2>
            
            <form onSubmit={handleSaveNewSection} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input required type="text" value={newSection.title} onChange={e => setNewSection({...newSection, title: e.target.value})} className="w-full px-4 py-2 border rounded-xl focus:ring-[#00A3A0] focus:border-[#00A3A0]" placeholder="e.g. Pet Insurance" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input required type="text" value={newSection.category} onChange={e => setNewSection({...newSection, category: e.target.value})} className="w-full px-4 py-2 border rounded-xl focus:ring-[#00A3A0] focus:border-[#00A3A0]" placeholder="e.g. About Us, General Insurance, etc." />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select required value={newSection.type} onChange={e => setNewSection({...newSection, type: e.target.value})} className="w-full px-4 py-2 border rounded-xl focus:ring-[#00A3A0] focus:border-[#00A3A0]">
                  <option value="Page">Page</option>
                  <option value="Tool">Tool</option>
                  <option value="List">List</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unique Key</label>
                <input required type="text" value={newSection.key} onChange={e => setNewSection({...newSection, key: e.target.value})} className="w-full px-4 py-2 border rounded-xl focus:ring-[#00A3A0] focus:border-[#00A3A0]" placeholder="e.g. page:gen:pet" />
                <p className="text-xs text-gray-500 mt-1">This connects the metadata to the actual JSON content.</p>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-5 py-2 bg-[#00A3A0] text-white font-medium rounded-xl hover:bg-[#008f8c] transition-colors flex items-center gap-2">
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isSaving ? 'Saving...' : 'Create Section'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search & Filter Area */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#00A3A0]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-100 rounded-2xl leading-5 bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#00A3A0] focus:ring-4 focus:ring-[#00A3A0]/10 sm:text-sm transition-all text-gray-900 font-medium"
            placeholder="Search through live MongoDB database..."
          />
        </div>
        <div className="relative w-full md:w-[240px]">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none block w-full pl-4 pr-10 py-3.5 text-sm font-semibold border-2 border-gray-100 focus:outline-none focus:ring-4 focus:ring-[#00A3A0]/10 focus:border-[#00A3A0] rounded-2xl bg-gray-50/50 text-gray-700 cursor-pointer hover:bg-white transition-colors"
          >
            <option value="All Categories">All Categories</option>
            {Array.from(new Set(siteSections.map((s: any) => s.category))).sort().map((cat: any) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Manage Content</h2>
            <p className="text-sm text-gray-500 mt-1 font-medium">Select a section to edit its content.</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center justify-center px-5 py-2.5 bg-[#00A3A0] text-white text-sm font-semibold rounded-xl hover:bg-[#008f8c] hover:shadow-md hover:shadow-[#00A3A0]/20 transition-all duration-200 gap-2">
            <Plus className="w-4 h-4" />
            <span>New section</span>
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-x-auto custom-scrollbar">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-3">
              <Loader2 className="w-8 h-8 text-[#00A3A0] animate-spin" />
              <p className="text-gray-500 font-medium">Loading live database...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-12">
                    <input type="checkbox" className="rounded text-[#00A3A0] focus:ring-[#00A3A0] border-gray-300 w-4 h-4" />
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Section Title</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Section Type</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Categories</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Options</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {currentSections.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-16 text-center text-gray-500 font-medium">
                      No matching pages found in the database.
                    </td>
                  </tr>
                ) : (
                  currentSections.map((section: any, index: number) => {
                    const Icon = getIcon(section.icon);
                    return (
                      <tr key={section._id} className="hover:bg-gray-50/80 transition-colors group">
                        <td className="px-8 py-5">
                          <input type="checkbox" className="rounded text-[#00A3A0] focus:ring-[#00A3A0] border-gray-300 w-4 h-4" />
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <span className="text-gray-300 font-bold text-sm w-4">{(currentPage - 1) * itemsPerPage + index + 1}</span>
                            <span className="font-bold text-gray-900">{section.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex justify-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-[#00A3A0]/10 text-[#00A3A0] gap-1.5 border border-[#00A3A0]/20">
                              <Icon className="w-3.5 h-3.5" />
                              {section.type}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="text-sm font-medium text-gray-500">{section.category}</span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex justify-center">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-2 transition-opacity">
                            <Link href={`/admin/pages/editor?key=${section.key}`}>
                              <button className="p-2 text-[#00A3A0] hover:bg-[#00A3A0]/10 rounded-lg transition-colors" title="Edit">
                                <Edit className="w-4 h-4" />
                              </button>
                            </Link>
                            <button 
                              onClick={() => handleDelete(section._id)}
                              disabled={isDeleting === section._id}
                              className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50" 
                              title="Delete"
                            >
                              {isDeleting === section._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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

        {/* Dynamic Pagination Footer */}
        <div className="px-8 py-5 border-t border-gray-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <select className="border-gray-200 rounded-xl text-sm font-medium text-gray-700 py-2 pl-3 pr-8 focus:ring-[#00A3A0] focus:border-[#00A3A0]">
              <option>Bulk action</option>
              <option>Delete selected</option>
            </select>
            <button className="px-4 py-2 text-sm font-bold text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              Apply
            </button>
          </div>
          
          <div className="flex items-center gap-6">
            <p className="text-sm font-medium text-gray-500">
              Showing {currentSections.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
              {Math.min(currentPage * itemsPerPage, filteredSections.length)} of {filteredSections.length} records
            </p>
            
            <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-2xl border border-gray-100">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1 || totalPages === 0}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-1 px-2">
                {getPaginationGroup().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' ? setCurrentPage(page) : null}
                    disabled={page === '...'}
                    className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
                      page === currentPage 
                        ? 'bg-[#00A3A0] text-white shadow-md shadow-[#00A3A0]/20' 
                        : page === '...'
                          ? 'text-gray-400 cursor-default'
                          : 'text-gray-600 hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
