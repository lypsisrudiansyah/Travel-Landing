import { LocalizedString } from "./masterType"

export interface HeroSection {
  title: LocalizedString
  subtitle: LocalizedString
  image: {
    asset: {
      _id: string
      url: string
    }
  }
}

export interface LocalizedHeroSection {
  title: string
  subtitle: string
  image?: HeroSection['image']
}
