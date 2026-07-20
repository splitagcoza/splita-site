"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import type { Session } from "next-auth";
import { NAV_LINKS } from "@/lib/constants";
import Logo from "@/components/ui/Logo";

// ── Sub-components to keep Navbar's cognitive complexity low ──────────────────

function DesktopAuthControl({ session, transparent }: Readonly<{ session: Session | null; transparent: boolean }>) {
  if (session) {
    return (
      <div className="hidden lg:flex items-center gap-3">
        {session.user?.image ? (
          <Image src={session.user.image} alt={session.user.name ?? "User avatar"} width={32} height={32} className="rounded-full ring-2 ring-gold" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-dark text-xs font-bold">
            {session.user?.name?.[0] ?? "U"}
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className={`text-sm font-semibold transition-colors duration-150 ease-in-out hover:text-gold ${transparent ? "text-white" : "text-dark"}`}
        >
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <Link
      href="/sign-in"
      className="hidden lg:inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-150 ease-in-out px-6 py-2.5 text-sm bg-gold text-dark hover:bg-gold/90"
      style={{ boxShadow: "0 0 14px rgba(201,146,10,0.55)" }}
    >
      Login
    </Link>
  );
}

function MobileAuthControl({ session, closeMenu }: Readonly<{ session: Session | null; closeMenu: () => void }>) {
  if (session) {
    return (
      <button
        onClick={() => { signOut({ callbackUrl: "/" }); closeMenu(); }}
        className="inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-150 ease-in-out px-5 py-2.5 text-sm border border-dark text-dark hover:bg-dark hover:text-white mt-2"
      >
        Sign Out
      </button>
    );
  }
  return (
    <Link
      href="/sign-in"
      onClick={closeMenu}
      className="inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-150 ease-in-out px-6 py-2.5 text-sm bg-gold text-dark hover:bg-gold/90 mt-2"
      style={{ boxShadow: "0 0 14px rgba(201,146,10,0.45)" }}
    >
      Login
    </Link>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 ease-in-out ${transparent ? "bg-transparent" : "bg-white shadow-sm"}`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between h-16">
          <Logo variant={transparent ? "light" : "dark"} size={36} href="/" />

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors duration-150 ease-in-out hover:text-gold ${transparent ? "text-white" : "text-dark"}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <DesktopAuthControl session={session} transparent={transparent} />

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen((prev) => !prev)} className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            <span className={`block w-6 h-0.5 transition-all duration-150 ease-in-out ${transparent ? "bg-white" : "bg-dark"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 transition-all duration-150 ease-in-out ${transparent ? "bg-white" : "bg-dark"} ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 transition-all duration-150 ease-in-out ${transparent ? "bg-white" : "bg-dark"} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={`lg:hidden overflow-hidden transition-all duration-150 ease-in-out ${menuOpen ? "max-h-screen bg-white shadow-md" : "max-h-0"}`}>
        <nav className="flex flex-col px-6 pb-6 pt-2 gap-4">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={closeMenu} className="text-base font-medium text-dark hover:text-gold transition-colors duration-150 ease-in-out">
              {link.label}
            </Link>
          ))}
          <MobileAuthControl session={session} closeMenu={closeMenu} />
        </nav>
      </div>
    </header>
  );
}
