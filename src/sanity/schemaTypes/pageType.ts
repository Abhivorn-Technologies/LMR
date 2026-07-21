import {defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'headingBlock'},
        {type: 'richTextBlock'},
        {type: 'imageBlock'},
        {type: 'callToActionBlock'},
        {type: 'faqAccordionBlock'},
        {type: 'buttonBlock'},
        {type: 'iconBlock'},
        {type: 'heroBlock'},
        {type: 'statsBarBlock'},
        {type: 'servicesPreviewBlock'},
        {type: 'industriesPreviewBlock'},
        {type: 'whyPreviewBlock'},
        {type: 'trustMockupPreviewBlock'},
        {type: 'companyLogosMarqueeBlock'},
      ],
    }),
  ],
})
