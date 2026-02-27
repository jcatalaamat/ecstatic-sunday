import type { Metadata } from 'next';
import {
  Heart,
  VolumeX,
  CameraOff,
  Footprints,
  SmilePlus,
  ShieldCheck,
  Ban,
  MessageCircleOff,
  Droplets,
  Music,
  HandHeart,
  Eye,
} from 'lucide-react';
import { Card } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Guidelines',
  description: 'Dance floor guidelines and consent practices for Ecstatic Sunday in Mazunte.',
};

const GUIDELINES = {
  dos: [
    { title: 'Move freely', description: 'Express yourself through movement — there is no right or wrong way to dance. Let the music guide your body.', icon: <Footprints className="w-6 h-6" /> },
    { title: 'Respect boundaries', description: 'Always ask with your eyes or a gesture before initiating physical contact. A smile and a nod goes a long way.', icon: <ShieldCheck className="w-6 h-6" /> },
    { title: 'Stay present', description: 'Leave the outside world at the door. This is your time to be fully in your body and in the moment.', icon: <Heart className="w-6 h-6" /> },
    { title: 'Make eye contact', description: 'Connection starts with the eyes. Smiles and eye contact are the language of the dance floor.', icon: <SmilePlus className="w-6 h-6" /> },
    { title: 'Stay hydrated', description: 'There is a water station available. Take breaks when you need them — listen to your body.', icon: <Droplets className="w-6 h-6" /> },
    { title: 'Honor the music', description: 'The DJ takes you on a journey. Trust the waves — from slow builds to peak energy to cool-down.', icon: <Music className="w-6 h-6" /> },
    { title: 'Practice consent', description: 'If someone declines an invitation to dance together, receive it gracefully. No means no, always.', icon: <HandHeart className="w-6 h-6" /> },
    { title: 'Be aware of space', description: 'Notice the dancers around you. Give everyone enough room to move freely without bumping.', icon: <Eye className="w-6 h-6" /> },
  ],
  donts: [
    { title: 'No talking on the dance floor', description: 'The dance space is a sacred silent zone. Chat and catch up in the chill area instead.', icon: <MessageCircleOff className="w-6 h-6" /> },
    { title: 'No phones or cameras', description: 'Keep all devices away. This protects everyone\'s privacy and keeps the space sacred.', icon: <CameraOff className="w-6 h-6" /> },
    { title: 'No shoes on the floor', description: 'Dance barefoot or in socks. This protects the space and helps you feel grounded in your body.', icon: <Ban className="w-6 h-6" /> },
    { title: 'No alcohol or substances', description: 'Come sober. The music and movement are the medicine — let the natural high carry you.', icon: <VolumeX className="w-6 h-6" /> },
  ],
};

export default function GuidelinesPage() {
  return (
    <div className="pt-24 section">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-orange)] mb-3">
            Sacred Space
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
            Dance Floor Guidelines
          </h1>
          <p className="text-lg text-[var(--foreground-muted)] max-w-2xl mx-auto">
            These guidelines help us create a safe, respectful, and transformative space for everyone.
            By entering the dance floor, you agree to honor these agreements.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Do's */}
          <div className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-[var(--color-orange)] mb-8 flex items-center gap-2">
              <Heart className="w-6 h-6" /> What We Encourage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GUIDELINES.dos.map((item) => (
                <Card key={item.title} variant="glass" hover>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--color-orange)]/10 flex items-center justify-center text-[var(--color-orange)]">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-[var(--foreground)]">{item.title}</h3>
                      <p className="text-sm text-[var(--foreground-muted)] mt-1">{item.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Don'ts */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-[var(--color-red)] mb-8 flex items-center gap-2">
              <Ban className="w-6 h-6" /> What We Ask You Not To Do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GUIDELINES.donts.map((item) => (
                <Card key={item.title} variant="glass" hover>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--color-red)]/10 flex items-center justify-center text-[var(--color-red)]">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-[var(--foreground)]">{item.title}</h3>
                      <p className="text-sm text-[var(--foreground-muted)] mt-1">{item.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
