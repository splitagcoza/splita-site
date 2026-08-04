import Link from "next/link";

export const metadata = {
  title: "Decline Invitation — SPLITA",
};

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

async function processRejection(token: string) {
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
  try {
    const res = await fetch(
      `${apiBase}/api/v1/invitations/reject?token=${encodeURIComponent(token)}&format=json`,
      { cache: "no-store" }
    );
    const json = await res.json();
    if (res.ok) {
      return { success: true, message: json?.data?.message as string | undefined };
    }
    return {
      success: false,
      message: (json?.error?.message as string | undefined) ?? "Something went wrong.",
    };
  } catch {
    return { success: false, message: "Could not reach the server. Please try again later." };
  }
}

export default async function RejectInvitationPage({ searchParams }: Readonly<PageProps>) {
  const { token } = await searchParams;

  if (!token) {
    return <ResultCard declined={false} message="Invalid invitation link. No token provided." />;
  }

  const result = await processRejection(token);
  return <ResultCard declined={result.success} message={result.message} />;
}

function ResultCard({ declined, message }: Readonly<{ declined: boolean; message?: string }>) {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: "#F9F7F4" }}
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl px-8 py-10 flex flex-col items-center gap-6 text-center">
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: declined ? "#92400E" : "#7F1D1D" }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>

          {/* Heading */}
          <div>
            <h1 className="font-serif font-bold text-2xl text-dark mb-2">
              {declined ? "Invitation Declined" : "Unable to Process"}
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              {message ?? (declined
                ? "You've declined this invitation. The split sheet creator has been notified."
                : "This invitation link is invalid or has expired.")}
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#C9920A", color: "#fff" }}
          >
            Go to SPLITA
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          SPLITA — Simplifying music split sheets for African creators
        </p>
      </div>
    </main>
  );
}
