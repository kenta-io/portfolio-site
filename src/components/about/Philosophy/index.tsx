const PHILOSOPHY_ITEMS = [
  {
    symbol: "01",
    title: "実務に裏付けられた開発",
    description:
      "主担当としてのプロジェクト推進力と、コーダーとしての実務経験に基づいた着実な開発を大切にしています。",
  },
  {
    symbol: "02",
    title: "コミュニケーションを大切に",
    description:
      "社内外に向けた丁寧なコミュニケーション力・関係構築力を強みとしています。",
  },
  {
    symbol: "03",
    title: "学び続ける姿勢",
    description: "積極的な自己学習の継続力・技術習得力を大切にしています。",
  },
  {
    symbol: "04",
    title: "異業種で培った現場対応力",
    description:
      "陸上自衛隊や異業種でのキャリアを経て培った、状況に応じた現場対応力を開発にも活かしています。",
  },
];

export function Philosophy() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
      {PHILOSOPHY_ITEMS.map(({ symbol, title, description }) => (
        <div
          key={symbol}
          className="relative overflow-hidden border border-border bg-card p-6 md:p-8"
        >
          <div className="font-heading pointer-events-none absolute -right-3 -bottom-4 text-[80px] leading-none font-bold text-accent/[0.04] select-none md:text-[96px]">
            {symbol}
          </div>
          <div className="font-heading mb-3 text-xs tracking-[0.3em] text-accent uppercase md:mb-4">
            {symbol}
          </div>
          <h3 className="font-heading mb-3 text-lg font-bold md:mb-4 md:text-xl">
            {title}
          </h3>
          <p className="text-sm leading-[1.9] text-muted-foreground">
            {description}
          </p>
        </div>
      ))}
    </div>
  );
}
