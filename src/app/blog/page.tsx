import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { blogPostsQuery } from '@/sanity/lib/queries';
import { Card, Badge } from '@/components/ui';
import type { BlogPost } from '@/types';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Stories, insights, and reflections from the Ecstatic Sunday community.',
};

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    return await client.fetch(blogPostsQuery);
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="pt-24 section">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-orange)] mb-3">
            Journal
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--foreground)]">
            Blog
          </h1>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug?.current || ''}`}>
                <Card variant="glass" hover glow className="h-full p-0 overflow-hidden">
                  {post.featuredImage && (
                    <div className="relative aspect-video">
                      <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-5">
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex gap-2 mb-2">
                        {post.categories.map((cat) => (
                          <Badge key={cat} variant="primary" className="text-[10px]">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <h3 className="font-heading text-lg font-semibold text-[var(--foreground)] line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-[var(--foreground-muted)] mt-2 line-clamp-2">{post.excerpt}</p>
                    )}
                    <p className="text-xs text-[var(--foreground-muted)] mt-3">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-[var(--foreground-muted)] py-16">Blog posts coming soon!</p>
        )}
      </div>
    </div>
  );
}
