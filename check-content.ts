import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'i39g5mh0',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function run() {
  const page = await client.fetch(`*[_type == "page" && slug.current == "home"][0]`);
  console.log("Title:", page?.title);
  console.log("Content Length:", page?.content?.length || 0);
  console.log("Content Preview:", JSON.stringify(page?.content).substring(0, 500));
}
run();
