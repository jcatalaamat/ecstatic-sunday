import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { Music, Instagram, Globe, ExternalLink } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { facilitatorBySlugQuery } from '@/sanity/lib/queries';
import { Badge, Button, Card } from '@/components/ui';
import type { Facilitator } from '@/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getFacilitator(slug: string): Promise<Facilitator | null> {
  try {
    return await client.fetch(facilitatorBySlugQuery, { slug });
  } catch {
    return null;
  }
}

const roleLabels: Record<string, string> = {
  dj: 'DJ',
  'workshop-leader': 'Workshop Leader',
  'sound-guide': 'Sound Guide',
  facilitator: 'Facilitator',
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const facilitator = await getFacilitator(slug);
  if (!facilitator) return { title: 'Not Found' };

  return {
    title: facilitator.name,
    description: facilitator.shortBio || `${facilitator.name} — ${roleLabels[facilitator.role] || facilitator.role} at Ecstatic Sunday`,
  };
}

export default async function FacilitatorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const facilitator = await getFacilitator(slug);

  if (!facilitator) notFound();

  return (
    <div className="pt-24 section">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
            <div className="w-32 h-32 rounded-full bg-[var(--background-card)] border-2 border-[var(--color-orange)]/20 overflow-hidden flex-shrink-0">
              {facilitator.photo ? (
                <Image
                  src={facilitator.photo}
                  alt={facilitator.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--color-orange)]">
                  <Music className="w-12 h-12" />
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="font-heading text-4xl font-bold text-[var(--foreground)]">
                {facilitator.name}
              </h1>
              <Badge variant="primary" className="mt-2">
                {roleLabels[facilitator.role] || facilitator.role}
              </Badge>

              {/* Socials */}
              {facilitator.socials && (
                <div className="flex gap-3 mt-4 justify-center md:justify-start">
                  {facilitator.socials.instagram && (
                    <a href={facilitator.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-[var(--foreground-muted)] hover:text-[var(--color-orange)] transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {facilitator.socials.website && (
                    <a href={facilitator.socials.website} target="_blank" rel="noopener noreferrer" className="text-[var(--foreground-muted)] hover:text-[var(--color-orange)] transition-colors">
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Bio */}
          {facilitator.shortBio && !facilitator.bio && (
            <p className="text-lg text-[var(--foreground-muted)] mb-8">{facilitator.shortBio}</p>
          )}

          {facilitator.bio && (
            <div className="prose prose-invert prose-orange max-w-none mb-8">
              <PortableText value={facilitator.bio} />
            </div>
          )}

          {/* Music Links */}
          {facilitator.musicLinks && facilitator.musicLinks.length > 0 && (
            <div className="mb-8">
              <h3 className="font-heading text-xl font-semibold text-[var(--foreground)] mb-4">Listen</h3>
              <div className="flex flex-wrap gap-3">
                {facilitator.musicLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card variant="glass" className="p-3 flex items-center gap-2 hover:border-[var(--color-orange)]/20 transition-colors">
                      <ExternalLink className="w-4 h-4 text-[var(--color-orange)]" />
                      <span className="text-sm text-[var(--foreground)]">{link.label}</span>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Past Events */}
          {facilitator.pastEvents && facilitator.pastEvents.length > 0 && (
            <div className="mb-8">
              <h3 className="font-heading text-xl font-semibold text-[var(--foreground)] mb-4">Past Events</h3>
              <div className="space-y-2">
                {facilitator.pastEvents.map((event) => (
                  <Link
                    key={event._id}
                    href={`/events/${event.slug.current}`}
                    className="block glass rounded-lg p-3 hover:border-[var(--color-orange)]/20 transition-colors"
                  >
                    <p className="text-sm font-medium text-[var(--foreground)]">{event.title}</p>
                    <p className="text-xs text-[var(--foreground-muted)]">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      {event.theme && ` — ${event.theme}`}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <Button href="/facilitators" variant="ghost">
            &larr; All Facilitators
          </Button>
        </div>
      </div>
    </div>
  );
}
