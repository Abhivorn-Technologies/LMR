import React from "react";
import { notFound } from "next/navigation";
import { productDatabase } from "@/lib/content/products";
import { ProductHero } from "@/components/services/product/ProductHero";
import { LmbBranding } from "@/components/services/product/LmbBranding";
import { CarInsuranceContent } from "@/components/services/content/CarInsuranceContent";
import { PremiumProductLayout } from "@/components/services/product/PremiumProductLayout";
import { getProductImages } from "@/lib/utils/imageMapper";
import { getContent } from "@/services/contentService";
import { BlockRenderer, BlockData } from "@/components/cms/BlockRenderer";

// Catch-all dynamic route for any general-insurance product
export default async function GeneralInsuranceProductPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  if (!resolvedParams?.slug) {
    notFound();
  }
  const fullSlug = `general-insurance/${resolvedParams.slug.join("/")}`;
  
  // 1. Try to fetch from Visual Editor Database FIRST!
  // The key from the editor is exactly the route path (e.g. "/services/general-insurance/car")
  const pageKey = `/services/${fullSlug}`;
  const dbData = await getContent(pageKey, null);

  // If the visual editor has blocks saved for this route, render them!
  if (dbData && dbData.blocks && dbData.blocks.length > 0) {
    return (
      <div className="min-h-screen bg-white">
        <BlockRenderer blocks={dbData.blocks} />
      </div>
    );
  }

  // 2. Fallback to the hardcoded static database if no visual edits have been made yet
  let data = productDatabase[fullSlug];

  if (!data) {
    // Dynamic Fallback: if data is not populated yet, build a beautiful default page
    const title = resolvedParams.slug[resolvedParams.slug.length - 1].replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    
    data = {
      title: `${title} Insurance`,
      subtitle: "Comprehensive Coverage",
      description: `Get the best ${title} Insurance policy online. Enjoy cashless claims, customized coverage, and 24x7 support.`,
      image: "/assets/image3.jpeg",
      badges: ["Premium Plan", "Instant Policy"],
      featuresTitle: `Why Choose Our ${title} Insurance?`,
      featuresSubtitle: "We make insurance incredibly simple and transparent.",
      features: [
        { title: "Cashless Repairs", description: "Access to our vast network for seamless cashless claims.", iconName: "Wrench" },
        { title: "Fast Claims", description: "Lightning fast claim approvals without the hassle.", iconName: "Zap" },
        { title: "24x7 Support", description: "We are here for you round-the-clock.", iconName: "Phone" }
      ],
      inclusions: [
        { title: "Comprehensive Coverage", description: "Protection against a wide range of risks." }
      ],
      exclusions: [
        { title: "Standard Exclusions", description: "As per the policy wording." }
      ],
      addonsTitle: "Supercharge your Policy",
      addonsSubtitle: "Add optional covers for complete peace of mind.",
      addons: [],
      faqs: [],
      stepsTitle: `How to Claim your ${title} Insurance`,
      stepsSubtitle: "A simple, hassle-free process.",
      steps: [
        { title: "Intimate Claim", description: "Inform us about the incident immediately via our portal." },
        { title: "Inspection", description: "Our surveyor will inspect the damages digitally." },
        { title: "Settlement", description: "Get your claim settled directly or repaired cashless." }
      ],
      richText: [
        {
          title: `About ${title} Insurance`,
          content: `<p>We provide the best coverage for your needs. Contact us to learn more about the specifics of this plan and how we can customize it for you.</p>`,
          highlight: false
        }
      ]
    };
  }

  if (data?.faqs) {
    const extraFaqs = [
      { question: "How can I renew my policy?", answer: "You can easily renew your policy online through our portal in just a few clicks, or contact our 24x7 support team for assistance." },
      { question: "Can I cancel my policy and get a refund?", answer: "Yes, you can cancel your policy within the free-look period or as per the terms. Refunds are processed on a pro-rata basis." }
    ];
    // Create a shallow copy so we don't mutate the imported global object
    data = { ...data, faqs: [...data.faqs, ...extraFaqs] };
  }

  const categoryImages = getProductImages(data.title);

  return (
    <div className="min-h-screen bg-white relative z-0">
      <ProductHero 
        title={data.title}
        subtitle={data.subtitle}
        description={data.description}
        image={data.image}
        badges={data.badges}
      />

      <LmbBranding />

      {fullSlug.startsWith("general-insurance/car") ? (
        <CarInsuranceContent />
      ) : (
        <PremiumProductLayout data={data} images={categoryImages} />
      )}
    </div>
  );
}
