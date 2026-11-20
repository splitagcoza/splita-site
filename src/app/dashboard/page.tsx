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
  const firstName = session.user?.name?.trim().split(/\s+/)[0];

  return (
    <main className="min-h-screen pt-24 pb-16" style={{ backgroundColor: "#F9F7F4" }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">

        {/* Page header */}
        <div className="mb-8">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-gray-500">
            <Link href="/" className="hover:text-dark transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-dark">Dashboard</span>
          </nav>

          <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-end">
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
              <p className="mt-1 text-sm text-gray-500">
                {firstName ? `Welcome back, ${firstName}. ` : "Welcome back. "}
                Here&apos;s what needs your attention.
              </p>
            </div>
            <Link
              href="/split"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white sm:shrink-0 transition-colors hover:opacity-90"
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
