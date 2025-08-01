// schemas/heroSection.ts

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
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
      name: 'subtitle',
      title: 'Subtitle',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'text' }),
        defineField({ name: 'it', title: 'Italian', type: 'text' }),
        defineField({ name: 'de', title: 'German', type: 'text' }),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: false, // no auto-cropping
      },
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'subtitle.en',
    },
    prepare({ title, subtitle }) {
      return {
        title: `title: ${title || 'No Title'}`,
        subtitle: `subt: ${subtitle || 'No Subtitle'}`,
      }
    },
  },
})
