import type { StructureResolver } from 'sanity/structure'
import { Iframe } from 'sanity-plugin-iframe-pane'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('LMB Content Manager')
    .items([
      // Site Sections (Pages)
      S.listItem()
        .title('Site Sections')
        .child(
          S.documentTypeList('page')
            .title('Site Pages')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('page')
                .views([
                  S.view.form(),
                  S.view
                    .component(Iframe)
                    .options({
                      url: (doc: any) => {
                        const slug = doc?.slug?.current;
                        if (!slug) return 'http://localhost:3000/api/draft-mode/enable';
                        return `http://localhost:3000/api/draft-mode/enable?sanity-preview-pathname=/${slug === 'home' ? '' : slug}`;
                      },
                      reload: {
                        button: true,
                      },
                    })
                    .title('Live Preview'),
                ])
            )
        ),
      
      S.divider(),
      
      // Collections Placeholder
      S.listItem()
        .title('Collections')
        .child(
          S.list()
            .title('Collections')
            .items([
              // We can add Team Members, Blog Posts, etc. here later
              S.listItem()
                .title('Placeholder (Add content types later)')
                .child(
                  S.documentTypeList('page').title('Placeholder')
                )
            ])
        ),
      
      S.divider(),
      
      // Global Settings Placeholder
      S.listItem()
        .title('Global Settings')
        .child(
          S.document().schemaType('page').documentId('global-settings').title('Global Settings')
        ),
    ])
