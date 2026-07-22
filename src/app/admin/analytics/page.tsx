'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  Smartphone, 
  Monitor, 
  Tablet, 
  ArrowUpRight, 
  CheckCircle2, 
  Eye, 
  Clock, 
  Target
} from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [filterPeriod, setFilterPeriod] = useState<'month' | 'quarter' | 'year'>('month');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Executive Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Analytics & Insights</h1>
            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-md text-xs font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              24 Active Visitors
            </span>
          </div>
          <p className="text-sm text-gray-500 font-normal">
            Real-time traffic metrics, user engagement rates, device breakdown, and lead conversions.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="inline-flex bg-gray-100 p-1 rounded-lg border border-gray-200/80 text-xs font-medium text-gray-600">
            <button 
              onClick={() => setFilterPeriod('month')}
              className={`px-3.5 py-1.5 rounded-md transition-all ${filterPeriod === 'month' ? 'bg-white text-gray-900 shadow-2xs font-semibold' : 'hover:text-gray-900'}`}
            >
              Month
            </button>
            <button 
              onClick={() => setFilterPeriod('quarter')}
              className={`px-3.5 py-1.5 rounded-md transition-all ${filterPeriod === 'quarter' ? 'bg-white text-gray-900 shadow-2xs font-semibold' : 'hover:text-gray-900'}`}
            >
              Quarter
            </button>
            <button 
              onClick={() => setFilterPeriod('year')}
              className={`px-3.5 py-1.5 rounded-md transition-all ${filterPeriod === 'year' ? 'bg-white text-gray-900 shadow-2xs font-semibold' : 'hover:text-gray-900'}`}
            >
              Year
            </button>
          </div>
        </div>
      </div>

      {/* Metric Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            <span>Total Pageviews</span>
            <Eye size={16} className="text-[#00A3A0]" />
          </div>
          <div className="text-2xl font-bold text-gray-900">48,290</div>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium mt-2">
            <ArrowUpRight size={14} /> +18.4% monthly growth
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            <span>Engagement Rate</span>
            <TrendingUp size={16} className="text-[#00A3A0]" />
          </div>
          <div className="text-2xl font-bold text-gray-900">64.2%</div>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium mt-2">
            <ArrowUpRight size={14} /> High content interaction
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            <span>Avg Time on Page</span>
            <Clock size={16} className="text-[#00A3A0]" />
          </div>
          <div className="text-2xl font-bold text-gray-900">3m 45s</div>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium mt-2">
            <CheckCircle2 size={14} /> +12s vs benchmark
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            <span>Inquiries Generated</span>
            <Target size={16} className="text-[#00A3A0]" />
          </div>
          <div className="text-2xl font-bold text-gray-900">142 Leads</div>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium mt-2">
            <ArrowUpRight size={14} /> +22 new this week
          </div>
        </div>
      </div>

      {/* Main Grid: Traffic Channels & Audience Devices */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Traffic Channels Cards */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <h3 className="font-bold text-gray-900 text-base">Traffic Channels Breakdown</h3>
              <p className="text-xs text-gray-500 font-normal">Real-time source analytics and view distribution.</p>
            </div>
            <span className="text-xs font-semibold text-[#00A3A0]">Active Channel Feed</span>
          </div>

          <div className="p-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { source: 'Organic Search', count: '16,901 views', pct: 35, color: 'bg-[#00A3A0]' },
                { source: 'Direct Visits', count: '20,281 views', pct: 42, color: 'bg-[#087371]' },
                { source: 'Social Media', count: '7,243 views', pct: 15, color: 'bg-teal-400' },
                { source: 'Partner Referrals', count: '3,865 views', pct: 8, color: 'bg-gray-300' },
              ].map((item) => (
                <div key={item.source} className="p-4 rounded-xl bg-gray-50/80 border border-gray-100 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-900">
                    <span>{item.source}</span>
                    <span className="text-[#00A3A0]">{item.pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200/60 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                  <p className="text-[11px] font-medium text-gray-500">{item.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Device Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-base mb-1">Audience Devices</h3>
            <p className="text-xs text-gray-500 font-normal mb-5">Visitor hardware & browser split.</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                  <span className="flex items-center gap-2">
                    <Smartphone size={14} className="text-[#00A3A0]" /> Mobile Browsers
                  </span>
                  <span className="font-bold text-gray-900">58%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00A3A0] rounded-full" style={{ width: '58%' }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                  <span className="flex items-center gap-2">
                    <Monitor size={14} className="text-[#087371]" /> Desktop Systems
                  </span>
                  <span className="font-bold text-gray-900">38%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#087371] rounded-full" style={{ width: '38%' }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                  <span className="flex items-center gap-2">
                    <Tablet size={14} className="text-teal-400" /> Tablets & Other
                  </span>
                  <span className="font-bold text-gray-900">4%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-400 rounded-full" style={{ width: '4%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-6 text-xs text-gray-500 font-medium">
            Optimal mobile responsiveness rating: <span className="font-bold text-emerald-600">100%</span>
          </div>
        </div>
      </div>

      {/* Top Content Leaderboard Table */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h3 className="font-bold text-gray-900 text-base">Top Performing Content</h3>
            <p className="text-xs text-gray-500 font-normal">Page rankings by views, engagement time, and lead conversions.</p>
          </div>
          <span className="text-xs font-semibold text-[#00A3A0]">Monthly Conversion Rank</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase tracking-wider text-gray-500 font-semibold bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 font-medium">Page Title</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Total Views</th>
                <th className="px-6 py-3 font-medium">Avg Duration</th>
                <th className="px-6 py-3 font-medium">Conversions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {[
                { title: 'General Insurance Solutions', cat: 'Services', views: '18,420', time: '4m 12s', leads: '54 Leads' },
                { title: 'Risk Management Services', cat: 'Solutions', views: '12,310', time: '3m 50s', leads: '38 Leads' },
                { title: 'Reinsurance Advisory', cat: 'Reinsurance', views: '9,840', time: '4m 05s', leads: '26 Leads' },
                { title: 'Claims Handling & Support', cat: 'Claims', views: '5,120', time: '3m 15s', leads: '16 Leads' },
                { title: 'About LMB Insurance Brokers', cat: 'Corporate', views: '2,600', time: '2m 30s', leads: '8 Leads' }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-6 py-3.5 font-semibold text-gray-900">{row.title}</td>
                  <td className="px-6 py-3.5">
                    <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                      {row.cat}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 font-bold text-gray-900">{row.views}</td>
                  <td className="px-6 py-3.5 font-medium text-gray-600">{row.time}</td>
                  <td className="px-6 py-3.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-md text-xs font-semibold">
                      {row.leads}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
