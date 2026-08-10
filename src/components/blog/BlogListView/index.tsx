import { LuBookOpen } from "react-icons/lu";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { Pagination } from "@/components/blog/Pagination";
import { PostCard } from "@/components/blog/PostCard";
import {
  type BlogCategory,
  getBlogPosts,
  getFeaturedBlogPost,
  slugToCategory,
} from "@/lib/microcms";

const ALL_CATEGORIES: BlogCategory[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Three.js",
  "AI活用",
  "学習ログ",
  "エラー対応",
];

type BlogListViewProps = {
  categorySlug?: string;
  page: number;
};

export async function BlogListView({ categorySlug, page }: BlogListViewProps) {
  const category = categorySlug ? slugToCategory(categorySlug) : undefined;
  const [{ posts, totalPages, total }, featuredPost, counts] =
    await Promise.all([
      getBlogPosts({ category, page }),
      getFeaturedBlogPost(),
      getCategoryCounts(),
    ]);

  const showFeatured =
    page === 1 &&
    featuredPost &&
    (!category || featuredPost.category === category);
  const restPosts = showFeatured
    ? posts.filter((post) => post.id !== featuredPost?.id)
    : posts;

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-6 lg:px-8">
      {showFeatured && featuredPost && (
        <div className="mb-8">
          <FeaturedPost post={featuredPost} />
        </div>
      )}

      <div className="mb-8 flex flex-col gap-4">
        <CategoryFilter
          activeCategory={category}
          counts={counts}
          totalCount={total}
        />
        <span className="font-heading flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-muted-foreground">
          <LuBookOpen size={13} />
          {total} article{total !== 1 ? "s" : ""}
        </span>
      </div>

      {restPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {restPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
          <LuBookOpen size={28} />
          <p className="text-sm">該当する記事はありません</p>
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        categorySlug={categorySlug}
      />
    </div>
  );
}

async function getCategoryCounts(): Promise<Record<string, number>> {
  const entries = await Promise.all(
    ALL_CATEGORIES.map(async (category) => {
      const { total } = await getBlogPosts({ category, limit: 9999 });

      return [category, total] as const;
    }),
  );

  return Object.fromEntries(entries);
}
