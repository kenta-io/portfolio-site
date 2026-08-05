import { AboutPreview } from "@/components/home/AboutPreview";
import { HeroSection } from "@/components/home/HeroSection";
import { SkillsPreview } from "@/components/home/SkillsPreview";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SkillsPreview />
      <AboutPreview />
    </>
  );
}
