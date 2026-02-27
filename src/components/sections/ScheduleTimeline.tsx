'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { SCHEDULE_SLOTS } from '@/lib/constants';

export function ScheduleTimeline() {
  return (
    <section className="section bg-[var(--background)]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-orange)] mb-3">
            The Journey
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--foreground)]">
            Sunday Schedule
          </h2>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:flex items-start justify-between gap-4">
          {SCHEDULE_SLOTS.map((slot, index) => (
            <motion.div
              key={slot.time}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-1 text-center relative"
            >
              {/* Connector line */}
              {index < SCHEDULE_SLOTS.length - 1 && (
                <div className="absolute top-5 left-1/2 w-full h-px bg-gradient-to-r from-[var(--color-orange)]/40 to-transparent" />
              )}
              {/* Dot */}
              <div className="relative z-10 w-10 h-10 rounded-full bg-[var(--color-orange)]/20 border-2 border-[var(--color-orange)] flex items-center justify-center mx-auto mb-4">
                <Clock className="w-4 h-4 text-[var(--color-orange)]" />
              </div>
              <p className="text-sm font-semibold text-[var(--color-orange)] mb-1">{slot.time}</p>
              <h3 className="font-heading text-lg font-semibold text-[var(--foreground)] mb-2">{slot.label}</h3>
              <p className="text-sm text-[var(--foreground-muted)]">{slot.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden space-y-0">
          {SCHEDULE_SLOTS.map((slot, index) => (
            <motion.div
              key={slot.time}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex gap-4 relative pb-8 last:pb-0"
            >
              {/* Vertical line */}
              {index < SCHEDULE_SLOTS.length - 1 && (
                <div className="absolute left-5 top-10 w-px h-full bg-[var(--color-orange)]/20" />
              )}
              {/* Dot */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-orange)]/20 border-2 border-[var(--color-orange)] flex items-center justify-center">
                <Clock className="w-4 h-4 text-[var(--color-orange)]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-orange)]">{slot.time}</p>
                <h3 className="font-heading text-lg font-semibold text-[var(--foreground)]">{slot.label}</h3>
                <p className="text-sm text-[var(--foreground-muted)]">{slot.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
