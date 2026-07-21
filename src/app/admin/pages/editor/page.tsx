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
import { AVAILABLE_BLOCKS } from '@/components/admin/ComponentPicker';

const DEFAULTS: Record<string, any> = {
  '/': {
    blocks: [
      { type: 'Hero', content: homeHeroContent },
      { type: 'StatsBar' },
      { type: 'ServicesPreview' },
      { type: 'RetailServicesPreview' },
      { type: 'IndustriesPreview' },
      { type: 'WhyPreview' },
      { type: 'TrustMockupPreview' },
      { type: 'CompanyLogosMarquee' }
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
               blocks: [
                 { 
                   type: 'HeadingBlock', 
                   content: { 
                     title: key === '/' ? 'Home' : (key.split('/').pop()?.replace(/-/g, ' ').toUpperCase() || 'New Page'), 
                     subtitle: 'Start building your page here.' 
                   } 
                 }
               ]
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
            blocks: [{ type: 'HeadingBlock', content: { title: 'New Page' } }]
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
      <div className="flex-none flex items-center justify-between bg-white px-6 py-3 border-b border-gray-200 shadow-sm z-10">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">Visual Editor</h1>
            <p className="text-xs text-[#00A3A0] font-mono">{key}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 rounded-lg p-1 mr-4">
            <button onClick={() => setPreviewWidth('mobile')} className={`p-1.5 rounded-md text-sm ${previewWidth === 'mobile' ? 'bg-white shadow-sm font-bold text-gray-900' : 'text-gray-500'}`}>Mobile</button>
            <button onClick={() => setPreviewWidth('tablet')} className={`p-1.5 rounded-md text-sm ${previewWidth === 'tablet' ? 'bg-white shadow-sm font-bold text-gray-900' : 'text-gray-500'}`}>Tablet</button>
            <button onClick={() => setPreviewWidth('desktop')} className={`p-1.5 rounded-md text-sm ${previewWidth === 'desktop' ? 'bg-white shadow-sm font-bold text-gray-900' : 'text-gray-500'}`}>Desktop</button>
          </div>

          {status && (
            <div className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg ${status.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
              {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {status.msg}
            </div>
          )}
          <button 
            onClick={handleSave}
            disabled={loading || saving}
            className="flex items-center gap-2 px-6 py-2 bg-[#00A3A0] hover:bg-[#008f8c] text-white font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving...' : 'Save to Live Site'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0">
        <div className="w-[450px] flex-none bg-white border-r border-gray-200 overflow-y-auto relative">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
            <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">Content Settings</h3>
          </div>
          
          <div className="p-5 pb-32">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-40">
                <Loader2 size={32} className="animate-spin text-[#00A3A0] mb-3" />
                <p className="text-gray-500 text-sm font-medium">Loading schema...</p>
              </div>
            ) : data?._error === 'not_found' ? (
              <div className="flex flex-col items-center justify-center h-64 text-center px-4">
                <AlertCircle size={48} className="text-red-400 mb-4" />
                <h3 className="text-lg font-bold text-gray-800 mb-2">Page Not Found</h3>
                <p className="text-gray-500 text-sm">This page has not been created yet in the database. Please use the "New Page" creator first.</p>
                <Link href="/admin/pages/new" className="mt-6 px-4 py-2 bg-[#00A3A0] text-white rounded-lg text-sm font-semibold hover:bg-[#008f8c]">
                  Go to New Page Creator
                </Link>
              </div>
            ) : (
              <JsonEditor data={data} onChange={setData} focusedBlockIndex={focusedBlockIndex} />
            )}
          </div>
        </div>

        <div className="flex-1 bg-gray-100 overflow-hidden flex flex-col items-center justify-center p-4">
          <div 
            className="bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out border border-gray-200 flex flex-col relative group"
            style={{ 
              width: previewWidth === 'mobile' ? '375px' : previewWidth === 'tablet' ? '768px' : '100%',
              height: '100%'
            }}
          >
            {/* Outline highlight indicating WYSIWYG Mode */}
            <div className="absolute inset-0 border-4 border-[#00A3A0]/20 pointer-events-none z-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-start justify-end p-2">
               <span className="bg-[#00A3A0] text-white text-xs font-bold px-2 py-1 rounded shadow">WYSIWYG CANVAS ACTIVE</span>
            </div>

            <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-2 flex-none">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <div className="mx-auto bg-white px-4 py-1 rounded text-xs text-gray-500 border border-gray-200 flex items-center gap-2">
                <span className="opacity-50">https://lmb-insurance.com</span>{previewUrl}
              </div>
              <button onClick={() => { if(iframeRef.current) iframeRef.current.src = iframeRef.current.src; }} className="p-1 hover:bg-gray-200 rounded text-gray-500">
                <RefreshCw size={14} />
              </button>
            </div>
            
            <iframe
              ref={iframeRef}
              src={previewUrl}
              className="w-full flex-1 border-0"
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
