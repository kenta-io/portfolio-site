import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactSidebar } from "@/components/contact/ContactSidebar";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "知念健太へのお問い合わせはこちらから。採用担当の方からのご連絡もお気軽にどうぞ。",
  alternates: { canonical: "/contact" },
};

const FAQ_ITEMS = [
  {
    q: "実務経験が浅いですが、即戦力として活躍できますか？",
    a: "現職でHTML/CSS/JavaScript/PHP/WordPressによるサイト制作を約3年担当し、主担当として50件以上の制作実績があります。SES案件ではNext.js/TypeScriptによるフロントエンド開発、Nest.js/TypeScriptによるバックエンド開発も経験しており、実務での再現性を意識しながら技術を身につけています。",
  },
  {
    q: "働き方（リモート・出社等）について教えてください",
    a: "フルリモート・出社どちらも対応可能です（東京都在住）。現職では顧客折衝からコーディング、保守運用まで一貫して担当してきた経験があり、社内外との丁寧なコミュニケーションを大切にしながら働いています。",
  },
  {
    q: "開発でAIツールをどのように活用していますか？",
    a: "Claude Codeを日々の実装支援・学習・デザインのコード化などに活用しています。任せきりにするのではなく、内容を理解した上で活用することを大切にしています。",
  },
  { q: "入社可能時期はいつですか？", a: "2026年8月17日より稼働可能です。" },
];

const STATS_SUMMARY = [
  { value: "24h", label: "平均返信時間" },
  { value: "100%", label: "返信率" },
  { value: "JST", label: "タイムゾーン" },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border pt-16">
        <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 lg:px-8 lg:py-16">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          />

          <div className="max-w-[640px]">
            <div className="font-heading mb-3 text-xs uppercase tracking-[0.32em] text-accent md:mb-4">
              Get in Touch
            </div>
            <h1 className="font-heading mb-4 text-[40px] font-bold leading-[1.0] md:mb-6 md:text-[64px]">
              Contact
            </h1>
            <p className="text-base leading-[1.85] text-muted-foreground md:text-lg">
              採用担当・受託案件・技術相談など、お気軽にご連絡ください。React /
              Next.js /
              TypeScriptを活かせるポジションやプロジェクトを積極的に探しています。
            </p>
          </div>

          <div className="mt-8 flex items-center gap-6 border-t border-border pt-8 md:mt-12 md:gap-10 md:pt-10">
            {STATS_SUMMARY.map(({ value, label }) => (
              <div key={label}>
                <div className="font-heading mb-1 text-2xl font-bold text-accent md:text-3xl">
                  {value}
                </div>
                <div className="font-heading text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:text-xs">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
            <div>
              <div className="mb-6 md:mb-8">
                <div className="font-heading mb-3 text-xs uppercase tracking-[0.32em] text-accent">
                  01 — Message
                </div>
                <h2 className="font-heading text-2xl font-bold md:text-3xl">
                  メッセージを送る
                </h2>
              </div>
              <p className="mb-6 border border-accent/25 bg-accent/[0.06] p-4 text-xs leading-relaxed text-muted-foreground md:mb-8">
                ※本サイトはポートフォリオのため、送信フォームは実際にはメールを送信しないデモ動作です。実際のご連絡は
                <a
                  href="mailto:kkeenn.chinen@gmail.com"
                  className="text-accent hover:opacity-80"
                >
                  kkeenn.chinen@gmail.com
                </a>
                までお願いいたします。
              </p>
              <ContactForm />
            </div>

            <ContactSidebar />
          </div>
        </div>
      </section>

      <section className="border-t border-border py-14 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="mb-10 md:mb-14">
            <div className="font-heading mb-3 text-xs uppercase tracking-[0.32em] text-accent">
              02 — FAQ
            </div>
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              よくある質問
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {FAQ_ITEMS.map(({ q, a }, index) => (
              <div key={q} className="border border-border bg-card p-5 md:p-7">
                <div className="font-heading mb-3 text-[10px] uppercase tracking-[0.25em] text-accent">
                  Q{String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="font-heading mb-3 text-sm font-bold md:text-base">
                  {q}
                </h3>
                <p className="text-sm leading-[1.85] text-muted-foreground">
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
