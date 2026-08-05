import Link from "next/link";

export function ContactCta() {
  return (
    <section className="border-t border-border py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 text-center md:px-6 lg:px-8">
        <p className="mb-6 text-base text-muted-foreground md:text-lg">
          新しいプロジェクト、就職・採用に関するご相談など、お気軽にお問い合わせください。
        </p>
        <Link
          href="/contact"
          className="font-heading inline-flex items-center gap-2 bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-accent-foreground transition-opacity hover:opacity-85"
        >
          Contact →
        </Link>
      </div>
    </section>
  );
}
