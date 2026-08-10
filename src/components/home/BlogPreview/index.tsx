import { PostCard } from "@/components/blog/PostCard";
import { getBlogPosts } from "@/lib/microcms";
import Link from "next/link";

export async function BlogPreview() {
  const { posts } = await getBlogPosts({ limit: 3 });

  return (
    <section className="border-t border-border py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between lg:mb-16">
          <div>
            <div className="font-heading mb-3 text-xs uppercase tracking-[0.32em] text-accent">
              02 — Blog
            </div>
            <h2 className="font-heading text-3xl font-bold lg:text-4xl">
              Latest Articles
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm text-accent transition-colors hover:text-foreground"
          >
            View All →
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-sm text-muted-foreground">
            記事はありません
          </p>
        )}
      </div>
    </section>
  );
}
