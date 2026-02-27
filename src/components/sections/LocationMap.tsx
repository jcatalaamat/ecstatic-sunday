'use client';

import { motion } from 'framer-motion';
import { MapPin, Trees, Droplets, Wifi, Car, Accessibility } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { VENUE_LOCATION } from '@/lib/constants';

const AMENITIES = [
  { label: 'Open-air venue', icon: <Trees className="w-5 h-5" /> },
  { label: 'Water station', icon: <Droplets className="w-5 h-5" /> },
  { label: 'Free parking', icon: <Car className="w-5 h-5" /> },
  { label: 'Accessible', icon: <Accessibility className="w-5 h-5" /> },
  { label: 'Wi-Fi available', icon: <Wifi className="w-5 h-5" /> },
  { label: 'Chill zone', icon: <MapPin className="w-5 h-5" /> },
];

export function LocationMap() {
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
            Find Us
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--foreground)]">
            The Venue
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card variant="glass" className="overflow-hidden p-0 h-[400px]">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${VENUE_LOCATION.coordinates.lng}!3d${VENUE_LOCATION.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDQwJzA3LjAiTiA5NsKwMzMnMTUuMSJX!5e0!3m2!1sen!2smx!4v1`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ecstatic Sunday venue location"
              />
            </Card>
          </motion.div>

          {/* Info + Amenities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h3 className="font-heading text-xl font-semibold text-[var(--foreground)] mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[var(--color-orange)]" />
                {VENUE_LOCATION.name}
              </h3>
              <p className="text-[var(--foreground-muted)]">
                An open-air paradise where jungle meets ocean. Dance under the sky
                in one of Mexico&apos;s most beautiful coastal villages.
              </p>
              <Button
                href={VENUE_LOCATION.googleMapsUrl}
                variant="outline"
                size="sm"
                className="mt-4"
              >
                Get Directions
              </Button>
            </div>

            <h4 className="font-heading font-semibold text-[var(--foreground)] mb-4">Venue Amenities</h4>
            <div className="grid grid-cols-2 gap-3">
              {AMENITIES.map((amenity) => (
                <Card key={amenity.label} variant="glass" className="p-3 flex items-center gap-3">
                  <div className="text-[var(--color-orange)]">{amenity.icon}</div>
                  <span className="text-sm text-[var(--foreground)]">{amenity.label}</span>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
