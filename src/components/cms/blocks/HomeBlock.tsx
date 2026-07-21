'use client';

import React from 'react';
import { Hero } from "@/components/sections/home/Hero";
import { StatsBar } from "@/components/sections/home/StatsBar";
import { ServicesPreview } from "@/components/sections/home/ServicesPreview";
import { RetailServicesPreview } from "@/components/sections/home/RetailServicesPreview";
import { IndustriesPreview } from "@/components/sections/home/IndustriesPreview";
import { WhyPreview } from "@/components/sections/home/WhyPreview";
import { TrustMockupPreview } from "@/components/sections/home/TrustMockupPreview";
import { CompanyLogosMarquee } from "@/components/sections/home/CompanyLogosMarquee";

export function HomeBlock({ content }: { content: any }) {
  // Render the home page components, passing down the unified content prop
  return (
    <div className="w-full flex flex-col">
      <Hero content={content?.hero} />
      <StatsBar content={content?.stats} />
      <ServicesPreview content={content?.services} />
      <RetailServicesPreview content={content?.retailServices} />
      <IndustriesPreview content={content?.industries} />
      <WhyPreview content={content?.why} />
      <TrustMockupPreview content={content?.trust} />
      <CompanyLogosMarquee content={content?.logos} />
    </div>
  );
}
