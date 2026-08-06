import type { Metadata } from "next";
import { BlogListView } from "@/components/blog/BlogListView";

export const metadata: Metadata = {
  title: "ブログ",
  description:
    "知念健太が技術的な学びや制作について書いているブログです。React / Next.js / TypeScriptなどの技術記事を中心に発信しています。",
};

type BlogPaginatedPageProps = {
  params: Promise<{ current: string }>;
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogPaginatedPage({
  params,
  searchParams,
}: BlogPaginatedPageProps) {
  const {current} = await params
  const {category} = await searchParams
  const page = Math.max(1, Number(current) || 1)
  
  return (
    <section className="pt-16">
      <BlogListView categorySlug={category} page={page} />
    </section>
  );
}
