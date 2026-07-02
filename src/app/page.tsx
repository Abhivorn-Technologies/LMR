import { Hero } from "@/components/sections/home/Hero";
import { ServicesPreview } from "@/components/sections/home/ServicesPreview";
import { IndustriesPreview } from "@/components/sections/home/IndustriesPreview";
import { WhyPreview } from "@/components/sections/home/WhyPreview";
import { CTA } from "@/components/sections/home/CTA";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/content/company";

export const metadata = createPageMetadata({
  title: "Home",
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <IndustriesPreview />
      <WhyPreview />
      <CTA />
    </>
  );
}
