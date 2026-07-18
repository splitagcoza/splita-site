import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata = {
  title: "Terms & Conditions — SPLITA",
  description:
    "Read the SPLITA Terms and Conditions and User Policy governing your use of our platform, services, and digital products.",
};

const LAST_UPDATED = "June 2026";

export default function TermsPage() {
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
          Terms &amp; Conditions
        </h1>
        <p className="text-white/60 text-sm mt-3">Last updated: {LAST_UPDATED}</p>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-6 py-16 text-dark/80 leading-relaxed">

        {/* Intro */}
        <p className="mb-8">
          Welcome to SPLITA (&ldquo;the Platform&rdquo;). These Terms &amp; Conditions and User
          Policy (&ldquo;Terms&rdquo;) govern your access to and use of our website, webapp,
          services, and all digital products.
        </p>
        <p className="mb-10">
          By accessing, browsing, or using SPLITA, you acknowledge that you have
          read, understood, and agree to be bound by these Terms, as well as our
          Privacy Policy (compliant with the Protection of Personal Information Act,
          No. 4 of 2013). If you do not agree to these Terms, please do not use the
          Platform.
        </p>

        {/* Section */}
        <Section number="1" title="Definitions and Interpretation">
          <dl className="flex flex-col gap-3">
            {[
              ['"Platform"', "refers to SPLITA, its website, mobile applications, and associated digital services."],
              ['"User" or "You"', "refers to anyone accessing, downloading, uploading, or purchasing from the Platform, including Content Creators and Buyers."],
              ['"Content"', "refers to any sheets, documents, templates, media, text, or files uploaded to or downloaded from the Platform."],
              ['"CPA"', "means the Consumer Protection Act, No. 68 of 2008."],
              ['"ECTA"', "means the Electronic Communications and Transactions Act, No. 25 of 2002."],
              ['"POPIA"', "means the Protection of Personal Information Act, No. 4 of 2013."],
            ].map(([term, def]) => (
              <div key={term} className="grid grid-cols-[auto_1fr] gap-2">
                <dt className="font-semibold text-dark whitespace-nowrap">{term}</dt>
                <dd>{def}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section number="2" title="Eligibility and Account Registration">
          <p className="mb-4">
            To use certain features of the Platform, you may be required to register
            an account or create a user profile.
          </p>
          <BulletList items={[
            { label: "Age Restriction", body: "You must be at least 18 years old, or obtain the explicit consent of a legal guardian, to use this Platform." },
            { label: "Accuracy", body: "You agree to provide accurate, current, and complete information during registration and to keep your account details updated." },
            { label: "Security", body: "You are solely responsible for safeguarding your account password. You must immediately notify us of any unauthorised use of your account." },
          ]} />
        </Section>

        <Section number="3" title="Acceptable Use Policy">
          <p className="mb-4">
            You agree to use the Platform only for lawful purposes. You are strictly
            prohibited from uploading, sharing, or purchasing Content that:
          </p>
          <ul className="list-disc pl-6 flex flex-col gap-2 mb-4">
            <li>Infringes on the intellectual property, privacy, or publicity rights of any third party.</li>
            <li>Contains hate speech, defamatory language, obscenity, or promotes violence or discrimination.</li>
            <li>Contains viruses, malware, or any code designed to disrupt, damage, or limit the functionality of the Platform.</li>
            <li>Violates any South African statutory law, regulation, or common law.</li>
          </ul>
          <p className="text-sm bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-dark/70">
            <strong>Important:</strong> We reserve the right, at our sole discretion, to review,
            flag, filter, modify, or remove any User Content that violates this policy,
            and to suspend or terminate offending accounts without notice.
          </p>
        </Section>

        <Section number="4" title="Intellectual Property Rights">
          <Subsection title="4.1 Platform Ownership">
            <p>
              All rights, title, and interest in the Platform (excluding User-generated
              Content), including its software, design, logos, and trademarks, are the
              exclusive property of SPLITA and are protected by South African and
              international copyright laws.
            </p>
          </Subsection>
          <Subsection title="4.2 Creator Content and Licensing">
            <p className="mb-3">When you upload Content to the Platform:</p>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>You retain your ownership rights to that Content.</li>
              <li>
                You grant SPLITA a worldwide, non-exclusive, royalty-free licence to
                host, display, distribute, and market your Content on the Platform.
              </li>
              <li>
                You grant the purchasing User a non-exclusive, non-transferable,
                perpetual licence to use the downloaded Content for personal or
                internal business use, subject to the specific product tier purchased.
                You may not resell or redistribute downloaded Content as your own.
              </li>
            </ul>
          </Subsection>
        </Section>

        <Section number="5" title="Fees, Payments, and Refunds">
          <Subsection title="5.1 Pricing and Currency">
            <p>
              All prices listed on the Platform are in South African Rand (ZAR) unless
              stated otherwise. Prices are inclusive of Value Added Tax (VAT) where
              applicable.
            </p>
          </Subsection>
          <Subsection title="5.2 Payment Gateways">
            <p>
              Payments are processed via secure, third-party South African payment
              gateways (e.g., PayFast, Peach Payments, or Yoco). We do not store your
              credit card or banking details.
            </p>
          </Subsection>
          <Subsection title="5.3 Refund Policy (ECTA &amp; CPA Compliance)">
            <BulletList items={[
              { label: "Digital Goods Nature", body: "Our products are downloadable digital goods and are typically deemed \"consumed\" upon download." },
              { label: "ECTA Section 42(2)(f)", body: "The standard 7-day cooling-off period for electronic transactions does not apply to digital downloads once the download link has been generated or accessed." },
              { label: "CPA Refunds", body: "Refunds will only be considered if the digital file is proven to be defective, corrupted, or misrepresented. Refund requests must be logged with support within 48 hours of purchase." },
            ]} />
          </Subsection>
        </Section>

        <Section number="6" title="Privacy and Data Protection (POPIA)">
          <p className="mb-4">We respect your privacy and are committed to protecting your personal information.</p>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            <li>We collect and process your data strictly in accordance with POPIA.</li>
            <li>Your data is used solely to facilitate transactions, manage your account, and improve our services.</li>
            <li>For full details on how we collect, store, and process your data, please review our Privacy Policy.</li>
          </ul>
        </Section>

        <Section number="7" title="Limitation of Liability and Disclaimers">
          <BulletList items={[
            { label: '"As Is" Basis', body: 'The Platform and all Content provided are offered on an "as is" and "as available" basis without warranties of any kind.' },
            { label: "No Professional Advice", body: "Documents, sheets, and templates provided on this Platform are for informational and organisational purposes only. They do not constitute professional, legal, financial, or medical advice." },
            { label: "Limitation", body: "To the maximum extent permitted by South African law, SPLITA shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use or inability to use the Platform or its Content." },
          ]} />
        </Section>

        <Section number="8" title="Breach and Termination">
          <p className="mb-4">
            If you breach any of these Terms, or if we are required to do so by law,
            we reserve the right to:
          </p>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            <li>Issue a warning.</li>
            <li>Suspend or permanently terminate your account.</li>
            <li>Remove any or all of your Content.</li>
            <li>Take legal action to recover damages.</li>
          </ul>
        </Section>

        <Section number="9" title="Governing Law and Jurisdiction">
          <p>
            These Terms are governed by and construed in accordance with the laws of
            the Republic of South Africa. You agree that any legal disputes arising from
            these Terms or your use of the Platform will be subject to the exclusive
            jurisdiction of the South African courts (specifically the High Court or
            Magistrates&rsquo; Court nearest to our registered office).
          </p>
        </Section>

        <Section number="10" title="Amendments to Terms">
          <p>
            We may update these Terms from time to time to reflect changes in our
            services or legal requirements. We will notify you of any material changes
            by posting the updated Terms on this page with a new &ldquo;Last Updated&rdquo; date.
            Continued use of the Platform after such changes constitutes your
            acceptance of the new Terms.
          </p>
        </Section>

        <Section number="11" title="Contact Information" last>
          <p className="mb-5">
            If you have any questions, complaints, or notifications regarding these
            Terms, please contact our Information Officer at:
          </p>
          <address className="not-italic bg-gray-50 border border-gray-200 rounded-xl px-6 py-5 flex flex-col gap-1 text-sm">
            <span className="font-semibold text-dark">SPLITA</span>
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
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
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
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <h3 className="font-semibold text-dark text-base mb-2">{title}</h3>
      {children}
    </div>
  );
}

function BulletList({
  items,
}: {
  items: { label: string; body: string }[];
}) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.label} className="flex gap-2">
          <span
            className="mt-0.5 shrink-0 w-1.5 h-1.5 rounded-full"
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
