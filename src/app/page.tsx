import { AboutPreview } from "@/components/home/AboutPreview";
import { BlogPreview } from "@/components/home/BlogPreview";
import { ContactCta } from "@/components/home/ContactCta";
import { HeroSection } from "@/components/home/HeroSection";
import { SkillsPreview } from "@/components/home/SkillsPreview";
import { DeferredSceneBackground } from "@/components/three/SceneBackground/DeferredSceneBackground";

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
