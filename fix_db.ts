import dbConnect from './src/lib/db';
import Content from './src/models/Content';

async function fixDb() {
  await dbConnect();
  
  // Find all content under /services/ that have an empty blocks array
  const contents = await Content.find({ key: { $regex: '^/services/' } });
  
  let deletedCount = 0;
  for (const c of contents) {
    if (c.data && Array.isArray(c.data.blocks) && c.data.blocks.length === 0) {
      await Content.deleteOne({ _id: c._id });
      console.log(`Deleted empty page from DB: ${c.key}`);
      deletedCount++;
    }
  }

  console.log(`Done! Deleted ${deletedCount} empty pages.`);
  process.exit(0);
}

fixDb();
