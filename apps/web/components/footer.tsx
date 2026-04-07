"use client";

import Link from "next/link";
import Image from "next/image";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M13.5 21v-7.2H16l.4-2.8h-2.9V9.2c0-.8.2-1.4 1.4-1.4h1.6V5.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v1.8H8v2.8h2.3V21h3.2Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#dcd8cf] bg-[#f5f4ef] text-[#0f2c1c]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-sm md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Yeble.careers logo"
              width={180}
              height={60}
              className="h-12 w-auto filter grayscale"
            />
          </div>
          <p className="text-[#2f4a35]/70">&copy; {year} Yeble - Accelerate your Placement</p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#2f4a35]/65">Follow us</span>
            <a
              href="https://www.facebook.com/yeble.careers"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Yeble.careers on Facebook"
              className="inline-flex items-center gap-2 rounded-full border border-[#d7d2c8] bg-white px-3 py-1.5 text-xs font-semibold text-[#0f2c1c] transition hover:border-[#1c3e2a] hover:text-[#1c3e2a]"
            >
              <FacebookIcon />
              <span>Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/yeble.careers"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Yeble.careers on Instagram"
              className="inline-flex items-center gap-2 rounded-full border border-[#d7d2c8] bg-white px-3 py-1.5 text-xs font-semibold text-[#0f2c1c] transition hover:border-[#1c3e2a] hover:text-[#1c3e2a]"
            >
              <InstagramIcon />
              <span>Instagram</span>
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/about" className="hover:text-[#1c3e2a]">
            About
          </Link>
          <Link href="/services" className="hover:text-[#1c3e2a]">
            Services
          </Link>
          <Link href="/jobs" className="hover:text-[#1c3e2a]">
            Jobs
          </Link>
          <Link href="/contact" className="hover:text-[#1c3e2a]">
            Contact
          </Link>
          <Link href="/terms-conditions" className="hover:text-[#1c3e2a]">
            Terms & Conditions
          </Link>
          <Link href="/privacy-policy" className="hover:text-[#1c3e2a]">
            Privacy Policy
          </Link>
          <Link href="/refund-policy" className="hover:text-[#1c3e2a]">
            Refund Policy
          </Link>
          <Link href="/accessibility" className="hover:text-[#1c3e2a]">
            Accessibility
          </Link>
          <Link href="/signin" className="hover:text-[#1c3e2a]">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}