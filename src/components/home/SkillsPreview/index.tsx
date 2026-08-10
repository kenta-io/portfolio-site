import Link from "next/link";
import { getSkills, SkillCategory } from "@/lib/microcms";

const CATEGORY_ORDER: SkillCategory[] = [
  "コーディング",
  "フロントエンド",
  "バックエンド",
  "ツール",
];

const STATS = [
  { value: "3年+", label: "Years Experience" },
  { value: "50+", label: "Projects Built" },
  { value: "2", label: "SES Projects" },
];

export async function SkillsPreview() {
  const skills = await getSkills();

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
          {CATEGORY_ORDER.map((category) => {
            const items = skills.filter((skill) => skill.category === category);

            return (
              <div
                key={category}
                className="border border-border bg-card p-5 md:p-6"
              >
                <div className="font-heading mb-4 text-xs uppercase tracking-[0.28em] text-accent md:mb-5">
                  {category}
                </div>
                {items.length > 0 ? (
                  <ul className="space-y-2.5">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-2.5 text-sm"
                      >
                        <span className="h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                        {item.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">準備中</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8 md:gap-6 md:pt-10 lg:mt-10 lg:pt-10">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-heading mb-1 text-4xl font-bold text-accent lg:text-5xl">
                {value}
              </div>
              <div className="font-heading text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
