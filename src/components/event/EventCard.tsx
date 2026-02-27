'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Users } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import type { Event } from '@/types';

const statusColors = {
  upcoming: 'primary',
  live: 'accent',
  past: 'default',
  cancelled: 'default',
} as const;

interface EventCardProps {
  event: Partial<Event>;
}

export function EventCard({ event }: EventCardProps) {
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
    <Link href={`/events/${event.slug?.current || ''}`}>
      <Card variant="glass" hover glow className="overflow-hidden p-0 h-full">
        {/* Image */}
        {event.featuredImage && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={event.featuredImage}
              alt={event.title || ''}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 gradient-overlay" />
            <div className="absolute top-4 left-4">
              <Badge variant={statusColors[event.status || 'upcoming']}>
                {event.status === 'live' ? 'Happening Now' : event.status?.charAt(0).toUpperCase() + (event.status?.slice(1) || '')}
              </Badge>
            </div>
          </div>
        )}

        <div className="p-6">
          {event.theme && (
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-orange)] mb-2">
              {event.theme}
            </p>
          )}

          <h3 className="font-heading text-xl font-semibold text-[var(--foreground)] mb-3">
            {event.title}
          </h3>

          <div className="space-y-2 text-sm text-[var(--foreground-muted)]">
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--color-orange)]" />
              {dateStr}
            </p>
            {timeStr && (
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--color-orange)]" />
                {timeStr}
              </p>
            )}
            {event.lineup && event.lineup.length > 0 && (
              <p className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[var(--color-orange)]" />
                {event.lineup.map((f) => f.name).join(', ')}
              </p>
            )}
          </div>

          {event.description && (
            <p className="text-sm text-[var(--foreground-muted)] mt-3 line-clamp-2">
              {event.description}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}
