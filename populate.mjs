import fs from 'fs';

const slugs = [
  "general-insurance/car",
  "general-insurance/car/comprehensive",
  "general-insurance/car/third-party",
  "general-insurance/car/pay-as-you-drive",
  "general-insurance/car/electric",
  "general-insurance/car/own-damage",
  "general-insurance/two-wheeler/bike",
  "general-insurance/two-wheeler/comprehensive",
  "general-insurance/two-wheeler/third-party",
  "general-insurance/two-wheeler/electric",
  "general-insurance/two-wheeler/own-damage",
  "general-insurance/commercial/commercial-vehicle",
  "general-insurance/commercial/auto-rickshaw",
  "general-insurance/commercial/e-rickshaw",
  "general-insurance/commercial/taxi",
  "general-insurance/commercial/tata-ace",
  "general-insurance/commercial/tractor",
  "general-insurance/commercial/truck",
  "general-insurance/commercial/jcb",
  "general-insurance/health",
  "general-insurance/health/combo-new",
  "general-insurance/health/cashless",
  "general-insurance/health/premium-calculator",
  "general-insurance/health/portability",
  "general-insurance/health/super-top-up",
  "general-insurance/health/parents",
  "general-insurance/health/group-medical",
  "general-insurance/health/family",
  "general-insurance/health/family-floater",
  "general-insurance/health/senior-citizens",
  "general-insurance/home/bharat-griha-raksha",
  "general-insurance/home",
  "general-insurance/home/home-loan",
  "general-insurance/travel/international",
  "general-insurance/travel/multi-trip-new",
  "general-insurance/travel/schengen",
  "general-insurance/travel/family",
  "general-insurance/business/workmen-compensation",
  "general-insurance/business/contractors-all-risk",
  "general-insurance/business/contractors-plant-machinery",
  "life-insurance/term/digit-glow-new",
  "life-insurance/term/digit-glow-plus-new",
  "life-insurance/term/digit-glow-lite-new",
  "life-insurance/term/insurance",
  "life-insurance/term/calculator",
  "life-insurance/term/1-crore",
  "life-insurance/savings/digit-icon",
  "life-insurance/retirement/plans",
  "life-insurance/retirement/guaranteed",
  "life-insurance/group/term",
  "life-insurance/group/long-term",
  "life-insurance/group/micro-term",
  "life-insurance/documents/policy-brochures",
  "life-insurance/documents/withdrawn-products"
];

function generateTitle(slug) {
  const parts = slug.split("/");
  let last = parts[parts.length - 1];
  
  // Special overrides
  if (slug === "life-insurance/term/1-crore") return "1 Crore Term Life";
  if (slug.includes("health/combo-new")) return "Health & Term Combo";
  
  return last.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

let fileContent = `import { Feature } from "@/components/services/product/ProductFeatures";
import { Addon } from "@/components/services/product/ProductAddons";
import { FAQ } from "@/components/services/product/ProductFAQ";

export interface ProductData {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badges: string[];
  featuresTitle: string;
  featuresSubtitle: string;
  features: Feature[];
  inclusions: { title: string; description: string }[];
  exclusions: { title: string; description: string }[];
  addonsTitle: string;
  addonsSubtitle: string;
  addons: Addon[];
  faqs: FAQ[];
  stepsTitle?: string;
  stepsSubtitle?: string;
  steps?: { title: string; description: string }[];
  richText?: { title?: string; content: string; highlight?: boolean }[];
}

export const productDatabase: Record<string, ProductData> = {
`;

slugs.forEach(slug => {
  const title = generateTitle(slug);
  const type = slug.startsWith("life") ? "Life Insurance" : "Insurance";
  
  fileContent += `  "${slug}": {
    title: "${title} ${type}",
    subtitle: "Upto 90%* Off on Online Purchase",
    description: "Buy or Renew your ${title} ${type} Policy Online in India instantly. Protect what matters most with customized plans, cashless facilities, and 24x7 support from LMB.",
    image: "/assets/image3.jpeg",
    badges: ["Bestseller", "Instant Policy", "Zero Paperwork"],
    featuresTitle: "Why Choose Our ${title} ${type}?",
    featuresSubtitle: "We make insurance incredibly simple and completely transparent.",
    features: [
      { title: "Cashless Facilities", description: "Access to our vast network for seamless cashless claims. No out-of-pocket expenses.", iconName: "Wrench" },
      { title: "Customized Coverage", description: "You get to decide your exact coverage needs. We tailor everything to your lifestyle.", iconName: "SlidersHorizontal" },
      { title: "Super Fast Claims", description: "Smartphone-enabled smart self-inspection for lightning-fast claim approvals.", iconName: "Zap" },
      { title: "24x7 Support", description: "We offer round-the-clock assistance to get you moving again anywhere.", iconName: "Phone" },
      { title: "Zero Depreciation / Full Cover", description: "Get maximum value during a claim without factoring in massive deductions.", iconName: "ShieldCheck" },
      { title: "Protection Bonus", description: "Keep your hard-earned bonuses intact even after making a claim.", iconName: "Award" }
    ],
    stepsTitle: "How to Claim your ${title} ${type}?",
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
      { title: "Return to Invoice Cover", description: "In case of a total loss, get the original invoice value, not just the depreciated value." }
    ],
    richText: [
      {
        title: "Understanding ${title} ${type}",
        content: "<p>Before buying a policy, it is critical to understand the different options available. At LMB, we guide you to pick exactly what you need without overpaying. A robust ${title} ${type} plan serves as your financial safety net, helping to cover massive costs during unforeseen circumstances.</p><ul><li><strong>Basic Coverage:</strong> Meets all mandatory legal requirements.</li><li><strong>Comprehensive Coverage:</strong> Highly recommended. Covers massive liabilities PLUS damages/losses to you.</li><li><strong>Customized Add-ons:</strong> Enhance your base policy with riders that fit your specific lifestyle.</li></ul>",
        highlight: false
      },
      {
        title: "Why buy ${title} ${type} through LMB?",
        content: "<p>At LMB Insurance Brokers, we don't just sell you a policy; we manage your complete risk portfolio. Because we arrange insurances from all the main insurers directly to the client, we have the leverage to negotiate better terms, higher coverages, and lower premiums. More importantly, when it's time to make a claim, our dedicated claims consultancy team fights for you to ensure rapid, hassle-free settlements.</p>",
        highlight: true
      }
    ],
    faqs: [
      { question: "What is the primary benefit of ${title} ${type}?", answer: "It provides a massive financial safety net against huge unexpected expenses, ensuring peace of mind for you and your family." },
      { question: "How do I make a cashless claim?", answer: "Making a cashless claim is easy. Simply intimate the claim through our portal, use our vast network, and we will settle the bill directly. You only pay the mandatory deductible." },
      { question: "What is a No Claim Bonus (NCB)?", answer: "No Claim Bonus is a reward (in the form of a discount on your renewal premium) given by the insurance company if you haven't made any claims during the previous policy year." },
      { question: "Is this policy customizable?", answer: "Yes! At LMB, we believe in providing tailored solutions. You can easily add riders and add-ons to customize your protection." }
    ]
  },
`;
});

fileContent += `};\n`;

fs.writeFileSync("c:/Users/GENIUS/Videos/LMR/src/lib/content/products.ts", fileContent);
console.log("Successfully generated products.ts with deep content for 54 routes.");
