import Link from "next/link";
import Image from "next/image";
import { LuImage } from "react-icons/lu";
import { calculateReadTime, type BlogPost } from "@/lib/microcms";

type FeaturedPostProps = {
  post: BlogPost;
};

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="grid grid-cols-1 border border-border bg-card lg:grid-cols-[480px_1fr]">
      <div className="relative flex min-h-[200px] items-center justify-center overflow-hidden bg-background lg:border-r lg:border-border">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail.url}
            alt={post.title}
            fill
            className="object-cover"
          />
        ) : (
          <LuImage size={40} className="text-muted-foreground" />
        )}
        <span className="font-heading absolute left-4 top-4 z-10 bg-accent/10 px-2.5 py-1 text-xs uppercase tracking-[0.28em] text-accent backdrop-blur-sm">
          Featured
        </span>
      </div>

      <div className="flex flex-col gap-5 p-6 md:p-8 lg:gap-6 lg:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-heading bg-accent/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.22em] text-accent">
            {post.category}
          </span>
          <span className="font-heading text-xs text-muted-foreground">
            {post.publishedAt}
          </span>
          <span className="font-heading text-xs text-muted-foreground lg:ml-auto">
            {calculateReadTime(post.body)} min read
          </span>
        </div>

        <h2 className="font-heading text-xl font-bold leading-tight md:text-2xl lg:text-3xl">
          {post.title}
        </h2>

        <p className="text-sm leading-[1.85] text-muted-foreground md:text-base">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-2">
          <Link
            href={`/blog/${post.id}`}
            className="font-heading inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-accent-foreground transition-opacity hover:opacity-85"
          >
            Read Article →
          </Link>
        </div>
      </div>
    </article>
  );
}
