"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import Logo from "@/components/ui/Logo";

// ── Navbar ────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
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
        </nav>
      </div>
    </header>
  );
}
