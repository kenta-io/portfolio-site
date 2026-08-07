import type { Metadata } from "next";
import { getSkills } from "@/lib/microcms";
import { SkillGrid } from "@/components/skills/SkillGrid";
import { CoreStrengths } from "@/components/skills/CoreStrengths";
import { CurrentlyLearning } from "@/components/skills/CurrentlyLearning";
import { SkillRadar } from "@/components/skills/SkillRadar";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "知念健太の技術スタックを紹介するページです。コーディング（HTML/CSS/JavaScript/PHP/WordPress）、フロントエンド（React/Next.js/TypeScript）、バックエンド（Nest.js）、学習中のThree.js/WebGLまで。",
};

export default async function SkillsPage() {
  const skills = await getSkills();

  const statsSummary = [
    { value: String(skills.length), label: "Total Skills" },
    {
      value: String(skills.filter((s) => s.level >= 85).length),
      label: "Expert Level",
    },
    {
      value: String(skills.filter((s) => s.level >= 70 && s.level < 85).length),
      label: "Advanced Level",
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border pt-16">
        <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 lg:px-8 lg:py-16">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Skills" }]}
          />

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_380px] lg:gap-12">
            <div>
              <div className="font-heading mb-4 text-xs uppercase tracking-[0.32em] text-accent">
                Technical Expertise
              </div>
              <h1 className="font-heading mb-5 text-[38px] font-bold leading-[1.0] md:text-[52px] lg:text-[64px]">
                Skills &amp;
                <br />
                Expertise
              </h1>
              <p className="mb-8 max-w-[480px] text-sm leading-[1.85] text-muted-foreground md:mb-10 md:text-base">
                HTML/CSS・JavaScriptによるコーディング実務を軸に、React /
                Next.js /
                TypeScriptでのフロントエンド開発、Nest.jsでのバックエンド開発も経験。学習中のThree.js
                / WebGLにも取り組んでいます。
              </p>
              <div className="grid grid-cols-3 gap-5 md:gap-6">
                {statsSummary.map(({ value, label }) => (
                  <div key={label}>
                    <div className="font-heading mb-0.5 text-3xl font-bold text-accent md:text-4xl">
                      {value}
                    </div>
                    <div className="font-heading text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <SkillRadar />
          </div>
        </div>
      </section>

      <section className="border-b border-border py-14 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <SkillGrid skills={skills} />
        </div>
      </section>

      <CoreStrengths />

      <CurrentlyLearning />
    </>
  );
}
