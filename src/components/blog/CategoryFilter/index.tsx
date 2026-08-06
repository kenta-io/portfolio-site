import { clsx } from "clsx";
import Link from "next/link";
import { type BlogCategory, categoryToSlug } from "@/lib/microcms";

const CATEGORIES: BlogCategory[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Three.js",
  "AI活用",
  "学習ログ",
  "エラー対応",
];

type CategoryFilterProps = {
  activeCategory?: BlogCategory;
  counts: Record<string, number>;
  totalCount: number;
};

export function CategoryFilter({
  activeCategory,
  counts,
  totalCount,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 border border-border bg-card p-1">
      <FilterChip
        href="/blog"
        label="All"
        count={totalCount}
        isActive={!activeCategory}
      />
      {CATEGORIES.map((category) => (
        <FilterChip
          key={category}
          href={`/blog?category=${categoryToSlug(category)}`}
          label={category}
          count={counts[category] ?? 0}
          isActive={activeCategory === category}
        />
      ))}
    </div>
  );
}

function FilterChip({
  href,
  label,
  count,
  isActive,
}: {
  href: string;
  label: string;
  count: number;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "font-heading flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-[0.15em] transition-all md:px-4",
        isActive
          ? "bg-accent text-accent-foreground"
          : "bg-transparent text-muted-foreground",
      )}
    >
      {label}
      <span
        className={clsx(
          "px-1.5 py-0.5 text-[10px]",
          isActive
            ? "bg-background/20 text-accent-foreground"
            : "bg-accent/10 text-accent",
        )}
      >
        {count}
      </span>
    </Link>
  );
}
