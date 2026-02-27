import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import { blogPostBySlugQuery } from '@/sanity/lib/queries';
import { Badge, Button } from '@/components/ui';
import type { BlogPost } from '@/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    return await client.fetch(blogPostBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: 'Not Found' };

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  return (
    <article className="pt-24">
      {post.featuredImage && (
        <div className="relative h-[40vh] md:h-[50vh]">
          <Image src={post.featuredImage} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 gradient-overlay" />
        </div>
      )}

      <div className="container section">
        <div className="max-w-3xl mx-auto">
          {post.categories && post.categories.length > 0 && (
            <div className="flex gap-2 mb-4">
              {post.categories.map((cat) => (
                <Badge key={cat} variant="primary">{cat}</Badge>
              ))}
            </div>
          )}

          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mb-8 text-sm text-[var(--foreground-muted)]">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.photo && (
                  <Image src={post.author.photo} alt={post.author.name} width={32} height={32} className="rounded-full" />
                )}
                <span>{post.author.name}</span>
              </div>
            )}
            <time>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </div>

          {post.body && (
            <div className="prose prose-invert prose-orange max-w-none">
              <PortableText value={post.body} />
            </div>
          )}

          <Button href="/blog" variant="ghost" className="mt-12">
            &larr; Back to Blog
          </Button>
        </div>
      </div>
    </article>
  );
}
