"use client";

import { useState, FormEvent } from "react";

interface Collaborator {
  id: string;
  name: string;
  role: string;
  email: string;
  percentage: string;
}

interface SubmitResult {
  success: boolean;
  message: string;
  pdfUrl?: string | null;
  status?: string;
}

const COMMON_ROLES = [
  "Artist",
  "Producer",
  "Songwriter",
  "Vocalist",
  "Featured Artist",
  "Mixing Engineer",
  "Mastering Engineer",
  "Composer",
  "Lyricist",
  "A&R",
];

const EMPTY_COLLABORATOR = (): Collaborator => ({
  id: crypto.randomUUID(),
  name: "",
  role: "",
  email: "",
  percentage: "",
});

function FieldLabel({
  htmlFor,
  children,
  optional,
}: Readonly<{
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}>) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-semibold text-dark mb-1"
    >
      {children}
      {optional && (
        <span className="ml-1 text-xs font-normal text-gray-400">
          (optional)
        </span>
      )}
    </label>
  );
}

function inputClass(error?: boolean) {
  return `w-full rounded-lg border px-4 py-2.5 text-sm text-dark placeholder-gray-400 outline-none transition-colors focus:ring-2 focus:ring-green/40 ${
    error ? "border-red bg-red/5" : "border-gray-200 bg-white focus:border-green"
  }`;
}

export default function SplitSheetForm() {
  const [title, setTitle] = useState("");
  const [mainArtist, setMainArtist] = useState("");
  const [masterOwner, setMasterOwner] = useState("");
  const [isrc, setIsrc] = useState("");
  const [featuredArtists, setFeaturedArtists] = useState<string[]>([]);
  const [featuredInput, setFeaturedInput] = useState("");
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    EMPTY_COLLABORATOR(),
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Running percentage total
  const totalPct = collaborators.reduce(
    (sum, c) => sum + (Number.parseFloat(c.percentage) || 0),
    0
  );
  const pctOk = Math.abs(totalPct - 100) <= 0.01;

  // ── Featured artists ────────────────────────────────────────────────────────
  const addFeatured = () => {
    const trimmed = featuredInput.trim();
    if (trimmed && !featuredArtists.includes(trimmed)) {
      setFeaturedArtists((prev) => [...prev, trimmed]);
    }
    setFeaturedInput("");
  };

  const removeFeatured = (name: string) =>
    setFeaturedArtists((prev) => prev.filter((a) => a !== name));

  // ── Collaborators ───────────────────────────────────────────────────────────
  const updateCollaborator = (
    index: number,
    field: keyof Collaborator,
    value: string
  ) => {
    setCollaborators((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
    // Clear percentage error on change
    if (field === "percentage") {
      setFieldErrors((prev) => ({ ...prev, percentage: "" }));
    }
  };

  const addCollaborator = () =>
    setCollaborators((prev) => [...prev, EMPTY_COLLABORATOR()]);

  const removeCollaborator = (index: number) =>
    setCollaborators((prev) => prev.filter((_, i) => i !== index));

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "Song title is required.";
    if (!mainArtist.trim()) errs.mainArtist = "Main artist name is required.";
    if (!pctOk) {
      errs.percentage = `Percentages must add up to exactly 100%. Currently: ${totalPct.toFixed(2)}%`;
    }
    collaborators.forEach((c, i) => {
      if (!c.name.trim()) errs[`collab_name_${i}`] = "Required";
      if (!c.role.trim()) errs[`collab_role_${i}`] = "Required";
      if (!c.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email))
        errs[`collab_email_${i}`] = "Valid email required";
      if (!c.percentage || Number.isNaN(Number.parseFloat(c.percentage)))
        errs[`collab_pct_${i}`] = "Required";
    });
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setResult(null);

    const payload = {
      title: title.trim(),
      main_artist: mainArtist.trim(),
      ...(featuredArtists.length > 0 && { featured_artists: featuredArtists }),
      ...(masterOwner.trim() && { master_owner: masterOwner.trim() }),
      ...(isrc.trim() && { isrc_optional: isrc.trim() }),
      collaborators: collaborators.map((c) => ({
        name: c.name.trim(),
        role: c.role.trim(),
        email: c.email.trim(),
        percentage: Number.parseFloat(c.percentage),
      })),
    };

    try {
      const apiBase =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
      const res = await fetch(`${apiBase}/api/v1/split-sheets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setResult({
          success: true,
          message:
            "Split sheet created! Collaborators will receive invitation emails shortly.",
          pdfUrl: (data as { pdf_url?: string | null }).pdf_url ?? null,
          status: (data as { status?: string }).status,
        });
      } else {
        const err = await res.json().catch(() => ({}));
        setResult({
          success: false,
          message: (err as { message?: string }).message ?? "Something went wrong. Please try again.",
        });
      }
    } catch {
      setResult({
        success: false,
        message:
          "Could not reach the server. Make sure the backend is running.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (result?.success) {
    return (
      <div className="flex flex-col items-center gap-6 py-12 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#1B4D3E" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="font-serif font-bold text-2xl text-dark">
          Split Sheet Created!
        </h2>
        <p className="text-gray-500 max-w-md">{result.message}</p>
        {result.pdfUrl ? (
          <a
            href={result.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 bg-green text-white font-semibold hover:bg-green/90 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </a>
        ) : (
          <p className="text-xs text-gray-400 max-w-sm">
            Your PDF is being generated in the background — check your dashboard or email shortly.
          </p>
        )}
        <button
          onClick={() => {
            setResult(null);
            setTitle(""); setMainArtist(""); setMasterOwner(""); setIsrc("");
            setFeaturedArtists([]); setCollaborators([EMPTY_COLLABORATOR()]);
          }}
          className="text-sm text-gold underline hover:no-underline"
        >
          Create another split sheet
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">

      {/* ── Section 1: Track Details ─────────────────────────────────────── */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: "#1B4D3E" }}>
            1
          </div>
          <h2 className="font-serif font-bold text-lg text-dark">Track Details</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Song Title */}
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="title">Song / Track Title</FieldLabel>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setFieldErrors((p) => ({ ...p, title: "" })); }}
              placeholder="e.g. Amapiano Groove"
              maxLength={255}
              className={inputClass(!!fieldErrors.title)}
            />
            {fieldErrors.title && <p className="mt-1 text-xs text-red">{fieldErrors.title}</p>}
          </div>

          {/* Main Artist */}
          <div>
            <FieldLabel htmlFor="main_artist">Main Artist</FieldLabel>
            <input
              id="main_artist"
              type="text"
              value={mainArtist}
              onChange={(e) => { setMainArtist(e.target.value); setFieldErrors((p) => ({ ...p, mainArtist: "" })); }}
              placeholder="e.g. DJ Kabelo"
              maxLength={255}
              className={inputClass(!!fieldErrors.mainArtist)}
            />
            {fieldErrors.mainArtist && <p className="mt-1 text-xs text-red">{fieldErrors.mainArtist}</p>}
          </div>

          {/* Master Owner */}
          <div>
            <FieldLabel htmlFor="master_owner" optional>Master Owner</FieldLabel>
            <input
              id="master_owner"
              type="text"
              value={masterOwner}
              onChange={(e) => setMasterOwner(e.target.value)}
              placeholder="e.g. Record Label Name"
              maxLength={255}
              className={inputClass()}
            />
          </div>

          {/* ISRC */}
          <div>
            <FieldLabel htmlFor="isrc" optional>ISRC Code</FieldLabel>
            <input
              id="isrc"
              type="text"
              value={isrc}
              onChange={(e) => setIsrc(e.target.value)}
              placeholder="e.g. USABC1234567"
              maxLength={50}
              className={inputClass()}
            />
          </div>

          {/* Featured Artists */}
          <div>
            <FieldLabel htmlFor="featured_input" optional>Featured Artists</FieldLabel>
            <div className="flex gap-2">
              <input
                id="featured_input"
                type="text"
                value={featuredInput}
                onChange={(e) => setFeaturedInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeatured(); } }}
                placeholder="Type a name and press Add"
                className={`${inputClass()} flex-1`}
              />
              <button
                type="button"
                onClick={addFeatured}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-gray-100 text-dark hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                Add
              </button>
            </div>
            {featuredArtists.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {featuredArtists.map((a) => (
                  <span key={a} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-gold/10 text-dark border border-gold/30">
                    {a}
                    <button type="button" onClick={() => removeFeatured(a)} aria-label={`Remove ${a}`} className="hover:text-red transition-colors">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Section 2: Collaborators ──────────────────────────────────────── */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: "#1B4D3E" }}>
              2
            </div>
            <h2 className="font-serif font-bold text-lg text-dark">Collaborators</h2>
          </div>
          {/* Percentage meter */}
          <div className={`text-sm font-bold tabular-nums ${pctOk ? "text-green" : totalPct > 100 ? "text-red" : "text-gray-400"}`}>
            {totalPct.toFixed(2)}% / 100%
          </div>
        </div>

        {/* Percentage bar */}
        <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${pctOk ? "bg-green" : totalPct > 100 ? "bg-red" : "bg-gold"}`}
            style={{ width: `${Math.min(totalPct, 100)}%` }}
          />
        </div>

        {fieldErrors.percentage && (
          <p className="text-xs text-red">{fieldErrors.percentage}</p>
        )}

        {/* Collaborator rows */}
        <div className="flex flex-col gap-4">
          {collaborators.map((c, i) => (
            <div key={c.id} className="relative rounded-xl border border-gray-100 bg-gray-50 p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Collaborator {i + 1}
                </span>
                {collaborators.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCollaborator(i)}
                    className="text-xs text-gray-400 hover:text-red transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Name */}
                <div>
                  <FieldLabel htmlFor={`collab_name_${i}`}>Full Name</FieldLabel>
                  <input
                    id={`collab_name_${i}`}
                    type="text"
                    value={c.name}
                    onChange={(e) => updateCollaborator(i, "name", e.target.value)}
                    placeholder="e.g. Thabo Nkosi"
                    maxLength={255}
                    className={inputClass(!!fieldErrors[`collab_name_${i}`])}
                  />
                  {fieldErrors[`collab_name_${i}`] && <p className="mt-1 text-xs text-red">{fieldErrors[`collab_name_${i}`]}</p>}
                </div>

                {/* Role */}
                <div>
                  <FieldLabel htmlFor={`collab_role_${i}`}>Role</FieldLabel>
                  <input
                    id={`collab_role_${i}`}
                    type="text"
                    list="role-options"
                    value={c.role}
                    onChange={(e) => updateCollaborator(i, "role", e.target.value)}
                    placeholder="e.g. Producer"
                    maxLength={100}
                    className={inputClass(!!fieldErrors[`collab_role_${i}`])}
                  />
                  {fieldErrors[`collab_role_${i}`] && <p className="mt-1 text-xs text-red">{fieldErrors[`collab_role_${i}`]}</p>}
                </div>

                {/* Email */}
                <div>
                  <FieldLabel htmlFor={`collab_email_${i}`}>Email Address</FieldLabel>
                  <input
                    id={`collab_email_${i}`}
                    type="email"
                    value={c.email}
                    onChange={(e) => updateCollaborator(i, "email", e.target.value)}
                    placeholder="e.g. thabo@email.com"
                    maxLength={255}
                    className={inputClass(!!fieldErrors[`collab_email_${i}`])}
                  />
                  {fieldErrors[`collab_email_${i}`] && <p className="mt-1 text-xs text-red">{fieldErrors[`collab_email_${i}`]}</p>}
                </div>

                {/* Percentage */}
                <div>
                  <FieldLabel htmlFor={`collab_pct_${i}`}>Ownership %</FieldLabel>
                  <input
                    id={`collab_pct_${i}`}
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={c.percentage}
                    onChange={(e) => updateCollaborator(i, "percentage", e.target.value)}
                    placeholder="e.g. 50"
                    className={inputClass(!!fieldErrors[`collab_pct_${i}`])}
                  />
                  {fieldErrors[`collab_pct_${i}`] && <p className="mt-1 text-xs text-red">{fieldErrors[`collab_pct_${i}`]}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Autocomplete list for roles */}
        <datalist id="role-options">
          {COMMON_ROLES.map((r) => <option key={r} value={r} />)}
        </datalist>

        <button
          type="button"
          onClick={addCollaborator}
          className="self-start inline-flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-500 hover:border-green hover:text-green transition-colors"
        >
          <span aria-hidden="true">+</span> Add Collaborator
        </button>
      </section>

      {/* ── Error banner ─────────────────────────────────────────────────── */}
      {result && !result.success && (
        <div className="rounded-lg border border-red/30 bg-red/5 px-4 py-3 text-sm text-red">
          {result.message}
        </div>
      )}

      {/* ── Submit ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 border-t border-gray-100">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3 font-semibold text-sm text-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#C9920A" }}
        >
          {submitting ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Generating…
            </>
          ) : (
            "Generate Split Sheet"
          )}
        </button>
        <p className="text-xs text-gray-400 text-center sm:text-left">
          All collaborators will receive an email invitation to sign.
        </p>
      </div>
    </form>
  );
}
