// schemas/whyStaySection.ts

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'whyStaySection',
  title: 'Why Stay Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'string' }),
        defineField({ name: 'it', title: 'Italian', type: 'string' }),
        defineField({ name: 'de', title: 'German', type: 'string' }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'text' }),
        defineField({ name: 'it', title: 'Italian', type: 'text' }),
        defineField({ name: 'de', title: 'German', type: 'text' }),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: false, // no auto-cropping
      },
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'description.en',
      media: 'image',
    },
    prepare(selection) {
      return {
        title: selection.title || 'No Title',
        subtitle: selection.subtitle || 'No Description',
        media: selection.media,
      }
    },
  },
})
