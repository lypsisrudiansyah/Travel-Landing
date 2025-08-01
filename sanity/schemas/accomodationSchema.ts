import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'accomodationSection',
  title: 'Accomodation Section',
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
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.min(0).precision(2),
    }),
    defineField({
      name: 'image',
      title: 'Accomodation Image',
      type: 'image',
      options: {
        hotspot: false,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'subtitle.en',
      price: 'price',
    },
    prepare(selection) {
      return {
        title: `🏠 ${selection.title || 'No Title'}`,
        subtitle: `💬 ${selection.subtitle || ''} | 💰 ${selection.price ?? 'N/A'}`,
      }
    },
  },
})