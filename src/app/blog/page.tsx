import type { Metadata } from "next";
import { BlogListView } from "@/components/blog/BlogListView";

export const metadata: Metadata = {
  title: "ブログ",
  description:
    "知念健太が技術的な学びや制作について書いているブログです。React / Next.js / TypeScriptなどの技術記事を中心に発信しています。",
};

type BlogPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border pt-16">
        <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 lg:px-8 lg:py-16">
          <div className="font-heading mb-4 text-xs uppercase tracking-[0.32em] text-accent">
            Technical Writing
          </div>
          <h1 className="font-heading mb-5 text-[38px] font-bold leading-[1.0] md:text-[52px] lg:text-[64px]">
            Blog &amp;
            <br />
            Articles
          </h1>
          <p className="max-w-[480px] text-sm leading-[1.85] text-muted-foreground md:text-base">
            知念健太が技術的な学びや制作について書いているブログです。React /
            Next.js / TypeScriptなどの技術記事を中心に発信しています。
          </p>
        </div>
      </section>

      <section>
        <BlogListView categorySlug={category} page={1} />
      </section>
    </>
  );
}
