import { requireEnv } from "@/lib/env";

const MICROCMS_BASE_URL = `https://${requireEnv("MICROCMS_SERVICE_DOMAIN")}.microcms.io/api/v1`;

function microcmsHeaders() {
  return { "X-MICROCMS-API-KEY": requireEnv("MICROCMS_API_KEY") };
}

// ─── Skill ───
export type SkillCategory =
  "コーディング" | "フロントエンド" | "バックエンド" | "ツール";

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  years: string;
  level: number;
  description: string;
  featured: boolean;
  order: number;
};

export async function getSkills(): Promise<Skill[]> {
  const res = await fetch(`${MICROCMS_BASE_URL}/skills?limit=100`, {
    headers: microcmsHeaders(),
  });
  if (!res.ok) {
    throw new Error(
      `microCMS skills fetch failed: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();
  return data.contents;
}

// ─── Blog ───
export type BlogCategory =
  | "React"
  | "Next.js"
  | "TypeScript"
  | "Three.js"
  | "AI活用"
  | "学習ログ"
  | "エラー対応";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  body: string;
  publishedAt: string;
};

type MicrocmsBlogPost = Omit<BlogPost, "category"> & {
  category: { id: string; name: string };
};

function toBlogPost(raw: MicrocmsBlogPost): BlogPost {
  return { ...raw, category: raw.category.name as BlogCategory };
}

export async function getBlogPosts({
  category,
  page = 1,
  limit = 10,
}: {
  category?: BlogCategory;
  page?: number;
  limit?: number;
} = {}) {
  const filters = category
    ? `&filters=category[equals]${categoryToSlug(category)}`
    : "";
  const res = await fetch(
    `${MICROCMS_BASE_URL}/blog?limit=${limit}&offset=${(page - 1) * limit}${filters}`,
    { headers: microcmsHeaders() },
  );
  if (!res.ok) {
    throw new Error(
      `microCMS blog fetch failed: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();
  return {
    posts: (data.contents as MicrocmsBlogPost[]).map(toBlogPost),
    totalPages: Math.max(1, Math.ceil(data.totalCount / limit)),
    total: data.totalCount,
  };
}

const CATEGORY_SLUGS: Record<BlogCategory, string> = {
  React: "react",
  "Next.js": "nextjs",
  TypeScript: "typescript",
  "Three.js": "threejs",
  AI活用: "ai",
  学習ログ: "learning-log",
  エラー対応: "error-handling",
};

export function categoryToSlug(category: BlogCategory): string {
  return CATEGORY_SLUGS[category];
}

export function slugToCategory(slug: string): BlogCategory | undefined {
  return (Object.entries(CATEGORY_SLUGS) as [BlogCategory, string][]).find(
    ([, value]) => value === slug,
  )?.[0];
}

export async function getFeaturedBlogPost(): Promise<BlogPost | null> {
  const res = await fetch(`${MICROCMS_BASE_URL}/blog?limit=1`, {
    headers: microcmsHeaders(),
  });
  if (!res.ok) {
    throw new Error(
      `microCMS blog fetch failed: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();
  const raw: MicrocmsBlogPost | undefined = data.contents[0];
  return raw ? toBlogPost(raw) : null;
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  const res = await fetch(`${MICROCMS_BASE_URL}/blog/${id}`, {
    headers: microcmsHeaders(),
  });
  if (!res.ok) return null;
  const raw: MicrocmsBlogPost = await res.json();
  return toBlogPost(raw);
}

export function calculateReadTime(body: string): number {
  return Math.max(1, Math.ceil(body.length / 500));
}
