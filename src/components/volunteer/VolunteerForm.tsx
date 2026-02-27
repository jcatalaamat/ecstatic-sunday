'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle } from 'lucide-react';
import { Button, Input, Textarea } from '@/components/ui';
import type { VolunteerRole } from '@/types';

const volunteerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  preferredRole: z.string().min(1, 'Please select a role'),
  experience: z.string().optional(),
  availability: z.string().min(1, 'Please describe your availability'),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof volunteerSchema>;

interface VolunteerFormProps {
  roles?: VolunteerRole[];
}

export function VolunteerForm({ roles }: VolunteerFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(volunteerSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-12 h-12 text-[var(--color-orange)] mx-auto mb-4" />
        <h3 className="font-heading text-2xl font-semibold text-[var(--foreground)] mb-2">
          Application Received!
        </h3>
        <p className="text-[var(--foreground-muted)]">
          Thank you for wanting to join the Angel Team. We&apos;ll be in touch soon!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Name"
          placeholder="Your name"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <Input
        label="Phone (optional)"
        placeholder="+52 ..."
        error={errors.phone?.message}
        {...register('phone')}
      />

      <div className="w-full">
        <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
          Preferred Role
        </label>
        <select
          className="w-full rounded-lg border border-white/10 bg-[var(--background-card)] px-4 py-3 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent"
          {...register('preferredRole')}
        >
          <option value="">Select a role...</option>
          {roles?.map((role) => (
            <option key={role._id} value={role.title}>
              {role.title}
            </option>
          )) || (
            <>
              <option value="Setup Crew">Setup Crew</option>
              <option value="Door & Welcome">Door & Welcome</option>
              <option value="Space Holder">Space Holder</option>
              <option value="Cleanup Crew">Cleanup Crew</option>
              <option value="Photography">Photography</option>
            </>
          )}
        </select>
        {errors.preferredRole && (
          <p className="mt-1 text-sm text-[var(--color-red)]">{errors.preferredRole.message}</p>
        )}
      </div>

      <Input
        label="Availability"
        placeholder="e.g., Every Sunday, Twice a month..."
        error={errors.availability?.message}
        {...register('availability')}
      />

      <Textarea
        label="Experience (optional)"
        placeholder="Tell us about any relevant experience..."
        {...register('experience')}
      />

      <Textarea
        label="Message (optional)"
        placeholder="Anything else you'd like to share?"
        {...register('message')}
      />

      {status === 'error' && (
        <p className="text-sm text-[var(--color-red)]">Something went wrong. Please try again.</p>
      )}

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        fullWidth
        isLoading={status === 'loading'}
        rightIcon={<Send className="w-5 h-5" />}
      >
        Submit Application
      </Button>
    </form>
  );
}
