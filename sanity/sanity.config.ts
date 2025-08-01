import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas/index'

export default defineConfig({
    name: 'default',
    title: 'TravelApp',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    token: process.env.SANITY_API_TOKEN,
    basePath: '/studio', // This allows studio to run at /studio route
    useCdn: true,
    plugins: [
        structureTool(),
        visionTool()
    ],

    schema: {
        types: schemaTypes,
    },

    // Optional: Custom studio configuration
    studio: {
        components: {
            // You can customize studio components here
        }
    }
})
