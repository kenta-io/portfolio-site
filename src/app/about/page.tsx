import type { Metadata } from "next";
import { SiGithub } from "react-icons/si";
import { Interests } from "@/components/about/Interests";
import { Philosophy } from "@/components/about/Philosophy";
import { Portrait } from "@/components/about/Portrait";
import { TimelineItem } from "@/components/about/TimelineItem";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "About",
  description:
    "知念健太の経歴・スキルセットを紹介するページです。陸上自衛隊や海外就労、異業種でのキャリア経験などを経て、プログラミングスクールでWeb制作のスキルを身につけ、現在はHR支援会社でコーダーとして活動しています。",
  alternates: { canonical: "/about" },
};

const QUICK_FACTS = [
  { label: "Location", value: "東京都, 日本" },
  { label: "Focus", value: "React / Next.js / TypeScript" },
  { label: "Status", value: "就職活動中" },
];

const CAREER = [
  {
    period: "2023 — 現在",
    role: "コーダー",
    company: "HR支援会社（社名非公開）",
    description:
      "採用サイト・採用LP制作を担当。主担当として50件以上のサイト制作を担当。SES案件ではNext.js/TypeScriptによるフロントエンド開発、Nest.js/TypeScriptによるバックエンド開発を経験。",
  },
  {
    period: "2022 — 2023",
    role: "プログラミングスクール",
    description:
      "未経験からWeb制作を学び、コーダーとしてのキャリアをスタート。",
  },
  {
    period: "2017 — 2022",
    role: "海外就労・異業種でのキャリア経験など",
    description: "海外就労を含む異業種でのキャリアを経験。",
  },
  {
    period: "2013 — 2017",
    role: "陸上自衛隊",
    company: "高射特科部隊",
    description: "ローダー操縦手として勤務。",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border pt-16">
        <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 md:py-14 lg:px-8 lg:py-16">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "About" }]}
          />

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

      <section className="border-b border-border py-14 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 md:mb-16">
            <div className="font-heading mb-3 text-xs tracking-[0.32em] text-accent uppercase">
              01 — Profile
            </div>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              自己紹介
            </h2>
          </div>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
            <div className="space-y-5 md:space-y-6">
              <p className="text-base leading-[1.85] text-muted-foreground md:text-lg">
                プログラミングスクールでWeb開発を学び、2023年よりコーダーとしてキャリアをスタートしました。現在はコーダーとして数十件のサイト制作に携わるかたわら、SES案件としてNext.js／TypeScriptによるフロントエンド開発、Nest.js／TypeScriptによるバックエンド開発を経験しました。
              </p>
              <p className="text-base leading-[1.85] text-muted-foreground md:text-lg">
                それ以前は陸上自衛隊や海外就労、異業種でのキャリア経験などを経て、Web業界とは異なるキャリアを歩んできました。異業種での経験を通じて培った現場対応力やコミュニケーション力を活かしながら、実務でのWeb制作に取り組んでいます。
              </p>
            </div>

            <div className="border border-border bg-card p-6 md:p-7">
              <div className="font-heading mb-5 text-xs tracking-[0.28em] text-accent uppercase">
                Quick Facts
              </div>
              {QUICK_FACTS.map(({ label, value }) => (
                <div
                  key={label}
                  className="border-b border-border py-3 last:border-b-0"
                >
                  <div className="font-heading mb-0.5 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                    {label}
                  </div>
                  <div className="text-sm font-medium break-all">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-14 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 md:mb-16">
            <div className="font-heading mb-3 text-xs tracking-[0.32em] text-accent uppercase">
              02 — Career
            </div>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              職歴
            </h2>
          </div>
          <div>
            {CAREER.map((item) => (
              <TimelineItem key={item.period} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border py-14 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 md:mb-16">
            <div className="font-heading mb-3 text-xs tracking-[0.32em] text-accent uppercase">
              03 — Philosophy
            </div>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              考え方
            </h2>
          </div>
          <Philosophy />
        </div>
      </section>

      <section className="border-b border-border py-14 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 md:mb-16">
            <div className="font-heading mb-3 text-xs tracking-[0.32em] text-accent uppercase">
              04 — Interests
            </div>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              興味 & 趣味
            </h2>
          </div>
          <Interests />
        </div>
      </section>

      <section className="py-14 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="relative overflow-hidden border border-accent/20 bg-accent/[0.03] px-6 py-10 md:px-10 md:py-12 lg:px-12">
            <div className="absolute top-0 left-0 h-full w-0.5 bg-accent" />
            <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between md:gap-10">
              <div>
                <div className="font-heading mb-2 text-xs tracking-[0.3em] text-accent uppercase md:mb-3">
                  採用担当者・HRの方へ
                </div>
                <h3 className="font-heading mb-2 text-2xl font-bold md:text-3xl">
                  一緒に働きませんか？
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  React / Next.js / TypeScript /
                  コーダーの知見を活かせるポジションを探しています。
                </p>
              </div>
              <Link
                href="/contact"
                className="font-heading inline-flex shrink-0 items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-semibold tracking-[0.15em] text-accent-foreground uppercase transition-opacity hover:opacity-85 md:px-8 md:py-4"
              >
                お問い合わせ →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
