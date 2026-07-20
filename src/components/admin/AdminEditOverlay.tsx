'use client';
import { Edit3 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function AdminEditOverlay({ pageKey }: { pageKey: string }) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch and prevent rendering inside the editor iframe
  useEffect(() => {
    if (window === window.top) {
      setMounted(true);
    }
  }, []);

  if (!mounted) return null;

  return (
    <Link 
      href={`/admin/pages/editor?key=${pageKey}`}
      className="fixed bottom-6 right-6 z-[9999] bg-[#00A3A0] hover:bg-[#008f8c] text-white px-5 py-3.5 rounded-full shadow-2xl shadow-[#00A3A0]/40 flex items-center gap-2 font-bold transition-all hover:scale-105 active:scale-95 group border-2 border-white/20 hover:border-white/40"
    >
      <Edit3 size={18} className="group-hover:-rotate-12 transition-transform" />
      Customize Page
    </Link>
  );
}
