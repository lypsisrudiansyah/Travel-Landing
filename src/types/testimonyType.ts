import { LocalizedString } from './masterType'

export interface TestimonySection {
  name: string
  avatar: {
    asset: {
      _id: string
      url: string
    }
  }
  text: LocalizedString
  bgColor: string
  textColor: string
}

export interface LocalizedTestimony {
  name: string
  avatar: TestimonySection['avatar']
  text: string
  bgColor: string
  textColor: string
}
