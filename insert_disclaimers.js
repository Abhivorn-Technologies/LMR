require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function insertDisclaimers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const Content = mongoose.models.Content || mongoose.model('Content', new mongoose.Schema({}, { strict: false }));
    const doc = await Content.findOne({ key: '/' });
    
    if (doc && doc.data && doc.data.blocks) {
      const blocks = doc.data.blocks;
      
      // Find the index of CompanyLogosMarquee
      const marqueeIndex = blocks.findIndex(b => b.type === 'CompanyLogosMarquee');
      
      const disclaimersBlock = {
        type: 'FAQAccordionBlock',
        content: {
          title: 'Disclaimers & important info',
          faqs: [
            {
              question: 'Disclaimers',
              answer: '<ul style="list-style-type: disc; padding-left: 20px; display: flex; flex-direction: column; gap: 12px;"><li>Insurance is the subject matter of solicitation. For more details on risk factors, terms and conditions, please read the policy wordings carefully before concluding a sale.</li><li>LMB Insurance Brokers Pvt. Ltd. acts as an insurance broker under the IRDAI (Insurance Brokers) Regulations. Policies are underwritten by the respective insurance companies.</li><li>Beware of spurious phone calls and fictitious / fraudulent offers — IRDAI or its officials do not sell insurance policies, announce bonuses or invest premiums. Members of the public receiving such calls are requested to lodge a police complaint.</li></ul>'
            },
            {
              question: 'Grievance Redressal',
              answer: 'For any grievances or complaints, please reach out to our dedicated grievance redressal officer...'
            }
          ]
        }
      };

      // Check if it already exists to avoid duplicates
      const exists = blocks.find(b => b.type === 'FAQAccordionBlock' && b.content?.title?.includes('Disclaimers'));
      
      if (!exists) {
        if (marqueeIndex !== -1) {
          // Insert right after marquee
          blocks.splice(marqueeIndex + 1, 0, disclaimersBlock);
        } else {
          // Or just push to the end
          blocks.push(disclaimersBlock);
        }
        
        await Content.updateOne({ _id: doc._id }, { $set: { 'data.blocks': blocks } });
        console.log('Inserted Disclaimers block successfully.');
      } else {
        console.log('Disclaimers block already exists.');
      }
    }
    
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}

insertDisclaimers();
