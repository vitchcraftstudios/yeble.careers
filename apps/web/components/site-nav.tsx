"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LogIn, Menu, ShieldCheck, UserRound, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/jobs", label: "Jobs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const authLinks = [
  { href: "/signin?callbackUrl=/jobs", label: "Registrant Login", icon: UserRound },
  { href: "/signin?callbackUrl=/admin", label: "Admin Login", icon: ShieldCheck },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur shadow-[0_8px_40px_rgba(15,23,42,0.06)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-900">
          <Image src="/logo.svg" alt="Yeble.careers logo" width={200} height={70} className="h-14 w-auto" priority />
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <nav className="flex items-center gap-5 text-sm text-slate-700">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-[#163b66]">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 pl-2">
            {authLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-800 transition hover:border-[#163b66] hover:text-[#163b66]"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 text-slate-800 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className={`overflow-hidden border-t border-slate-200 transition-[max-height,opacity] duration-300 md:hidden ${open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="flex flex-col gap-2 bg-white px-6 py-4 text-sm text-slate-700 shadow-[0_15px_40px_rgba(15,23,42,0.08)]">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-xl px-3 py-2 hover:bg-slate-50" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className="mt-2 grid gap-2">
            {authLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-800"
                onClick={() => setOpen(false)}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <Link
              href="/signup?callbackUrl=/jobs"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#163b66] px-4 py-2 text-xs font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              <LogIn className="h-4 w-4" />
              Create Registrant Account
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
