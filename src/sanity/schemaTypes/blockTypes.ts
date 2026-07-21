import {defineField, defineType} from 'sanity'

// Basic Blocks
export const headingBlock = defineType({
  name: 'headingBlock',
  title: 'Heading',
  type: 'object',
  fields: [
    defineField({name: 'text', type: 'string'}),
    defineField({name: 'level', type: 'string', options: {list: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}}),
    defineField({name: 'alignment', type: 'string', options: {list: ['left', 'center', 'right']}}),
    defineField({name: 'color', type: 'string'}),
  ],
})

export const richTextBlock = defineType({
  name: 'richTextBlock',
  title: 'Rich Text',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})

export const imageBlock = defineType({
  name: 'imageBlock',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({name: 'src', type: 'string', title: 'Image URL'}),
    defineField({name: 'alt', type: 'string'}),
    defineField({name: 'caption', type: 'string'}),
  ],
})

export const callToActionBlock = defineType({
  name: 'callToActionBlock',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({name: 'headline', type: 'string'}),
    defineField({name: 'subtext', type: 'string'}),
    defineField({name: 'buttonText', type: 'string'}),
    defineField({name: 'buttonUrl', type: 'string'}),
  ],
})

export const buttonBlock = defineType({
  name: 'buttonBlock',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({name: 'text', type: 'string'}),
    defineField({name: 'link', type: 'string'}),
    defineField({name: 'style', type: 'string', options: {list: ['primary', 'secondary', 'outline']}}),
  ],
})

export const iconBlock = defineType({
  name: 'iconBlock',
  title: 'Icon',
  type: 'object',
  fields: [
    defineField({name: 'iconName', type: 'string'}),
    defineField({name: 'size', type: 'string'}),
    defineField({name: 'color', type: 'string'}),
  ],
})

export const faqAccordionBlock = defineType({
  name: 'faqAccordionBlock',
  title: 'FAQ Accordion',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({
      name: 'faqs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'question', type: 'string'},
            {name: 'answer', type: 'text'},
          ],
        },
      ],
    }),
  ],
})

// Complex Sections
export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'description', type: 'text'}),
    defineField({name: 'badge', type: 'string'}),
    defineField({name: 'primaryButton', type: 'object', fields: [{name: 'text', type: 'string'}, {name: 'href', type: 'string'}]}),
    defineField({name: 'secondaryButton', type: 'object', fields: [{name: 'text', type: 'string'}, {name: 'href', type: 'string'}]}),
  ],
})

export const statsBarBlock = defineType({
  name: 'statsBarBlock',
  title: 'Stats Bar',
  type: 'object',
  fields: [
    defineField({
      name: 'stats',
      type: 'array',
      of: [{type: 'object', fields: [{name: 'value', type: 'string'}, {name: 'label', type: 'string'}]}]
    }),
  ],
})

const serviceItemType = {
  type: 'object',
  fields: [
    {name: 'title', type: 'string'},
    {name: 'icon', type: 'string'},
    {name: 'href', type: 'string'},
    {name: 'banner', type: 'string'},
  ]
}

export const servicesPreviewBlock = defineType({
  name: 'servicesPreviewBlock',
  title: 'Services Preview',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'subtitle', type: 'string'}),
    defineField({name: 'cat1', type: 'string'}),
    defineField({name: 'generalInsurance', type: 'array', of: [serviceItemType]}),
    defineField({name: 'cat2', type: 'string'}),
    defineField({name: 'lifeInsurance', type: 'array', of: [serviceItemType]}),
    defineField({name: 'cat3', type: 'string'}),
    defineField({name: 'businessInsurance', type: 'array', of: [serviceItemType]}),
    defineField({name: 'cat4', type: 'string'}),
    defineField({name: 'travelProperty', type: 'array', of: [serviceItemType]}),
  ],
})

export const industriesPreviewBlock = defineType({
  name: 'industriesPreviewBlock',
  title: 'Industries Preview',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'description', type: 'text'}),
    defineField({name: 'ctaText', type: 'string'}),
    defineField({name: 'ctaButtonText', type: 'string'}),
  ],
})

export const whyPreviewBlock = defineType({
  name: 'whyPreviewBlock',
  title: 'Why Preview',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({
      name: 'points',
      type: 'array',
      of: [{type: 'object', fields: [{name: 'title', type: 'string'}, {name: 'description', type: 'text'}, {name: 'image', type: 'string'}]}]
    }),
  ],
})

export const trustMockupPreviewBlock = defineType({
  name: 'trustMockupPreviewBlock',
  title: 'Trust Mockup Preview',
  type: 'object',
  fields: [
    defineField({name: 'badgeText', type: 'string'}),
    defineField({name: 'titlePrefix', type: 'string'}),
    defineField({name: 'titleHighlight', type: 'string'}),
    defineField({name: 'description', type: 'text'}),
    defineField({name: 'imageSrc', type: 'string'}),
    defineField({
      name: 'badges',
      type: 'array',
      of: [{type: 'object', fields: [{name: 'title', type: 'string'}, {name: 'subtitle', type: 'string'}, {name: 'icon', type: 'string'}]}]
    }),
  ],
})

export const companyLogosMarqueeBlock = defineType({
  name: 'companyLogosMarqueeBlock',
  title: 'Company Logos Marquee',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'description', type: 'text'}),
    defineField({name: 'logos', type: 'array', of: [{type: 'string'}]}),
  ],
})
