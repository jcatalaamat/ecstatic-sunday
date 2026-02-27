'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Music, Instagram } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import type { Facilitator } from '@/types';

const FALLBACK_FACILITATORS: Partial<Facilitator>[] = [
  {
    _id: '1',
    name: 'David Olmec',
    slug: { _type: 'slug', current: 'david-olmec' },
    role: 'dj',
    shortBio: 'Ecstatic dance DJ blending world music with electronic beats. Resident at Ecstatic Sunday since day one.',
  },
  {
    _id: '2',
    name: 'Sandra',
    slug: { _type: 'slug', current: 'sandra' },
    role: 'facilitator',
    shortBio: 'Movement facilitator and opening circle guide. Bringing presence and heart to every gathering.',
  },
];

const roleLabels: Record<string, string> = {
  dj: 'DJ',
  'workshop-leader': 'Workshop Leader',
  'sound-guide': 'Sound Guide',
  facilitator: 'Facilitator',
};

interface FacilitatorCardsProps {
  facilitators?: Partial<Facilitator>[];
}

export function FacilitatorCards({ facilitators }: FacilitatorCardsProps) {
  const items = facilitators?.length ? facilitators : FALLBACK_FACILITATORS;

  return (
    <section className="section bg-[var(--background-alt)]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-orange)] mb-3">
            The Crew
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--foreground)]">
            Meet Our Facilitators
          </h2>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
          {items.map((facilitator, index) => (
            <motion.div
              key={facilitator._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[280px] snap-start"
            >
              <Link href={`/facilitators/${facilitator.slug?.current || ''}`}>
                <Card variant="glass" hover glow className="h-full">
                  {/* Photo */}
                  <div className="w-20 h-20 rounded-full bg-[var(--background-card)] border-2 border-[var(--color-orange)]/20 overflow-hidden mb-4 mx-auto">
                    {facilitator.photo ? (
                      <Image
                        src={facilitator.photo}
                        alt={facilitator.name || ''}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--color-orange)]">
                        <Music className="w-8 h-8" />
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <h3 className="font-heading text-lg font-semibold text-[var(--foreground)]">
                      {facilitator.name}
                    </h3>
                    <Badge variant="primary" className="mt-2">
                      {roleLabels[facilitator.role || ''] || facilitator.role}
                    </Badge>
                    {facilitator.shortBio && (
                      <p className="text-sm text-[var(--foreground-muted)] mt-3 line-clamp-3">
                        {facilitator.shortBio}
                      </p>
                    )}
                    {facilitator.socials?.instagram && (
                      <div className="mt-4">
                        <Instagram className="w-4 h-4 text-[var(--foreground-muted)] mx-auto" />
                      </div>
                    )}
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
