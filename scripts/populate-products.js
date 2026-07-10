const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE_PATH = path.join(__dirname, '../src/lib/content/products.ts');

function generateDeepContentForProduct(key) {
  // Extract a readable title from the key (e.g. 'general-insurance/car-insurance' -> 'Car Insurance')
  const parts = key.split('/');
  const rawTitle = parts[parts.length - 1];
  const title = rawTitle.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) + (key.includes('insurance') ? '' : ' Insurance');

  // Determine an appropriate image
  let image = "/assets/image3.jpeg";
  if (key.includes("car") || key.includes("motor")) image = "/assets/services/car_insurance_1783077273184.png";
  else if (key.includes("bike") || key.includes("two-wheeler")) image = "/assets/services/bike_insurance_1783077283942.png";
  else if (key.includes("commercial")) image = "/assets/services/commercial_insurance_1783077294096.png";
  else if (key.includes("health") || key.includes("mediclaim")) image = "/assets/services/health_insurance_1783077303296.png";
  else if (key.includes("home") || key.includes("property")) image = "/assets/services/home_insurance_1783077315029.png";
  else if (key.includes("travel")) image = "/assets/services/travel_insurance_1783077328088.png";
  else if (key.includes("business") || key.includes("corporate")) image = "/assets/services/business_insurance_1783077338024.png";

  return `  "${key}": {
    title: "${title}",
    subtitle: "Upto 90%* Off on Online Purchase",
    description: "Buy or Renew your ${title} Policy Online instantly. Protect what matters most with customized plans, cashless facilities, and 24x7 support from LMB.",
    image: "${image}",
    badges: ["Bestseller", "Instant Policy", "Zero Paperwork"],
    featuresTitle: "Why Choose Our ${title}?",
    featuresSubtitle: "We make insurance incredibly simple and completely transparent.",
    features: [
      { title: "Cashless Facilities", description: "Access to our vast network for seamless cashless claims. No out-of-pocket expenses.", iconName: "Wrench" },
      { title: "Customized Coverage", description: "You get to decide your exact coverage needs. We tailor everything to your lifestyle.", iconName: "SlidersHorizontal" },
      { title: "Super Fast Claims", description: "Smartphone-enabled smart self-inspection for lightning-fast claim approvals.", iconName: "Zap" },
      { title: "24x7 Support", description: "We offer round-the-clock assistance to get you moving again anywhere.", iconName: "Phone" },
      { title: "Zero Depreciation / Full Cover", description: "Get maximum value during a claim without factoring in massive deductions.", iconName: "ShieldCheck" },
      { title: "Protection Bonus", description: "Keep your hard-earned bonuses intact even after making a claim.", iconName: "Award" }
    ],
    stepsTitle: "How to Claim your ${title}?",
    stepsSubtitle: "A simple, fully digital, and completely hassle-free process.",
    steps: [
      { title: "1. Intimate Claim", description: "Inform us about the incident immediately via our online portal or by calling our toll-free number. We will register the claim instantly." },
      { title: "2. Smart Inspection", description: "We will send you a link to your smartphone. Simply take photos/videos and upload them. Our team assesses it digitally." },
      { title: "3. Quick Settlement", description: "Take advantage of our cashless network, or get direct reimbursement to your bank account." }
    ],
    inclusions: [
      { title: "Accidents & Mishaps", description: "Full coverage for any accidental damages or unexpected losses." },
      { title: "Fire & Explosions", description: "Damages caused due to accidental fire, lightning, or explosions." },
      { title: "Theft", description: "Complete compensation in the unfortunate event of theft." },
      { title: "Natural Disasters", description: "Damages due to floods, earthquakes, cyclones, typhoons, and other natural calamities." },
      { title: "Third-Party / Liabilities", description: "Financial liability resulting from damages or injuries to a third-party." }
    ],
    exclusions: [
      { title: "Illegal Activities", description: "Any claim arising out of illegal activities or non-compliance with the law." },
      { title: "Intoxication", description: "Damages caused while under the influence of alcohol, drugs, or intoxicating substances." },
      { title: "Consequential Damages", description: "Any indirect damage not directly caused by the primary incident." },
      { title: "Normal Wear and Tear", description: "Depreciation, regular wear and tear over time, or mechanical breakdown." }
    ],
    addonsTitle: "Supercharge your Policy",
    addonsSubtitle: "Add these optional covers to your base policy for complete 360-degree peace of mind.",
    addons: [
      { title: "Zero Depreciation Cover", description: "Waives off the depreciation value on parts during a claim, ensuring you get the full claim amount." },
      { title: "Enhanced Protection Cover", description: "Covers the massive cost of repairing critical components that are normally excluded." },
      { title: "Return to Invoice Cover", description: "In case of a total loss, get the original invoice value, not just the depreciated value." },
      { title: "Engine Protection Cover", description: "Protection against engine damage due to water ingression or oil leaks." },
      { title: "Passenger Assist Cover", description: "Covers medical expenses for all passengers in case of a mishap." },
      { title: "Roadside Assistance", description: "24x7 help for towing, flat tires, or battery jumps anywhere in the country." }
    ],
    richText: [
      {
        title: "Understanding ${title}",
        content: "<p>Before buying a policy, it is critical to understand the different options available. At LMB, we guide you to pick exactly what you need without overpaying. A robust ${title} plan serves as your financial safety net, helping to cover massive costs during unforeseen circumstances.</p><ul><li><strong>Basic Coverage:</strong> Meets all mandatory legal requirements.</li><li><strong>Comprehensive Coverage:</strong> Highly recommended. Covers massive liabilities PLUS damages/losses to you.</li><li><strong>Customized Add-ons:</strong> Enhance your base policy with riders that fit your specific lifestyle.</li></ul>",
        highlight: false
      },
      {
        title: "Why buy ${title} through LMB?",
        content: "<p>At LMB Insurance Brokers, we don't just sell you a policy; we manage your complete risk portfolio. Because we arrange insurances from all the main insurers directly for the client, we have the leverage to negotiate better terms, higher coverages, and lower premiums.</p><p>More importantly, when it's time to make a claim, our dedicated claims consultancy team fights for you to ensure rapid, hassle-free settlements. We stand by you during your most critical times of need.</p>",
        highlight: true
      }
    ],
    faqs: [
      { question: "What is the primary benefit of ${title}?", answer: "It provides a massive financial safety net against huge unexpected expenses, ensuring peace of mind for you and your family." },
      { question: "How do I make a cashless claim?", answer: "Making a cashless claim is easy. Simply intimate the claim through our portal, use our vast network, and we will settle the bill directly. You only pay the mandatory deductible." },
      { question: "What is a No Claim Bonus (NCB)?", answer: "No Claim Bonus is a reward (in the form of a discount on your renewal premium) given by the insurance company if you haven't made any claims during the previous policy year." },
      { question: "Is this policy customizable?", answer: "Yes! At LMB, we believe in providing tailored solutions. You can easily add riders and add-ons to customize your protection." }
    ]
  }`;
}

async function populate() {
  const content = fs.readFileSync(PRODUCTS_FILE_PATH, 'utf8');
  
  // Extract all keys
  const regex = /^\s+"([^"]+)":\s*\{/gm;
  const keys = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    keys.push(match[1]);
  }

  console.log(`Found ${keys.length} product keys.`);

  // Build the new object
  let newObjectContent = 'export const productDatabase: Record<string, any> = {\n';
  const products = keys.map(generateDeepContentForProduct);
  newObjectContent += products.join(',\n');
  newObjectContent += '\n};\n';

  fs.writeFileSync(PRODUCTS_FILE_PATH, newObjectContent);
  console.log('products.ts has been perfectly populated with Godigit-style deep content for all 30+ pages!');
}

populate();
