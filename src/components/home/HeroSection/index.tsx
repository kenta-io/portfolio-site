import Link from "next/link";
import { SiGithub } from "react-icons/si";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div className="relative mx-auto w-full max-w-[1280px] px-4 py-16 md:px-6 lg:px-8 lg:py-0">
        <div className="max-w-[600px]">
          <div className="font-heading mb-6 inline-flex items-center gap-2.5 border border-accent/30 px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Available for Hire
          </div>

          <h1 className="font-heading mb-4 text-[44px] font-bold leading-[1.02] tracking-tight md:text-[60px] lg:text-[78px]">
            知念 健太
          </h1>

          <div className="font-heading mb-6 text-base font-semibold tracking-[0.08em] text-accent md:text-lg lg:text-xl">
            フロントエンドエンジニア
          </div>

          <p className="mb-8 max-w-[480px] text-sm leading-[1.85] text-muted-foreground md:text-base">
            HTML/CSS・JavaScriptによるコーディング実務に加え、React / Next.js /
            TypeScriptでのフロントエンド開発、Nest.jsでのバックエンド開発も経験。実務での再現性を大事にしながら開発しています。
          </p>

          <div className="mb-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="font-heading inline-flex w-full items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-accent-foreground transition-opacity hover:opacity-85 sm:w-auto"
            >
              Contact Me →
            </Link>
            <Link
              href="/blog"
              className="font-heading inline-flex w-full items-center justify-center gap-2 border border-accent/25 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] transition-colors hover:border-accent/40 sm:w-auto"
            >
              Read Blog
            </Link>
          </div>

          <a
            href="https://github.com/kenta-io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <SiGithub size={15} />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
