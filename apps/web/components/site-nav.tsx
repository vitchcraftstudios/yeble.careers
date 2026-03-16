"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/jobs", label: "Jobs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  // close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a2918]/90 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-[0.22em] uppercase text-lime-200">
          <Image src="/logo.svg" alt="Yeble.careers logo" width={120} height={40} className="h-10 w-auto" priority />
        </Link>
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-3 text-sm text-lime-100/80 md:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-lime-200">
                {link.label}
              </Link>
            ))}
            <Link
              href="/signin"
              className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-lime-50 hover:border-lime-300/70"
            >
              Admin
            </Link>
          </nav>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-lime-100 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>

      {/* mobile dropdown panel */}
      <div
        className={`md:hidden transition-[max-height,opacity] duration-300 overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2 border-t border-white/10 bg-[#0b2f1b]/95 px-6 py-4 text-sm text-lime-100/85 shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-2 py-2 hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/signin"
            className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-white/20 px-3 py-2 text-xs font-semibold text-lime-50 hover:border-lime-300/70"
            onClick={() => setOpen(false)}
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
