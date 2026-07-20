import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import PageMetadata from '@/models/PageMetadata';
import Content from '@/models/Content';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    
    // Disallow changing the key as it links to content
    delete body.key;

    const updatedPage = await PageMetadata.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!updatedPage) {
      return NextResponse.json({ success: false, error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedPage });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;

    const page = await PageMetadata.findById(id);
    if (!page) {
      return NextResponse.json({ success: false, error: 'Page not found' }, { status: 404 });
    }

    // Delete the metadata
    await PageMetadata.findByIdAndDelete(id);

    // Also delete the associated content if it exists
    await Content.findOneAndDelete({ key: page.key });

    return NextResponse.json({ success: true, message: 'Page and content deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
