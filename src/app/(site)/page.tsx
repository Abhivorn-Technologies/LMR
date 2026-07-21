// Components are now dynamically loaded by BlockRenderer
import { createPageMetadata } from "@/lib/metadata";
import { getContent } from "@/services/contentService";

export async function generateMetadata() {
  const siteConfig = await getContent('company:siteConfig', require('@/lib/content/company').siteConfig);
  return await createPageMetadata({
    title: "Home",
    description: siteConfig.description,
    path: "/",
  });
}

import { homeHeroContent } from '@/lib/content/home';
import { BlockRenderer, BlockData } from '@/components/cms/BlockRenderer';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const pageData = await getContent('home:hero', { content: homeHeroContent });

  // Safely upgrade old database entries that only had 'Hero' data
  let blocks: BlockData[] = pageData?.blocks;
  if (!blocks || !Array.isArray(blocks)) {
    blocks = [
      { type: 'Hero', content: pageData?.content || pageData || homeHeroContent },
      { type: 'StatsBar' },
      { type: 'ServicesPreview' },
      { type: 'RetailServicesPreview' },
      { type: 'IndustriesPreview' },
      { type: 'WhyPreview' },
      { type: 'TrustMockupPreview' },
      { type: 'CompanyLogosMarquee' }
    ];
  }

  return (
    <>
      <BlockRenderer blocks={blocks} />
    </>
  );
}
