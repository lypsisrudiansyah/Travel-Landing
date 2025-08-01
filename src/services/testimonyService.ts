import { client } from '@/../sanity/lib/client'
import { testimonyQuery } from '@/../sanity/lib/queries'
import { Language } from '@/types/masterType'
import { TestimonySection, LocalizedTestimony } from '@/types/testimonyType'

export const testimonyService = {
  getAllTestimonies: async (lang: Language): Promise<LocalizedTestimony[]> => {
    try {
      const items = await client.fetch<TestimonySection[]>(testimonyQuery)
      return items.map(item => localizeTestimony(item, lang))
    } catch (error) {
      console.error('Failed to fetch testimonies:', error)
      return []
    }
  }
}

function localizeTestimony(data: TestimonySection, lang: Language): LocalizedTestimony {
  return {
    name: data.name,
    avatar: data.avatar,
    text: data.text[lang],
    bgColor: data.bgColor,
    textColor: data.textColor,
  }
}
