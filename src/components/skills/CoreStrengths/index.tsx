import { ProficiencyBar } from "@/components/skills/ProficiencyBar";

const CORE_STRENGTHS = [
  {
    name: "コーディング実務",
    since: "2023",
    level: 85,
    description:
      "HTML/CSS・JavaScript・PHP・WordPressによる現職でのサイト制作実務。主担当として50件以上の制作実績があります。",
    highlights: [
      "採用サイト・LP制作",
      "顧客折衝からコーディングまで一貫対応",
      "テストケース作成・実施",
      "運用保守・障害対応",
    ],
  },
  {
    name: "React / Next.js / TypeScript",
    since: "2025",
    level: 40,
    description:
      "SES案件でのフロントエンド開発経験。コンポーネント設計から型安全な実装まで対応。",
    highlights: [
      "コンポーネント設計",
      "型安全な実装",
      "App Routerでの開発",
      "実務での再現性を意識した実装",
    ],
  },
  {
    name: "AI活用（Claude Code）",
    since: "2025",
    level: 60,
    description:
      "実装支援・デザインのソースコード化・学習効率化にClaude Codeを活用しています。",
    highlights: [
      "実装支援",
      "デザインのコード化",
      "学習効率化",
      "内容を理解した上での活用",
    ],
  },
];

export function CoreStrengths() {
  return (
    <section className="border-t border-border py-14 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        <div className="mb-8 lg:mb-12">
          <div className="font-heading mb-3 text-xs uppercase tracking-[0.32em] text-accent">
            Featured
          </div>
          <h2 className="font-heading text-2xl font-bold md:text-3xl">
            Core Strengths
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {CORE_STRENGTHS.map((strength) => (
            <div
              key={strength.name}
              className="flex flex-col border border-border bg-card"
            >
              <div className="h-[3px] w-full bg-gradient-to-r from-accent to-transparent" />
              <div className="flex flex-1 flex-col gap-4 p-5 md:gap-5 md:p-7">
                <div className="flex items-start justify-between">
                  <h3 className="font-heading text-lg font-bold md:text-xl">
                    {strength.name}
                  </h3>
                  <div className="text-right">
                    <div className="font-heading text-2xl font-bold text-accent md:text-3xl">
                      {strength.level}
                    </div>
                    <div className="font-heading text-xs text-muted-foreground">
                      / 100
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <ProficiencyBar level={strength.level} />
                  <span className="font-heading text-xs text-muted-foreground">
                    Since {strength.since}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {strength.description}
                </p>

                <ul className="space-y-2">
                  {strength.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
