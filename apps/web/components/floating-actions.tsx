"use client";

import { useEffect, useState } from "react";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3.4a2 2 0 0 1-.6 1.8l-1.7 1.7a16 16 0 0 0 6 6l1.7-1.7a2 2 0 0 1 1.8-.6l3.4.5A2 2 0 0 1 22 16.9Z" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m18 15-6-6-6 6" />
      <path d="M12 9v10" />
    </svg>
  );
}

export function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setShowBackToTop(maxScroll > 0 && window.scrollY > maxScroll / 2);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <a
        href="tel:+919429692113"
        className="pointer-events-auto inline-flex h-13 items-center gap-2 rounded-full bg-[#27c06b] px-4 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(39,192,107,0.28)] transition hover:bg-[#1fb35f]"
        aria-label="Call Yeble Careers"
      >
        <PhoneIcon />
        <span>Call</span>
      </a>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#d8e5d9] bg-white text-[#123622] shadow-[0_14px_28px_rgba(15,41,24,0.12)] transition ${showBackToTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
        aria-label="Back to top"
      >
        <ArrowUpIcon />
      </button>
    </div>
  );
}
