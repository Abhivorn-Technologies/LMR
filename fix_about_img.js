require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function fixAboutImage() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const Content = mongoose.models.Content || mongoose.model('Content', new mongoose.Schema({}, { strict: false }));
    const doc = await Content.findOne({ key: '/about' });
    
    if (doc && doc.data && doc.data.blocks) {
      let updated = false;
      doc.data.blocks.forEach(b => {
        if (b.type === 'AboutBlock' || b.type === 'aboutBlock') {
          if (b.content && b.content.hero && b.content.hero.image === '/uploads/1784638006632-cyb.jpeg') {
            b.content.hero.image = '/assets/minimal_corporate_architecture_1783160853048.png';
            updated = true;
          }
        }
      });
      
      if (updated) {
        await Content.updateOne({ _id: doc._id }, { $set: { 'data.blocks': doc.data.blocks } });
        console.log('Fixed AboutBlock hero image successfully.');
      } else {
        console.log('AboutBlock with the problematic image not found.');
      }
    }
    
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}

fixAboutImage();
