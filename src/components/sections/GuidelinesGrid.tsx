'use client';

import { motion } from 'framer-motion';
import {
  Heart,
  VolumeX,
  CameraOff,
  Footprints,
  SmilePlus,
  ShieldCheck,
  Ban,
  MessageCircleOff,
} from 'lucide-react';
import { Card } from '@/components/ui';

const FALLBACK_GUIDELINES = {
  dos: [
    { title: 'Move freely', description: 'Express yourself through movement — no right or wrong way to dance', icon: 'footprints' },
    { title: 'Respect boundaries', description: 'Always ask before initiating physical contact with another dancer', icon: 'shield-check' },
    { title: 'Stay present', description: 'Let go of the outside world and be fully in the moment', icon: 'heart' },
    { title: 'Smile & connect', description: 'Eye contact and smiles are the language of the dance floor', icon: 'smile-plus' },
  ],
  donts: [
    { title: 'No talking on the floor', description: 'The dance floor is a sacred silent space — chat in the chill zone', icon: 'message-circle-off' },
    { title: 'No phones or photos', description: 'Keep devices away to protect everyone\'s space and privacy', icon: 'camera-off' },
    { title: 'No shoes on the floor', description: 'Dance barefoot or in socks to protect the space and feel grounded', icon: 'ban' },
    { title: 'No substances', description: 'Come sober — the music and movement are the medicine', icon: 'volume-x' },
  ],
};

const iconMap: Record<string, React.ReactNode> = {
  heart: <Heart className="w-6 h-6" />,
  'volume-x': <VolumeX className="w-6 h-6" />,
  'camera-off': <CameraOff className="w-6 h-6" />,
  footprints: <Footprints className="w-6 h-6" />,
  'smile-plus': <SmilePlus className="w-6 h-6" />,
  'shield-check': <ShieldCheck className="w-6 h-6" />,
  ban: <Ban className="w-6 h-6" />,
  'message-circle-off': <MessageCircleOff className="w-6 h-6" />,
};

export function GuidelinesGrid() {
  return (
    <section className="section bg-[var(--background-alt)]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-orange)] mb-3">
            Sacred Space
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--foreground)]">
            Dance Floor Guidelines
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Do's */}
          <div>
            <h3 className="font-heading text-xl font-semibold text-[var(--color-orange)] mb-6 flex items-center gap-2">
              <Heart className="w-5 h-5" /> Do&apos;s
            </h3>
            <div className="space-y-4">
              {FALLBACK_GUIDELINES.dos.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card variant="glass" hover>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--color-orange)]/10 flex items-center justify-center text-[var(--color-orange)]">
                        {iconMap[item.icon] || <Heart className="w-6 h-6" />}
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-[var(--foreground)]">{item.title}</h4>
                        <p className="text-sm text-[var(--foreground-muted)] mt-1">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Don'ts */}
          <div>
            <h3 className="font-heading text-xl font-semibold text-[var(--color-red)] mb-6 flex items-center gap-2">
              <Ban className="w-5 h-5" /> Don&apos;ts
            </h3>
            <div className="space-y-4">
              {FALLBACK_GUIDELINES.donts.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card variant="glass" hover>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--color-red)]/10 flex items-center justify-center text-[var(--color-red)]">
                        {iconMap[item.icon] || <Ban className="w-6 h-6" />}
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-[var(--foreground)]">{item.title}</h4>
                        <p className="text-sm text-[var(--foreground-muted)] mt-1">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
