import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import PageMetadata from '@/models/PageMetadata';
import Content from '@/models/Content';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { title, slug, parentNav } = body;

    if (!title || !slug) {
      return NextResponse.json({ success: false, error: 'Title and Slug are required' }, { status: 400 });
    }

    // Format the slug and key
    const formattedSlug = slug.startsWith('/') ? slug : `/${slug}`;
    const key = `page:${formattedSlug.replace(/^\//, '').replace(/\//g, ':')}`;

    // 1. Create PageMetadata
    const existingMeta = await PageMetadata.findOne({ key });
    if (existingMeta) {
      return NextResponse.json({ success: false, error: 'A page with this slug already exists' }, { status: 400 });
    }

    await PageMetadata.create({
      title,
      type: 'Page',
      category: parentNav || 'Custom Pages',
      icon: 'FileText',
      status: 'Active',
      key
    });

    // 2. Create initial blank Blocks Content
    const initialContent = {
      blocks: [
        { 
          type: 'Hero', 
          content: { 
            title: title, 
            description: 'Start building your new page here!' 
          } 
        }
      ]
    };

    await Content.create({
      key,
      data: initialContent
    });

    // 3. Inject into Navigation Menu if requested
    if (parentNav && parentNav !== 'None') {
      const navMainKey = 'nav:main';
      const navDoc = await Content.findOne({ key: navMainKey });
      
      if (navDoc && navDoc.data) {
        let navArray = Array.isArray(navDoc.data) ? navDoc.data : [];
        
        // Find the parent by label (e.g., 'About Us')
        const parentIndex = navArray.findIndex((n: any) => n.label === parentNav || n.name === parentNav);
        
        if (parentIndex !== -1) {
          // If the parent doesn't have children yet, create it
          if (!navArray[parentIndex].children) {
             // Not a mega menu yet, but we will place it immediately AFTER the parent in the main nav for simplicity,
             // or turn it into a dropdown if the schema supports it.
             // Given the current Header code, it expects specific structures.
             // For simplicity, we just insert it right after the parent in the top level.
             navArray.splice(parentIndex + 1, 0, { name: title, path: formattedSlug, label: title, href: formattedSlug });
          } else {
             // It's a mega menu (like General Insurance), add to children
             navArray[parentIndex].children.push({ label: title, href: formattedSlug, path: formattedSlug, name: title });
          }
        } else {
          // If parent not found, just append to main nav
          navArray.push({ label: title, href: formattedSlug, name: title, path: formattedSlug });
        }
        
        navDoc.data = navArray;
        navDoc.markModified('data');
        await navDoc.save();
      }
    }

    return NextResponse.json({ success: true, key, url: formattedSlug });
  } catch (error: any) {
    console.error('Error creating page:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
