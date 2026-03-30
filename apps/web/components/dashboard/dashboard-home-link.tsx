"use client";

import Link from "next/link";
import { useState } from "react";

type Props = {
  className?: string;
};

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6.5 9.5V20h11V9.5" />
    </svg>
  );
}

export function DashboardHomeLink({ className = "" }: Props) {
  const [navigating, setNavigating] = useState(false);

  return (
    <Link
      href="/"
      onClick={() => setNavigating(true)}
      aria-label={navigating ? "Opening homepage" : "Browse homepage"}
      title={navigating ? "Opening homepage" : "Browse homepage"}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d6d1c1] bg-white text-[#31513c] transition hover:border-[#2d6a3e] hover:text-[#123622] ${navigating ? "pointer-events-none opacity-70" : ""} ${className}`.trim()}
    >
      {navigating ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#31513c]/35 border-t-[#31513c]" aria-hidden="true" /> : <HomeIcon />}
    </Link>
  );
}
