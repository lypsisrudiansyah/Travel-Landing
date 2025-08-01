import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonySection',
  title: 'Testimony Section',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'text',
      title: 'Testimony Text',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'text',
        }),
        defineField({
          name: 'de',
          title: 'German',
          type: 'text',
        }),
        defineField({
          name: 'it',
          title: 'Italian',
          type: 'text',
        }),
      ],
    }),
    defineField({
      name: 'bgColor',
      title: 'Background Color (Tailwind Class)',
      type: 'string',
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color (Tailwind Class)',
      type: 'string',
    }),
  ],
})
