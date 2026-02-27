import { SITE_CONFIG, VENUE_LOCATION, SOCIAL_LINKS } from '@/lib/constants';

export function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    sameAs: [SOCIAL_LINKS.instagram].filter(Boolean),
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mazunte',
      addressRegion: 'Oaxaca',
      addressCountry: 'MX',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: VENUE_LOCATION.coordinates.lat,
      longitude: VENUE_LOCATION.coordinates.lng,
    },
    sameAs: [SOCIAL_LINKS.instagram].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </>
  );
}

export function EventStructuredData({
  name,
  description,
  startDate,
  endDate,
  url,
}: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  url: string;
}) {
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'DanceEvent',
    name,
    description,
    startDate,
    endDate,
    url,
    location: {
      '@type': 'Place',
      name: VENUE_LOCATION.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Mazunte',
        addressRegion: 'Oaxaca',
        addressCountry: 'MX',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: VENUE_LOCATION.coordinates.lat,
        longitude: VENUE_LOCATION.coordinates.lng,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(eventSchema),
      }}
    />
  );
}
