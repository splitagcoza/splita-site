"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type AcceptedStatus = "pending" | "accepted" | "rejected";
type SheetStatus = "draft" | "pending" | "completed" | "cancelled";

interface Collaborator {
  id: string;
  name: string;
  role: string;
  email: string;
  percentage: number;
  accepted_status: AcceptedStatus;
  accepted_at?: string | null;
}

interface SplitSheet {
  id: string;
  title: string;
  main_artist: string;
  featured_artists: string[];
  split_sheet_type?: string;
  status: SheetStatus;
  pdf_url?: string | null;
  created_at: string;
  collaborators: Collaborator[];
}

// ─── Badge helpers ─────────────────────────────────────────────────────────────

const SHEET_STATUS_STYLES: Record<SheetStatus, string> = {
  draft:     "bg-gray-100 text-gray-600",
  pending:   "bg-amber-50 text-amber-700 border border-amber-200",
  completed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  cancelled: "bg-red-50 text-red-700 border border-red-200",
};

const COLLAB_STATUS_STYLES: Record<AcceptedStatus, string> = {
  pending:  "bg-amber-50 text-amber-700",
  accepted: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-700",
};

const COLLAB_STATUS_DOTS: Record<AcceptedStatus, string> = {
  pending:  "bg-amber-400",
  accepted: "bg-emerald-500",
  rejected: "bg-red-500",
};

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status }: Readonly<{ status: SheetStatus }>) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${SHEET_STATUS_STYLES[status]}`}
    >
      {capitalize(status)}
    </span>
  );
}

function CollabStatusBadge({ status }: Readonly<{ status: AcceptedStatus }>) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${COLLAB_STATUS_STYLES[status]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${COLLAB_STATUS_DOTS[status]}`} aria-hidden="true" />
      {capitalize(status)}
    </span>
  );
}

function CollaboratorProgress({ collaborators }: Readonly<{ collaborators: Collaborator[] }>) {
  const total = collaborators.length;
  if (total === 0) return null;
  const accepted = collaborators.filter((c) => c.accepted_status === "accepted").length;
  const rejected = collaborators.filter((c) => c.accepted_status === "rejected").length;

  return (
    <p className="text-sm text-gray-500 mt-1">
      {accepted}/{total} signed
      {rejected > 0 && <span className="text-red-600 ml-2">{rejected} declined</span>}
    </p>
  );
}

// ─── PDF Download ──────────────────────────────────────────────────────────────

async function downloadPDF(id: string, token: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
  const res = await fetch(`${apiUrl}/api/v1/split-sheets/${id}/pdf`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const json = await res.json().catch(() => null);
    throw new Error(
      (json?.error?.message as string | undefined) ?? "Failed to get PDF URL"
    );
  }
  const json = await res.json();
  const pdfUrl = (json?.data?.pdf_url as string | undefined);
  if (!pdfUrl) throw new Error("PDF URL not found in response");
  window.open(pdfUrl, "_blank", "noopener,noreferrer");
}

// ─── Split Sheet Card ──────────────────────────────────────────────────────────

function SplitSheetCard({
  sheet,
  token,
}: Readonly<{
  sheet: SplitSheet;
  token: string;
}>) {
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    setDownloadError(null);
    try {
      await downloadPDF(sheet.id, token);
    } catch (err) {
      setDownloadError(err instanceof Error ? err.message : "Download failed");
    } finally {
      setDownloading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setResendMsg(null);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
    try {
      const res = await fetch(
        `${apiUrl}/api/v1/split-sheets/${sheet.id}/resend-invitations`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await res.json().catch(() => null);
      if (res.ok) {
        setResendMsg("Invitations resent.");
      } else {
        setResendMsg(
          (json?.error?.message as string | undefined) ?? "Failed to resend."
        );
      }
    } catch {
      setResendMsg("Could not reach the server.");
    } finally {
      setResending(false);
    }
  };

  const pendingCollabs = sheet.collaborators.filter(
    (c) => c.accepted_status === "pending"
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Card header */}
      <div className="px-6 py-5 flex items-start justify-between gap-4 border-b border-gray-50">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-serif font-bold text-lg text-dark leading-snug truncate">
              {sheet.title}
            </h2>
            <StatusBadge status={sheet.status} />
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {sheet.main_artist}
            {sheet.featured_artists?.length > 0 &&
              ` ft. ${sheet.featured_artists.join(", ")}`}
            {sheet.split_sheet_type && (
              <>
                <span className="mx-1.5">·</span>
                {sheet.split_sheet_type}
              </>
            )}
            <span className="mx-1.5">·</span>
            {formatDate(sheet.created_at)}
          </p>
          <CollaboratorProgress collaborators={sheet.collaborators} />
        </div>
      </div>

      {/* Collaborators table */}
      {expanded && sheet.collaborators.length > 0 ? (
        <div className="overflow-x-auto" id={`collaborators-${sheet.id}`}>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3 text-left">Collaborator</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-right">Split</th>
                <th className="px-6 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sheet.collaborators.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3.5">
                    <p className="font-medium text-dark">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.email}</p>
                  </td>
                  <td className="px-6 py-3.5 text-gray-500">{c.role}</td>
                  <td className="px-6 py-3.5 text-right font-semibold text-dark">
                    {c.percentage}%
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <CollabStatusBadge status={c.accepted_status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        expanded && <p className="px-6 py-4 text-sm text-gray-500">No collaborators added.</p>
      )}

      {/* Card footer */}
      <div className="px-6 py-4 border-t border-gray-50 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={`collaborators-${sheet.id}`}
          className="inline-flex min-h-11 items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {expanded ? "Hide details" : "View details"}
          <svg className={`transition-transform ${expanded ? "rotate-180" : ""}`} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Open PDF */}
        {sheet.pdf_url ? (
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex min-h-11 items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-[#1B4D3E] text-white hover:bg-[#1B4D3E]/90 disabled:opacity-60 transition-colors"
          >
            {downloading ? (
              "Opening…"
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 3h7v7" /><path d="M10 14 21 3" /><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
                </svg>
                Open PDF
              </>
            )}
          </button>
        ) : (
          <span className="inline-flex min-h-11 items-center px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-500">
            PDF not available
          </span>
        )}

        {/* Resend invitations (only when there are pending collaborators) */}
        {pendingCollabs.length > 0 && (
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="inline-flex min-h-11 items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-60 transition-colors"
          >
            {resending ? (
              "Sending…"
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-.08-3.08" />
                </svg>
                Resend Invitations
              </>
            )}
          </button>
        )}

        {/* Inline feedback */}
        {downloadError && (
          <p className="text-xs text-red-600" role="alert">{downloadError}</p>
        )}
        {resendMsg && (
          <p role="status" className={`text-xs ${resendMsg === "Invitations resent." ? "text-emerald-700" : "text-red-600"}`}>
            {resendMsg}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Skeleton loader ───────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
      <div className="h-3 bg-gray-100 rounded w-1/4 mb-6" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-3 bg-gray-100 rounded w-full" />
        ))}
      </div>
    </div>
  );
}

function SummaryCards({ sheets, total }: Readonly<{ sheets: SplitSheet[]; total: number }>) {
  const pendingSignatures = sheets.reduce(
    (count, sheet) => count + sheet.collaborators.filter((collaborator) => collaborator.accepted_status === "pending").length,
    0
  );
  const completed = sheets.filter((sheet) => sheet.status === "completed").length;
  const declined = sheets.reduce(
    (count, sheet) => count + sheet.collaborators.filter((collaborator) => collaborator.accepted_status === "rejected").length,
    0
  );
  const items = [
    { label: "Total sheets", value: total, color: "text-[#1A3A6B]" },
    { label: "Pending signatures", value: pendingSignatures, color: "text-[#C9920A]" },
    { label: "Completed", value: completed, color: "text-[#1B4D3E]" },
    { label: "Declined", value: declined, color: "text-[#B84A2E]" },
  ];

  return (
    <section aria-label="Split sheet summary" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-sm sm:px-5">
          <p className="text-xs font-medium text-gray-500">{item.label}</p>
          <p className={`mt-1 text-2xl font-bold ${item.color}`}>{item.value}</p>
        </div>
      ))}
    </section>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function DashboardContent() {
  const { data: session, status } = useSession();
  const token = session?.backendToken;

  const [sheets, setSheets] = useState<SplitSheet[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | SheetStatus>("all");
  const [sort, setSort] = useState<"newest" | "oldest" | "title">("newest");

  const LIMIT = 10;

  const fetchSheets = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
    try {
      const fetchPage = async (pageNumber: number) => {
        const res = await fetch(
          `${apiUrl}/api/v1/split-sheets?page=${pageNumber}&limit=${LIMIT}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const json = await res.json();
        if (res.status === 401) {
          await signOut({ callbackUrl: "/sign-in" });
          throw new Error("Your session has expired.");
        }
        if (!res.ok) {
          throw new Error(
            (json?.error?.message as string | undefined) ??
              `Request failed (${res.status})`
          );
        }
        return json;
      };

      const first = await fetchPage(1);
      const overallTotal = first.data?.pagination?.total ?? 0;
      const pageCount = Math.ceil(overallTotal / LIMIT);
      const remaining = pageCount > 1
        ? await Promise.all(Array.from({ length: pageCount - 1 }, (_, index) => fetchPage(index + 2)))
        : [];
      const allSheets = [
        ...(first.data?.split_sheets ?? []),
        ...remaining.flatMap((response) => response.data?.split_sheets ?? []),
      ];

      setSheets(allSheets);
      setTotal(overallTotal);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (status === "loading" || !token) return;
    fetchSheets();
  }, [fetchSheets, status, token]);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, sort]);

  const filteredSheets = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return sheets
      .filter((sheet) => statusFilter === "all" || sheet.status === statusFilter)
      .filter((sheet) => {
        if (!query) return true;
        const searchable = [
          sheet.title,
          sheet.main_artist,
          ...sheet.featured_artists,
          ...sheet.collaborators.flatMap((collaborator) => [collaborator.name, collaborator.email, collaborator.role]),
        ].join(" ").toLocaleLowerCase();
        return searchable.includes(query);
      })
      .sort((a, b) => {
        if (sort === "title") return a.title.localeCompare(b.title);
        const difference = new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        return sort === "newest" ? difference : -difference;
      });
  }, [sheets, search, sort, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredSheets.length / LIMIT));
  const visibleSheets = filteredSheets.slice((page - 1) * LIMIT, page * LIMIT);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  // Session still resolving - show skeletons
  if (status === "loading") {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  // Authenticated but no backend token - session needs refresh
  if (status === "authenticated" && !token) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-8 py-10 text-center">
        <p className="font-semibold text-amber-800 mb-1">Session needs a refresh</p>
        <p className="text-sm text-amber-700 mb-5">
          Your session is missing a backend token. Please sign out and sign back in to fix this.
        </p>
        <Link
          href="/api/auth/signout"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
          style={{ backgroundColor: "#1B4D3E" }}
        >
          Sign out &amp; back in
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-sm text-red-700 flex items-center justify-between">
          <span>{error}</span>
          <button
            type="button"
            onClick={fetchSheets}
            className="min-h-11 px-3 text-sm font-semibold underline sm:min-h-0 ml-4"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading skeletons */}
      {loading && !error && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && sheets.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-16 text-center">
          <div
            className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: "#F0EDE8" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9920A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </div>
          <h3 className="font-serif font-bold text-xl text-dark mb-2">
            No split sheets yet
          </h3>
          <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
            Create your first split sheet to track ownership and collaborator sign-offs.
          </p>
          <Link
            href="/split"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: "#1B4D3E" }}
          >
            Create Split Sheet
          </Link>
        </div>
      )}

      {/* Split sheet cards */}
      {!loading && !error && sheets.length > 0 && (
        <>
          <SummaryCards sheets={sheets} total={total} />

          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
              <div>
                <label htmlFor="sheet-search" className="sr-only">Search split sheets</label>
                <input
                  id="sheet-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search title, artist or collaborator…"
                  className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-dark outline-none placeholder:text-gray-400 focus:border-[#1B4D3E] focus:ring-2 focus:ring-[#1B4D3E]/10"
                />
              </div>
              <div>
                <label htmlFor="status-filter" className="sr-only">Filter by status</label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value as "all" | SheetStatus)}
                  className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-dark outline-none focus:border-[#1B4D3E] focus:ring-2 focus:ring-[#1B4D3E]/10"
                >
                  <option value="all">All statuses</option>
                  <option value="draft">Draft</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label htmlFor="sheet-sort" className="sr-only">Sort split sheets</label>
                <select
                  id="sheet-sort"
                  value={sort}
                  onChange={(event) => setSort(event.target.value as "newest" | "oldest" | "title")}
                  className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-dark outline-none focus:border-[#1B4D3E] focus:ring-2 focus:ring-[#1B4D3E]/10"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="title">Title A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {filteredSheets.length === 0 ? (
            <div className="rounded-2xl border border-gray-100 bg-white px-8 py-12 text-center">
              <h3 className="font-serif text-xl font-bold text-dark">No matching split sheets</h3>
              <p className="mt-2 text-sm text-gray-500">Try a different search term or status.</p>
              <button
                type="button"
                onClick={() => { setSearch(""); setStatusFilter("all"); }}
                className="mt-5 text-sm font-semibold text-[#1B4D3E] underline underline-offset-4"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-gray-500">
                Showing {visibleSheets.length} of {filteredSheets.length} matching sheet{filteredSheets.length === 1 ? "" : "s"}
              </p>
              {visibleSheets.map((sheet) => (
                <SplitSheetCard key={sheet.id} sheet={sheet} token={token!} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredSheets.length > LIMIT && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-gray-400">
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
