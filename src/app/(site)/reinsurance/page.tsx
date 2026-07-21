import React from "react";
import { createPageMetadata } from "@/lib/metadata";
import { getContent } from "@/services/contentService";
import { BlockRenderer } from "@/components/cms/BlockRenderer";

export const metadata = createPageMetadata({
  title: "Reinsurance",
  description:
    "Reinsurance advisory from LMB — treaty programs, facultative placement, retention strategy, and global market access.",
  path: "/reinsurance",
});

export const dynamic = 'force-dynamic';

import { reinsuranceContent } from '@/lib/content/pages';

export default async function ReinsurancePage() {
  const pageData = await getContent('/reinsurance');

  const blocks = pageData?.blocks?.length > 0 ? pageData.blocks : [
    { type: 'ReinsuranceBlock', content: reinsuranceContent }
  ];

  return (
    <main className="w-full">
      <BlockRenderer blocks={blocks} />
    </main>
  );
}
