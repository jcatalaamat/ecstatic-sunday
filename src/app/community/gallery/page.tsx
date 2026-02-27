import type { Metadata } from 'next';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { galleryImagesQuery } from '@/sanity/lib/queries';
import { Button } from '@/components/ui';
import type { GalleryImage } from '@/types';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photos from Ecstatic Sunday dance events in Mazunte, Mexico.',
};

async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    return await client.fetch(galleryImagesQuery);
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="pt-24 section">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-orange)] mb-3">
            Moments
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--foreground)]">
            Photo Gallery
          </h1>
        </div>

        {images.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {images.map((img) => (
              <div
                key={img._id}
                className="relative break-inside-avoid rounded-lg overflow-hidden group"
              >
                <Image
                  src={img.image}
                  alt={img.alt || 'Ecstatic Sunday'}
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                  <div className="p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.photographer && (
                      <p className="text-xs text-white/80">Photo by {img.photographer}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[var(--foreground-muted)] py-16">Gallery photos coming soon!</p>
        )}

        <div className="text-center mt-12">
          <Button href="/community" variant="ghost">
            &larr; Back to Community
          </Button>
        </div>
      </div>
    </div>
  );
}
