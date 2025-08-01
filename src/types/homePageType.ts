import { LocalizedString } from "./masterType"

export interface Homepage {
  hero_arrival: LocalizedString
  hero_person: LocalizedString
  accomodation_title: LocalizedString
  accomodation_start: LocalizedString
  accomodation_night: LocalizedString

  why_title: LocalizedString
  why_description: LocalizedString

  testimony_title: LocalizedString
  testimony_description: LocalizedString

  find_plan_title: LocalizedString
  find_plan_description: LocalizedString
  find_plan_image: {
    asset: {
      _id: string
      url: string
    }
  }

  contact_us: LocalizedString
//   content_by: string
}

export interface LocalizedHomepage {
  hero_arrival: string
  hero_person: string
  accomodation_title: string
//   accomodation_subtitle: string
  accomodation_start: string
  accomodation_night: string

  why_title: string
  why_description: string

  testimony_title: string
  testimony_description: string

  find_plan_title: string
  find_plan_description: string
  find_plan_image: Homepage['find_plan_image']

  contact_us: string
}
