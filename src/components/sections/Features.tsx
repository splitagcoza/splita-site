"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { useInView } from "@/lib/useInView";

const FEATURE_GROUPS = [
  {
    heading: "Legal & Compliance",
    features: [
      "SAMRO & CAPASSO compatible document structure",
      "DSP-ready metadata fields (ISRC, ISWC)",
      "Electronic signatures with audit trail",
      "Tamper-evident PDF with verification URL",
      "Jurisdiction-aware templates (SA, NG, KE, GH)",
    ],
  },
  {
    heading: "Collaboration",
    features: [
      "Invite unlimited collaborators by email or link",
      "No account required for signatories",
      "Real-time signing status per document",
      "Automatic email delivery to all parties",
      "Version history and amendment requests",
    ],
  },
  {
    heading: "Documents",
    features: [
      "Split sheet (songwriting & master ownership)",
      "Beat sale certificate (exclusive, non-exclusive, lease)",
      "Producer agreement",
      "Ghost-producer agreement",
      "Featured artist release form",
    ],
  },
];

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0 mt-0.5"
    >
      <circle cx="8" cy="8" r="8" fill="#1B4D3E" />
      <path
        d="M4.5 8l2.5 2.5 4.5-5"
        stroke="#C9920A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Features() {
  const [ref, inView] = useInView();

  return (
    <SectionWrapper id="features" className="bg-white">
      {/* Heading block */}
      <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col gap-3">
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "#C9920A", fontVariant: "small-caps" }}
        >
          Features
        </p>
        <h2 className="font-serif font-bold text-dark text-3xl md:text-4xl leading-snug">
          Everything Built In. Nothing Bolted On.
        </h2>
        <p className="text-dark/60 text-base leading-relaxed">
          SPLITA was designed from the ground up for the African music industry -
          not adapted from tools built for markets with different legal systems.
        </p>
      </div>

      {/* Feature groups */}
      <div
        ref={ref}
        className={`grid grid-cols-1 md:grid-cols-3 gap-10 transition-all duration-700 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {FEATURE_GROUPS.map((group) => (
          <div key={group.heading} className="flex flex-col gap-5">
            <h3
              className="font-semibold text-sm uppercase tracking-widest"
              style={{ color: "#C9920A" }}
            >
              {group.heading}
            </h3>
            <ul className="flex flex-col gap-3">
              {group.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-dark/70 leading-relaxed">
                  <CheckIcon />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

