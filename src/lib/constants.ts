export const SITE_CONFIG = {
  name: 'Ecstatic Sunday',
  tagline: 'Move. Connect. Transform.',
  description:
    'A weekly ecstatic dance gathering in Mazunte, Mexico — where rhythm meets community under the sun.',
  url: 'https://ecstaticsunday.com',
  locale: 'en_US',
  currency: 'MXN',
} as const;

export const NAV_LINKS = [
  { label: 'Events', href: '/events' },
  { label: 'Facilitators', href: '/facilitators' },
  { label: 'Community', href: '/community' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'Guidelines', href: '/guidelines' },
  { label: 'Blog', href: '/blog' },
] as const;

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/ecstaticsunday',
} as const;

export const SCHEDULE_SLOTS = [
  { time: '12:00 PM', label: 'Doors Open', description: 'Arrive, settle in, set your intention' },
  { time: '12:30 PM', label: 'Opening Circle', description: 'Grounding meditation and community connection' },
  { time: '1:00 PM', label: 'Ecstatic Wave', description: 'DJ-led dance journey — from slow builds to peak energy' },
  { time: '3:00 PM', label: 'Sound Bath', description: 'Cool-down with live instruments and vocal harmonics' },
  { time: '3:30 PM', label: 'Closing Circle', description: 'Sharing, gratitude, and community connection' },
] as const;

export const DEFAULT_PRICING = {
  amount: 300,
  currency: 'MXN',
  volunteerDiscount: 'Free entry for Angel Team volunteers',
} as const;

export const VENUE_LOCATION = {
  name: 'Mazunte, Oaxaca, Mexico',
  coordinates: { lat: 15.6686, lng: -96.5542 },
  googleMapsUrl: 'https://maps.google.com/?q=15.6686,-96.5542',
} as const;
