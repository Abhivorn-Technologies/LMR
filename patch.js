const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://pranavi:pranavi@cluster0.znt8q.mongodb.net/LMB?retryWrites=true&w=majority&appName=Cluster0';
async function run() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('LMB');
  const collection = db.collection('content');
  
  const doc = await collection.findOne({ key: 'home:hero' });
  if (doc && doc.data && doc.data.blocks) {
    const blocks = doc.data.blocks;
    
    // Find ServicesPreview
    const spIndex = blocks.findIndex(b => b.type === 'ServicesPreview');
    if (spIndex >= 0 && !blocks[spIndex].content.services) {
      blocks[spIndex].content.services = [
        { id: 'gi', title: 'General Insurance', icon: 'Home', shortDescription: 'Protect your assets...', homePoints: ['Point 1'] },
        { id: 'life', title: 'Life Insurance', icon: 'Heart', shortDescription: 'Secure your family...', homePoints: ['Point 1'] },
        { id: 'reinsurance', title: 'Reinsurance', icon: 'Shield', shortDescription: 'Risk transfer...', homePoints: ['Point 1'] },
        { id: 'claims', title: 'Claim Services', icon: 'FileText', shortDescription: 'End-to-end...', homePoints: ['Point 1'] },
        { id: 'risk', title: 'Risk Management', icon: 'Target', shortDescription: 'Identify, quantify...', homePoints: ['Point 1'] },
        { id: 'consulting', title: 'Consulting', icon: 'Users', shortDescription: 'Strategic advisory...', homePoints: ['Point 1'] }
      ];
    }
    
    // Find RetailServicesPreview
    const rspIndex = blocks.findIndex(b => b.type === 'RetailServicesPreview');
    if (rspIndex >= 0 && !blocks[rspIndex].content.motorInsurance) {
      blocks[rspIndex].content.motorInsurance = [
        { title: 'Car', icon: 'Car', href: '/services/general-insurance/car', banner: 'Pay as you Drive' },
        { title: 'Bike', icon: 'Bike', href: '/services/general-insurance/two-wheeler/bike', banner: 'Starting ₹714' }
      ];
      blocks[rspIndex].content.healthInsurance = [
        { title: 'Health', icon: 'Stethoscope', href: '/services/general-insurance/health', banner: 'Infinity Wallet' }
      ];
      blocks[rspIndex].content.businessInsurance = [
        { title: 'D&O Insurance', icon: 'Briefcase', href: '/services/general-insurance/business', banner: '' }
      ];
      blocks[rspIndex].content.travelProperty = [
        { title: 'International Travel', icon: 'Plane', href: '/services/general-insurance/travel/international', banner: 'Starting ₹225' }
      ];
    }
    
    await collection.updateOne({ key: 'home:hero' }, { $set: { 'data.blocks': blocks } });
    console.log('Successfully patched home:hero with default arrays!');
  } else {
    console.log('Doc not found or no blocks');
  }
  await client.close();
}
run().catch(console.dir);
