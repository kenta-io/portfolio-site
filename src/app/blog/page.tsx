import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/microcms";
import { PostCard } from "@/components/blog/PostCard";

export const metadata: Metadata = {
  title: "ブログ",
  description:
    "知念健太が技術的な学びや制作について書いているブログです。React / Next.js / TypeScriptなどの技術記事を中心に発信しています。",
};

export default async function BlogPage() {
  const { posts } = await getBlogPosts();

  return (
    <section className="pt-16">
      <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
