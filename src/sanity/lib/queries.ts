import { groq } from 'next-sanity';

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    description,
    "logo": logo.asset->url,
    socialLinks,
    location,
    pricing,
    defaultSchedule,
    announcementBar
  }
`;

// Events
export const upcomingEventsQuery = groq`
  *[_type == "event" && status == "upcoming"] | order(date asc) {
    _id,
    title,
    slug,
    date,
    endDate,
    theme,
    description,
    status,
    "featuredImage": featuredImage.asset->url,
    "lineup": lineup[]->{
      _id,
      name,
      slug,
      role,
      "photo": photo.asset->url
    }
  }
`;

export const pastEventsQuery = groq`
  *[_type == "event" && status == "past"] | order(date desc) {
    _id,
    title,
    slug,
    date,
    theme,
    status,
    "featuredImage": featuredImage.asset->url,
    "photos": photos[].asset->url
  }
`;

export const allEventsQuery = groq`
  *[_type == "event"] | order(date desc) {
    _id,
    title,
    slug,
    date,
    endDate,
    theme,
    description,
    status,
    "featuredImage": featuredImage.asset->url,
    "lineup": lineup[]->{
      _id,
      name,
      slug,
      role,
      "photo": photo.asset->url
    }
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    date,
    endDate,
    theme,
    description,
    body,
    status,
    "featuredImage": featuredImage.asset->url,
    "lineup": lineup[]->{
      _id,
      name,
      slug,
      role,
      "photo": photo.asset->url,
      shortBio,
      socials,
      musicLinks
    },
    "photos": photos[].asset->url,
    seoTitle,
    seoDescription
  }
`;

export const nextEventQuery = groq`
  *[_type == "event" && status == "upcoming"] | order(date asc)[0] {
    _id,
    title,
    slug,
    date,
    endDate,
    theme,
    "featuredImage": featuredImage.asset->url,
    "lineup": lineup[]->{
      _id,
      name,
      slug,
      role,
      "photo": photo.asset->url
    }
  }
`;

// Facilitators
export const facilitatorsQuery = groq`
  *[_type == "facilitator"] | order(name asc) {
    _id,
    name,
    slug,
    role,
    shortBio,
    "photo": photo.asset->url,
    socials,
    musicLinks,
    featured
  }
`;

export const featuredFacilitatorsQuery = groq`
  *[_type == "facilitator" && featured == true] | order(name asc) {
    _id,
    name,
    slug,
    role,
    shortBio,
    "photo": photo.asset->url,
    socials,
    musicLinks
  }
`;

export const facilitatorBySlugQuery = groq`
  *[_type == "facilitator" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    role,
    bio,
    shortBio,
    "photo": photo.asset->url,
    socials,
    musicLinks,
    "pastEvents": *[_type == "event" && references(^._id)] | order(date desc) {
      _id,
      title,
      slug,
      date,
      theme
    }
  }
`;

// Guidelines
export const guidelinesQuery = groq`
  *[_type == "guideline"] | order(order asc) {
    _id,
    type,
    title,
    description,
    icon,
    order
  }
`;

// Testimonials
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    name,
    quote,
    "photo": photo.asset->url,
    videoUrl,
    featured
  }
`;

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(_createdAt desc) {
    _id,
    name,
    quote,
    "photo": photo.asset->url,
    videoUrl
  }
`;

// Gallery
export const galleryImagesQuery = groq`
  *[_type == "galleryImage"] | order(_createdAt desc) {
    _id,
    "image": image.asset->url,
    alt,
    tags,
    photographer,
    "event": event->{
      _id,
      title,
      slug
    }
  }
`;

export const galleryImagesByTagQuery = groq`
  *[_type == "galleryImage" && $tag in tags] | order(_createdAt desc) {
    _id,
    "image": image.asset->url,
    alt,
    tags,
    photographer
  }
`;

// Volunteer Roles
export const volunteerRolesQuery = groq`
  *[_type == "volunteerRole"] | order(_createdAt asc) {
    _id,
    title,
    description,
    timeCommitment,
    spots,
    spotsRemaining,
    benefits,
    icon
  }
`;

// Blog
export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    "author": author->{name, "photo": photo.asset->url},
    categories,
    publishedAt,
    featured
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    body,
    "author": author->{name, "photo": photo.asset->url},
    categories,
    publishedAt,
    seoTitle,
    seoDescription
  }
`;

export const featuredBlogPostsQuery = groq`
  *[_type == "blogPost" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    publishedAt
  }
`;

// FAQs
export const faqsQuery = groq`
  *[_type == "faq"] | order(category asc, order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`;

export const faqsByCategoryQuery = groq`
  *[_type == "faq" && category == $category] | order(order asc) {
    _id,
    question,
    answer
  }
`;

// Venue
export const venueQuery = groq`
  *[_type == "venue"][0] {
    _id,
    name,
    description,
    address,
    coordinates,
    amenities,
    capacity,
    "photos": photos[].asset->url,
    parkingInfo,
    accessibilityInfo
  }
`;
