import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost } from "@/lib/microcms";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "記事が見つかりません" };

  return { title: post.title, description: post.excerpt };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="pt-16">
      <div className="mx-auto max-w-[880px] px-4 py-14 md:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2">
          <span className="font-heading bg-accent/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.22em] text-accent">
            {post.category}
          </span>
          <time
            dateTime={post.publishedAt}
            className="font-heading text-xs text-muted-foreground"
          >
            {post.publishedAt}
          </time>
        </div>
        <h1 className="font-heading mb-6 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
          {post.title}
        </h1>
        <p className="text-sm leading-[1.85] text-muted-foreground md:text-base">
          {post.excerpt}
        </p>
      </div>
    </article>
  );
}
