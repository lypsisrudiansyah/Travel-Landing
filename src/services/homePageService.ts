// /services/homepageService.ts

import { client } from '@/../sanity/lib/client'
import { homepageQuery } from '@/../sanity/lib/queries'
// import { Language } from '@/contexts/language-context';
import { Homepage, LocalizedHomepage } from '@/types/homePageType'
import { Language } from '@/types/masterType'

export const homepageService = {
  getHomepage: async (lang: Language): Promise<LocalizedHomepage | null> => {
    try {
      const homepage = await client.fetch<Homepage>(homepageQuery)
      return homepage ? localizeHomepage(homepage, lang) : null
    } catch (error) {
      console.error('Failed to fetch homepage:', error)
      return null
    }
  }
}

function localizeHomepage(data: Homepage, lang: Language): LocalizedHomepage {
  return {
    accomodation_title: data.accomodation_title[lang],
    accomodation_subtitle: data.accomodation_subtitle[lang],
    accomodation_start: data.accomodation_start[lang],
    accomodation_night: data.accomodation_night[lang],

    why_title: data.why_title[lang],
    why_description: data.why_description[lang],

    testimony_title: data.testimony_title[lang],
    testimony_description: data.testimony_description[lang],

    find_plan_title: data.find_plan_title[lang],
    find_plan_description: data.find_plan_description[lang],
    find_plan_image: data.find_plan_image,

    contact_us: data.contact_us[lang],
    content_by: data.content_by,
  }
}
