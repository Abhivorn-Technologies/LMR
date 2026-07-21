import mongoose from 'mongoose';
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import PageMetadata from './src/models/PageMetadata';
import Content from './src/models/Content';

// Setup Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'i39g5mh0', // Need to check sanity config for real ID if not in env
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // WARNING: Must provide a write token
  apiVersion: '2024-01-01',
});

async function run() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('ERROR: SANITY_API_TOKEN is not set in .env.local');
    console.error('You need to create a token at https://manage.sanity.io with Write access.');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI!);
  console.log('Connected to MongoDB...');

  const pages = await PageMetadata.find({}).lean();
  console.log(`Found ${pages.length} pages in MongoDB. Starting migration...`);

  let success = 0;
  for (const page of pages) {
    try {
      const content = await Content.findOne({ key: page.key }).lean();
      
      // Convert MongoDB block structure to Sanity block structure
      const sanityBlocks = [];
      if (content?.data?.blocks) {
        for (const block of content.data.blocks) {
          // Flatten content into root and add _type and _key
          let blockType = block.type.charAt(0).toLowerCase() + block.type.slice(1);
          if (!blockType.endsWith('Block')) {
            blockType += 'Block';
          }
          const sanityBlock = {
            _type: blockType, // e.g. Hero -> heroBlock, HeadingBlock -> headingBlock
            _key: Math.random().toString(36).substring(7),
            ...block.content
          };
          
          // Special fixes for specific blocks
          if (sanityBlock._type === 'servicesPreviewBlock') {
            // Need to remove deep nested objects or convert properly if they don't match exactly
          }
          sanityBlocks.push(sanityBlock);
        }
      }

      // Convert page key e.g. "page:home" -> "home"
      const slugValue = page.key.split(':').pop()?.trim() || page.title.toLowerCase().replace(/ /g, '-');
      
      const sanityDoc = {
        _type: 'page',
        _id: `page-${page._id.toString()}`,
        title: page.title,
        slug: { current: slugValue },
        content: sanityBlocks
      };

      console.log(`Migrating page: ${page.title} (${page.key})`);
      await client.createOrReplace(sanityDoc);
      success++;
    } catch (err) {
      console.error(`Error migrating ${page.title}:`, err);
    }
  }

  console.log(`Migration complete! Successfully migrated ${success}/${pages.length} pages.`);
  process.exit(0);
}
run();
