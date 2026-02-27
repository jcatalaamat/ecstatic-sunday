import Image from 'next/image';
import Link from 'next/link';
import { Music } from 'lucide-react';
import { Badge } from '@/components/ui';
import type { FacilitatorRef } from '@/types';

const roleLabels: Record<string, string> = {
  dj: 'DJ',
  'workshop-leader': 'Workshop',
  'sound-guide': 'Sound',
  facilitator: 'Facilitator',
};

interface EventLineupProps {
  lineup: FacilitatorRef[];
}

export function EventLineup({ lineup }: EventLineupProps) {
  if (!lineup.length) return null;

  return (
    <div>
      <h3 className="font-heading text-xl font-semibold text-[var(--foreground)] mb-4">Lineup</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {lineup.map((person) => (
          <Link
            key={person._id}
            href={`/facilitators/${person.slug?.current || ''}`}
            className="flex items-center gap-3 glass rounded-lg p-3 hover:border-[var(--color-orange)]/20 transition-colors"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-[var(--background-card)]">
              {person.photo ? (
                <Image
                  src={person.photo}
                  alt={person.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--color-orange)]">
                  <Music className="w-5 h-5" />
                </div>
              )}
            </div>
            <div>
              <p className="font-medium text-sm text-[var(--foreground)]">{person.name}</p>
              <Badge variant="primary" className="text-[10px] mt-1">
                {roleLabels[person.role] || person.role}
              </Badge>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
