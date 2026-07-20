const mongoose = require('mongoose');

async function run() {
  await mongoose.connect('mongodb+srv://arunajyothi:Aruna1234567@cluster0.urgk8.mongodb.net/lmb_cms?appName=Cluster0');
  
  const PageMetadata = mongoose.models.PageMetadata || mongoose.model('PageMetadata', new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    data: mongoose.Schema.Types.Mixed,
    title: String,
    path: String,
    updatedAt: { type: Date, default: Date.now }
  }));

  const homeHeroContent = {
    title: "Insurance advisory",
    titleHighlight: "built on",
    trustWord: "trust",
    subtitleStart: "Securing your ",
    subtitleWords: ["tomorrow.", "today.", "future.", "business.", "legacy."],
    description: "Insurance broking built on expertise, integrity, and client focus — IRDAI CoR No. 116, since 2002.",
    checkmarks: [
      "Composite broker — one advisory relationship for every line",
      "Endorsements & new quotes handled with speed and efficiency",
      "Domestic & international insurer and reinsurer market access"
    ],
    contactFormHeadline: "Get General Insurance Advisory",
    contactFormSubheadline: "Share your details — our broking expert will call you back."
  };

  const blocks = [
    { type: 'Hero', content: homeHeroContent },
    { type: 'StatsBar' },
    { type: 'ServicesPreview' },
    { type: 'RetailServicesPreview' },
    { type: 'IndustriesPreview' },
    { type: 'WhyPreview' },
    { type: 'TrustMockupPreview' },
    { type: 'CompanyLogosMarquee' }
  ];

  await PageMetadata.findOneAndUpdate(
    { key: 'home:hero' },
    { data: { blocks }, updatedAt: new Date() },
    { upsert: true }
  );

  console.log("Restored home:hero");
  process.exit(0);
}

run();
