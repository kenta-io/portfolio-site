import { AboutPreview } from "@/components/home/AboutPreview";
import { BlogPreview } from "@/components/home/BlogPreview";
import { ContactCta } from "@/components/home/ContactCta";
import { HeroSection } from "@/components/home/HeroSection";
import { SkillsPreview } from "@/components/home/SkillsPreview";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SkillsPreview />
      <BlogPreview />
      <AboutPreview />
      <ContactCta />
    </>
  );
}
