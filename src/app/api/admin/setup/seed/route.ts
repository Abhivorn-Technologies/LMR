import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import PageMetadata from '@/models/PageMetadata';
import { mainNavigation, footerNavigation } from '@/lib/content/navigation';

export async function GET() {
  try {
    await dbConnect();
    
    // Clear all existing pages
    await PageMetadata.deleteMany({});
    
    const pagesToInsert: any[] = [];
    const addedKeys = new Set<string>();

    function addPage(title: string, category: string, key: string, icon = 'FileText', type = 'Page') {
      if (!addedKeys.has(key) && key && key !== '#') {
        pagesToInsert.push({ title, category, key, type, icon, status: 'Active' });
        addedKeys.add(key);
      }
    }

    // Process Main Navigation
    mainNavigation.forEach(item => {
      addPage(item.label, 'Main Navigation', item.href);
      if (item.children) {
        item.children.forEach(child => {
          addPage(child.label, item.label, child.href);
        });
      }
    });

    // Process Footer Quick Links
    footerNavigation.quickLinks.forEach(item => {
      addPage(item.label, 'Quick Links', item.href);
    });

    // Process Footer Services (General Insurance, Life Insurance, etc)
    footerNavigation.services.forEach((service: any) => {
      if (service.children) {
        service.children.forEach((subCategory: any) => {
          if (subCategory.children) {
            subCategory.children.forEach((page: any) => {
              // The category will be "General Insurance" or "Life Insurance"
              addPage(page.label, service.label, page.href, subCategory.icon || 'FileText');
            });
          } else {
            addPage(subCategory.label, service.label, subCategory.href, subCategory.icon || 'FileText');
          }
        });
      } else {
        addPage(service.label, 'Services', service.href, 'FileText');
      }
    });

    // Insert all into MongoDB
    await PageMetadata.insertMany(pagesToInsert);

    return NextResponse.json({ 
      success: true, 
      message: `Successfully synced ${pagesToInsert.length} pages to the database!`,
      data: pagesToInsert 
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
