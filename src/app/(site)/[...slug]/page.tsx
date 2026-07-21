import { getContent } from '@/services/contentService';
import { BlockRenderer, BlockData } from '@/components/cms/BlockRenderer';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  if (!resolvedParams?.slug) {
    return { title: 'LMB Insurance Brokers' };
  }
  const decodedSlug = resolvedParams.slug.map(s => decodeURIComponent(s));
  
  return {
    title: `${decodedSlug[decodedSlug.length - 1] || 'Page'} | LMB Insurance Brokers`,
  };
}

export default async function DynamicCatchAllPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  if (!resolvedParams?.slug) {
    notFound();
  }
  const decodedSlug = resolvedParams.slug.map(s => decodeURIComponent(s));
  const fullPath = '/' + decodedSlug.join('/');
  const key = `page:${decodedSlug.join(':')}`;

  const pageData = await getContent(key, null);

  // If no content is found and it's not a known hardcoded page, throw 404
  if (!pageData) {
    notFound();
  }

  // Sanity uses an array directly, whereas our old CMS used pageData.blocks
  const blocks: BlockData[] = Array.isArray(pageData) ? pageData : pageData.blocks || [];

  return (
    <div className="min-h-screen bg-white relative z-0 selection:bg-[#115E59] selection:text-white">
      {/* Pad for header since these are generic pages without hardcoded Hero backgrounds */}
      <div className="pt-24 lg:pt-32">
        <BlockRenderer blocks={blocks} />
      </div>
    </div>
  );
}
