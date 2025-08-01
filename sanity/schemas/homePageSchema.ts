import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'homepage',
    title: 'Home Page',
    type: 'document',
    fields: [
        defineField({
            name: 'hero_arrival',
            title: 'Hero Arrival',
            type: 'object',
            fields: [
                defineField({ name: 'en', title: 'English', type: 'string' }),
                defineField({ name: 'it', title: 'Italian', type: 'string' }),
                defineField({ name: 'de', title: 'German', type: 'string' }),
            ],
        }),
        defineField({
            name: 'hero_person',
            title: 'Hero Person',
            type: 'object',
            fields: [
                defineField({ name: 'en', title: 'English', type: 'string' }),
                defineField({ name: 'it', title: 'Italian', type: 'string' }),
                defineField({ name: 'de', title: 'German', type: 'string' }),
            ],
        }),
        // Accomodation Section
        defineField({
            name: 'accomodation_title',
            title: 'Accomodation Title',
            type: 'object',
            fields: [
                defineField({ name: 'en', title: 'English', type: 'string' }),
                defineField({ name: 'it', title: 'Italian', type: 'string' }),
                defineField({ name: 'de', title: 'German', type: 'string' }),
            ],
        }),
        defineField({
            name: 'accomodation_start',
            title: 'Start From',
            type: 'object',
            fields: [
                defineField({ name: 'en', title: 'English', type: 'string' }),
                defineField({ name: 'it', title: 'Italian', type: 'string' }),
                defineField({ name: 'de', title: 'German', type: 'string' }),
            ],
        }),
        defineField({
            name: 'accomodation_night',
            title: 'Night',
            type: 'object',
            fields: [
                defineField({ name: 'en', title: 'English', type: 'string' }),
                defineField({ name: 'it', title: 'Italian', type: 'string' }),
                defineField({ name: 'de', title: 'German', type: 'string' }),
            ],
        }),

        // Why Here Section
        defineField({
            name: 'why_title',
            title: 'Why Title',
            type: 'object',
            fields: [
                defineField({ name: 'en', title: 'English', type: 'string' }),
                defineField({ name: 'it', title: 'Italian', type: 'string' }),
                defineField({ name: 'de', title: 'German', type: 'string' }),
            ],
        }),
        defineField({
            name: 'why_description',
            title: 'Why Description',
            type: 'object',
            fields: [
                defineField({ name: 'en', title: 'English', type: 'text' }),
                defineField({ name: 'it', title: 'Italian', type: 'text' }),
                defineField({ name: 'de', title: 'German', type: 'text' }),
            ],
        }),

        // Testimony Section
        defineField({
            name: 'testimony_title',
            title: 'Testimony Title',
            type: 'object',
            fields: [
                defineField({ name: 'en', title: 'English', type: 'string' }),
                defineField({ name: 'it', title: 'Italian', type: 'string' }),
                defineField({ name: 'de', title: 'German', type: 'string' }),
            ],
        }),
        defineField({
            name: 'testimony_description',
            title: 'Testimony Description',
            type: 'object',
            fields: [
                defineField({ name: 'en', title: 'English', type: 'text' }),
                defineField({ name: 'it', title: 'Italian', type: 'text' }),
                defineField({ name: 'de', title: 'German', type: 'text' }),
            ],
        }),

        // Find Plan Section
        defineField({
            name: 'find_plan_title',
            title: 'Find Plan Title',
            type: 'object',
            fields: [
                defineField({ name: 'en', title: 'English', type: 'string' }),
                defineField({ name: 'it', title: 'Italian', type: 'string' }),
                defineField({ name: 'de', title: 'German', type: 'string' }),
            ],
        }),
        defineField({
            name: 'find_plan_image',
            title: 'Find Plan Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'find_plan_description',
            title: 'Find Plan Description',
            type: 'object',
            fields: [
                defineField({ name: 'en', title: 'English', type: 'text' }),
                defineField({ name: 'it', title: 'Italian', type: 'text' }),
                defineField({ name: 'de', title: 'German', type: 'text' }),
            ],
        }),

        // Footer Section
        defineField({
            name: 'contact_us',
            title: 'Contact Us',
            type: 'object',
            fields: [
                defineField({ name: 'en', title: 'English', type: 'string' }),
                defineField({ name: 'it', title: 'Italian', type: 'string' }),
                defineField({ name: 'de', title: 'German', type: 'string' }),
            ],
        }),
    ],
})
