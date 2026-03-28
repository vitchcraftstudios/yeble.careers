"use client";

import Link from "next/link";

type Props = {
  className?: string;
};

export function DashboardHomeLink({ className = "" }: Props) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center justify-center rounded-full border border-[#d6d1c1] bg-white px-4 py-2 text-sm font-medium text-[#31513c] transition hover:border-[#2d6a3e] hover:text-[#123622] ${className}`.trim()}
    >
      Browse homepage
    </Link>
  );
}
