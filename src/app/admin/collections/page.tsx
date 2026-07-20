'use client';

import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import Link from 'next/link';
import { ArrowRight, Database } from 'lucide-react';

const collections = [
  { key: 'collections:industries', name: 'Industries', desc: 'List of industries served' },
  { key: 'collections:faqItems', name: 'FAQs', desc: 'Frequently asked questions' },
  { key: 'collections:services', name: 'Services', desc: 'All services and sub-services' },
];

export default function CollectionsPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <SectionHeading 
        title="Collections Management" 
        description="Manage dynamic arrays of data like services, industries, and FAQs." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => (
          <Link key={col.key} href={`/admin/editor/${encodeURIComponent(col.key)}`}>
            <Card className="p-6 hover:shadow-lg transition-shadow bg-white h-full flex flex-col cursor-pointer group">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900">{col.name}</h3>
              </div>
              <p className="text-sm text-gray-500 flex-1">{col.desc}</p>
              <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                Edit Collection <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
