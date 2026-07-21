require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function fixStatsDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const Content = mongoose.models.Content || mongoose.model('Content', new mongoose.Schema({}, { strict: false }));
    const doc = await Content.findOne({ key: '/' });
    
    if (doc && doc.data && doc.data.blocks) {
      const blocks = doc.data.blocks;
      const index = blocks.findIndex(b => b.type === 'StatsBar' || b.type === 'statsBarBlock');
      
      if (index !== -1) {
        // Force the stats to have exactly the 3 requested items
        blocks[index].content = {
          ...blocks[index].content,
          stats: [
            { value: '500+', label: 'Clients Served' },
            { value: '200+', label: 'Cumulative Experience' },
            { value: '2003', label: 'First IRDAI License' }
          ]
        };
        
        await Content.updateOne({ _id: doc._id }, { $set: { 'data.blocks': blocks } });
        console.log('Fixed StatsBar block successfully with 3 stats.');
      } else {
        console.log('StatsBar block not found.');
      }
    }
    
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}

fixStatsDB();
