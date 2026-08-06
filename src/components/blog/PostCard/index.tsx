import Link from "next/link";
import { categoryToSlug, type BlogPost } from "@/lib/microcms";

type PostCardProps = {
  post: BlogPost;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group flex flex-col gap-4 border border-border bg-card p-5 md:p-6">
      <div className="flex items-center justify-between gap-2">
        <Link
          href={`/blog?category=${categoryToSlug(post.category)}`}
          className="font-heading bg-accent/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.22em] text-accent transition-opacity hover:opacity-80"
        >
          {post.category}
        </Link>
        <time
          dateTime={post.publishedAt}
          className="font-heading shrink-0 text-xs text-muted-foreground"
        >
          {post.publishedAt}
        </time>
      </div>

      <h3 className="font-heading text-sm font-bold leading-snug md:text-base">
        <Link
          href={`/blog/${post.id}`}
          className="transition-colors group-hover:text-accent"
        >
          {post.title}
        </Link>
      </h3>

      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between border-t border-border pt-3">
        <Link
          href={`/blog/${post.id}`}
          className="font-heading flex items-center gap-1 text-xs text-accent transition-colors hover:text-foreground"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}
