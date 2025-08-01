import { client } from '@/../sanity/lib/client'
import { whyStayQuery } from '@/../sanity/lib/queries'
// import { WhyStaySection, LocalizedWhyStay
import { Language } from '@/types/masterType'
import { LocalizedWhyStay, WhyStaySection } from '@/types/whyStayType'

export const whyStayService = {
  getAllWhyStay: async (lang: Language): Promise<LocalizedWhyStay[]> => {
    try {
      const items = await client.fetch<WhyStaySection[]>(whyStayQuery)
      return items.map(item => localizeWhyStaySection(item, lang))
    } catch (error) {
      console.error('Failed to fetch Why Stay sections:', error)
      return []
    }
  }
}

function localizeWhyStaySection(data: WhyStaySection, lang: Language): LocalizedWhyStay {
  return {
    title: data.title[lang],
    description: data.description[lang],
    image: data.image,
  }
}
