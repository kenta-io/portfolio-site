import Link from "next/link";

const TIMELINE = [
  {
    year: "2013",
    title: "陸上自衛隊",
    desc: "高射特科部隊 ローダー操縦手として勤務。",
  },
  {
    year: "2017",
    title: "海外就労・異業種でのキャリア経験など",
    desc: "海外就労を含む異業種でのキャリアを経験。",
  },
  {
    year: "2022",
    title: "プログラミングスクール",
    desc: "未経験からWeb制作を学び、コーダーへ転身。",
  },
  {
    year: "2023",
    title: "HR支援会社",
    desc: "コーダーとして稼働。SES案件でNext.js/Nest.js実務経験を積む。",
  },
];

export function AboutPreview() {
  return (
    <section className="border-t border-border py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        <div className="mb-10 lg:mb-16">
          <div className="font-heading mb-3 text-xs uppercase tracking-[0.32em] text-accent">
            03 — About
          </div>
          <h2 className="font-heading text-3xl font-bold lg:text-4xl">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div>
            <p className="mb-3 text-lg leading-[1.8] md:text-xl">
              HTML/CSS・JavaScriptによるコーディング実務を軸に、React / Next.js
              /
              TypeScriptでのフロントエンド開発、Nest.jsでのバックエンド開発も経験。陸上自衛隊や海外就労、異業種でのキャリア経験などを経て、未経験からコーダーとしてキャリアをスタートしました。
            </p>
            <div className="mb-8 text-xs uppercase tracking-[0.15em] text-muted-foreground">
              東京都, 日本
            </div>
            <Link
              href="/about"
              className="font-heading inline-flex items-center gap-2 border border-accent px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-accent transition-colors hover:bg-accent/10"
            >
              More About Me →
            </Link>
          </div>

          <div className="border border-border bg-card p-6 md:p-7">
            <div className="font-heading mb-6 text-xs uppercase tracking-[0.28em] text-accent md:mb-7">
              Career Timeline
            </div>
            <div className="space-y-6 md:space-y-7">
              {TIMELINE.map(({ year, title, desc }) => (
                <div key={year}>
                  <div className="font-heading text-xs tracking-[0.2em] text-accent">
                    {year}
                  </div>
                  <div className="font-heading mb-1 text-sm font-semibold">
                    {title}
                  </div>
                  <div className="text-xs leading-relaxed text-muted-foreground">
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
