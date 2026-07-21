import React from "react";
import { createPageMetadata } from "@/lib/metadata";
import { getContent } from "@/services/contentService";
import { BlockRenderer } from "@/components/cms/BlockRenderer";

export const metadata = createPageMetadata({
  title: "About Us | LMB Insurance Brokers",
  description: "Learn about LMB Insurance Brokers, our legacy, team, and commitment to excellence.",
  path: "/about",
});

export const dynamic = 'force-dynamic';

import { aboutPageContent } from '@/lib/content/about';

export default async function AboutPage() {
  const pageData = await getContent('/about');

  const blocks = pageData?.blocks?.length > 0 ? pageData.blocks : [
    { type: 'AboutBlock', content: aboutPageContent }
  ];

  return (
    <main className="w-full">
      <BlockRenderer blocks={blocks} />
    </main>
  );
}
