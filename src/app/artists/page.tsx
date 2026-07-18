import HeroSection from "@/components/sections/HeroSection";
import HowItWorks from "@/components/sections/HowItWorks";
import ServicesSection from "@/components/sections/ServicesSection";
import Features from "@/components/sections/Features";
import PlatformsSection from "@/components/sections/PlatformsSection";
import Pricing from "@/components/sections/Pricing";
import AboutSection from "@/components/sections/AboutSection";
import TeamSection from "@/components/sections/TeamSection";
import ClientsSection from "@/components/sections/ClientsSection";
import TestimoniesSection from "@/components/sections/TestimoniesSection";
import FaqSection from "@/components/sections/FAQ";
import DonateSection from "@/components/sections/DonateSection";
import CtaSection from "@/components/sections/CTA";
import ContactSection from "@/components/sections/ContactSection";

export default function ArtistsPage() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <ServicesSection />
      <Features />
      <PlatformsSection />
      <Pricing />
      <AboutSection />
      <TeamSection />
      <ClientsSection />
      <TestimoniesSection />
      <FaqSection />
      <DonateSection />
      <CtaSection />
      <ContactSection />
    </main>
  );
}
