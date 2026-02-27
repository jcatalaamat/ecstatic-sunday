import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'facebook', type: 'url', title: 'Facebook' },
        { name: 'youtube', type: 'url', title: 'YouTube' },
        { name: 'spotify', type: 'url', title: 'Spotify' },
      ],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        { name: 'name', type: 'string', title: 'Location Name' },
        { name: 'address', type: 'string', title: 'Address' },
        {
          name: 'coordinates',
          type: 'object',
          title: 'Coordinates',
          fields: [
            { name: 'lat', type: 'number', title: 'Latitude' },
            { name: 'lng', type: 'number', title: 'Longitude' },
          ],
        },
        { name: 'googleMapsUrl', type: 'url', title: 'Google Maps URL' },
      ],
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        { name: 'amount', type: 'number', title: 'Entry Price' },
        { name: 'currency', type: 'string', title: 'Currency' },
        { name: 'volunteerDiscount', type: 'string', title: 'Volunteer Discount Note' },
      ],
    }),
    defineField({
      name: 'defaultSchedule',
      title: 'Default Schedule',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'time', type: 'string', title: 'Time' },
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'description', type: 'string', title: 'Description' },
          ],
        },
      ],
    }),
    defineField({
      name: 'announcementBar',
      title: 'Announcement Bar',
      type: 'object',
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Enabled' },
        { name: 'text', type: 'string', title: 'Text' },
        { name: 'link', type: 'string', title: 'Link' },
      ],
    }),
  ],
  preview: {
    select: { title: 'siteName' },
  },
});
