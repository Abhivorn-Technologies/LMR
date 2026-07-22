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
import { ButtonBlock } from './blocks/ButtonBlock';
import { GalleryBlock } from './blocks/GalleryBlock';
import { IconBlock } from './blocks/IconBlock';
import { ParagraphBlock } from './blocks/ParagraphBlock';
import { VideoBlock } from './blocks/VideoBlock';
import { ContainerBlock, SectionBlock, ColumnsBlock, HeaderBlock, FooterBlock } from './blocks/LayoutBlocks';
import { DividerBlock } from './blocks/DividerBlock';
import { SpacerBlock } from './blocks/SpacerBlock';
import { FAQAccordionBlock } from './blocks/FAQAccordionBlock';
import { FreeformCanvasBlock } from './blocks/FreeformCanvasBlock';

// Marketing Blocks
import { PricingBlock, TestimonialsBlock, TeamBlock, BlogListBlock } from './blocks/MarketingBlocks';

// Utility Blocks
import { ContactFormBlock, NewsletterBlock, MapBlock, TableBlock, CustomHtmlBlock } from './blocks/UtilityBlocks';

// Media Blocks
import { ImageGalleryBlock, LogoSliderBlock } from './blocks/MediaBlocks';

import { PremiumProductLayoutBlock } from './blocks/PremiumProductLayoutBlock';
import { ContactBlock } from './blocks/ContactBlock';
import { AboutBlock } from './blocks/AboutBlock';
import { ReinsuranceBlock } from './blocks/ReinsuranceBlock';

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
  LogoMarquee: CompanyLogosMarquee,
  logoMarquee: CompanyLogosMarquee,
  PremiumProductLayoutBlock,
  premiumProductLayoutBlock: PremiumProductLayoutBlock,
  
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
  ButtonBlock,
  buttonBlock: ButtonBlock,
  GalleryBlock,
  galleryBlock: GalleryBlock,
  IconBlock,
  iconBlock: IconBlock,
  ParagraphBlock,
  paragraphBlock: ParagraphBlock,
  VideoBlock,
  videoBlock: VideoBlock,
  ContainerBlock,
  containerBlock: ContainerBlock,
  SectionBlock,
  sectionBlock: SectionBlock,
  ColumnsBlock,
  columnsBlock: ColumnsBlock,
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
  reinsuranceBlock: ReinsuranceBlock,
  
  // Newly added blocks
  PricingBlock, pricingBlock: PricingBlock,
  TestimonialsBlock, testimonialsBlock: TestimonialsBlock,
  TeamBlock, teamBlock: TeamBlock,
  BlogListBlock, blogListBlock: BlogListBlock,
  ContactFormBlock, contactFormBlock: ContactFormBlock,
  NewsletterBlock, newsletterBlock: NewsletterBlock,
  MapBlock, mapBlock: MapBlock,
  TableBlock, tableBlock: TableBlock,
  CustomHtmlBlock, customHtmlBlock: CustomHtmlBlock,
  HeaderBlock, headerBlock: HeaderBlock,
  FooterBlock, footerBlock: FooterBlock,
  ImageGalleryBlock, imageGalleryBlock: ImageGalleryBlock,
  LogoSliderBlock, logoSliderBlock: LogoSliderBlock
};

import { DraggableBlockWrapper } from './DraggableBlockWrapper';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';

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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px movement required before drag starts, allows clicks to pass through
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = parseInt(active.id as string, 10);
      const newIndex = parseInt(over.id as string, 10);

      // Local optimistic update
      setBlocks((items) => {
        const newItems = [...items];
        const [moved] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, moved);
        return newItems;
      });

      // Send to parent editor
      if (typeof window !== 'undefined' && window.parent !== window) {
        window.parent.postMessage({
          type: 'REORDER_BLOCKS',
          oldIndex,
          newIndex
        }, '*');
      }
    }
  };

  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return null;

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
    >
      <SortableContext 
        items={blocks.map((_, i) => String(i))}
        strategy={verticalListSortingStrategy}
      >
        <div className="w-full min-h-[800px] relative overflow-hidden bg-white">
          {blocks.map((block, index) => {
            // Support both MongoDB (block.type) and Sanity (block._type) structures
            const typeName = block._type || block.type;
            const Component = ComponentRegistry[typeName];
            const blockContent = block.content || block; // Use root block for Sanity
            const layout = block.content?.layout || block.layout;
            
            if (!Component) {
              return (
                <div key={index} className="w-full max-w-4xl mx-auto p-6 my-8 bg-red-50 border-l-4 border-red-500 rounded-r-xl">
                  <h3 className="text-red-800 font-bold text-lg flex items-center gap-2">
                    <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">!</span>
                    Invalid Block Type
                  </h3>
                  <p className="text-red-700 mt-2">
                    You entered <code className="bg-red-100 px-2 py-0.5 rounded text-red-900 font-mono">"{typeName}"</code>, which is not a recognized block.
                  </p>
                </div>
              );
            }

            const isFreeform = typeName === 'FreeformCanvasBlock' || typeName === 'freeformCanvasBlock';

            // Wrap every component in the Draggable Canvas layer
            return (
              <DraggableBlockWrapper key={`${typeName}-${index}`} blockIndex={index} layout={isFreeform ? layout : undefined}>
                <Component content={blockContent} blockIndex={index} />
              </DraggableBlockWrapper>
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}
