import HeroSection from "@/components/sections/HeroSection";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
import FaqSection from "@/components/sections/FAQ";
import CtaSection from "@/components/sections/CTA";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <Features />
      <Pricing />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
