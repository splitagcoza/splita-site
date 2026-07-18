import HeroSection from "@/components/sections/HeroSection";
import HowItWorks from "@/components/sections/HowItWorks";
import ServicesSection from "@/components/sections/ServicesSection";
import Features from "@/components/sections/Features";
import PlatformsSection from "@/components/sections/PlatformsSection";
import Roadmap from "@/components/sections/Roadmap";
import FaqSection from "@/components/sections/FAQ";
import CtaSection from "@/components/sections/CTA";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <ServicesSection />
      <Features />
      <PlatformsSection />
      <Roadmap />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
