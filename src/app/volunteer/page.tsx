import type { Metadata } from 'next';
import { Heart, Sparkles } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { volunteerRolesQuery } from '@/sanity/lib/queries';
import { VolunteerForm, RoleCard } from '@/components/volunteer';
import { Card } from '@/components/ui';
import type { VolunteerRole } from '@/types';

export const metadata: Metadata = {
  title: 'Volunteer',
  description: 'Join the Angel Team and help create the magic of Ecstatic Sunday. Free entry for volunteers!',
};

async function getVolunteerRoles(): Promise<VolunteerRole[]> {
  try {
    return (await client.fetch(volunteerRolesQuery)) || [];
  } catch {
    return [];
  }
}

export default async function VolunteerPage() {
  const roles = await getVolunteerRoles();

  return (
    <div className="pt-24 section">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-orange)] mb-3">
            Give Back
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
            Join the Angel Team
          </h1>
          <p className="text-lg text-[var(--foreground-muted)] max-w-2xl mx-auto">
            Our volunteers are the heartbeat of Ecstatic Sunday. In exchange for a few hours of service,
            you get free entry and become part of our core community.
          </p>
        </div>

        {/* Benefits highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <Card variant="glass" className="text-center">
            <Heart className="w-8 h-8 text-[var(--color-orange)] mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-[var(--foreground)]">Free Entry</h3>
            <p className="text-sm text-[var(--foreground-muted)] mt-1">Every session you volunteer</p>
          </Card>
          <Card variant="glass" className="text-center">
            <Sparkles className="w-8 h-8 text-[var(--color-gold)] mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-[var(--foreground)]">Community</h3>
            <p className="text-sm text-[var(--foreground-muted)] mt-1">Be part of the inner circle</p>
          </Card>
          <Card variant="glass" className="text-center">
            <Heart className="w-8 h-8 text-[var(--color-red)] mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-[var(--foreground)]">Growth</h3>
            <p className="text-sm text-[var(--foreground-muted)] mt-1">Develop new skills and connections</p>
          </Card>
        </div>

        {/* Roles */}
        {roles.length > 0 && (
          <div className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-[var(--foreground)] text-center mb-8">
              Available Roles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {roles.map((role) => (
                <RoleCard key={role._id} role={role} />
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <Card variant="gradient" className="p-8">
            <h2 className="font-heading text-2xl font-bold text-[var(--foreground)] text-center mb-8">
              Apply Now
            </h2>
            <VolunteerForm roles={roles} />
          </Card>
        </div>
      </div>
    </div>
  );
}
