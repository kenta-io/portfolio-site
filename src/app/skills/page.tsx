import type { Metadata } from "next";
import { getSkills } from "@/lib/microcms";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "知念健太の技術スタックを紹介するページです。コーディング（HTML/CSS/JavaScript/PHP/WordPress）、フロントエンド（React/Next.js/TypeScript）、バックエンド（Nest.js）、学習中のThree.js/WebGLまで。",
};

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border pt-16">
        <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 lg:px-8 lg:py-16">
          <div className="font-heading mb-4 text-xs uppercase tracking-[0.32em] text-accent">
            Technical Expertise
          </div>
          <h1 className="font-heading mb-5 text-[38px] font-bold leading-[1.0] md:text-[52px] lg:text-[64px]">
            Skills &amp;
            <br />
            Expertise
          </h1>
          <p className="mb-8 max-w-[480px] text-sm leading-[1.85] text-muted-foreground md:mb-10 md:text-base">
            HTML/CSS・JavaScriptによるコーディング実務を軸に、React / Next.js /
            TypeScriptでのフロントエンド開発、Nest.jsでのバックエンド開発も経験。学習中のThree.js
            / WebGLにも取り組んでいます。
          </p>
        </div>
      </section>

      <section className="border-b border-border py-14 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="border border-border bg-card p-4 md:p-5"
              >
                <span className="font-heading text-sm font-bold">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
