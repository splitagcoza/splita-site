"use client";

import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { useInView } from "@/lib/useInView";

const FAQS = [
  {
    question: "What exactly is a split sheet?",
    answer:
      "A split sheet is a legally binding agreement that records who owns what percentage of a song. It identifies every contributor (songwriters, producers, featured artists), their role, and their ownership share - both for the underlying composition and the master recording. When royalties are paid out, the split sheet is the source of truth.",
  },
  {
    question: "Are SPLITA documents legally recognised in South Africa?",
    answer:
      "Yes. SPLITA generates documents that are structured to be compatible with South African copyright law and the requirements of SAMRO and CAPASCO. Electronic signatures collected through SPLITA meet the threshold for enforceability under the Electronic Communications and Transactions Act (ECT Act) of 2002.",
  },
  {
    question: "Do my collaborators need a SPLITA account to sign?",
    answer:
      "No. You can invite anyone to sign via an email link. They review the document and sign with their full name and email address - no registration required. Once all parties have signed, every signatory automatically receives a copy of the completed PDF.",
  },
  {
    question: "Can I use SPLITA for beat sale certificates?",
    answer:
      "Absolutely. SPLITA supports exclusive, non-exclusive, and lease beat deal certificates. You can specify usage rights (commercial, streaming, sync), territory, and expiry date. The resulting document clearly records who sold what, under what terms, and for how much.",
  },
  {
    question: "What happens if a collaborator does not sign?",
    answer:
      "You can see the signing status of each party in real time on your dashboard. If someone has not signed you can send them a reminder directly from SPLITA. Documents remain in a pending state until all required signatories have completed the process.",
  },
  {
    question: "Is my data secure and private?",
    answer:
      "Yes. Documents are encrypted at rest and in transit. Only the parties you invite can access a given document. SPLITA does not share your data with third parties and complies with POPIA (Protection of Personal Information Act).",
  },
];

function FAQItem({ question, answer }: Readonly<{ question: string; answer: string }>) {
  const [open, setOpen] = useState(false);
  const id = question.replaceAll(/\s+/g, "-").toLowerCase().slice(0, 30);

  return (
    <div className="border-b border-dark/10 last:border-0">
      <button
        type="button"
        className="flex w-full items-center justify-between py-5 text-left gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((p) => !p)}
      >
        <span className="font-semibold text-dark text-base leading-snug">
          {question}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className={`flex-shrink-0 text-gold transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <section
        id={id}
        aria-label={question}
        className={`overflow-hidden transition-all duration-300 ease-out ${open ? "max-h-96 pb-5" : "max-h-0"}`}
      >
        <p className="text-dark/60 text-sm leading-relaxed">{answer}</p>
      </section>
    </div>
  );
}

export default function FaqSection() {
  const [ref, inView] = useInView();

  return (
    <SectionWrapper id="faq" className="bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Heading block */}
        <div className="text-center mb-12 flex flex-col gap-3">
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#C9920A", fontVariant: "small-caps" }}
          >
            FAQ
          </p>
          <h2 className="font-serif font-bold text-dark text-3xl md:text-4xl leading-snug">
            Frequently Asked Questions
          </h2>
          <p className="text-dark/60 text-base leading-relaxed">
            Everything you need to know before your first split sheet.
          </p>
        </div>

        {/* Accordion */}
        <div
          ref={ref}
          className={`transition-all duration-700 ease-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {FAQS.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

