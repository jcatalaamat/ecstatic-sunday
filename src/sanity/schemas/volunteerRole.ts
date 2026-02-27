import { defineField, defineType } from 'sanity';

export const volunteerRole = defineType({
  name: 'volunteerRole',
  title: 'Volunteer Role',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'timeCommitment',
      title: 'Time Commitment',
      type: 'string',
      description: 'e.g., "2 hours before event + during event"',
    }),
    defineField({
      name: 'spots',
      title: 'Total Spots',
      type: 'number',
    }),
    defineField({
      name: 'spotsRemaining',
      title: 'Spots Remaining',
      type: 'number',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'timeCommitment',
    },
  },
});
