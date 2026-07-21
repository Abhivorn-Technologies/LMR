import React from "react";
import { notFound } from "next/navigation";
import { productDatabase } from "@/lib/content/products";
import { ProductHero } from "@/components/services/product/ProductHero";
import { LmbBranding } from "@/components/services/product/LmbBranding";
import { PremiumProductLayout } from "@/components/services/product/PremiumProductLayout";
import { getProductImages } from "@/lib/utils/imageMapper";
import { getContent } from "@/services/contentService";
import { BlockRenderer, BlockData } from "@/components/cms/BlockRenderer";

// Catch-all dynamic route for any life-insurance product
export default async function LifeInsuranceProductPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  if (!resolvedParams?.slug) {
    notFound();
  }
  const fullSlug = `life-insurance/${resolvedParams.slug.join("/")}`;
  
  // 1. Try to fetch from Visual Editor Database FIRST!
  const pageKey = `/services/${fullSlug}`;
  const dbData = await getContent(pageKey, null);

  // If the visual editor has blocks saved for this route, render them!
  if (dbData && dbData.blocks && dbData.blocks.length > 0) {
    return (
      <div className="min-h-screen bg-white relative z-0">
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
      title: `${title} Life Insurance`,
      subtitle: "Secure Their Future",
      description: `Get the best ${title} Life Insurance policy online. High coverage at affordable premiums to protect your family's future.`,
      image: "/assets/image3.jpeg",
      badges: ["High Cover", "Tax Benefits"],
      featuresTitle: `Key Benefits of ${title} Life`,
      featuresSubtitle: "Simple, transparent term insurance.",
      features: [
        { title: "High Sum Assured", description: "Get maximum coverage for low premiums.", iconName: "ShieldCheck" },
        { title: "Tax Savings", description: "Save tax under section 80C and 10(10D).", iconName: "Award" },
        { title: "Easy Process", description: "Minimal paperwork and quick issuance.", iconName: "Zap" }
      ],
      inclusions: [
        { title: "Death Benefit", description: "Lump sum payout to the nominee in case of unfortunate demise." }
      ],
      exclusions: [
        { title: "Suicide Clause", description: "Suicide within the first 12 months is generally excluded." }
      ],
      addonsTitle: "Enhance Your Plan",
      addonsSubtitle: "Additional riders for comprehensive protection.",
      addons: [],
      faqs: [],
      stepsTitle: `How to Buy ${title} Insurance`,
      stepsSubtitle: "Quick and easy online process.",
      steps: [
        { title: "Choose Plan", description: "Select the coverage that perfectly matches your needs." },
        { title: "Provide Details", description: "Fill in the required information securely." },
        { title: "Get Insured", description: "Receive your policy instantly upon payment." }
      ],
      richText: [
        {
          title: `Why ${title} Insurance is Essential`,
          content: `<p>Ensure that your family remains financially independent even when you are not around.</p>`,
          highlight: false
        }
      ]
    };
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

      <PremiumProductLayout data={data} images={categoryImages} />
    </div>
  );
}
