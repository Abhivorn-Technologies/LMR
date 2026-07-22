import React from "react";
import { createPageMetadata } from "@/lib/metadata";
import { getContent } from "@/services/contentService";
import { BlockRenderer } from "@/components/cms/BlockRenderer";
import { riskManagementContent } from "@/lib/content/risk-management";

export const metadata = createPageMetadata({
  title: "Risk Management Solutions | LMB Insurance Brokers",
  description: "Helping businesses identify, assess, reduce, and manage risks before they become costly problems.",
  path: "/services/risk-management",
});

export const dynamic = 'force-dynamic';

export default async function RiskManagementPage() {
  const pageData = await getContent('/services/risk-management') || await getContent('page:services:risk-management');

  const blocks = pageData?.blocks?.length > 0 ? pageData.blocks : [
    { type: 'RiskManagementBlock', content: riskManagementContent }
  ];

  return (
    <main className="w-full">
      <BlockRenderer blocks={blocks} />
    </main>
  );
}
