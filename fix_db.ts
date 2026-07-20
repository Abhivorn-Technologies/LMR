import dbConnect from './src/lib/db';
import Content from './src/models/Content';

async function fixDb() {
  await dbConnect();
  
  const content = await Content.findOne({ key: 'page:Test Campaign' });
  if (content && content.data && content.data.blocks) {
    let modified = false;
    content.data.blocks = content.data.blocks.map((block: any) => {
      if (block.type === 'Hero page') {
        block.type = 'Hero';
        modified = true;
      }
      return block;
    });
    
    if (modified) {
      content.markModified('data');
      await content.save();
      console.log('Fixed block type in DB!');
    }
  }

  process.exit(0);
}

fixDb();
