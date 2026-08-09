import Link from "next/link";

export function ContactCta() {
  return (
    <section className="border-t border-border py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 border border-border bg-card p-8 text-center md:p-12">
          <div>
            <div className="font-heading mb-3 text-xs uppercase tracking-[0.32em] text-accent">
              04 — Contact
            </div>
            <h2 className="font-heading mb-4 text-3xl font-bold lg:text-4xl">
              Get In Touch
            </h2>
            <p className="mx-auto max-w-[560px] text-base leading-[1.85] text-muted-foreground md:text-lg">
              新しいプロジェクト、就職・採用に関するご相談など、お気軽にお問い合わせください。
            </p>
          </div>
          <Link
            href="/contact"
            className="font-heading inline-flex items-center gap-2 bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-accent-foreground transition-opacity hover:opacity-85"
          >
            Contact →
          </Link>
        </div>
      </div>
    </section>
  );
}
