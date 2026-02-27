import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Camera, BookOpen } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { featuredTestimonialsQuery, galleryImagesQuery, featuredBlogPostsQuery } from '@/sanity/lib/queries';
import { TestimonialCarousel } from '@/components/sections';
import { Button, Card } from '@/components/ui';
import type { Testimonial, GalleryImage, BlogPost } from '@/types';

export const metadata: Metadata = {
  title: 'Community',
  description: 'Stories, photos, and voices from the Ecstatic Sunday community in Mazunte.',
};

async function getData() {
  try {
    const [testimonials, gallery, posts] = await Promise.all([
      client.fetch<Testimonial[]>(featuredTestimonialsQuery),
      client.fetch<GalleryImage[]>(galleryImagesQuery),
      client.fetch<BlogPost[]>(featuredBlogPostsQuery),
    ]);
    return { testimonials: testimonials || [], gallery: gallery?.slice(0, 6) || [], posts: posts || [] };
  } catch {
    return { testimonials: [], gallery: [], posts: [] };
  }
}

export default async function CommunityPage() {
  const { testimonials, gallery, posts } = await getData();

  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="section bg-[var(--background)]">
        <div className="container text-center">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-orange)] mb-3">
            Our People
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
            Community
          </h1>
          <p className="text-lg text-[var(--foreground-muted)] max-w-2xl mx-auto">
            The heart of Ecstatic Sunday is its people. Explore stories, photos, and voices from our dance community.
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <TestimonialCarousel testimonials={testimonials} />

      {/* Gallery Preview */}
      <section className="section bg-[var(--background-alt)]">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl font-bold text-[var(--foreground)] flex items-center gap-2">
              <Camera className="w-6 h-6 text-[var(--color-orange)]" />
              Photo Gallery
            </h2>
            <Button href="/community/gallery" variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All
            </Button>
          </div>

          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {gallery.map((img) => (
                <div key={img._id} className="relative aspect-square rounded-lg overflow-hidden group">
                  <Image
                    src={img.image}
                    alt={img.alt || 'Ecstatic Sunday gallery'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[var(--foreground-muted)] py-12">Photos coming soon!</p>
          )}
        </div>
      </section>

      {/* Blog Preview */}
      {posts.length > 0 && (
        <section className="section bg-[var(--background)]">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl font-bold text-[var(--foreground)] flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-[var(--color-orange)]" />
                From the Blog
              </h2>
              <Button href="/blog" variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                All Posts
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug?.current || ''}`}>
                  <Card variant="glass" hover glow className="h-full p-0 overflow-hidden">
                    {post.featuredImage && (
                      <div className="relative aspect-video">
                        <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="font-heading font-semibold text-[var(--foreground)] line-clamp-2">{post.title}</h3>
                      {post.excerpt && (
                        <p className="text-sm text-[var(--foreground-muted)] mt-2 line-clamp-2">{post.excerpt}</p>
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
