import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Music } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { facilitatorsQuery } from '@/sanity/lib/queries';
import { Card, Badge } from '@/components/ui';
import type { Facilitator } from '@/types';

export const metadata: Metadata = {
  title: 'Facilitators',
  description: 'Meet the DJs, workshop leaders, and sound guides behind Ecstatic Sunday.',
};

const roleLabels: Record<string, string> = {
  dj: 'DJ',
  'workshop-leader': 'Workshop Leader',
  'sound-guide': 'Sound Guide',
  facilitator: 'Facilitator',
};

async function getFacilitators(): Promise<Facilitator[]> {
  try {
    return await client.fetch(facilitatorsQuery);
  } catch {
    return [];
  }
}

export default async function FacilitatorsPage() {
  const facilitators = await getFacilitators();

  return (
    <div className="pt-24 section">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-orange)] mb-3">
            The Crew
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--foreground)]">
            Our Facilitators
          </h1>
          <p className="text-[var(--foreground-muted)] mt-4 max-w-xl mx-auto">
            The talented artists and guides who create the sonic and spiritual landscape of each gathering.
          </p>
        </div>

        {facilitators.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {facilitators.map((facilitator) => (
              <Link key={facilitator._id} href={`/facilitators/${facilitator.slug.current}`}>
                <Card variant="glass" hover glow className="text-center h-full">
                  <div className="w-24 h-24 rounded-full bg-[var(--background-card)] border-2 border-[var(--color-orange)]/20 overflow-hidden mb-4 mx-auto">
                    {facilitator.photo ? (
                      <Image
                        src={facilitator.photo}
                        alt={facilitator.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--color-orange)]">
                        <Music className="w-10 h-10" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-[var(--foreground)]">
                    {facilitator.name}
                  </h3>
                  <Badge variant="primary" className="mt-2">
                    {roleLabels[facilitator.role] || facilitator.role}
                  </Badge>
                  {facilitator.shortBio && (
                    <p className="text-sm text-[var(--foreground-muted)] mt-3 line-clamp-3">
                      {facilitator.shortBio}
                    </p>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[var(--foreground-muted)]">Facilitator profiles coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
