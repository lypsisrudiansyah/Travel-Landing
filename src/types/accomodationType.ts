import { LocalizedString } from './masterType'

export interface AccommodationSection {
  title: LocalizedString
  subtitle: LocalizedString
  price: number
  image: {
    asset: {
      _id: string
      url: string
    }
  }
}

export interface LocalizedAccommodation {
  title: string
  subtitle: string
  price: number
  image?: AccommodationSection['image']
}