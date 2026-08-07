// app/verify/[id]/page.tsx

interface VerifyResponse {
  valid: boolean;
  document_type: string;
  document_id: string;
  title?: string;
  status?: "draft" | "pending" | "completed" | "cancelled";
  parties?: number;
  created_at?: string;
  completed_at?: string | null;
  verified_at?: string;
}

interface ApiEnvelope {
  data: VerifyResponse;
}

async function getVerification(id: string): Promise<VerifyResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "https://api.splita.co.za";
  const res = await fetch(`${apiUrl}/api/v1/verify/${id}`, {
    next: { revalidate: 60 }, // cache for 60s
  });
  if (!res.ok) return { valid: false, document_type: "split_sheet", document_id: id };
  const json: ApiEnvelope = await res.json();
  return json.data;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    completed: { label: "Completed", className: "bg-green-100 text-green-800" },
    pending:   { label: "Pending signatures", className: "bg-yellow-100 text-yellow-800" },
    draft:     { label: "Draft", className: "bg-gray-100 text-gray-700" },
    cancelled: { label: "Cancelled", className: "bg-red-100 text-red-700" },
  };
  const { label, className } = map[status] ?? { label: status, className: "bg-gray-100 text-gray-700" };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${className}`}>
      {label}
    </span>
  );
}

function fmt(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-ZA", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default async function VerifyPage({ params }: { params: { id: string } }) {
  const data = await getVerification(params.id);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#1A73E8] px-8 py-6">
          <p className="text-white/80 text-sm font-medium tracking-wide uppercase">
            Document Verification
          </p>
          <h1 className="text-white text-2xl font-bold mt-1">Splita</h1>
        </div>

        {/* Body */}
        <div className="px-8 py-8">
          {!data.valid ? (
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-3xl">
                ✗
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Document Not Found</h2>
              <p className="text-gray-500 text-sm">
                This document ID does not match any record in the Splita system.
                It may have been deleted or the ID is incorrect.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Valid badge */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">
                  ✓
                </div>
                <div>
                  <p className="text-green-700 font-semibold">Authentic Document</p>
                  <p className="text-gray-400 text-xs">
                    Verified {fmt(data.verified_at)}
                  </p>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Details — no personal info */}
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <div className="col-span-2">
                  <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Song / Project</dt>
                  <dd className="text-gray-900 font-semibold text-base">{data.title}</dd>
                </div>
                <div>
                  <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Status</dt>
                  <dd><StatusBadge status={data.status ?? ""} /></dd>
                </div>
                <div>
                  <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Parties</dt>
                  <dd className="text-gray-900 font-medium">{data.parties} collaborator{data.parties !== 1 ? "s" : ""}</dd>
                </div>
                <div>
                  <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Created</dt>
                  <dd className="text-gray-700">{fmt(data.created_at)}</dd>
                </div>
                {data.completed_at && (
                  <div>
                    <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Completed</dt>
                    <dd className="text-gray-700">{fmt(data.completed_at)}</dd>
                  </div>
                )}
                <div className="col-span-2">
                  <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Document ID</dt>
                  <dd className="font-mono text-xs text-gray-500 break-all">{data.document_id}</dd>
                </div>
              </dl>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            Verified by{" "}
            <a href="https://splita.co.za" className="text-[#1A73E8] hover:underline">
              splita.co.za
            </a>{" "}
            · Music rights, handled.
          </p>
        </div>
      </div>
    </main>
  );
}
