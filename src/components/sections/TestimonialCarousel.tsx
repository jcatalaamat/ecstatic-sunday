'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Carousel, CarouselSlide, Card } from '@/components/ui';
import type { Testimonial } from '@/types';

const FALLBACK_TESTIMONIALS: Partial<Testimonial>[] = [
  {
    _id: '1',
    name: 'Maya',
    quote: 'Ecstatic Sunday changed my life. I found a community that dances like nobody is watching and loves like everybody is family.',
  },
  {
    _id: '2',
    name: 'Carlos',
    quote: 'The music, the energy, the people — every Sunday feels like a mini-festival. It\'s the highlight of my week in Mazunte.',
  },
  {
    _id: '3',
    name: 'Luna',
    quote: 'I came for the dance and stayed for the community. There\'s nothing else like this on the coast.',
  },
];

interface TestimonialCarouselProps {
  testimonials?: Partial<Testimonial>[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const items = testimonials?.length ? testimonials : FALLBACK_TESTIMONIALS;

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
            Community Voices
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--foreground)]">
            What Dancers Say
          </h2>
        </motion.div>

        <Carousel
          autoplay
          autoplayDelay={5000}
          showArrows
          showDots
          className="max-w-3xl mx-auto"
        >
          {items.map((testimonial) => (
            <CarouselSlide key={testimonial._id}>
              <Card variant="glass" className="p-8 md:p-12 text-center">
                <Quote className="w-10 h-10 text-[var(--color-orange)]/40 mx-auto mb-6" />
                <blockquote className="text-lg md:text-xl text-[var(--foreground)] leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <cite className="text-sm font-medium text-[var(--color-orange)] not-italic">
                  — {testimonial.name}
                </cite>
              </Card>
            </CarouselSlide>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
