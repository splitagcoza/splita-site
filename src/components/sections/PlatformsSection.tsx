"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { useInView } from "@/lib/useInView";

const PLATFORMS = [
  {
    icon: "🌐",
    title: "Web App",
    subtitle: "Browser + installable on your phone",
    body: "Use SPLITA in any browser — no download needed. You can also add it to your phone's home screen for a full app-like experience, on both Android and iOS.",
    badge: "Available Now",
    badgeAvailable: true,
  },
  {
    icon: "📄",
    title: "PDF Export",
    subtitle: "Download & share anywhere",
    body: "Every split sheet and beat sale certificate is generated as a professionally formatted, legally worded PDF you can sign, save, and share instantly.",
    badge: "Available Now",
    badgeAvailable: true,
  },
  {
    icon: "🖥️",
    title: "API Access",
    subtitle: "For developers & platforms",
    body: "Embed SPLITA document generation directly into your DAW plugin, distributor portal, or music platform. Full REST API with webhooks.",
    badge: "Coming 2027 Q4",
    badgeAvailable: false,
  },
];

export default function PlatformsSection() {
  const [ref, inView] = useInView();

  return (
    <SectionWrapper id="platforms" className="bg-blue">
      {/* Heading block */}
      <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-3">
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "#C9920A", fontVariant: "small-caps" }}
        >
          Our Platforms
        </p>
        <h2 className="font-serif font-bold text-white text-3xl md:text-4xl leading-snug">
          Where SPLITA Lives
        </h2>
      </div>

      {/* Cards */}
      <div
        ref={ref}
        className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {PLATFORMS.map((platform) => (
          <div
            key={platform.title}
            className="relative flex flex-col gap-4 rounded-xl p-8"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            {/* Badge */}
            <span
              className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                platform.badgeAvailable
                  ? "text-gold border-gold"
                  : "text-gold/70 border-gold/40"
              }`}
            >
              {platform.badge}
            </span>

            <span className="text-4xl leading-none" aria-hidden="true">
              {platform.icon}
            </span>

            <div className="flex flex-col gap-1">
              <h3 className="font-serif font-bold text-white text-xl">
                {platform.title}
              </h3>
              <p className="text-white/50 text-xs uppercase tracking-wide">
                {platform.subtitle}
              </p>
            </div>

            <p className="text-white/70 text-sm leading-relaxed">
              {platform.body}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
