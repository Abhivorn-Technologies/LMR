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

// A registry mapping string types from JSON to actual React components
const ComponentRegistry: Record<string, React.ComponentType<any>> = {
  Hero,
  StatsBar,
  ServicesPreview,
  RetailServicesPreview,
  IndustriesPreview,
  WhyPreview,
  TrustMockupPreview,
  CompanyLogosMarquee,
  
  // Generic Blocks
  RichTextBlock,
  ImageBlock,
  GenericCardGrid,
  CallToActionBlock,
  
  // New Functional Blocks
  HeadingBlock,
  DividerBlock,
  SpacerBlock,
  FAQAccordionBlock,
  FreeformCanvasBlock
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

export function BlockRenderer({ blocks }: { blocks: BlockData[] }) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <div className="w-full min-h-[1200px] relative overflow-hidden bg-white">
      {blocks.map((block, index) => {
        const Component = ComponentRegistry[block.type];
        
        if (!Component) {
          if (PLANNED_BLOCKS.includes(block.type)) {
            return (
              <DraggableBlockWrapper key={index} blockIndex={index} layout={block.content?.layout}>
                <PlaceholderBlock type={block.type} content={block.content} />
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
                You entered <code className="bg-red-100 px-2 py-0.5 rounded text-red-900 font-mono">"{block.type}"</code>, which is not a recognized block.
              </p>
              <p className="text-red-600 text-sm mt-2 font-medium">Valid blocks: {Object.keys(ComponentRegistry).join(', ')}</p>
            </div>
          );
        }

        // Wrap every component in the Draggable Canvas layer
        return (
          <DraggableBlockWrapper key={`${block.type}-${index}`} blockIndex={index} layout={block.content?.layout}>
            <Component content={block.content} blockIndex={index} />
          </DraggableBlockWrapper>
        );
      })}
    </div>
  );
}
