'use client';

import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import Link from 'next/link';
import { ArrowRight, Settings } from 'lucide-react';

const globalsData = [
  { key: 'company:siteConfig', name: 'Site Configuration', desc: 'Basic info like site name and description' },
  { key: 'company:contactInfo', name: 'Contact Information', desc: 'Phone, email, and address' },
  { key: 'company:companyProfile', name: 'Company Profile', desc: 'Tagline, intro, mission, and vision' },
  { key: 'navigation:mainNav', name: 'Main Navigation', desc: 'Header navigation links' },
  { key: 'navigation:footerNav', name: 'Footer Navigation', desc: 'Footer links and categories' },
];

export default function GlobalsManagementPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <SectionHeading 
        title="Global Settings" 
        description="Manage sitewide configurations, contact details, and navigation." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {globalsData.map((setting) => (
          <Link key={setting.key} href={`/admin/editor/${encodeURIComponent(setting.key)}`}>
            <Card className="p-6 hover:shadow-lg transition-shadow bg-white h-full flex flex-col cursor-pointer group">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Settings className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900">{setting.name}</h3>
              </div>
              <p className="text-sm text-gray-500 flex-1">{setting.desc}</p>
              <div className="mt-4 flex items-center text-sm font-medium text-purple-600">
                Edit Settings <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
