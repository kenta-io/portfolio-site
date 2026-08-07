import { ContactForm } from "@/components/contact/ContactForm";

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

export default function ContactPage() {
  return (
    <>
      <ContactForm />

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
