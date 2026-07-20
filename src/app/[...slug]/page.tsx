import { getContent } from '@/services/contentService';
import { checkIsAdmin } from '@/lib/auth';
import { AdminEditOverlay } from '@/components/admin/AdminEditOverlay';
import { BlockRenderer, BlockData } from '@/components/cms/BlockRenderer';
import { notFound } from 'next/navigation';
import PageMetadata from '@/models/PageMetadata';
import dbConnect from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  await dbConnect();
  const resolvedParams = await params;
  const decodedSlug = resolvedParams.slug.map(s => decodeURIComponent(s));
  const fullPath = '/' + decodedSlug.join('/');
  const key = `page:${decodedSlug.join(':')}`;

  const page = await PageMetadata.findOne({ key }).lean();

  if (page) {
    return {
      title: `${page.title} | LMB Insurance Brokers`,
      description: `LMB Insurance Brokers - ${page.title}`
    };
  }

  return {
    title: 'LMB Insurance Brokers',
  };
}

export default async function DynamicCatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const decodedSlug = resolvedParams.slug.map(s => decodeURIComponent(s));
  const fullPath = '/' + decodedSlug.join('/');
  const key = `page:${decodedSlug.join(':')}`;

  const pageData = await getContent(key, null);
  const isAdmin = await checkIsAdmin();

  // If no content is found and it's not a known hardcoded page, throw 404
  if (!pageData || !pageData.blocks) {
    notFound();
  }

  const blocks: BlockData[] = pageData.blocks;

  return (
    <div className="min-h-screen bg-white relative z-0 selection:bg-[#115E59] selection:text-white">
      {/* Pad for header since these are generic pages without hardcoded Hero backgrounds */}
      <div className="pt-24 lg:pt-32">
        <BlockRenderer blocks={blocks} />
      </div>
      
      {isAdmin && <AdminEditOverlay pageKey={key} />}
    </div>
  );
}
