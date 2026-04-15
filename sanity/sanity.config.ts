import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schema'

export default defineConfig({
  name: 'candee-currie-studio',
  title: 'Candee Currie | Content Studio',
  projectId: 'ej27mt39',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Site Settings
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),

            // Seller Hub (P0 Priority)
            S.listItem()
              .title('🎯 Seller Hub')
              .child(
                S.list()
                  .title('Seller Hub')
                  .items([
                    S.listItem()
                      .title('All Seller Guides')
                      .child(
                        S.documentTypeList('sellerGuide')
                          .title('Seller Guides')
                          .defaultOrdering([{ field: 'priority', direction: 'asc' }])
                      ),
                    S.divider(),
                    S.listItem()
                      .title('By Category')
                      .child(
                        S.documentTypeList('sellerGuide')
                          .title('Seller Guides by Category')
                          .child((categoryId) =>
                            S.documentTypeList('sellerGuide')
                              .title('Guides')
                              .filter('_type == "sellerGuide" && category == $categoryId')
                              .params({ categoryId })
                          )
                      ),
                    S.divider(),
                    S.listItem()
                      .title('P0 — Critical')
                      .child(
                        S.documentTypeList('sellerGuide')
                          .title('P0 Seller Guides')
                          .filter('_type == "sellerGuide" && priority == "P0"')
                      ),
                    S.listItem()
                      .title('P1 — High')
                      .child(
                        S.documentTypeList('sellerGuide')
                          .title('P1 Seller Guides')
                          .filter('_type == "sellerGuide" && priority == "P1"')
                      ),
                  ])
              ),

            // Blog (P1 Priority)
            S.listItem()
              .title('📝 Blog Posts')
              .child(
                S.list()
                  .title('Blog Posts')
                  .items([
                    S.documentTypeListItem('post').title('All Posts'),
                    S.listItem()
                      .title('By Pillar')
                      .child(
                        S.documentTypeList('post')
                          .title('Posts by Content Pillar')
                          .child((pillar) =>
                            S.documentTypeList('post')
                              .title('Posts')
                              .filter('_type == "post" && contentPillar == $pillar')
                              .params({ pillar })
                          )
                      ),
                    S.listItem()
                      .title('Cornerstone Content')
                      .child(
                        S.documentTypeList('post')
                          .title('Cornerstone Posts')
                          .filter('_type == "post" && isCornerstone == true')
                      ),
                  ])
              ),

            // Market Hub (P2 - Coming Soon)
            S.listItem()
              .title('📊 Market Hub (Soon)')
              .child(
                S.documentTypeList('marketHub')
                  .title('Market Hub Pages')
              ),

            // Neighborhoods (P2 - Coming Soon)
            S.listItem()
              .title('📍 Neighborhoods (Soon)')
              .child(
                S.documentTypeList('neighborhoodSellerPage')
                  .title('Seller-Facing Neighborhood Pages')
              ),

            S.divider(),

            // Testimonials
            S.listItem()
              .title('💬 Testimonials')
              .child(S.documentTypeList('testimonial').title('Testimonials')),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
