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
    <section className="pt-16">
      <BlogListView categorySlug={category} page={1} />
    </section>
  );
}
