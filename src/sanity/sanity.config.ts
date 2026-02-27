import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'ecstatic-sunday',
  title: 'Ecstatic Sunday',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Site Settings (singleton)
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),

            // Events
            S.listItem()
              .title('Events')
              .schemaType('event')
              .child(S.documentTypeList('event').title('Events')),

            // Facilitators
            S.listItem()
              .title('Facilitators')
              .schemaType('facilitator')
              .child(S.documentTypeList('facilitator').title('Facilitators')),

            S.divider(),

            // Guidelines
            S.listItem()
              .title('Guidelines')
              .schemaType('guideline')
              .child(S.documentTypeList('guideline').title('Guidelines')),

            // Testimonials
            S.listItem()
              .title('Testimonials')
              .schemaType('testimonial')
              .child(S.documentTypeList('testimonial').title('Testimonials')),

            // Gallery
            S.listItem()
              .title('Gallery')
              .schemaType('galleryImage')
              .child(S.documentTypeList('galleryImage').title('Gallery Images')),

            S.divider(),

            // Volunteer Roles
            S.listItem()
              .title('Volunteer Roles')
              .schemaType('volunteerRole')
              .child(S.documentTypeList('volunteerRole').title('Volunteer Roles')),

            // Blog
            S.listItem()
              .title('Blog Posts')
              .schemaType('blogPost')
              .child(S.documentTypeList('blogPost').title('Blog Posts')),

            // FAQs
            S.listItem()
              .title('FAQs')
              .schemaType('faq')
              .child(S.documentTypeList('faq').title('FAQs')),

            S.divider(),

            // Venue
            S.listItem()
              .title('Venue')
              .schemaType('venue')
              .child(
                S.document()
                  .schemaType('venue')
                  .documentId('venue')
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
