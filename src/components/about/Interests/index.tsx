type Interest = { title: string; description?: string };

const INTERESTS: Interest[] = [
  {
    title: "野球観戦",
    description:
      "小学校〜中学校まで野球をプレー。現在はメジャーリーグ含め幅広く観戦。",
  },
  {
    title: "レザークラフト",
    description: "革素材を使ったものづくりが趣味です。",
  },
  {
    title: "飛行機・空港",
    description: "飛行機や空港の雰囲気を眺めるのが好きです。",
  },
];

export function Interests() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
      {INTERESTS.map(({ title, description }, i) => (
        <div
          key={title}
          className="border border-border bg-card p-5 transition-colors hover:border-accent/30 md:p-6"
        >
          <div className="mb-4 h-0.5 w-8 bg-accent md:mb-5" />
          <div className="font-heading mb-2 text-[10px] tracking-[0.3em] text-muted-foreground uppercase md:mb-3">
            {String(i + 1).padStart(2, "0")}
          </div>
          <h3 className="font-heading mb-2 text-sm font-bold md:mb-3 md:text-base">
            {title}
          </h3>
          {description && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
