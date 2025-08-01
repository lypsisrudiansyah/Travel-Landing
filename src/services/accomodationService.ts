import { client } from '@/../sanity/lib/client'
import { accomodationQuery } from '@/../sanity/lib/queries'
import { AccommodationSection, LocalizedAccommodation } from '@/types/accomodationType'
import { Language } from '@/types/masterType'

export const accommodationService = {
  getAllAccommodations: async (lang: Language): Promise<LocalizedAccommodation[]> => {
    try {
      const accommodations = await client.fetch<AccommodationSection[]>(accomodationQuery)
      console.log('Fetched accommodations:', accommodations)
      return accommodations.map(accom => localizeAccommodationSection(accom, lang))
    } catch (error) {
      console.error('Failed to fetch accommodations:', error)
      return []
    }
  }
}

function localizeAccommodationSection(data: AccommodationSection, lang: Language): LocalizedAccommodation {
  return {
    title: data.title[lang],
    subtitle: data.subtitle[lang],
    price: data.price,
    image: data.image,
  }
}
