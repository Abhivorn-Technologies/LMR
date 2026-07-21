import { type SchemaTypeDefinition } from 'sanity'
import { pageType } from './pageType'
import { 
  headingBlock, richTextBlock, imageBlock, callToActionBlock, 
  faqAccordionBlock, buttonBlock, iconBlock, heroBlock, 
  statsBarBlock, servicesPreviewBlock, industriesPreviewBlock, 
  whyPreviewBlock, trustMockupPreviewBlock, companyLogosMarqueeBlock 
} from './blockTypes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    pageType,
    headingBlock,
    richTextBlock,
    imageBlock,
    callToActionBlock,
    faqAccordionBlock,
    buttonBlock,
    iconBlock,
    heroBlock,
    statsBarBlock,
    servicesPreviewBlock,
    industriesPreviewBlock,
    whyPreviewBlock,
    trustMockupPreviewBlock,
    companyLogosMarqueeBlock
  ],
}
