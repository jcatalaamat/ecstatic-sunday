'use client';

import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { DEFAULT_PRICING } from '@/lib/constants';

export function PricingCard() {
  return (
    <section className="section bg-[var(--background)]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-orange)] mb-3">
            Join Us
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--foreground)]">
            Pricing
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <Card variant="gradient" className="text-center p-8 border-[var(--color-orange)]/20 relative overflow-hidden">
            {/* Glow accent */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[var(--color-orange)]/10 blur-[60px]" />

            <div className="relative z-10">
              <Sparkles className="w-8 h-8 text-[var(--color-orange)] mx-auto mb-4" />
              <p className="text-sm text-[var(--foreground-muted)] uppercase tracking-wider mb-2">Entry</p>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-5xl font-bold font-heading text-gradient">
                  {DEFAULT_PRICING.amount}
                </span>
                <span className="text-xl text-[var(--foreground-muted)]">{DEFAULT_PRICING.currency}</span>
              </div>
              <p className="text-sm text-[var(--foreground-muted)] mb-8">Per Sunday session</p>

              <Button href="/events" variant="gradient" fullWidth>
                Reserve Your Spot
              </Button>

              {DEFAULT_PRICING.volunteerDiscount && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-sm text-[var(--color-gold)] flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4" />
                    {DEFAULT_PRICING.volunteerDiscount}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
