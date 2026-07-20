import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import PageMetadata from '@/models/PageMetadata';

export async function GET() {
  try {
    await dbConnect();
    // Using .lean() for massive performance boost since we only need JSON
    const pages = await PageMetadata.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: pages });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { title, category, key, type = 'Page', status = 'Active', icon = 'FileText' } = body;

    if (!title || !category || !key) {
      return NextResponse.json({ success: false, error: 'Title, category, and key are required' }, { status: 400 });
    }

    // Check if key already exists
    const existing = await PageMetadata.findOne({ key });
    if (existing) {
      return NextResponse.json({ success: false, error: 'A page with this key already exists' }, { status: 400 });
    }

    const newPage = await PageMetadata.create({
      title,
      category,
      key,
      type,
      status,
      icon
    });

    return NextResponse.json({ success: true, data: newPage }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
