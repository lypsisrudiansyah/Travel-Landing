// types/whyStaySectionType.ts

import { LocalizedString } from './masterType'

export interface WhyStaySection {
  title: LocalizedString
  description: LocalizedString
  image: {
    asset: {
      _id: string
      url: string
    }
  }
}

export interface LocalizedWhyStay {
  title: string
  description: string
  image?: WhyStaySection['image']
}
