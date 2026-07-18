import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SplitSheetForm from "@/components/sections/SplitSheetForm";
import Link from "next/link";

export const metadata = {
  title: "Generate Split Sheet — SPLITA",
  description:
    "Create a legally recognised split sheet for your track. Add collaborators, assign ownership percentages, and generate a signed PDF in minutes.",
};

export default async function SplitPage() {
  const session = await auth();
  if (!session) redirect("/sign-in");
  return (
    <main className="min-h-screen pt-24 pb-16" style={{ backgroundColor: "#F9F7F4" }}>
      <div className="mx-auto max-w-2xl px-6">

        {/* Page header */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-dark transition-colors mb-6"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Home
          </Link>

          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "#C9920A", fontVariant: "small-caps" }}
          >
            New Document
          </p>
          <h1 className="font-serif font-bold text-3xl md:text-4xl text-dark leading-snug">
            Generate Split Sheet
          </h1>
          <p className="mt-2 text-gray-500 text-sm leading-relaxed">
            Fill in the track details and add every collaborator with their ownership percentage.
            All percentages must total exactly 100%. Each collaborator will receive an email to sign.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-8 sm:px-10 sm:py-10">
          <SplitSheetForm />
        </div>

      </div>
    </main>
  );
}
