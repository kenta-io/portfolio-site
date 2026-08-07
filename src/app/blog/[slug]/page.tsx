import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { calculateReadTime, getBlogPost } from "@/lib/microcms";
import { renderMarkdown } from "@/lib/markdown";
import { TableOfContents } from "@/components/blog/TableOfContents";

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

  const { html, toc } = await renderMarkdown(post.body);

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
          <span className="font-heading text-xs text-muted-foreground">
            ・{calculateReadTime(post.body)} min read
          </span>
        </div>
        <h1 className="font-heading mb-6 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
          {post.title}
        </h1>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr]">
          <div className="lg:order-2">
            <div
              className="prose-blog text-foreground"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
          <div className="lg:order-1">
            <div className="lg:sticky lg:top-24">
              <TableOfContents entries={toc} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
