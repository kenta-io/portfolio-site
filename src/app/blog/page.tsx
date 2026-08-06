import type { Metadata } from "next";
import { LuBookOpen } from "react-icons/lu";
import {
  type BlogCategory,
  getBlogPosts,
  getFeaturedBlogPost,
  slugToCategory,
} from "@/lib/microcms";
import { PostCard } from "@/components/blog/PostCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { FeaturedPost } from "@/components/blog/FeaturedPost";

export const metadata: Metadata = {
  title: "ブログ",
  description:
    "知念健太が技術的な学びや制作について書いているブログです。React / Next.js / TypeScriptなどの技術記事を中心に発信しています。",
};

const ALL_CATEGORIES: BlogCategory[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Three.js",
  "AI活用",
  "学習ログ",
  "エラー対応",
];

async function getCategoryCounts(): Promise<Record<string, number>> {
  const entries = await Promise.all(
    ALL_CATEGORIES.map(async (category) => {
      const { total } = await getBlogPosts({ category, limit: 9999 });

      return [category, total] as const;
    }),
  );

  return Object.fromEntries(entries);
}

type BlogPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category: categorySlug } = await searchParams;
  const category = categorySlug ? slugToCategory(categorySlug) : undefined;
  const [{ posts, total }, counts, featuredPost] = await Promise.all([
    getBlogPosts({ category }),
    getCategoryCounts(),
    getFeaturedBlogPost(),
  ]);

  const showFeatured = !category || featuredPost?.category === category;
  const restPosts = showFeatured
    ? posts.filter((post) => post.id !== featuredPost?.id)
    : posts;

  return (
    <section className="pt-16">
      <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4">
          <CategoryFilter
            activeCategory={category}
            counts={counts}
            totalCount={total}
          />
          <span className="font-heading text-xs uppercase tracking-[0.15em] text-muted-foreground flex gap-2 items-center">
            <LuBookOpen size={13} />
            {total} article{total !== 1 ? "s" : ""}
          </span>
        </div>

        {showFeatured && featuredPost && <FeaturedPost post={featuredPost} />}

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {restPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
