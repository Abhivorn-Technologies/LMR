import { Hero } from "@/components/sections/home/Hero";
import dynamic from "next/dynamic";

const StatsBar = dynamic(() => import("@/components/sections/home/StatsBar").then(mod => mod.StatsBar), { ssr: true });
const ServicesPreview = dynamic(() => import("@/components/sections/home/ServicesPreview").then(mod => mod.ServicesPreview), { ssr: true });
const RetailServicesPreview = dynamic(() => import("@/components/sections/home/RetailServicesPreview").then(mod => mod.RetailServicesPreview), { ssr: true });
const IndustriesPreview = dynamic(() => import("@/components/sections/home/IndustriesPreview").then(mod => mod.IndustriesPreview), { ssr: true });
const WhyPreview = dynamic(() => import("@/components/sections/home/WhyPreview").then(mod => mod.WhyPreview), { ssr: true });
const TrustMockupPreview = dynamic(() => import("@/components/sections/home/TrustMockupPreview").then(mod => mod.TrustMockupPreview), { ssr: true });
const CompanyLogosMarquee = dynamic(() => import("@/components/sections/home/CompanyLogosMarquee").then(mod => mod.CompanyLogosMarquee), { ssr: true });
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
      <StatsBar />
      <ServicesPreview />
      <RetailServicesPreview />
      <IndustriesPreview />
      <WhyPreview />
      <TrustMockupPreview />
      <CompanyLogosMarquee />
    </>
  );
}
