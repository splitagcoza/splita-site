"use client";

import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";

interface Feature {
  text: string;
  soon?: boolean;
}

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: Feature[];
  cta: string;
  ctaHref: string;
  highlight: boolean;
}

const SPLIT_SHEET_PLANS: Plan[] = [
  {
    name: "Free",
    price: "R0",
    period: "per month",
    description: "For artists just getting started with protecting their work.",
    features: [
      { text: "3 split sheets per month" },
      { text: "Email delivery to all signatories" },
      { text: "Basic PDF download" },
    ],
    cta: "Get Started Free",
    ctaHref: "/sign-up",
    highlight: false,
  },
  {
    name: "Pro",
    price: "R10",
    period: "per month",
    description: "For active creators, producers, and small labels.",
    features: [
      { text: "Unlimited split sheets" },
      { text: "Email delivery to all signatories" },
      { text: "Basic PDF download" },
      { text: "Lifetime split history" },
      { text: "Dashboard - all your split sheets in one place" },
      { text: "Metadata portal + Song Link generator" },
    ],
    cta: "Get Pro",
    ctaHref: "/sign-up",
    highlight: true,
  },
  {
    name: "Premium",
    price: "R100",
    period: "per month",
    description: "Everything in Pro, plus powerful industry integrations.",
    features: [
      { text: "All Pro benefits" },
      { text: "One-click CMO notification (SAMRO, SAMPRA, CAPASSO)" },
      { text: "Spotify Song DNA integration", soon: true },
      { text: "Song plays reporter - Shazam, DSPs, YouTube, Radio", soon: true },
    ],
    cta: "Get Premium",
    ctaHref: "/sign-up",
    highlight: false,
  },
];

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0 mt-0.5"
    >
      <circle cx="8" cy="8" r="8" fill="rgba(201,146,10,0.2)" />
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

export default function Pricing() {
  const renderPlans = (plans: Plan[]) => (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
    >
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`relative flex flex-col gap-6 rounded-2xl p-8 ${
            plan.highlight
              ? "bg-green text-white shadow-xl ring-2 ring-gold"
              : "bg-white text-dark shadow-md"
          }`}
        >
          {plan.highlight && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold bg-gold text-dark px-4 py-1 rounded-full uppercase tracking-widest">
              Most Popular
            </span>
          )}

          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-sm uppercase tracking-widest text-gold">
              {plan.name}
            </h3>
            <div className="flex items-end gap-1">
              <span className={`font-bold text-4xl font-serif ${plan.highlight ? "text-white" : "text-dark"}`}>
                {plan.price}
              </span>
              <span className={`text-sm mb-1 ${plan.highlight ? "text-white/60" : "text-dark/50"}`}>
                /{plan.period}
              </span>
            </div>
            <p className={`text-sm leading-relaxed mt-1 ${plan.highlight ? "text-white/70" : "text-dark/60"}`}>
              {plan.description}
            </p>
          </div>

          <ul className="flex flex-col gap-2.5 flex-1">
            {plan.features.map((feature) => (
              <li key={feature.text} className={`flex items-start gap-2.5 text-sm leading-relaxed ${plan.highlight ? "text-white/80" : "text-dark/70"}`}>
                <CheckIcon />
                <span>
                  {feature.text}
                  {feature.soon && (
                    <span className="ml-2 text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border border-gold/40 text-gold/70 align-middle">
                      Soon
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href={plan.ctaHref}
            className={`inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-150 px-6 py-3 text-sm ${
              plan.highlight
                ? "bg-gold text-dark hover:bg-gold/90"
                : "border-2 border-dark text-dark hover:bg-dark hover:text-light"
            }`}
          >
            {plan.cta}
          </Link>
        </div>
      ))}
    </div>
  );

  return (
    <SectionWrapper id="pricing" className="bg-light">
      {/* Heading block */}
      <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col gap-3">
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "#C9920A", fontVariant: "small-caps" }}
        >
          Pricing
        </p>
        <h2 className="font-serif font-bold text-dark text-3xl md:text-4xl leading-snug">
          Simple, Honest Pricing
        </h2>
        <p className="text-dark/60 text-base leading-relaxed">
          Start free. Upgrade when you need more. Cancel any time.
        </p>
      </div>

      <div className="flex flex-col gap-5 mb-4">
        <h3 className="font-serif font-bold text-dark text-2xl md:text-3xl">
          Split Sheets
        </h3>
        <p className="text-dark/60 text-sm leading-relaxed max-w-2xl">
          Create, approve, and download legally recognised split sheets for your collaborations.
        </p>
      </div>
      {renderPlans(SPLIT_SHEET_PLANS)}

      <p className="text-center text-dark/40 text-xs mt-10">
        Prices are in South African Rand (ZAR).
      </p>
    </SectionWrapper>
  );
}

