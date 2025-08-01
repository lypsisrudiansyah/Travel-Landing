import { client } from '@/../sanity/lib/client'
import { heroSectionQuery } from '@/../sanity/lib/queries'
import { HeroSection, LocalizedHeroSection } from '@/types/heroSectionType'
import { Language } from '@/types/masterType'
import { log } from 'console'

export const heroService = {
  getAllHeroes: async (lang: Language): Promise<LocalizedHeroSection[]> => {
    try {
      const heroes = await client.fetch<HeroSection[]>(heroSectionQuery)
      console.log('Fetched heroes 22:', heroes);
      return heroes.map(hero => localizeHeroSection(hero, lang))
    } catch (error) {
      console.error('Failed to fetch hero sections:', error)
      return []
    }
  }
}

function localizeHeroSection(data: HeroSection, lang: Language): LocalizedHeroSection {
  return {
    title: data.title[lang],
    subtitle: data.subtitle[lang],
    image: data.image,
  }
}
