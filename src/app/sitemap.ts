import type { MetadataRoute } from 'next';
import { client, isSanityConfigured } from '@/sanity/lib/client';
import { SITE_CONFIG } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/events`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/facilitators`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/volunteer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/community`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/community/gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/guidelines`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  if (!isSanityConfigured) return staticRoutes;

  // Dynamic routes from Sanity
  try {
    const [events, facilitators, blogPosts] = await Promise.all([
      client.fetch<{ slug: { current: string } }[]>(`*[_type == "event"]{ slug }`),
      client.fetch<{ slug: { current: string } }[]>(`*[_type == "facilitator"]{ slug }`),
      client.fetch<{ slug: { current: string } }[]>(`*[_type == "blogPost"]{ slug }`),
    ]);

    const eventRoutes: MetadataRoute.Sitemap = (events || []).map((e) => ({
      url: `${baseUrl}/events/${e.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    const facilitatorRoutes: MetadataRoute.Sitemap = (facilitators || []).map((f) => ({
      url: `${baseUrl}/facilitators/${f.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    const blogRoutes: MetadataRoute.Sitemap = (blogPosts || []).map((p) => ({
      url: `${baseUrl}/blog/${p.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...eventRoutes, ...facilitatorRoutes, ...blogRoutes];
  } catch {
    return staticRoutes;
  }
}
