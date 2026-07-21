const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  key: { type: String, required: true, unique: true },
  type: { type: String, default: 'Page' },
  status: { type: String, default: 'Active' },
  icon: { type: String, default: 'FileText' }
}, { timestamps: true });

const PageMetadata = mongoose.models.PageMetadata || mongoose.model('PageMetadata', PageSchema);

const realPages = [
  // Top Level
  { title: 'Home', category: 'Home', key: 'page:site:home', icon: 'Grid' },
  { title: 'About Us', category: 'Company', key: 'page:site:about', icon: 'FileText' },
  { title: 'Business Lines', category: 'Corporate', key: 'page:site:business-lines', icon: 'FileText' },
  { title: 'Careers', category: 'Company', key: 'page:site:careers', icon: 'Users' },
  { title: 'Clients', category: 'Company', key: 'page:site:clients', icon: 'Users' },
  { title: 'Contact Us', category: 'Company', key: 'page:site:contact', icon: 'FileText' },
  { title: 'FAQ', category: 'Resources', key: 'page:site:faq', icon: 'FileText' },
  { title: 'Industries', category: 'Corporate', key: 'page:site:industries', icon: 'FileText' },
  { title: 'Leadership', category: 'Company', key: 'page:site:leadership', icon: 'Users' },
  { title: 'Privacy Policy', category: 'Legal', key: 'page:site:privacy', icon: 'FileText' },
  { title: 'Reinsurance', category: 'Corporate', key: 'page:site:reinsurance', icon: 'FileText' },
  { title: 'Resources', category: 'Resources', key: 'page:site:resources', icon: 'FileText' },
  { title: 'Services Overview', category: 'Services', key: 'page:site:services', icon: 'Grid' },
  { title: 'Terms & Conditions', category: 'Legal', key: 'page:site:terms', icon: 'FileText' },
  { title: 'Why LMB', category: 'Company', key: 'page:site:why-lmb', icon: 'FileText' },

  // Life Insurance
  { title: 'Term Life Insurance', category: 'Life Insurance', key: 'page:life:term', icon: 'FileText' },
  { title: 'Term Insurance Calculator', category: 'Life Insurance', key: 'page:life:term-calculator', icon: 'Grid', type: 'Tool' },
  { title: '1 Crore Term Insurance', category: 'Life Insurance', key: 'page:life:term-1crore', icon: 'FileText' },
  { title: 'Savings Plan', category: 'Life Insurance', key: 'page:life:savings', icon: 'FileText' },
  { title: 'Retirement and Pension Plans', category: 'Life Insurance', key: 'page:life:retirement', icon: 'FileText' },
  { title: 'Group Life Products', category: 'Life Insurance', key: 'page:life:group', icon: 'FileText' },
  { title: 'Product Documents', category: 'Life Insurance', key: 'page:life:documents', icon: 'FileText' },

  // General Insurance
  { title: 'Car Insurance', category: 'General Insurance', key: 'page:general:car', icon: 'FileText' },
  { title: 'Two Wheeler Insurance', category: 'General Insurance', key: 'page:general:two-wheeler', icon: 'FileText' },
  { title: 'Commercial Vehicle Insurance', category: 'General Insurance', key: 'page:general:commercial-vehicle', icon: 'FileText' },
  { title: 'Health Insurance', category: 'General Insurance', key: 'page:general:health', icon: 'FileText' },
  { title: 'Health & Term Insurance Combo', category: 'General Insurance', key: 'page:general:health-term', icon: 'FileText' },
  { title: 'Cashless Health Insurance', category: 'General Insurance', key: 'page:general:cashless', icon: 'FileText' },
  { title: 'Health Insurance Premium Calculator', category: 'General Insurance', key: 'page:general:health-calc', icon: 'Grid', type: 'Tool' },
  { title: 'Health Insurance Portability', category: 'General Insurance', key: 'page:general:health-portability', icon: 'FileText' },
  { title: 'Super Top Up Health Insurance', category: 'General Insurance', key: 'page:general:super-topup', icon: 'FileText' },
  { title: 'Health Insurance for Parents', category: 'General Insurance', key: 'page:general:health-parents', icon: 'FileText' },
  { title: 'Group Medical Health Insurance', category: 'General Insurance', key: 'page:general:group-medical', icon: 'FileText' },
  { title: 'Family Health Insurance', category: 'General Insurance', key: 'page:general:family', icon: 'FileText' },
  { title: 'Family Floater Health Insurance', category: 'General Insurance', key: 'page:general:family-floater', icon: 'FileText' },
  { title: 'Senior Citizens Health Insurance', category: 'General Insurance', key: 'page:general:senior-citizen', icon: 'FileText' },
  { title: 'Home Insurance', category: 'General Insurance', key: 'page:general:home', icon: 'FileText' },
  { title: 'Travel Insurance', category: 'General Insurance', key: 'page:general:travel', icon: 'FileText' },
  { title: 'Business Insurance', category: 'General Insurance', key: 'page:general:business', icon: 'FileText' },

  // Claims Consultancy
  { title: 'Claim Services', category: 'Claims Consultancy', key: 'page:claims:services', icon: 'FileText' },
  { title: 'Consulting Services', category: 'Claims Consultancy', key: 'page:claims:consulting', icon: 'FileText' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
    
    await PageMetadata.deleteMany({});
    console.log('Cleared existing pages');
    
    await PageMetadata.insertMany(realPages);
    console.log('Inserted real pages');
    
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}

seed();
