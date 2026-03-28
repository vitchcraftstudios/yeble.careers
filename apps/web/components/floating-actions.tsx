"use client";

import { useEffect, useState } from "react";

type ContactAction = {
  href: string;
  label: string;
  shortLabel: string;
  detail: string;
  icon: React.ReactNode;
  accentClass: string;
};

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3.4a2 2 0 0 1-.6 1.8l-1.7 1.7a16 16 0 0 0 6 6l1.7-1.7a2 2 0 0 1 1.8-.6l3.4.5A2 2 0 0 1 22 16.9Z" />
    </svg>
  );
}

function LandlineIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v6H6Z" />
      <path d="M8 6V4h8v2" />
      <path d="M4 15h16" />
      <path d="M8 19h8" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
      <path d="m22 8-10 6L2 8" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m18 15-6-6-6 6" />
      <path d="M12 9v10" />
    </svg>
  );
}

const contactActions: ContactAction[] = [
  {
    href: "tel:+919429692113",
    label: "Mobile",
    shortLabel: "Call",
    detail: "+91 94296 92113",
    icon: <PhoneIcon />,
    accentClass: "bg-[#27c06b] text-white shadow-[0_8px_16px_rgba(39,192,107,0.16)] hover:bg-[#1fb35f]",
  },
  {
    href: "tel:+911354222268",
    label: "Landline",
    shortLabel: "Dial",
    detail: "0135 422 2268",
    icon: <LandlineIcon />,
    accentClass: "bg-white text-[#123622] shadow-[0_7px_14px_rgba(15,41,24,0.07)] ring-1 ring-[#d8e5d9] hover:border-[#2d6a3e]",
  },
  {
    href: "mailto:growth@yeble.careers",
    label: "Email",
    shortLabel: "Email",
    detail: "growth@yeble.careers",
    icon: <MailIcon />,
    accentClass: "bg-white text-[#123622] shadow-[0_7px_14px_rgba(15,41,24,0.07)] ring-1 ring-[#d8e5d9] hover:border-[#2d6a3e]",
  },
];

export function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onSplashHidden = () => setReady(true);
    const fallback = window.setTimeout(() => setReady(true), 2800);

    window.addEventListener("yeble:splash-hidden", onSplashHidden);

    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("yeble:splash-hidden", onSplashHidden);
    };
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setShowBackToTop(maxScroll > 0 && window.scrollY > maxScroll / 2);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`pointer-events-auto fixed bottom-[4.15rem] right-2.5 z-50 inline-flex h-8.5 w-8.5 items-center justify-center rounded-full border border-[#d8e5d9] bg-white text-[#123622] shadow-[0_8px_16px_rgba(15,41,24,0.1)] transition md:hidden ${showBackToTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
        aria-label="Back to top"
      >
        <ArrowUpIcon />
      </button>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 border-t border-[#d8e5d9] bg-[rgba(255,250,241,0.96)] px-1 pb-[calc(0.25rem+env(safe-area-inset-bottom))] pt-1 shadow-[0_-8px_18px_rgba(15,41,24,0.08)] backdrop-blur md:hidden">
        <div className="grid grid-cols-3 gap-1">
          {contactActions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className={`pointer-events-auto flex min-h-[2.7rem] flex-col items-center justify-center rounded-[1rem] px-1 py-1.5 text-center text-[0.62rem] font-semibold leading-tight transition ${action.accentClass}`}
              aria-label={`${action.label}: ${action.detail}`}
            >
              <span className="mb-0.5">{action.icon}</span>
              <span>{action.shortLabel}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="pointer-events-none fixed left-2 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 md:flex xl:left-3">
        {contactActions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            className={`pointer-events-auto flex min-w-[9.5rem] items-center gap-2 rounded-xl border border-transparent px-2.5 py-2 transition ${action.accentClass}`}
            aria-label={`${action.label}: ${action.detail}`}
          >
            <span className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-[rgba(255,255,255,0.16)]">{action.icon}</span>
            <span className="flex min-w-0 flex-col">
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] opacity-75">{action.label}</span>
              <span className="truncate text-[0.78rem] font-semibold">{action.detail}</span>
            </span>
          </a>
        ))}

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`pointer-events-auto ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d8e5d9] bg-white text-[#123622] shadow-[0_10px_20px_rgba(15,41,24,0.08)] transition ${showBackToTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
          aria-label="Back to top"
        >
          <ArrowUpIcon />
        </button>
      </div>
    </>
  );
}
