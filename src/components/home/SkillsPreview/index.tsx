import Link from "next/link";

const SKILLS_PREVIEW = [
  {
    category: "コーディング",
    items: ["HTML/CSS", "JavaScript", "PHP", "WordPress"],
  },
  { category: "フロントエンド", items: ["React", "Next.js", "TypeScript"] },
  { category: "バックエンド", items: ["Nest.js", "TypeScript"] },
  {
    category: "ツール",
    items: ["Git/GitHub", "Figma", "Claude Code", "Slack", "Adobe", "Asana"],
  },
];

export function SkillsPreview() {
  return (
    <section className="border-t border-border py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between lg:mb-16">
          <div>
            <div className="font-heading mb-3 text-xs uppercase tracking-[0.32em] text-accent">
              01 — Skills
            </div>
            <h2 className="font-heading text-3xl font-bold lg:text-4xl">
              Technical Stack
            </h2>
          </div>
          <Link
            href="/skills"
            className="text-sm text-accent transition-colors hover:text-foreground"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {SKILLS_PREVIEW.map(({ category, items }) => (
            <div
              key={category}
              className="border border-border bg-card p-5 md:p-6"
            >
              <div className="font-heading mb-4 text-xs uppercase tracking-[0.28em] text-accent md:mb-5">
                {category}
              </div>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm">
                    <span className="h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
