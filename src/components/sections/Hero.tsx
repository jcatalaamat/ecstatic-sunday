'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Calendar } from 'lucide-react';
import { Button } from '@/components/ui';
import { SITE_CONFIG } from '@/lib/constants';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--color-black)]">
        {/* Gradient overlay simulating sunset vibes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-orange)]/10 via-transparent to-[var(--color-black)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-red)]/5 via-transparent to-[var(--color-amber)]/5" />
        {/* Subtle animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[var(--color-orange)]/5 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[var(--color-red)]/5 blur-[100px] animate-float [animation-delay:1.5s]" />
      </div>

      {/* Content */}
      <div className="container relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-[var(--color-orange)] mb-6">
            Every Sunday in Mazunte
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="text-gradient">{SITE_CONFIG.name.toUpperCase()}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="text-xl md:text-2xl text-[var(--foreground-muted)] max-w-2xl mx-auto mb-10"
        >
          {SITE_CONFIG.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href="/events" size="lg" variant="gradient" leftIcon={<Calendar className="w-5 h-5" />}>
            Next Event
          </Button>
          <Button href="/guidelines" size="lg" variant="outline">
            How It Works
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-6 h-6 text-[var(--foreground-muted)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
