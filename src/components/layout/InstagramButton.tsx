'use client';

import { Instagram } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';

export function InstagramButton() {
  if (!SOCIAL_LINKS.instagram) return null;

  return (
    <a
      href={SOCIAL_LINKS.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-orange)] to-[var(--color-red)] flex items-center justify-center text-white shadow-lg instagram-pulse hover:scale-110 transition-transform"
      aria-label="Follow us on Instagram"
    >
      <Instagram className="w-6 h-6" />
    </a>
  );
}
