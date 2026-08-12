import { levelToTag, TAG_COLOR } from "@/components/skills/levelToTag";
import { ProficiencyBar } from "@/components/skills/ProficiencyBar";
import type { Skill } from "@/lib/microcms";

type SkillCardProps = {
  skill: Skill;
};

export function SkillCard({ skill }: SkillCardProps) {
  const tag = levelToTag(skill.level);

  return (
    <div className="flex flex-col gap-3 border border-border bg-card p-4 md:gap-4 md:p-5">
      <div className="flex items-start justify-between gap-2">
        <span className="font-heading text-sm font-bold leading-tight">
          {skill.name}
        </span>
        <span
          className="font-heading shrink-0 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em]"
          style={{ background: `${TAG_COLOR[tag]}1a`, color: TAG_COLOR[tag] }}
        >
          {tag}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {skill.years}の経験
          </span>
          <span
            className="font-heading text-xs font-semibold"
            style={{ color: TAG_COLOR[tag] }}
          >
            {skill.level}%
          </span>
        </div>
        <ProficiencyBar level={skill.level} />
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        {skill.description}
      </p>

      <div className="font-heading mt-auto text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
        {skill.category[0]}
      </div>
    </div>
  );
}
