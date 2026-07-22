'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Loader2, 
  Image as ImageIcon, 
  FileText, 
  FolderTree,
  AlertCircle,
  Eye,
  Tag,
  AlignLeft,
  Calendar,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface CollectionItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  imageUrl: string;
  status: 'Active' | 'Draft';
  updatedAt: string;
}

export default function CollectionEditorPage({ params }: { params: Promise<{ key: string }> }) {
  const router = useRouter();
  const { key } = use(params);
  const decodedKey = decodeURIComponent(key);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // List of items in this collection
  const [items, setItems] = useState<CollectionItem[]>([]);
  // Currently editing item index (-1 for new)
  const [editingIndex, setEditingIndex] = useState<number>(0);
  
  // Form State
  const [formData, setFormData] = useState<CollectionItem>({
    id: '1',
    title: '',
    category: 'General',
    summary: '',
    description: '',
    imageUrl: '/assets/image6.jpeg',
    status: 'Active',
    updatedAt: new Date().toISOString().split('T')[0]
  });

  // Fetch existing collection content from MongoDB
  useEffect(() => {
    fetchData();
  }, [decodedKey]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/admin/content?key=${encodeURIComponent(decodedKey)}`);
      const json = await res.json();
      
      if (json.success && json.data?.items && Array.isArray(json.data.items) && json.data.items.length > 0) {
        setItems(json.data.items);
        setFormData(json.data.items[0]);
      } else {
        // Default sample collection items based on schema key
        const sampleItems = getSampleItems(decodedKey);
        setItems(sampleItems);
        setFormData(sampleItems[0]);
      }
    } catch (err: any) {
      toast.error('Failed to load collection data');
    } finally {
      setLoading(false);
    }
  };

  const getSampleItems = (schemaKey: string): CollectionItem[] => {
    if (schemaKey.includes('news') || schemaKey.includes('blogs')) {
      return [
        {
          id: '1',
          title: 'Strategic Corporate Risk Mitigation Guide 2026',
          category: 'Industry Insights',
          summary: 'Comprehensive analysis on managing enterprise vulnerabilities in fluctuating market conditions.',
          description: 'Managing risk is key to corporate longevity. Our expert advisory framework helps identify potential liabilities before they impact profit margins...',
          imageUrl: '/assets/image6.jpeg',
          status: 'Active',
          updatedAt: '2026-07-22'
        },
        {
          id: '2',
          title: 'Employee Benefits & Group Life Insurance Trends',
          category: 'Corporate Health',
          summary: 'Why modern enterprises are upgrading group life policies to attract top executive talent.',
          description: 'Group life insurance provides security for your workforce while enhancing overall employee retention...',
          imageUrl: '/assets/image5.jpeg',
          status: 'Active',
          updatedAt: '2026-07-20'
        }
      ];
    }

    if (schemaKey.includes('services')) {
      return [
        {
          id: '1',
          title: 'Commercial General Insurance Advisory',
          category: 'Corporate Protection',
          summary: 'Tailored property, liability, and asset coverage for medium and large enterprises.',
          description: 'Our commercial general insurance policy covers physical assets, business interruption, and general third-party liability claims...',
          imageUrl: '/assets/image1.jpeg',
          status: 'Active',
          updatedAt: '2026-07-21'
        },
        {
          id: '2',
          title: 'Enterprise Risk Engineering & Audit',
          category: 'Risk Management',
          summary: 'On-site structural risk audits and operational safety consulting for complex industries.',
          description: 'Our risk engineers conduct on-site inspections to lower insurance premiums and mitigate industrial hazards...',
          imageUrl: '/assets/image6.jpeg',
          status: 'Active',
          updatedAt: '2026-07-19'
        }
      ];
    }

    // Default sample
    return [
      {
        id: '1',
        title: 'Primary Corporate Advisory Entry',
        category: 'Main',
        summary: 'Default collection record for sitewide data management.',
        description: 'Detailed description of this dynamic entry. Use the form on the left to edit all fields visually.',
        imageUrl: '/assets/image6.jpeg',
        status: 'Active',
        updatedAt: '2026-07-22'
      }
    ];
  };

  const handleSelectItem = (index: number) => {
    setEditingIndex(index);
    setFormData(items[index]);
  };

  const handleAddNewItem = () => {
    const newItem: CollectionItem = {
      id: Date.now().toString(),
      title: 'New Entry Title',
      category: 'General',
      summary: 'Enter a brief summary for this record...',
      description: 'Enter detailed content here...',
      imageUrl: '/assets/image6.jpeg',
      status: 'Active',
      updatedAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newItem, ...items];
    setItems(updated);
    setEditingIndex(0);
    setFormData(newItem);
  };

  const handleDeleteItem = (indexToDelete: number) => {
    if (items.length <= 1) {
      toast.error('Collection must contain at least one item');
      return;
    }
    const updated = items.filter((_, idx) => idx !== indexToDelete);
    setItems(updated);
    const newIdx = Math.max(0, indexToDelete - 1);
    setEditingIndex(newIdx);
    setFormData(updated[newIdx]);
    toast.success('Entry removed');
  };

  const handleFormChange = (field: keyof CollectionItem, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    // Sync with items array
    if (editingIndex >= 0 && editingIndex < items.length) {
      const copy = [...items];
      copy[editingIndex] = updated;
      setItems(copy);
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: decodedKey,
          data: { items }
        })
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to save');

      toast.success('Collection updated successfully! Live website updated.');
    } catch (err: any) {
      toast.error(err.message || 'Error saving collection');
    } finally {
      setSaving(false);
    }
  };

  // Format schema name for header
  const formatSchemaTitle = (rawKey: string) => {
    const clean = rawKey.replace('collections:', '').replace('company:', '');
    return clean.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-[#00A3A0] animate-spin mb-4" />
        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Loading Collection Data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Executive Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/collections"
            className="w-10 h-10 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 rounded-xl transition-all flex items-center justify-center shadow-sm shrink-0"
            title="Back to Collections"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                Manage {formatSchemaTitle(decodedKey)}
              </h1>
              <span className="px-3 py-1 bg-[#00A3A0]/10 text-[#00A3A0] rounded-full text-[11px] font-black uppercase tracking-wider border border-[#00A3A0]/20 hidden sm:block">
                Visual Form Schema
              </span>
            </div>
            <p className="text-sm text-gray-500 font-medium mt-1">
              Add, edit, or remove structured entries for <code className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">{decodedKey}</code>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={handleAddNewItem}
            className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-xl transition-all flex items-center gap-2 shadow-sm"
          >
            <Plus size={18} strokeWidth={2.5} /> Add New Entry
          </button>
          <button 
            onClick={handleSaveAll}
            disabled={saving}
            className="px-6 py-2.5 bg-[#00A3A0] hover:bg-[#008f8c] text-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-70"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} strokeWidth={2.5} />}
            {saving ? 'Saving...' : 'Save Collection'}
          </button>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column (4 Cols): Items List Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest flex items-center gap-2">
              <FolderTree size={16} className="text-[#00A3A0]" />
              Collection Entries ({items.length})
            </h3>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            <style dangerouslySetInnerHTML={{__html: `
              .custom-scrollbar::-webkit-scrollbar { width: 6px; }
              .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
              .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
            `}} />
            
            <AnimatePresence>
              {items.map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={item.id || idx}
                  onClick={() => handleSelectItem(idx)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col gap-2 group ${
                    editingIndex === idx 
                      ? 'bg-teal-50/50 border-[#00A3A0] shadow-sm' 
                      : 'bg-white border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold truncate transition-colors ${editingIndex === idx ? 'text-[#00A3A0]' : 'text-gray-900 group-hover:text-gray-900'}`}>
                        {item.title || 'Untitled Entry'}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                          <Tag size={10} /> {item.category || 'Uncategorized'}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          item.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {item.status === 'Active' ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                          {item.status}
                        </span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDeleteItem(idx); }}
                      className={`p-1.5 rounded-lg transition-all ${
                        editingIndex === idx 
                          ? 'text-rose-500 hover:bg-rose-100' 
                          : 'text-gray-300 hover:text-rose-500 hover:bg-rose-50 lg:opacity-0 group-hover:opacity-100'
                      }`}
                      title="Remove Entry"
                    >
                      <Trash2 size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column (8 Cols): Admin Visual Form Inputs */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          
          <div className="bg-gray-50/80 px-4 md:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-black text-gray-900 text-base md:text-lg flex items-center gap-2 truncate">
              <EditIcon /> Editing: <span className="text-[#00A3A0] ml-1 truncate">{formData.title || 'Untitled Entry'}</span>
            </h3>
            <div className="flex items-center gap-2 shrink-0">
               <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                 <Activity size={14} /> Form Active
               </span>
            </div>
          </div>

          {/* Form Content Area */}
          <div className="p-4 md:p-8 space-y-6 md:space-y-8 bg-white">
            
            {/* Title & Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-bold text-gray-700 text-xs md:text-sm uppercase tracking-wider">
                  <FileText size={16} className="text-[#00A3A0]" /> Entry Title
                </label>
                <input 
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  placeholder="e.g. Risk Management Solutions"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-gray-900 font-bold outline-none focus:border-[#00A3A0] focus:bg-white transition-all text-sm shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 font-bold text-gray-700 text-xs md:text-sm uppercase tracking-wider">
                  <Tag size={16} className="text-[#00A3A0]" /> Category / Group
                </label>
                <input 
                  type="text"
                  value={formData.category || ''}
                  onChange={(e) => handleFormChange('category', e.target.value)}
                  placeholder="e.g. Services, Corporate"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-gray-900 font-bold outline-none focus:border-[#00A3A0] focus:bg-white transition-all text-sm shadow-sm"
                />
              </div>
            </div>

            {/* Image URL & Live Preview */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-bold text-gray-700 text-xs md:text-sm uppercase tracking-wider">
                  <ImageIcon size={16} className="text-[#00A3A0]" /> Cover Image Asset URL
                </label>
                <input 
                  type="text"
                  value={formData.imageUrl || ''}
                  onChange={(e) => handleFormChange('imageUrl', e.target.value)}
                  placeholder="e.g. /assets/image6.jpeg or https://example.com/image.png"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-gray-900 font-bold outline-none focus:border-[#00A3A0] focus:bg-white transition-all text-sm shadow-sm"
                />
              </div>
              
              {/* Image Preview Box */}
              {formData.imageUrl && (
                <div className="w-full rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-2 overflow-hidden flex items-center justify-center relative min-h-[150px] md:min-h-[200px] max-h-[300px]">
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    className="w-full h-full object-contain rounded-lg max-h-[280px]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmMDRiIiAvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSI1IiBmaWxsPSIjOTQ5OThmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjMiPklWQUxJRCBJTUFHRSBVUkw8L3RleHQ+PC9zdmc+';
                    }}
                  />
                  <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 px-2.5 py-1.5 md:px-3 md:py-1.5 bg-black/70 backdrop-blur-md rounded-lg text-white text-[10px] md:text-xs font-bold shadow-lg flex items-center gap-1.5 md:gap-2">
                    <Eye size={12} className="md:w-3.5 md:h-3.5" /> Live Preview
                  </div>
                </div>
              )}
            </div>

            {/* Brief Summary */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 font-bold text-gray-700 text-xs md:text-sm uppercase tracking-wider">
                <AlignLeft size={16} className="text-[#00A3A0]" /> Short Excerpt / Summary
              </label>
              <textarea 
                rows={2}
                value={formData.summary || ''}
                onChange={(e) => handleFormChange('summary', e.target.value)}
                placeholder="Brief intro for cards and list previews..."
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-gray-900 font-medium outline-none focus:border-[#00A3A0] focus:bg-white transition-all text-sm shadow-sm resize-none"
              />
            </div>

            {/* Full Body Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 font-bold text-gray-700 text-xs md:text-sm uppercase tracking-wider">
                <FileText size={16} className="text-[#00A3A0]" /> Detailed Content Description
              </label>
              <textarea 
                rows={6}
                value={formData.description || ''}
                onChange={(e) => handleFormChange('description', e.target.value)}
                placeholder="Full article or product description body text..."
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-gray-900 font-medium outline-none focus:border-[#00A3A0] focus:bg-white transition-all text-sm shadow-sm"
              />
            </div>

            {/* Status & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 pt-4 border-t border-gray-100">
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-bold text-gray-700 text-xs md:text-sm uppercase tracking-wider">
                  <Activity size={16} className="text-[#00A3A0]" /> Publication Status
                </label>
                <div className="relative">
                  <select
                    value={formData.status || 'Active'}
                    onChange={(e) => handleFormChange('status', e.target.value)}
                    className="peer w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-gray-900 font-bold outline-none focus:border-[#00A3A0] focus:bg-white transition-all text-sm shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="Active">Active & Published</option>
                    <option value="Draft">Draft (Hidden)</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none peer-focus:rotate-180 transition-transform duration-200">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 font-bold text-gray-700 text-xs md:text-sm uppercase tracking-wider">
                  <Calendar size={16} className="text-[#00A3A0]" /> Last Updated Date
                </label>
                <input 
                  type="date"
                  value={formData.updatedAt || ''}
                  onChange={(e) => handleFormChange('updatedAt', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-gray-900 font-bold outline-none focus:border-[#00A3A0] focus:bg-white transition-all text-sm shadow-sm cursor-text"
                />
              </div>
            </div>
            
            {/* Mobile Save Button */}
            <div className="pt-6 sm:hidden border-t border-gray-100">
               <button 
                 onClick={handleSaveAll}
                 disabled={saving}
                 className="w-full px-6 py-3.5 bg-[#00A3A0] hover:bg-[#008f8c] text-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
               >
                 {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} strokeWidth={2.5} />}
                 {saving ? 'Saving...' : 'Save Collection'}
               </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

// Just an icon wrapper since Edit isn't imported from lucide-react in the current block
function EditIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#00A3A0] shrink-0">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 Z"></path>
    </svg>
  );
}
