import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata = {
  title: "Privacy Policy - SPLITA",
  description:
    "Learn how SPLITA collects, stores, uses, and protects your personal information in accordance with POPIA and ECTA.",
};

const LAST_UPDATED = "August 2026";

export default function PrivacyPage() {
  return (
    <main className="pt-16 bg-white">
      {/* Hero band */}
      <div
        className="py-16 px-6 text-center"
        style={{ backgroundColor: "#1B4D3E" }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: "#C9920A", fontVariant: "small-caps" }}
        >
          Legal
        </p>
        <h1 className="font-serif font-bold text-white text-3xl md:text-4xl leading-snug">
          Privacy Policy
        </h1>
        <p className="text-white/60 text-sm mt-3">Last updated: {LAST_UPDATED}</p>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-6 py-16 text-dark/80 leading-relaxed">

        {/* Intro */}
        <p className="mb-5">
          SPLITA is committed to protecting and respecting your privacy. This Privacy
          Policy explains how we collect, store, use, and protect your personal
          information in accordance with the Protection of Personal Information Act,
          No. 4 of 2013 (POPIA) and the Electronic Communications and Transactions
          Act, No. 25 of 2002 (ECTA) of South Africa.
        </p>
        <p className="mb-10">
          By using our website, webapp, and services, you consent to the processing of
          your personal information as described in this policy.
        </p>

        <Section number="1" title="Information We Collect">
          <p className="mb-5">
            We collect information to provide a better, more secure user experience and
            to facilitate transactions on our platform.
          </p>

          <Subsection title="A. Information You Provide Voluntarily">
            <BulletList items={[
              { label: "Account Registration", body: "When you create an account, we collect your name, email address, cellphone number, and a secure password." },
              { label: "Creator Profiles", body: "If you sell content, we may collect your business details, South African ID/registration number (for identity verification), and banking details to process payouts." },
              { label: "Customer Support", body: "Correspondence, feedback, or support tickets you submit to us." },
            ]} />
          </Subsection>

          <Subsection title="B. Information Collected Automatically">
            <BulletList items={[
              { label: "Device and Usage Data", body: "IP addresses, browser types, operating systems, pages viewed, and the dates/times of your visits." },
              { label: "Cookies and Tracking", body: "We use cookies to keep you logged in, remember your preferences, and analyse website traffic. You can manage cookie preferences via your browser settings." },
              { label: "Google Analytics", body: "We use Google Analytics 4 (provided by Google LLC) to understand how visitors interact with our website. Google Analytics collects anonymised data such as pages visited, session duration, and general location (country/city level). Google may process this data on servers outside South Africa. You can opt out by installing the Google Analytics Opt-out Browser Add-on at tools.google.com/dlpage/gaoptout." },
            ]} />
          </Subsection>
        </Section>

        <Section number="2" title="How We Process Your Data">
          <p className="mb-4">
            We process your personal information only for justifiable, lawful purposes,
            including:
          </p>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            <li>Fulfilling purchases and delivering digital content to your account.</li>
            <li>Processing payouts to Content Creators.</li>
            <li>Verifying your identity to prevent fraud, money laundering, or unauthorised use of the platform.</li>
            <li>Sending transaction receipts, account updates, and essential system notifications.</li>
            <li>Improving platform functionality, user interface, and customer service.</li>
            <li>Complying with South African statutory, legal, and regulatory obligations.</li>
          </ul>
        </Section>

        <Section number="3" title="How We Store and Protect Your Data">
          <p className="mb-4">
            We take the security of your personal information seriously and implement
            strict technical and organisational measures to safeguard it.
          </p>
          <BulletList items={[
            { label: "Security Measures", body: "We utilise secure server infrastructure, firewalls, and data encryption (SSL/TLS) for data in transit." },
            { label: "Payment Information", body: "We do not store your credit card or sensitive banking details on our servers. All payments are processed through secure, PCI-DSS compliant third-party payment gateways (e.g., PayFast, Peach Payments)." },
            { label: "Data Retention", body: "We retain your personal information only for as long as your account is active, or as required by South African law (e.g., tax regulations require financial records to be kept for 5 years)." },
          ]} />
        </Section>

        <Section number="4" title="Sharing Your Information">
          <p className="mb-4">
            We do not sell, rent, or trade your personal information to third parties. We
            only share data with trusted third parties necessary to run our services:
          </p>
          <BulletList items={[
            { label: "Payment Gateways", body: "To securely process your financial transactions." },
            { label: "Hosting and Infrastructure Providers", body: "To keep our platform secure and operational." },
            { label: "Legal Authorities", body: "If required by law, court order, or a government authority operating under South African jurisdiction." },
          ]} />
        </Section>

        <Section number="5" title="Your Rights Under POPIA">
          <p className="mb-4">
            As a data subject in South Africa, you possess specific rights regarding your
            personal information. You have the right to:
          </p>
          <BulletList items={[
            { label: "Access", body: "Request a copy of the personal information we hold about you." },
            { label: "Correction", body: "Request that we update, correct, or delete inaccurate or out-of-date information." },
            { label: "Objection", body: "Object to the processing of your data for direct marketing purposes." },
            { label: "Deletion", body: "Request the deletion of your account and associated personal data, subject to legal data retention requirements." },
          ]} />
          <p className="mt-4">
            To exercise any of these rights, please contact our Information Officer using
            the details provided in section 7 below.
          </p>
        </Section>

        <Section number="6" title="Third-Party Links">
          <p>
            Our website may contain links to external websites. We are not responsible
            for the privacy practices or content of these third-party platforms. We
            encourage you to read the privacy policies of any website you visit.
          </p>
        </Section>

        <Section number="7" title="Contact Our Information Officer" last>
          <p className="mb-5">
            If you have any questions about this Privacy Policy, wish to lodge a
            complaint regarding how your data is handled, or want to exercise your
            legal rights, please contact us:
          </p>

          <address className="not-italic bg-gray-50 border border-gray-200 rounded-xl px-6 py-5 flex flex-col gap-1 text-sm mb-6">
            <span className="font-semibold text-dark">SPLITA - Information Officer</span>
            <span>
              Email:{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-green underline underline-offset-2 hover:text-green/80"
              >
                {CONTACT_EMAIL}
              </a>
            </span>
            <span className="mt-2 text-dark/60 leading-relaxed">
              Jackal Creek Golf Estate<br />
              Northriding, Johannesburg<br />
              Gauteng, 2169<br />
              South Africa
            </span>
          </address>

          <p className="text-sm text-dark/60 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
            If you feel we have not adequately addressed your concerns, you have the
            right to escalate your complaint to the{" "}
            <strong className="text-dark/80">South African Information Regulator</strong> at{" "}
            <a
              href="mailto:inforeg@justice.gov.za"
              className="text-green underline underline-offset-2 hover:text-green/80"
            >
              inforeg@justice.gov.za
            </a>
            .
          </p>
        </Section>
      </div>
    </main>
  );
}

/* ── Local layout helpers ─────────────────────────────────────────── */

function Section({
  number,
  title,
  children,
  last = false,
}: Readonly<{
  number: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}>) {
  return (
    <section className={`${last ? "" : "mb-12 pb-12 border-b border-gray-100"}`}>
      <h2 className="font-serif font-bold text-dark text-xl md:text-2xl mb-4">
        <span style={{ color: "#C9920A" }}>{number}.</span> {title}
      </h2>
      {children}
    </section>
  );
}

function Subsection({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <div className="mb-5">
      <h3 className="font-semibold text-dark text-base mb-3">{title}</h3>
      {children}
    </div>
  );
}

function BulletList({
  items,
}: Readonly<{
  items: { label: string; body: string }[];
}>) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.label} className="flex gap-2">
          <span
            className="shrink-0 w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "#C9920A", marginTop: "0.45rem" }}
            aria-hidden="true"
          />
          <span>
            <strong>{item.label}:</strong> {item.body}
          </span>
        </li>
      ))}
    </ul>
  );
}
