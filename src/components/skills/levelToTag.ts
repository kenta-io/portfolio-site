export type SkillTag = "Expert" | "Advanced" | "Intermediate" | "Learning";

export function levelToTag(level: number): SkillTag {
  if (level >= 85) return "Expert";
  if (level >= 70) return "Advanced";
  if (level >= 40) return "Intermediate";
  return "Learning";
}

export const TAG_COLOR: Record<SkillTag, string> = {
  Expert: "#00c896",
  Advanced: "#4da6ff",
  Intermediate: "#f5a623",
  Learning: "#a78bfa",
};
