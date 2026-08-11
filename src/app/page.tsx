import type { Metadata } from "next";
import { AboutPreview } from "@/components/home/AboutPreview";
import { BlogPreview } from "@/components/home/BlogPreview";
import { ContactCta } from "@/components/home/ContactCta";
import { HeroSection } from "@/components/home/HeroSection";
import { SkillsPreview } from "@/components/home/SkillsPreview";
import { DeferredSceneBackground } from "@/components/three/SceneBackground/DeferredSceneBackground";

export const metadata: Metadata = {
  title: { absolute: "知念健太 Portfolio｜フロントエンドエンジニア" },
  description:
    "知念健太のポートフォリオサイト。HR支援会社でコーダーとして50件以上のサイト制作に従事。React / Next.js / TypeScriptを用いた開発力を紹介しています。",
};

export default function Home() {
  return (
    <>
      <DeferredSceneBackground />
      <HeroSection />
      <SkillsPreview />
      <BlogPreview />
      <AboutPreview />
      <ContactCta />
    </>
  );
}
