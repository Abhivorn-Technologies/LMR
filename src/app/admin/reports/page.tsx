'use client';

import { useState } from 'react';
import { 
  FileText, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Clock, 
  Globe, 
  CheckCircle2, 
  Activity, 
  Calendar, 
  BarChart3, 
  ArrowUpRight, 
  Download, 
  Eye, 
  Zap, 
  AlertCircle,
  Filter
} from 'lucide-react';

export default function AdminReportsPage() {
  const [timeRange, setTimeRange] = useState<'30d' | '7d' | '90d'>('30d');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="p-2 bg-[#00A3A0]/10 text-[#00A3A0] rounded-xl flex items-center justify-center">
              <FileText size={22} />
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">CMS Reports Hub</h1>
          </div>
          <p className="text-sm font-medium text-slate-600 pl-0.5">
            Executive analytics, content performance, traffic distribution, and system health metrics.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button 
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 rounded-lg transition-all ${timeRange === '7d' ? 'bg-white text-[#00A3A0] shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              7 Days
            </button>
            <button 
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-lg transition-all ${timeRange === '30d' ? 'bg-white text-[#00A3A0] shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              30 Days
            </button>
            <button 
              onClick={() => setTimeRange('90d')}
              className={`px-3 py-1.5 rounded-lg transition-all ${timeRange === '90d' ? 'bg-white text-[#00A3A0] shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              90 Days
            </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-[#00A3A0] hover:bg-[#008f8c] text-white text-xs font-bold rounded-xl transition-colors shadow-xs">
            <Download size={14} /> Export Report
          </button>
        </div>
      </div>

      {/* Top 4 Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Visitors */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Visitors</span>
            <div className="w-8 h-8 rounded-xl bg-[#00A3A0]/10 text-[#00A3A0] flex items-center justify-center">
              <Globe size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">14,250</div>
            <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold mt-1">
              <ArrowUpRight size={14} /> +14.2% from last period
            </div>
          </div>
        </div>

        {/* Card 2: Engagement Duration */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Avg Session Duration</span>
            <div className="w-8 h-8 rounded-xl bg-[#00A3A0]/10 text-[#00A3A0] flex items-center justify-center">
              <Clock size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">4m 18s</div>
            <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold mt-1">
              <ArrowUpRight size={14} /> +8.5% retention
            </div>
          </div>
        </div>

        {/* Card 3: Bounce Rate */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Bounce Rate</span>
            <div className="w-8 h-8 rounded-xl bg-[#00A3A0]/10 text-[#00A3A0] flex items-center justify-center">
              <Activity size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">24.2%</div>
            <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold mt-1">
              <CheckCircle2 size={14} /> Optimal engagement
            </div>
          </div>
        </div>

        {/* Card 4: System Health */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">System Health</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-700">100% Uptime</div>
            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mt-1">
              0 Failed logins • 42ms API
            </div>
          </div>
        </div>
      </div>

      {/* Grid Section 1: Content Performance & Traffic Analytics */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Widget 1: Top Performing Pages */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Eye size={18} className="text-[#00A3A0]" />
              Content Performance
            </h3>
            <span className="text-xs font-bold text-slate-500">Top Pages</span>
          </div>

          <div className="p-6 space-y-4 flex-1">
            {[
              { title: 'General Insurance Advisory', path: '/services/general-insurance', views: '4,820', rate: '92%' },
              { title: 'Risk Management Solutions', path: '/services/risk-management', views: '3,210', rate: '88%' },
              { title: 'Life Insurance Employee Benefits', path: '/services/life-insurance', views: '2,940', rate: '85%' },
              { title: 'Claims Consultancy Services', path: '/services/claims', views: '1,890', rate: '79%' }
            ].map((page, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#00A3A0]/30 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-[#00A3A0]/10 text-[#00A3A0] font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{page.title}</p>
                    <p className="text-xs text-slate-400 font-mono">{page.path}</p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <span className="text-sm font-black text-[#00A3A0]">{page.views}</span>
                  <p className="text-[10px] font-bold text-slate-400">Score: {page.rate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 2: Traffic Sources & Geo Distribution */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Globe size={18} className="text-[#00A3A0]" />
              Traffic Sources & Geography
            </h3>
            <span className="text-xs font-bold text-slate-500">Distribution</span>
          </div>

          <div className="p-6 space-y-5 flex-1">
            {/* Source Progress Bars */}
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Traffic Channels</p>
              <div className="space-y-3">
                {[
                  { channel: 'Direct Traffic', pct: 42, color: 'bg-[#00A3A0]' },
                  { channel: 'Organic Search', pct: 35, color: 'bg-[#087371]' },
                  { channel: 'Social Media', pct: 15, color: 'bg-teal-400' },
                  { channel: 'Referrals & Affiliates', pct: 8, color: 'bg-slate-300' }
                ].map((src) => (
                  <div key={src.channel} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>{src.channel}</span>
                      <span>{src.pct}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${src.color} rounded-full`} style={{ width: `${src.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Geo Summary Pills */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-600">Top Regions:</span>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 bg-slate-100 rounded-lg font-bold text-slate-700">🇮🇳 India 68%</span>
                <span className="px-2.5 py-1 bg-slate-100 rounded-lg font-bold text-slate-700">🇦🇪 UAE 18%</span>
                <span className="px-2.5 py-1 bg-slate-100 rounded-lg font-bold text-slate-700">🇺🇸 US 14%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Section 2: Publishing Cadence & System Audit */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Widget 3: Publishing Cadence */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-[#00A3A0]/10 text-[#00A3A0] rounded-xl">
                <Calendar size={18} />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Publishing Cadence</h3>
            </div>
            <p className="text-xs text-slate-500 font-medium mb-4">Content production and draft backlog status.</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs font-bold text-slate-700">Published Pages</span>
              <span className="text-sm font-extrabold text-slate-900">49 Active</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs font-bold text-slate-700">Draft Backlog</span>
              <span className="text-sm font-extrabold text-[#00A3A0]">2 Pending</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs font-bold text-slate-700">Scheduled Release</span>
              <span className="text-sm font-extrabold text-emerald-600">Up-to-Date</span>
            </div>
          </div>
        </div>

        {/* Widget 4: User & Subscriber Activity */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-[#00A3A0]/10 text-[#00A3A0] rounded-xl">
                <Users size={18} />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">User Activity</h3>
            </div>
            <p className="text-xs text-slate-500 font-medium mb-4">Admin accounts and visitor inquiries.</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs font-bold text-slate-700">Admin Accounts</span>
              <span className="text-sm font-extrabold text-slate-900">2 Active</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs font-bold text-slate-700">Inquiry Submissions</span>
              <span className="text-sm font-extrabold text-[#00A3A0]">128 Inquiries</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs font-bold text-slate-700">Conversion Rate</span>
              <span className="text-sm font-extrabold text-emerald-600">18.4%</span>
            </div>
          </div>
        </div>

        {/* Widget 5: System Audit */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <Zap size={18} />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">System Audit</h3>
            </div>
            <p className="text-xs text-slate-500 font-medium mb-4">Security, API latency, and link checks.</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs font-bold text-slate-700">Broken Links</span>
              <span className="text-sm font-extrabold text-emerald-600">0 Errors</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs font-bold text-slate-700">Failed Login Attempts</span>
              <span className="text-sm font-extrabold text-emerald-600">0 Blocked</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs font-bold text-slate-700">Metadata Health</span>
              <span className="text-sm font-extrabold text-[#00A3A0]">98% Optimized</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
