import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Content from '@/models/Content';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();
  
  const content = await Content.findOne({ key: 'page:Test Campaign' });
  if (content && content.data && content.data.blocks) {
    content.data.blocks = content.data.blocks.map((block: any) => {
      if (block.type === 'Hero page') block.type = 'Hero';
      if (block.type === '') block.type = 'RichTextBlock';
      return block;
    });
    content.markModified('data');
    await content.save();
  }
  
  return new NextResponse("Fixed DB!", { headers: { 'Content-Type': 'text/plain' }});
}
