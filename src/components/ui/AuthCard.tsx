"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import Logo from "@/components/ui/Logo";

interface AuthCardProps {
  mode: "sign-in" | "sign-up";
}

const PROVIDERS = [
  {
    connection: "google-oauth2",
    label: "Continue with Google",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    ),
    className:
      "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
  },
  {
    connection: "twitter",
    label: "Continue with X (Twitter)",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    className: "bg-black text-white hover:bg-black/80",
  },
];

export default function AuthCard({ mode }: Readonly<AuthCardProps>) {
  const isSignIn = mode === "sign-in";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{
        backgroundColor: "#2C1810",
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(201,146,10,0.05) 0px, rgba(201,146,10,0.05) 1px, transparent 1px, transparent 60px)",
      }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo variant="light" size={40} href="/" />
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl px-8 py-10 flex flex-col gap-6">
          {/* Heading */}
          <div className="text-center">
            <h1 className="font-serif font-bold text-2xl text-dark">
              {isSignIn ? "Welcome back" : "Join SPLITA"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {isSignIn
                ? "Sign in to access your split sheets"
                : "Create your account — it's free"}
            </p>
          </div>

          {/* Provider buttons — all route through Auth0, which federates to the social provider */}
          <div className="flex flex-col gap-3">
            {PROVIDERS.map((p) => (
              <button
                key={p.connection}
                type="button"
                onClick={() => signIn("auth0", { callbackUrl: "/split" }, { connection: p.connection })}
                className={`flex items-center justify-center gap-3 w-full rounded-lg px-4 py-3 text-sm font-semibold transition-colors duration-150 ${p.className}`}
              >
                {p.icon}
                {p.label}
              </button>
            ))}
          </div>

          {/* Divider note */}
          <p className="text-xs text-center text-gray-400">
            By continuing you agree to our{" "}
            <Link href="/terms" className="underline hover:text-dark">
              Terms
            </Link>{" "}
            &amp;{" "}
            <Link href="/privacy" className="underline hover:text-dark">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Switch mode */}
        <p className="text-center text-sm text-white/60 mt-6">
          {isSignIn ? (
            <>
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-gold font-semibold hover:underline">
                Join SPLITA
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/sign-in" className="text-gold font-semibold hover:underline">
                Login
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
