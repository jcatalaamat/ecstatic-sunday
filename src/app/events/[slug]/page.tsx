import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { eventBySlugQuery } from '@/sanity/lib/queries';
import { EventCountdown, EventLineup } from '@/components/event';
import { Badge, Button } from '@/components/ui';
import { EventStructuredData } from '@/components/StructuredData';
import { VENUE_LOCATION, SITE_CONFIG } from '@/lib/constants';
import type { Event } from '@/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getEvent(slug: string): Promise<Event | null> {
  try {
    return await client.fetch(eventBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return { title: 'Event Not Found' };

  return {
    title: event.seoTitle || event.title,
    description: event.seoDescription || event.description || `${event.title} at Ecstatic Sunday`,
    openGraph: {
      title: event.title,
      description: event.description || '',
      images: event.featuredImage ? [{ url: event.featuredImage }] : [],
    },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) notFound();

  const dateStr = event.date
    ? new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const timeStr = event.date
    ? new Date(event.date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      })
    : '';

  return (
    <>
      <EventStructuredData
        name={event.title}
        description={event.description || ''}
        startDate={event.date}
        endDate={event.endDate}
        url={`${SITE_CONFIG.url}/events/${event.slug.current}`}
      />

      <article className="pt-24">
        {/* Hero */}
        {event.featuredImage && (
          <div className="relative h-[40vh] md:h-[50vh]">
            <Image
              src={event.featuredImage}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 gradient-overlay" />
          </div>
        )}

        <div className="container section">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              {event.status && (
                <Badge variant={event.status === 'upcoming' ? 'primary' : 'default'} className="mb-4">
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </Badge>
              )}

              {event.theme && (
                <p className="text-sm font-medium tracking-[0.15em] uppercase text-[var(--color-orange)] mb-2">
                  {event.theme}
                </p>
              )}

              <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
                {event.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-[var(--foreground-muted)]">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--color-orange)]" />
                  {dateStr}
                </span>
                {timeStr && (
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[var(--color-orange)]" />
                    {timeStr}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[var(--color-orange)]" />
                  {VENUE_LOCATION.name}
                </span>
              </div>
            </div>

            {/* Countdown */}
            {event.status === 'upcoming' && event.date && (
              <div className="mb-8">
                <EventCountdown targetDate={event.date} />
              </div>
            )}

            {/* Description */}
            {event.description && !event.body && (
              <p className="text-lg text-[var(--foreground-muted)] mb-8">{event.description}</p>
            )}

            {event.body && (
              <div className="prose prose-invert prose-orange max-w-none mb-8">
                <PortableText value={event.body} />
              </div>
            )}

            {/* Lineup */}
            {event.lineup && event.lineup.length > 0 && (
              <div className="mb-8">
                <EventLineup lineup={event.lineup} />
              </div>
            )}

            {/* Photos */}
            {event.photos && event.photos.length > 0 && (
              <div className="mb-8">
                <h3 className="font-heading text-xl font-semibold text-[var(--foreground)] mb-4">Photos</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {event.photos.map((photo, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
                      <Image src={photo} alt="" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button href="/events" variant="ghost" className="mt-4">
              &larr; Back to Events
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
