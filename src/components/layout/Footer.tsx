import Link from 'next/link';
import { Instagram, Heart } from 'lucide-react';
import { NAV_LINKS, SITE_CONFIG, SOCIAL_LINKS, VENUE_LOCATION } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-[var(--color-black)] border-t border-white/5">
      <div className="container section">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-display text-xl font-bold tracking-tight text-[var(--foreground)] hover:text-[var(--color-orange)] transition-colors"
            >
              {SITE_CONFIG.name.toUpperCase()}
            </Link>
            <p className="mt-3 text-sm text-[var(--foreground-muted)] max-w-xs">
              {SITE_CONFIG.description}
            </p>
            <div className="flex gap-4 mt-4">
              {SOCIAL_LINKS.instagram && (
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground-muted)] hover:text-[var(--color-orange)] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-[var(--foreground)] mb-4 uppercase tracking-wider">
              Explore
            </h4>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--foreground-muted)] hover:text-[var(--color-orange)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-[var(--foreground)] mb-4 uppercase tracking-wider">
              Location
            </h4>
            <p className="text-sm text-[var(--foreground-muted)]">{VENUE_LOCATION.name}</p>
            <a
              href={VENUE_LOCATION.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-[var(--color-orange)] hover:underline"
            >
              View on Google Maps
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--foreground-muted)]">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-xs text-[var(--foreground-muted)] flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-[var(--color-red)]" /> in {VENUE_LOCATION.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
