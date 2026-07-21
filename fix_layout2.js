require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function fixDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const Content = mongoose.models.Content || mongoose.model('Content', new mongoose.Schema({}, { strict: false }));
    const docs = await Content.find({});
    
    let globalChanged = false;

    for (const doc of docs) {
      if (doc.data && doc.data.blocks) {
        let changed = false;
        
        const newBlocks = doc.data.blocks.map(b => {
          if (b.layout) {
            delete b.layout;
            changed = true;
          }
          if (b.content && b.content.layout) {
            delete b.content.layout;
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
          globalChanged = true;
        }
      }
    }
    
    if (!globalChanged) console.log('No layout properties found to remove.');
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
fixDB();
