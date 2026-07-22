'use client';

import { Settings, Globe, Phone, Building2, Menu, LayoutGrid, Sliders, CheckCircle2 } from 'lucide-react';

const globalsData = [
  { key: 'company:siteConfig', name: 'Site Configuration', desc: 'Basic info like site name, metadata, and branding', icon: Globe },
  { key: 'company:contactInfo', name: 'Contact Information', desc: 'Corporate phone, email, and address details', icon: Phone },
  { key: 'company:companyProfile', name: 'Company Profile', desc: 'Tagline, intro, mission, and vision statement', icon: Building2 },
  { key: 'navigation:mainNav', name: 'Main Navigation', desc: 'Header navigation links and mega menu layout', icon: Menu },
  { key: 'navigation:footerNav', name: 'Footer Navigation', desc: 'Footer links, columns, and categories', icon: LayoutGrid },
];

export default function GlobalsManagementPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-5">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="p-1.5 bg-[#00A3A0]/10 text-[#00A3A0] rounded-xl flex items-center justify-center">
              <Sliders size={20} />
            </span>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">Global Settings</h1>
          </div>
          <p className="text-xs md:text-sm font-medium text-slate-600 pl-0.5">
            Overview of sitewide configurations, contact details, and site navigation.
          </p>
        </div>

        <div className="px-3.5 py-1.5 bg-[#00A3A0]/10 border border-[#00A3A0]/20 rounded-full text-xs font-bold text-[#00A3A0] flex items-center gap-2 shrink-0 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#00A3A0] animate-pulse" />
          {globalsData.length} Global Modules
        </div>
      </div>

      {/* Cards Container - Centered Flex Layout */}
      <div className="flex flex-wrap justify-center gap-5">
        {globalsData.map((setting) => {
          const IconComp = setting.icon || Settings;
          return (
            <div 
              key={setting.key} 
              className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] flex"
            >
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between w-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-[#00A3A0]/30 group">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#00A3A0]/10 text-[#00A3A0] flex items-center justify-center group-hover:bg-[#00A3A0] group-hover:text-white transition-colors duration-300 shrink-0">
                      <IconComp className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-sm md:text-base group-hover:text-[#00A3A0] transition-colors">
                      {setting.name}
                    </h3>
                  </div>

                  <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed mb-3">
                    {setting.desc}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <div className="inline-flex items-center gap-1.5 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                    <CheckCircle2 size={11} className="text-emerald-600" />
                    <span>Configured</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[10px]">System Module</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
