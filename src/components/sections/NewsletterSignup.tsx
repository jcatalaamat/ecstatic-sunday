'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { Button, Input } from '@/components/ui';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setMessage('Welcome to the tribe! Check your inbox.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="section bg-[var(--background)]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto text-center"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-orange)] mb-3">
            Stay Connected
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
            Join the Tribe
          </h2>
          <p className="text-[var(--foreground-muted)] mb-8">
            Get weekly updates on events, featured DJs, and community stories.
          </p>

          {status === 'success' ? (
            <div className="flex items-center justify-center gap-2 text-[var(--color-orange)]">
              <CheckCircle className="w-5 h-5" />
              <p className="font-medium">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                variant="gradient"
                isLoading={status === 'loading'}
                rightIcon={<Send className="w-4 h-4" />}
              >
                Subscribe
              </Button>
            </form>
          )}

          {status === 'error' && (
            <p className="text-sm text-[var(--color-red)] mt-2">{message}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
