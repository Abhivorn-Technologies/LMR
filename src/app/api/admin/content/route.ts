import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Content from '@/models/Content';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (key) {
      // Using .lean() to massively speed up JSON object fetching
      const content = await Content.findOne({ key }).lean();
      
      let data = content?.data || null;
      
      // Auto-migrate old flat home schema to new Block Builder schema
      if (key === '/' && data && !data.blocks) {
        data = {
          blocks: [
            { type: 'Hero', content: data },
            { type: 'StatsBar' },
            { type: 'ServicesPreview' },
            { type: 'RetailServicesPreview' },
            { type: 'IndustriesPreview' },
            { type: 'WhyPreview' },
            { type: 'TrustMockupPreview' },
            { type: 'CompanyLogosMarquee' }
          ]
        };
      }
      
      return NextResponse.json({ success: true, data });
    }

    const allContent = await Content.find({});
    return NextResponse.json({ success: true, data: allContent });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { key, data } = body;

    if (!key || data === undefined) {
      return NextResponse.json({ success: false, error: 'Key and data are required' }, { status: 400 });
    }

    const updatedContent = await Content.findOneAndUpdate(
      { key },
      { data },
      { new: true, upsert: true } // Create if doesn't exist
    );

    return NextResponse.json({ success: true, data: updatedContent });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
