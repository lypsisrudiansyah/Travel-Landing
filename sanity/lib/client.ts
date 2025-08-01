import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-13',
  useCdn: process.env.NODE_ENV === 'production',
  // Add token if you need to make authenticated requests
  token: process.env.SANITY_API_TOKEN,
})