import type { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { allEventsQuery } from '@/sanity/lib/queries';
import { EventCard } from '@/components/event';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import type { Event } from '@/types';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming and past Ecstatic Sunday dance events in Mazunte, Mexico.',
};

async function getEvents(): Promise<Event[]> {
  try {
    return await client.fetch(allEventsQuery);
  } catch {
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();
  const upcoming = events.filter((e) => e.status === 'upcoming' || e.status === 'live');
  const past = events.filter((e) => e.status === 'past');

  return (
    <div className="pt-24 section">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-orange)] mb-3">
            Dance Calendar
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--foreground)]">
            Events
          </h1>
        </div>

        <Tabs defaultValue="upcoming" className="max-w-4xl mx-auto">
          <TabsList className="mx-auto flex w-fit mb-8">
            <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {upcoming.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcoming.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-[var(--foreground-muted)]">No upcoming events yet. Check back soon!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            {past.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {past.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-[var(--foreground-muted)]">No past events to show.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
