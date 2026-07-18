"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { useInView } from "@/lib/useInView";

const STEPS = [
  {
    number: "01",
    title: "Create Your Document",
    body: "Choose a split sheet or beat sale certificate. Fill in the track details, contributor roles, and ownership percentages. Takes under 3 minutes.",
  },
  {
    number: "02",
    title: "Invite & Sign",
    body: "Send each collaborator an email link. They review the terms and sign electronically from any device — no account needed. You get notified as each person signs.",
  },
  {
    number: "03",
    title: "Download & Register",
    body: "Once everyone has signed, SPLITA generates a tamper-evident PDF instantly. Use it to register your work with SAMRO, CAPASSO, or any DSP.",
  },
];

export default function HowItWorks() {
  const [ref, inView] = useInView();

  return (
    <SectionWrapper id="how-it-works" className="bg-light">
      {/* Heading block */}
      <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col gap-3">
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "#C9920A", fontVariant: "small-caps" }}
        >
          How It Works
        </p>
        <h2 className="font-serif font-bold text-dark text-3xl md:text-4xl leading-snug">
          Protected in Three Steps
        </h2>
        <p className="text-dark/60 text-base leading-relaxed">
          From studio session to legally signed document in minutes — not months.
        </p>
      </div>

      {/* Steps */}
      <div
        ref={ref}
        className={`grid grid-cols-1 md:grid-cols-3 gap-10 relative transition-all duration-700 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Connector line (desktop only) */}
        <div
          className="hidden md:block absolute top-8 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px"
          style={{ backgroundColor: "rgba(201,146,10,0.25)" }}
          aria-hidden="true"
        />

        {STEPS.map((step) => (
          <div key={step.number} className="flex flex-col gap-4 relative">
            {/* Step number bubble */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0"
              style={{ backgroundColor: "#C9920A", color: "#2C1810" }}
              aria-hidden="true"
            >
              {step.number}
            </div>

            <h3 className="font-serif font-bold text-dark text-xl leading-snug">
              {step.title}
            </h3>
            <p className="text-dark/60 text-sm leading-relaxed">{step.body}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

