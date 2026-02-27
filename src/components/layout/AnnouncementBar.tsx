'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface AnnouncementBarProps {
  text: string;
  link?: string;
  className?: string;
}

export function AnnouncementBar({ text, link, className }: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const content = (
    <p className="text-sm font-medium text-center">
      {text}
    </p>
  );

  return (
    <div
      className={cn(
        'relative bg-gradient-to-r from-[var(--color-orange)] via-[var(--color-red)] to-[var(--color-amber)] text-white py-2 px-4',
        className
      )}
    >
      <div className="container flex items-center justify-center">
        {link ? (
          <Link href={link} className="hover:underline">
            {content}
          </Link>
        ) : (
          content
        )}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
