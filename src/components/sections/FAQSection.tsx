'use client';

import { motion } from 'framer-motion';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui';
import type { FAQ } from '@/types';

const FALLBACK_FAQS: Partial<FAQ>[] = [
  {
    _id: '1',
    question: 'Do I need dance experience?',
    answer: 'Absolutely not! Ecstatic dance is for everyone. There are no steps to learn, no right or wrong way to move. Just let the music guide you.',
    category: 'general',
  },
  {
    _id: '2',
    question: 'What should I wear?',
    answer: 'Comfortable, breathable clothes you can move freely in. We dance barefoot, so no shoes needed on the dance floor.',
    category: 'general',
  },
  {
    _id: '3',
    question: 'Can I bring my kids?',
    answer: 'Children are welcome when accompanied by a parent/guardian. We love seeing families dance together!',
    category: 'general',
  },
  {
    _id: '4',
    question: 'How do I volunteer?',
    answer: 'Visit our Volunteer page to see available Angel Team roles. Volunteers get free entry and become part of our core community.',
    category: 'volunteer',
  },
];

interface FAQSectionProps {
  faqs?: Partial<FAQ>[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const items = faqs?.length ? faqs : FALLBACK_FAQS;

  return (
    <section className="section bg-[var(--background-alt)]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-orange)] mb-3">
            Questions?
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--foreground)]">
            Frequently Asked
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible>
            {items.map((faq, index) => (
              <motion.div
                key={faq._id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <AccordionItem value={faq._id || String(index)}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
