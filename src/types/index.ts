import type { PortableTextBlock } from '@portabletext/react';

// Sanity Image
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

// Site Settings
export interface SiteSettings {
  _id: string;
  siteName: string;
  tagline: string;
  description: string;
  logo?: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    spotify?: string;
  };
  location: {
    name: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    googleMapsUrl: string;
  };
  pricing: {
    amount: number;
    currency: string;
    volunteerDiscount?: string;
  };
  defaultSchedule: ScheduleSlot[];
  announcementBar?: {
    enabled: boolean;
    text: string;
    link?: string;
  };
}

export interface ScheduleSlot {
  time: string;
  label: string;
  description: string;
}

// Event
export interface Event {
  _id: string;
  title: string;
  slug: SanitySlug;
  date: string;
  endDate?: string;
  theme?: string;
  description?: string;
  body?: PortableTextBlock[];
  status: 'upcoming' | 'live' | 'past' | 'cancelled';
  lineup: FacilitatorRef[];
  photos: string[];
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface FacilitatorRef {
  _id: string;
  name: string;
  slug: SanitySlug;
  role: string;
  photo?: string;
}

// Facilitator
export interface Facilitator {
  _id: string;
  name: string;
  slug: SanitySlug;
  role: 'dj' | 'workshop-leader' | 'sound-guide' | 'facilitator';
  bio?: PortableTextBlock[];
  shortBio?: string;
  photo?: string;
  socials?: {
    instagram?: string;
    soundcloud?: string;
    spotify?: string;
    website?: string;
  };
  musicLinks?: {
    label: string;
    url: string;
  }[];
  featured?: boolean;
  pastEvents?: {
    _id: string;
    title: string;
    slug: SanitySlug;
    date: string;
    theme?: string;
  }[];
}

// Guideline
export interface Guideline {
  _id: string;
  type: 'do' | 'dont';
  title: string;
  description: string;
  icon?: string;
  order: number;
}

// Testimonial
export interface Testimonial {
  _id: string;
  name: string;
  quote: string;
  photo?: string;
  videoUrl?: string;
  featured?: boolean;
}

// Gallery Image
export interface GalleryImage {
  _id: string;
  image: string;
  alt?: string;
  tags?: string[];
  photographer?: string;
  event?: {
    _id: string;
    title: string;
    slug: SanitySlug;
  };
}

// Volunteer Role
export interface VolunteerRole {
  _id: string;
  title: string;
  description: string;
  timeCommitment: string;
  spots: number;
  spotsRemaining?: number;
  benefits?: string[];
  icon?: string;
}

// Blog Post
export interface BlogPost {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  body: PortableTextBlock[];
  featuredImage?: string;
  author?: {
    name: string;
    photo?: string;
  };
  categories?: string[];
  publishedAt: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

// FAQ
export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

// Venue
export interface Venue {
  _id: string;
  name: string;
  description?: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  amenities: {
    label: string;
    icon?: string;
  }[];
  capacity?: number;
  photos?: string[];
  parkingInfo?: string;
  accessibilityInfo?: string;
}

// Volunteer Form
export interface VolunteerFormData {
  name: string;
  email: string;
  phone?: string;
  preferredRole: string;
  experience?: string;
  availability: string;
  message?: string;
}

// Newsletter
export interface NewsletterFormData {
  email: string;
  firstName?: string;
}
