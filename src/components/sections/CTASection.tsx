'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Sunset gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-orange)] via-[var(--color-red)] to-[var(--color-amber)]" />
      <div className="absolute inset-0 bg-[var(--color-black)]/30" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white/5 blur-[80px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/5 blur-[60px] translate-x-1/2 translate-y-1/2" />

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Join Us This Sunday
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-8">
            Step onto the dance floor. Let the rhythm move you.
            Be part of something beautiful.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/events"
              size="lg"
              className="bg-white text-[var(--color-black)] hover:bg-white/90 shadow-xl"
              leftIcon={<Calendar className="w-5 h-5" />}
            >
              See Upcoming Events
            </Button>
            <Button
              href="/volunteer"
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[var(--color-black)]"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Become an Angel
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
