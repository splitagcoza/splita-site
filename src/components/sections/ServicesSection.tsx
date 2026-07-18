"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { useInView } from "@/lib/useInView";

const SERVICES = [
  {
    icon: "🎵",
    title: "Split Sheet Creator",
    body: "Define ownership percentages, roles (writer, producer, featured artist), and signing order. Every contributor gets an email copy the moment the last signature lands.",
  },
  {
    icon: "📄",
    title: "Beat Sale Certificates",
    body: "Generate airtight certificates for exclusive, non-exclusive, and lease deals. Specify usage rights, territory, and expiry — no lawyer required.",
  },
  {
    icon: "🌍",
    title: "Pan-African Recognition",
    body: "Documents are structured to meet SAMRO, CAPASSO, CISAC, and major DSP submission requirements, so your paperwork holds up wherever the music travels.",
  },
  {
    icon: "🔒",
    title: "Tamper-Evident PDFs",
    body: "Every document carries a cryptographic signature and a unique verification URL. Anyone — a label, a lawyer, a streaming platform — can confirm authenticity instantly.",
  },
  {
    icon: "✉️",
    title: "Collaborator Invitations",
    body: "Invite co-writers, producers, and featured artists by email or link. They review, sign, and download — no account required on their end.",
  },
];

export default function ServicesSection() {
  const [ref, inView] = useInView();

  return (
    <SectionWrapper id="services" className="bg-green">
      {/* Heading block */}
      <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-3">
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "#C9920A", fontVariant: "small-caps" }}
        >
          Our Services
        </p>
        <h2 className="font-serif font-bold text-white text-3xl md:text-4xl leading-snug">
          Everything You Need to Protect Your Work
        </h2>
        <p className="text-gray-300 text-base leading-relaxed">
          From your first collaboration to your hundredth release — SPLITA
          covers every document African creators need to stay legally protected.
        </p>
      </div>

      {/* Card grid */}
      <div
        ref={ref}
        className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {SERVICES.map((service) => (
          <div
            key={service.title}
            className="relative bg-white rounded-2xl p-8 shadow-md flex flex-col gap-4 transition-transform duration-150 ease-in-out hover:scale-105"
          >
            {/* Icon */}
            <span className="text-4xl leading-none" aria-hidden="true">
              {service.icon}
            </span>

            {/* Title */}
            <h3 className="font-serif font-bold text-dark text-xl leading-snug">
              {service.title}
            </h3>

            {/* Body */}
            <p className="text-dark/60 text-sm leading-relaxed">{service.body}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
