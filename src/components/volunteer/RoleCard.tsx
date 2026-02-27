import { Clock, Users, Gift } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import type { VolunteerRole } from '@/types';

interface RoleCardProps {
  role: VolunteerRole;
}

export function RoleCard({ role }: RoleCardProps) {
  return (
    <Card variant="glass" hover className="h-full">
      <h3 className="font-heading text-lg font-semibold text-[var(--foreground)] mb-2">
        {role.title}
      </h3>
      {role.description && (
        <p className="text-sm text-[var(--foreground-muted)] mb-4">{role.description}</p>
      )}

      <div className="space-y-2 text-sm">
        {role.timeCommitment && (
          <p className="flex items-center gap-2 text-[var(--foreground-muted)]">
            <Clock className="w-4 h-4 text-[var(--color-orange)]" />
            {role.timeCommitment}
          </p>
        )}
        {typeof role.spotsRemaining === 'number' && (
          <p className="flex items-center gap-2 text-[var(--foreground-muted)]">
            <Users className="w-4 h-4 text-[var(--color-orange)]" />
            {role.spotsRemaining} of {role.spots} spots available
          </p>
        )}
      </div>

      {role.benefits && role.benefits.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/5">
          <p className="text-xs font-medium text-[var(--color-gold)] flex items-center gap-1 mb-2">
            <Gift className="w-3 h-3" /> Benefits
          </p>
          <div className="flex flex-wrap gap-2">
            {role.benefits.map((benefit) => (
              <Badge key={benefit} variant="secondary" className="text-[10px]">
                {benefit}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
