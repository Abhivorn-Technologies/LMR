require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function fixDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const Content = mongoose.models.Content || mongoose.model('Content', new mongoose.Schema({}, { strict: false }));
    const docs = await Content.find({});
    
    for (const doc of docs) {
      if (doc.data && doc.data.blocks) {
        let changed = false;
        
        // Remove layout from all blocks
        const newBlocks = doc.data.blocks.map(b => {
          if (b.layout) {
            delete b.layout;
            changed = true;
          }
          return b;
        });

        if (changed) {
          await Content.updateOne(
            { _id: doc._id }, 
            { $set: { 'data.blocks': newBlocks } }
          );
          console.log('Removed layout from blocks in ' + doc.key);
        }
      }
    }
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
fixDB();
