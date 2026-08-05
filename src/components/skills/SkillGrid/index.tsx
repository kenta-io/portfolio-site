"use client";
import { useState } from "react";
import clsx from "clsx";
import type { Skill, SkillCategory } from "@/lib/microcms";
import { SkillCard } from "@/components/skills/SkillCard";

const CATEGORIES: Array<SkillCategory | "All"> = [
  "All",
  "コーディング",
  "フロントエンド",
  "バックエンド",
  "ツール",
];

type SkillGridProps = {
  skills: Skill[];
};

export function SkillGrid({ skills }: SkillGridProps) {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">(
    "All",
  );

  const filtered =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <div>
      <div className="mb-8 flex items-center gap-1 overflow-x-auto border border-border bg-card p-1 lg:mb-12">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          const count =
            category === "All"
              ? skills.length
              : skills.filter((skill) => skill.category === category).length;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={clsx(
                "font-heading flex items-center gap-2 whitespace-nowrap px-3 py-2 text-xs uppercase tracking-[0.15em] transition-colors md:px-4",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "bg-transparent text-muted-foreground",
              )}
            >
              {category}
              <span className="font-heading px-1.5 py-0.5 text-[10px] bg-accent/10">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {filtered.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
}
