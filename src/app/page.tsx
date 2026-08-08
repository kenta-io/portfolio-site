import dynamic from "next/dynamic";
import { AboutPreview } from "@/components/home/AboutPreview";
import { BlogPreview } from "@/components/home/BlogPreview";
import { ContactCta } from "@/components/home/ContactCta";
import { HeroSection } from "@/components/home/HeroSection";
import { SkillsPreview } from "@/components/home/SkillsPreview";

const SceneBackground = dynamic(() =>
  import("@/components/three/SceneBackground").then(
    (mod) => mod.SceneBackground,
  ),
);

export default function Home() {
  return (
    <>
      <SceneBackground />
      <HeroSection />
      <SkillsPreview />
      <BlogPreview />
      <AboutPreview />
      <ContactCta />
    </>
  );
}
