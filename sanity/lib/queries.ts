import { groq } from 'next-sanity'

// Base portfolio query - gets all portfolios with multilingual content
export const homepageQuery = `*[_type == "homepage"][0] {
  hero_arrival,
  hero_person,
  accomodation_title,
  accomodation_subtitle,
  accomodation_start,
  accomodation_night,
  accomodation_discover,

  why_title,
  why_description,

  testimony_title,
  testimony_description,

  find_plan_title,
  find_plan_description,
  find_plan_image {
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        lqip,
        hotspot
      }
    }
  },

  contact_us,
}`

export const heroSectionQuery = `*[_type == "heroSection"]{
  _id,
  title,
  subtitle,
  image {
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        lqip,
        hotspot
      }
    }
  }
}`;

// Get single portfolio by ID
export const singlePortfolioQuery = groq`
  *[_type == "portfolio" && _id == $id][0] {
    _id,
    _createdAt,
    _updatedAt,
    title {
      en,
      de,
      it
    },
    subtitle {
      en,
      de,
      it
    },
    description {
      en,
      de,
      it
    },
    tags[] {
      en,
      de,
      it
    },
    testimonial {
      en,
      de,
      it
    },
    author,
    role,
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    wideIcon {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    }
  }
`

// Article Queries
export const articlesQuery = `*[_type == "article"] | order(_createdAt desc) {
  _id,
  _createdAt,
  title,
  excerpt,
  backgroundImage {
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        lqip,
        hotspot
      }
    }
  },
  readTime
}`

export const singleArticleQuery = `*[_type == "article" && _id == $id][0] {
  _id,
  _createdAt,
  title,
  excerpt,
  backgroundImage {
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        lqip,
        hotspot
      }
    }
  },
  readTime
}`