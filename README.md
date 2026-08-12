# SPLITA - Marketing Site

**SPLITA** is a platform for African musicians to create legally recognised split sheets and beat sale certificates. This repository is the public marketing website, built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy the env example and fill in values
cp .env.local.example .env.local

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - the root `/` redirects to `/artists` (the main marketing page).

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical public URL, e.g. `https://www.splita.co.za` |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | No | Formspree POST URL for the contact/waitlist form |
| `NEXT_PUBLIC_PAYFAST_MERCHANT_ID` | No | PayFast merchant ID for donations |
| `NEXT_PUBLIC_PAYFAST_MERCHANT_KEY` | No | PayFast merchant key for donations |
| `NEXT_PUBLIC_PAYFAST_RETURN_URL` | No | PayFast success redirect URL |
| `NEXT_PUBLIC_PAYFAST_CANCEL_URL` | No | PayFast cancel redirect URL |

Copy `.env.local.example` to `.env.local` for local development. **Never commit `.env.local`.**

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start local dev server on port 3000 |
| `npm run build` | Production build (also runs `next-sitemap` via `postbuild`) |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Deployment

Connect the repository to [Vercel](https://vercel.com):

1. Import the `splita-site` repo in the Vercel dashboard.
2. Framework preset will auto-detect **Next.js**.
3. Set `NEXT_PUBLIC_SITE_URL` (and any other env vars) in **Settings → Environment Variables**.
4. Deploy.

**DNS:** Point `www.splita.co.za` to Vercel by adding a `CNAME` record in your DNS provider:

```
www  CNAME  cname.vercel-dns.com
```

For the apex domain (`splita.co.za`), add an `A` record pointing to `76.76.21.21`.

---

## Tech Stack

- **Framework**: Next.js 14 - App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Inter (body) + Playfair Display (headings)
- **Sitemap**: `next-sitemap` (auto-generated on build)
- **Deployment**: Vercel
