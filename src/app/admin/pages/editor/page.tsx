'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import JsonEditor from '@/components/admin/JsonEditor';
import { Save, ArrowLeft, AlertCircle, CheckCircle2, Loader2, Maximize2, Minimize2, RefreshCw } from 'lucide-react';
import Link from 'next/link';

// Import our hardcoded defaults
import { homeHeroContent } from '@/lib/content/home';
import { footerNavigation, mainNavigation } from '@/lib/content/navigation';
import { processSteps, whyLmbPoints, faqItems, reinsuranceContent } from '@/lib/content/pages';
import { aboutPageContent } from '@/lib/content/about';
import { riskManagementContent } from '@/lib/content/risk-management';
import { AVAILABLE_BLOCKS } from '@/components/admin/ComponentPicker';

const DEFAULTS: Record<string, any> = {
  '/': {
    blocks: [
      { 
        type: 'HomeBlock', 
        content: {
          hero: homeHeroContent,
          stats: {},
          services: {},
          retailServices: {},
          industries: {},
          why: {},
          trust: {},
          logos: {}
        }
      }
    ]
  },
  'nav:footer': footerNavigation,
  'nav:main': mainNavigation,
  '/reinsurance': {
    blocks: [
      {
        type: 'ReinsuranceBlock',
        content: reinsuranceContent
      }
    ]
  },
  '/about': {
    blocks: [
      {
        type: 'AboutBlock',
        content: aboutPageContent
      }
    ]
  },
  '/services/risk-management': {
    blocks: [
      {
        type: 'RiskManagementBlock',
        content: riskManagementContent
      }
    ]
  },
  'page:services:risk-management': {
    blocks: [
      {
        type: 'RiskManagementBlock',
        content: riskManagementContent
      }
    ]
  },
  '/contact': {
    blocks: [
      {
        type: 'ContactBlock',
        content: {
          title: "Speak with our",
          highlightTitle: "advisory team.",
          subtitle: "Submit an inquiry below and our expert team will respond promptly during business hours.",
          contactsTitle: "Key Contacts",
          contacts: [
            { name: "Sreevallabhan S", title: "Chairman and Managing Director", phone: "+91 9847424144", email: "cmd@lmbinsurancebroker.com" },
            { name: "Jayasree S", title: "Principal Officer", phone: "+91 9744341440", email: "jayasree@lmbinsurancebroker.com" },
            { name: "Viswanathan Krishnan", title: "Executive Director (Reinsurance)", phone: "+91 9820317748", email: "viswanathan@lmbinsurancebroker.com" },
            { name: "K. B. Vijayasherakan Nair", title: "Executive Director (Underwriting)", phone: "+91 9447731159", email: "kbv@lmbinsurancebroker.com" },
            { name: "Vijayakumar T", title: "Executive Director (Claims)", phone: "+91 9447552135", email: "vijayakumar@lmbinsurancebroker.com" },
            { name: "Thangaraj Koilpillai", title: "Executive Director (Reinsurance)", phone: "+91 9969341529", email: "thangaraj@lmbinsurancebroker.com" }
          ]
        }
      }
    ]
  },
  'list:process': processSteps,
  'list:why': whyLmbPoints,
  'list:faq': faqItems
};

// Map keys to their preview URLs
const PREVIEW_URLS: Record<string, string> = {
  '/': '/',
  'nav:footer': '/',
  'nav:main': '/',
  '/reinsurance': '/reinsurance',
  '/about': '/about',
  '/services/risk-management': '/services/risk-management',
  'page:services:risk-management': '/services/risk-management',
  'list:process': '/',
  'list:why': '/',
  'list:faq': '/'
};

import { productDatabase } from '@/lib/content/products';

function ContentEditorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const key = searchParams.get('key');
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{type: 'success'|'error', msg: string} | null>(null);
  const [previewWidth, setPreviewWidth] = useState<'desktop'|'mobile'|'tablet'>('desktop');
  const [focusedBlockIndex, setFocusedBlockIndex] = useState<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!key) return;

    const mergeDefaults = (sourceData: any) => {
      if (!sourceData || !sourceData.blocks) return sourceData;
      return {
        ...sourceData,
        blocks: sourceData.blocks.map((block: any) => {
          const defaultTemplate = AVAILABLE_BLOCKS.find(b => b.type === block.type)?.template;
          if (!defaultTemplate) return block;
          
          return {
            ...defaultTemplate,
            ...block,
            content: {
              ...(defaultTemplate.content || {}),
              ...(block.content || {})
            }
          };
        })
      };
    };

    const getDynamicDefault = (pageKey: string) => {
      // Key might be like "/services/general-insurance/car"
      // Remove leading slash for productDatabase lookup
      const slug = pageKey.startsWith('/') ? pageKey.slice(1) : pageKey;
      
      if (slug.startsWith('services/general-insurance/') || slug.startsWith('services/life-insurance/')) {
        // Find matching product in database
        const dbSlug = slug.replace('services/', '');
        const productData = (productDatabase as any)[dbSlug];
        
        if (productData) {
          return {
            blocks: [
              {
                type: 'PremiumProductLayoutBlock',
                content: { ...productData }
              }
            ]
          };
        }
        
        // Generic fallback for unknown product pages
        return {
          blocks: [
            {
              type: 'PremiumProductLayoutBlock',
              content: { title: slug.split('/').pop()?.replace(/-/g, ' ').toUpperCase() + ' Insurance' }
            }
          ]
        };
      }
      return null;
    };

    fetch(`/api/admin/content?key=${key}`)
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          setData(mergeDefaults(res.data));
        } else if (DEFAULTS[key]) {
          setData(mergeDefaults(DEFAULTS[key]));
        } else {
          const dynamicDefault = getDynamicDefault(key);
          if (dynamicDefault) {
             setData(mergeDefaults(dynamicDefault));
          } else {
              // Generic fallback to allow building ANY page from scratch!
              setData(mergeDefaults({
                blocks: []
              }));
            }
          }
        })
        .catch(err => {
          console.error(err);
          const dynamicDefault = getDynamicDefault(key);
          if (DEFAULTS[key]) {
            setData(mergeDefaults(DEFAULTS[key]));
          } else if (dynamicDefault) {
            setData(mergeDefaults(dynamicDefault));
          } else {
            setData(mergeDefaults({
              blocks: []
            }));
          }
        })
      .finally(() => setLoading(false));

    // Listen for live canvas updates from the iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'UPDATE_BLOCK_ITEM') {
        const { blockIndex, itemIndex, props } = event.data;
        setData((prev: any) => {
          if (!prev || !prev.blocks || !prev.blocks[blockIndex]) return prev;
          const newBlocks = [...prev.blocks];
          const block = { ...newBlocks[blockIndex] };
          const content = { ...block.content };
          const items = [...(content.items || [])];
          if (items[itemIndex]) items[itemIndex] = { ...items[itemIndex], ...props };
          content.items = items;
          block.content = content;
          newBlocks[blockIndex] = block;
          return { ...prev, blocks: newBlocks };
        });
      }
      
      if (event.data?.type === 'UPDATE_BLOCK_LAYOUT') {
        const { blockIndex, layout } = event.data;
        setData((prev: any) => {
          if (!prev || !prev.blocks || !prev.blocks[blockIndex]) return prev;
          const newBlocks = [...prev.blocks];
          const block = { ...newBlocks[blockIndex] };
          block.content = { ...block.content, layout };
          newBlocks[blockIndex] = block;
          return { ...prev, blocks: newBlocks };
        });
      }

      if (event.data?.type === 'UPDATE_BLOCK_CONTENT') {
        const { blockIndex, content } = event.data;
        setData((prev: any) => {
          if (!prev || !prev.blocks || !prev.blocks[blockIndex]) return prev;
          const newBlocks = [...prev.blocks];
          const block = { ...newBlocks[blockIndex] };
          // Merge the new inline-edited content over the existing content
          block.content = { ...block.content, ...content };
          newBlocks[blockIndex] = block;
          return { ...prev, blocks: newBlocks };
        });
      }

      if (event.data?.type === 'REORDER_BLOCKS') {
        const { oldIndex, newIndex } = event.data;
        setData((prev: any) => {
          if (!prev || !prev.blocks) return prev;
          const newBlocks = [...prev.blocks];
          const [movedBlock] = newBlocks.splice(oldIndex, 1);
          newBlocks.splice(newIndex, 0, movedBlock);
          return { ...prev, blocks: newBlocks };
        });
      }

      if (event.data?.type === 'FOCUS_BLOCK') {
        const index = event.data.blockIndex;
        // Briefly reset to null to force a state change even if clicking the same block
        setFocusedBlockIndex(null);
        setTimeout(() => {
          setFocusedBlockIndex(index);
        }, 10);
        
        // Broadcast back to the iframe to update all wrapper UI states
        if (iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage({
            type: 'SET_ACTIVE_BLOCK',
            blockIndex: index
          }, '*');
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [key]);

  // Record recently visited/edited pages in localStorage
  useEffect(() => {
    if (!key) return;
    try {
      const recentRaw = localStorage.getItem('lmb_recent_pages') || '[]';
      let recent = JSON.parse(recentRaw);
      recent = recent.filter((r: any) => r.key !== key);
      
      let title = key;
      if (key === '/') title = 'Home Page';
      else if (key === '/about') title = 'About Us';
      else if (key === '/services/risk-management') title = 'Risk Management Solutions';
      else if (key === '/reinsurance') title = 'Reinsurance Advisory';
      else if (key.startsWith('/services/')) {
        const parts = key.split('/');
        const lastPart = parts[parts.length - 1];
        title = lastPart.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }

      recent.unshift({
        key,
        title,
        timestamp: new Date().toISOString()
      });

      localStorage.setItem('lmb_recent_pages', JSON.stringify(recent.slice(0, 10)));
    } catch (e) {
      console.error('Error saving recent page', e);
    }
  }, [key]);

  // Live Preview Broadcaster: Send data to iframe whenever it changes!
  useEffect(() => {
    if (iframeRef.current?.contentWindow && data) {
      iframeRef.current.contentWindow.postMessage({
        type: 'PREVIEW_UPDATE',
        data: data
      }, '*');
    }
  }, [data]);

  // 2. Debounced Auto-save to persist changes to DB so refreshing won't restore deleted items
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (loading || !data || !key) return;
    
    // Skip initial load auto-save
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(async () => {
      try {
        await fetch('/api/admin/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key, data })
        });
      } catch (err) {
        console.error('Auto-save error:', err);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [data, key, loading]);

  const handleSave = async () => {
    if (!key || !data) return;
    
    setSaving(true);
    setStatus(null);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, data })
      });
      
      const result = await res.json();
      if (result.success) {
        setStatus({ type: 'success', msg: 'Changes saved successfully!' });
        setTimeout(() => setStatus(null), 3000);
        
        // Refresh the iframe to show live changes
        if (iframeRef.current) {
          iframeRef.current.src = iframeRef.current.src;
        }
      } else {
        throw new Error(result.error);
      }
    } catch (err: any) {
      setStatus({ type: 'error', msg: err.message || 'Failed to save changes' });
    } finally {
      setSaving(false);
    }
  };

  const getPreviewUrl = (k: string) => {
    if (!k) return '/';
    if (PREVIEW_URLS[k]) return PREVIEW_URLS[k];
    
    // If the key is a direct route path (like /contact), use it as the preview URL!
    if (k.startsWith('/')) return k;

    if (k.startsWith('page:')) {
      const parts = k.replace('page:', '').split(':');
      if (parts.length === 1) return `/${parts[0]}`; 
      if (parts[0] === 'gen') return `/general-insurance/${parts.slice(1).join('/')}`;
      if (parts[0] === 'life') return `/life-insurance/${parts.slice(1).join('/')}`;
      if (parts[0] === 'claims') return `/claims/${parts.slice(1).join('/')}`;
      return `/${parts.join('/')}`;
    }
    return '/';
  };

  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');

  const previewUrl = getPreviewUrl(key || '');

  if (!key) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
        <AlertCircle size={48} className="text-red-400 mb-4" />
        <h2 className="text-xl font-bold text-gray-800">No Content Key Provided</h2>
        <Link href="/admin" className="mt-4 text-[#00A3A0] hover:underline">Go back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      {/* Top Navbar */}
      <div className="flex-none flex items-center justify-between bg-white px-3 md:px-6 h-[60px] md:h-[72px] border-b border-gray-200 z-10 gap-2">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <Link href="/admin" className="flex-shrink-0 flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors" title="Back to Dashboard">
            <ArrowLeft size={18} />
          </Link>
          <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
          <div className="min-w-0">
            <h1 className="text-sm md:text-base font-bold text-gray-900 tracking-tight leading-tight truncate">Visual Editor</h1>
            <p className="text-[10px] md:text-xs text-gray-500 truncate w-full">{key}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          {/* Mobile Tab Switcher */}
          <div className="flex md:hidden bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-[11px] font-semibold">
            <button 
              onClick={() => setMobileTab('editor')}
              className={`px-2 py-1 rounded-md transition-all ${mobileTab === 'editor' ? 'bg-white text-[#00A3A0] shadow-2xs font-bold' : 'text-gray-600'}`}
            >
              Form
            </button>
            <button 
              onClick={() => setMobileTab('preview')}
              className={`px-2 py-1 rounded-md transition-all ${mobileTab === 'preview' ? 'bg-white text-[#00A3A0] shadow-2xs font-bold' : 'text-gray-600'}`}
            >
              Preview
            </button>
          </div>

          <div className="hidden md:flex items-center bg-gray-100/80 rounded-lg p-1 border border-gray-200/50">
            <button onClick={() => setPreviewWidth('mobile')} className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${previewWidth === 'mobile' ? 'bg-white shadow-2xs text-gray-900 font-bold' : 'text-gray-500'}`}>Mobile</button>
            <button onClick={() => setPreviewWidth('tablet')} className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${previewWidth === 'tablet' ? 'bg-white shadow-2xs text-gray-900 font-bold' : 'text-gray-500'}`}>Tablet</button>
            <button onClick={() => setPreviewWidth('desktop')} className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${previewWidth === 'desktop' ? 'bg-white shadow-2xs text-gray-900 font-bold' : 'text-gray-500'}`}>Desktop</button>
          </div>

          {status && (
            <div className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg ${status.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
              {status.type === 'success' ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
              {status.msg}
            </div>
          )}

          <button 
            onClick={handleSave}
            disabled={loading || saving}
            className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-[#00A3A0] hover:bg-[#008f8c] text-white text-[11px] md:text-xs font-bold rounded-lg shadow-2xs transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            <span className="hidden sm:inline">{saving ? 'Saving...' : 'Save'}</span>
            <span className="sm:hidden">{saving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0 relative">
        {/* Left Form Settings Panel */}
        <div className={`w-full md:w-[420px] flex-none bg-white border-r border-gray-200 overflow-y-auto relative ${mobileTab === 'preview' ? 'hidden md:block' : 'block'}`}>
          <div className="p-3.5 border-b border-gray-100 bg-gray-50/70 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
            <h3 className="font-extrabold text-gray-900 text-xs uppercase tracking-wider">Content Settings</h3>
          </div>
          
          <div className="p-4 pb-28">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-40">
                <Loader2 size={28} className="animate-spin text-[#00A3A0] mb-2" />
                <p className="text-gray-500 text-xs font-medium">Loading schema...</p>
              </div>
            ) : data?._error === 'not_found' ? (
              <div className="flex flex-col items-center justify-center h-64 text-center px-4">
                <AlertCircle size={40} className="text-red-400 mb-3" />
                <h3 className="text-base font-bold text-gray-800 mb-1">Page Not Found</h3>
                <p className="text-gray-500 text-xs">This page has not been created yet in the database.</p>
                <Link href="/admin/pages" className="mt-4 px-4 py-2 bg-[#00A3A0] text-white rounded-lg text-xs font-bold hover:bg-[#008f8c]">
                  Go to Site Sections Directory
                </Link>
              </div>
            ) : (
              <JsonEditor data={data} onChange={setData} focusedBlockIndex={focusedBlockIndex} />
            )}
          </div>
        </div>

        {/* Right Iframe Preview Panel */}
        <div className={`flex-1 bg-gray-100 overflow-hidden flex flex-col items-center p-2 sm:p-4 lg:p-6 ${mobileTab === 'editor' ? 'hidden md:flex' : 'flex'}`}>
          <div 
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out border border-gray-200 flex flex-col w-full"
            style={{ 
              maxWidth: previewWidth === 'mobile' ? '375px' : previewWidth === 'tablet' ? '768px' : '100%',
              height: '100%'
            }}
          >
            <iframe
              ref={iframeRef}
              src={previewUrl}
              className="w-full flex-1 border-0 bg-white"
              title="Live Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContentEditor() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-[#00A3A0]" size={32} /></div>}>
      <ContentEditorContent />
    </Suspense>
  );
}
