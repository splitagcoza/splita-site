import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import DashboardContent from "@/components/sections/DashboardContent";

export const metadata = {
  title: "Dashboard - SPLITA",
  description: "View your split sheets and track collaborator sign-off status.",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return (
    <main className="min-h-screen pt-24 pb-16" style={{ backgroundColor: "#F9F7F4" }}>
      <div className="mx-auto max-w-3xl px-6">

        {/* Page header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-dark transition-colors mb-6"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Home
          </Link>

          <div className="flex items-end justify-between gap-4">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-1"
                style={{ color: "#C9920A", fontVariant: "small-caps" }}
              >
                My Documents
              </p>
              <h1 className="font-serif font-bold text-3xl md:text-4xl text-dark leading-snug">
                Split Sheets
              </h1>
            </div>
            <Link
              href="/split"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shrink-0 transition-colors hover:opacity-90"
              style={{ backgroundColor: "#1B4D3E" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Split Sheet
            </Link>
          </div>
        </div>

        {/* Dashboard content (client component - handles data fetching) */}
        <DashboardContent />

      </div>
    </main>
  );
}
