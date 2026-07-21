require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function checkDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const Content = mongoose.models.Content || mongoose.model('Content', new mongoose.Schema({}, { strict: false }));
    const doc = await Content.findOne({ key: '/' });
    if (doc && doc.data && doc.data.blocks) {
      const index = doc.data.blocks.findIndex(b => b.type === 'WhyPreview');
      if (index !== -1) {
        doc.data.blocks[index].content = {
          title: 'Why choose LMB?',
          description: 'A composite broker\'s duty of care runs to you, the client — that changes everything.',
          points: [
            { title: 'Composite Broker', description: 'Single advisory relationship across general insurance, reinsurance, life insurance, and risk management.', icon: 'Shield' },
            { title: 'Licensed Operations', description: 'Regulated insurance broking practice operating within applicable IRDAI licensing requirements.', icon: 'FileText' },
            { title: 'Dedicated Advisory', description: 'Account-focused engagement — structured communication, documented recommendations, responsive service.', icon: 'Target' },
            { title: 'Market Access', description: 'Relationships with domestic and international insurers and reinsurers to secure competitive capacity.', icon: 'Globe' }
          ]
        };
        await Content.updateOne({ _id: doc._id }, { $set: { 'data.blocks': doc.data.blocks } });
        console.log('Updated WhyPreview content in DB to match screenshot.');
      }
    }
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}

checkDB();
