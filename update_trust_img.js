require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function updateTrustImage() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const Content = mongoose.models.Content || mongoose.model('Content', new mongoose.Schema({}, { strict: false }));
    const doc = await Content.findOne({ key: '/' });
    
    if (doc && doc.data && doc.data.blocks) {
      const blocks = doc.data.blocks;
      const index = blocks.findIndex(b => b.type === 'TrustMockupPreview' || b.type === 'trustMockupPreviewBlock');
      
      if (index !== -1) {
        blocks[index].content = {
          ...blocks[index].content,
          imageSrc: '/assets/family_insurance_protection.png'
        };
        
        await Content.updateOne({ _id: doc._id }, { $set: { 'data.blocks': blocks } });
        console.log('Updated TrustMockupPreview image to family_insurance_protection.png');
      } else {
        console.log('TrustMockupPreview block not found.');
      }
    }
    
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}

updateTrustImage();
