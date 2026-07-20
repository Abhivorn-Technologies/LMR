'use client'; // Force recompile

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/content/company';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Settings,
  FileText,
  Users,
  LogOut,
  Image as ImageIcon,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  Plus
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Site Sections', href: '/admin/pages', icon: FileText },
  { name: 'Collections', href: '/admin/collections', icon: Users },
  { name: 'Media', href: '/admin/media', icon: ImageIcon },
  { name: 'Global Settings', href: '/admin/globals', icon: Settings },
  { name: 'Admins', href: '/admin/users', icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const isEditor = pathname.includes('/admin/pages/editor');

  if (isEditor) {
    return (
      <div className="min-h-screen bg-[#f8fafc] font-sans">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8fafc]">
      {/* Top Navbar Full Width (BharatJobs exact layout structure) */}
      <header className="h-[76px] bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 z-50">
        {/* Left Side: Logo Area */}
        <div className="flex items-center justify-center md:justify-start md:pl-2 md:w-[236px]">
          <button className="md:hidden mr-4 text-gray-500 hover:text-gray-700" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/admin" className="relative h-16 w-[200px] hidden md:block">
            <Image src={siteConfig.logo} alt={siteConfig.name} fill sizes="200px" className="object-contain object-center pointer-events-none scale-[1.5] origin-center" priority />
          </Link>
        </div>

        {/* Right Side: Actions */}
        <div className="flex flex-1 items-center justify-end space-x-5">
          <button className="relative p-2.5 bg-white rounded-full text-gray-400 hover:text-gray-600 shadow-sm border border-gray-100 transition-colors">
            <Bell className="w-[18px] h-[18px]" />
          </button>
          <Link href="/admin/pages/new" className="hidden sm:flex items-center justify-center px-6 py-2.5 bg-[#00A3A0] hover:bg-[#008f8c] text-white font-semibold rounded-lg shadow-sm transition-colors group text-sm">
            <Plus className="w-4 h-4 mr-2" />
            New Page
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar - Starts BELOW Navbar now */}
        <div className={`
          absolute md:static inset-y-0 left-0 z-40 w-[260px] bg-white transform transition-transform duration-300 ease-in-out flex flex-col
          ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
          md:translate-x-0 md:shadow-none border-r border-gray-100
        `}>
          {/* Mobile Logo inside Sidebar */}
          <div className="flex md:hidden items-center h-[76px] px-6 border-b border-gray-100 shrink-0">
            <Link href="/admin" className="relative h-12 w-[160px]">
              <Image src={siteConfig.logo} alt={siteConfig.name} fill className="object-contain object-left pointer-events-none scale-[1.3] origin-left" priority />
            </Link>
            <button className="ml-auto text-gray-400 hover:text-gray-600" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-4 py-3 rounded-xl transition-all duration-200 group font-medium text-sm mb-1.5
                    ${isActive
                      ? 'bg-[#00A3A0]/10 text-[#00A3A0]'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                >
                  <item.icon className={`w-[18px] h-[18px] mr-3 transition-colors ${isActive ? 'text-[#00A3A0]' : 'text-gray-400 group-hover:text-gray-500'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer Area - User Profile (Fixed to bottom with mt-auto) */}
          <div className="p-4 mt-auto">
            <div className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm border border-gray-100/50">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[#00A3A0]/10 text-[#00A3A0] flex items-center justify-center font-bold text-sm">
                  A
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">Admin User</p>
                  <p className="text-[11px] text-gray-500">LMB Insurance</p>
                </div>
              </div>
              <button onClick={handleLogout} className="p-1 text-gray-400 hover:text-gray-700 transition-colors" title="Logout">
                <LogOut className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Main content - Removed max-w constraint to fix horizontal dead space */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#f8fafc]">
          {children}
        </main>
      </div>
    </div>
  );
}
