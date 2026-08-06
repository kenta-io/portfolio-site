import clsx from "clsx";
import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  categorySlug?: string;
};

function pageHref(page: number, categorySlug?: string) {
  const base = page <= 1 ? "/blog" : `/blog/p/${page}`;

  return categorySlug ? `${base}?category=${categorySlug}` : base;
}

export function Pagination({
  currentPage,
  totalPages,
  categorySlug,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i +1);

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-2 lg:mt-12"
      aria-label="ページネーション"
    >
      {pages.map((page) => (
        <Link
          key={page}
          href={pageHref(page, categorySlug)}
          aria-current={page === currentPage ? "page" : undefined}
          className={clsx(
            "font-heading flex h-9 w-9 items-center justify-center border text-xs",
            page === currentPage
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border bg-transparent text-foreground",
          )}
        >
          {page}
        </Link>
      ))}
    </nav>
  );
}
