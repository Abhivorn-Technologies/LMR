'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Hero } from "@/components/sections/home/Hero";

// Dynamic imports for performance, just like the original page.tsx
const StatsBar = dynamic(() => import("@/components/sections/home/StatsBar").then(mod => mod.StatsBar), { ssr: true });
const ServicesPreview = dynamic(() => import("@/components/sections/home/ServicesPreview").then(mod => mod.ServicesPreview), { ssr: true });
const RetailServicesPreview = dynamic(() => import("@/components/sections/home/RetailServicesPreview").then(mod => mod.RetailServicesPreview), { ssr: true });
const IndustriesPreview = dynamic(() => import("@/components/sections/home/IndustriesPreview").then(mod => mod.IndustriesPreview), { ssr: true });
const WhyPreview = dynamic(() => import("@/components/sections/home/WhyPreview").then(mod => mod.WhyPreview), { ssr: true });
const TrustMockupPreview = dynamic(() => import("@/components/sections/home/TrustMockupPreview").then(mod => mod.TrustMockupPreview), { ssr: true });
const CompanyLogosMarquee = dynamic(() => import("@/components/sections/home/CompanyLogosMarquee").then(mod => mod.CompanyLogosMarquee), { ssr: true });

// Generic Builder Blocks
import { RichTextBlock } from './blocks/RichTextBlock';
import { ImageBlock } from './blocks/ImageBlock';
import { GenericCardGrid } from './blocks/GenericCardGrid';
import { CallToActionBlock } from './blocks/CallToActionBlock';

// New Functional Blocks
import { HeadingBlock } from './blocks/HeadingBlock';
import { DividerBlock } from './blocks/DividerBlock';
import { SpacerBlock } from './blocks/SpacerBlock';
import { FAQAccordionBlock } from './blocks/FAQAccordionBlock';
import { FreeformCanvasBlock } from './blocks/FreeformCanvasBlock';

// Placeholder Engine
import { PlaceholderBlock } from './blocks/PlaceholderBlock';

import { PremiumProductLayoutBlock } from './blocks/PremiumProductLayoutBlock';
import { ContactBlock } from './blocks/ContactBlock';
import { AboutBlock } from './blocks/AboutBlock';
import { ReinsuranceBlock } from './blocks/ReinsuranceBlock';
import { HomeBlock } from './blocks/HomeBlock';

// A registry mapping string types from JSON to actual React components
const ComponentRegistry: Record<string, React.ComponentType<any>> = {
  Hero,
  heroBlock: Hero,
  StatsBar,
  statsBarBlock: StatsBar,
  ServicesPreview,
  servicesPreviewBlock: ServicesPreview,
  RetailServicesPreview,
  retailServicesPreviewBlock: RetailServicesPreview,
  IndustriesPreview,
  industriesPreviewBlock: IndustriesPreview,
  WhyPreview,
  whyPreviewBlock: WhyPreview,
  TrustMockupPreview,
  trustMockupPreviewBlock: TrustMockupPreview,
  CompanyLogosMarquee,
  companyLogosMarqueeBlock: CompanyLogosMarquee,
  PremiumProductLayoutBlock,
  premiumProductLayoutBlock: PremiumProductLayoutBlock,
  HomeBlock,
  homeBlock: HomeBlock,
  
  // Generic Blocks
  RichTextBlock,
  richTextBlock: RichTextBlock,
  ImageBlock,
  imageBlock: ImageBlock,
  GenericCardGrid,
  genericCardGrid: GenericCardGrid,
  CallToActionBlock,
  callToActionBlock: CallToActionBlock,
  
  // New Functional Blocks
  HeadingBlock,
  headingBlock: HeadingBlock,
  DividerBlock,
  dividerBlock: DividerBlock,
  SpacerBlock,
  spacerBlock: SpacerBlock,
  FAQAccordionBlock,
  faqAccordionBlock: FAQAccordionBlock,
  FreeformCanvasBlock,
  freeformCanvasBlock: FreeformCanvasBlock,
  ContactBlock,
  contactBlock: ContactBlock,
  AboutBlock,
  aboutBlock: AboutBlock,
  ReinsuranceBlock,
  reinsuranceBlock: ReinsuranceBlock
};

// Types that are in the ComponentPicker but not yet built
const PLANNED_BLOCKS = [
  'ParagraphBlock', 'ButtonBlock', 'IconBlock', 'ImageGalleryBlock', 
  'VideoBlock', 'LogoSliderBlock', 'ContainerBlock', 'SectionBlock', 
  'ColumnsBlock', 'PricingBlock', 'TestimonialsBlock', 'ContactFormBlock', 
  'NewsletterBlock', 'HeaderBlock', 'FooterBlock', 'BlogListBlock', 
  'TeamBlock', 'MapBlock', 'TableBlock', 'CustomHtmlBlock'
];

import { DraggableBlockWrapper } from './DraggableBlockWrapper';

export type BlockData = {
  type: string;
  content?: any;
};

export function BlockRenderer({ blocks: initialBlocks }: { blocks: any[] }) {
  const [blocks, setBlocks] = React.useState(initialBlocks);

  React.useEffect(() => {
    // Keep in sync with server props if they change
    setBlocks(initialBlocks);
  }, [initialBlocks]);

  React.useEffect(() => {
    // Listen for live preview updates from the CMS visual editor
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'PREVIEW_UPDATE' && event.data?.data?.blocks) {
        setBlocks(event.data.data.blocks);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return null;

  return (
    <div className="w-full min-h-screen relative bg-white">
      {blocks.map((block, index) => {
        // Support both MongoDB (block.type) and Sanity (block._type) structures
        const typeName = block._type || block.type;
        const Component = ComponentRegistry[typeName];
        const blockContent = block.content || block; // Use root block for Sanity
        const layout = block.content?.layout || block.layout;
        
        if (!Component) {
          if (PLANNED_BLOCKS.includes(typeName)) {
            return (
              <DraggableBlockWrapper key={index} blockIndex={index} layout={layout} type={typeName}>
                <PlaceholderBlock type={typeName} content={blockContent} />
              </DraggableBlockWrapper>
            );
          }

          return (
            <div key={index} className="w-full max-w-4xl mx-auto p-6 my-8 bg-red-50 border-l-4 border-red-500 rounded-r-xl">
              <h3 className="text-red-800 font-bold text-lg flex items-center gap-2">
                <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">!</span>
                Invalid Block Type
              </h3>
              <p className="text-red-700 mt-2">
                You entered <code className="bg-red-100 px-2 py-0.5 rounded text-red-900 font-mono">"{typeName}"</code>, which is not a recognized block.
              </p>
              <p className="text-red-600 text-sm mt-2 font-medium">Valid blocks: {Object.keys(ComponentRegistry).join(', ')}</p>
            </div>
          );
        }

        // Wrap every component in the Draggable Canvas layer
        return (
          <DraggableBlockWrapper key={`${typeName}-${index}`} blockIndex={index} layout={layout} type={typeName}>
            <Component content={blockContent} blockIndex={index} />
          </DraggableBlockWrapper>
        );
      })}
    </div>
  );
}
