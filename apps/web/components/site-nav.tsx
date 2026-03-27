"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/jobs", label: "Jobs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-[#dcd8cf] bg-[#f5f4ef]/95 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-[0.22em] uppercase text-[#0f2c1c]">
          <Image src="/logo.svg" alt="Yeble.careers logo" width={200} height={70} className="h-14 w-auto" priority />
        </Link>
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-2 text-sm text-[#0f2c1c] md:flex">
            {links.map((link) => {
              const isActive = isActivePath(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3 py-1.5 transition ${isActive ? "bg-[#123622] text-white shadow-sm" : "text-[#0f2c1c] hover:bg-white hover:text-[#1c3e2a]"}`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/signin"
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${isActivePath(pathname, "/signin") ? "border-[#123622] bg-[#123622] text-white" : "border-[#cfcabf] text-[#0f2c1c] hover:border-[#1c3e2a]"}`}
            >
              Admin
            </Link>
          </nav>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#cfcabf] text-[#0f2c1c] md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 md:hidden ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav className="flex flex-col gap-2 border-t border-[#dcd8cf] bg-[#f0ede6]/95 px-6 py-4 text-sm text-[#0f2c1c] shadow-[0_15px_40px_rgba(0,0,0,0.1)]">
          {links.map((link) => {
            const isActive = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-3 py-2 transition ${isActive ? "bg-[#123622] text-white" : "hover:bg-white"}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/signin"
            className={`mt-2 inline-flex w-full items-center justify-center rounded-full border px-3 py-2 text-xs font-semibold transition ${isActivePath(pathname, "/signin") ? "border-[#123622] bg-[#123622] text-white" : "border-[#cfcabf] text-[#0f2c1c] hover:border-[#1c3e2a]"}`}
            onClick={() => setOpen(false)}
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
