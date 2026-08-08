import { Portrait } from "@/components/about/Portrait";
import { SiGithub } from "react-icons/si";

export default function AboutPage() {
  return (
    <section className="border-b border-border pt-16">
      <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 md:py-14 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_340px] lg:gap-16">
          <div className="mx-auto w-48 md:w-64 lg:order-2 lg:w-full">
            <Portrait />
          </div>

          <div className="lg:order-1">
            <div className="font-heading mb-3 text-xs tracking-[0.32em] text-accent uppercase md:mb-4">
              フロントエンドエンジニア
            </div>
            <h1 className="font-heading mb-4 text-[44px] leading-none font-bold md:mb-6 md:text-[56px] lg:text-[72px]">
              知念健太
            </h1>
            <p className="mb-6 max-w-[520px] text-base leading-[1.85] text-muted-foreground md:mb-8 md:text-lg">
              HTML/CSS・JavaScriptによるコーディング実務に加え、React / Next.js
              /
              TypeScriptでのフロントエンド開発、Nest.jsでのバックエンド開発も経験しているフロントエンドエンジニアです。
            </p>

            <div className="font-heading mb-6 inline-flex items-center gap-2.5 border border-accent/30 px-3 py-1.5 text-xs tracking-[0.22em] text-accent uppercase md:mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              就職活動中 — Available
            </div>

            <a
              href="https://github.com/kenta-io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              <SiGithub size={16} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
