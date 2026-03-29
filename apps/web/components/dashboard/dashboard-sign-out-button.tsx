"use client";

import { useState } from "react";
import { useClerk } from "@clerk/nextjs";

type Props = {
  className?: string;
};

function SignOutIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M9 4.5H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25H9" />
      <path d="M14 16.5 19 12l-5-4.5" />
      <path d="M19 12H9" />
    </svg>
  );
}

export function DashboardSignOutButton({ className = "" }: Props) {
  const { signOut } = useClerk();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await signOut({ redirectUrl: "/signed-out" });
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={signingOut}
      aria-label={signingOut ? "Signing out" : "Sign out"}
      title={signingOut ? "Signing out" : "Sign out"}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d6d1c1] bg-white text-[#31513c] transition hover:border-[#2d6a3e] hover:text-[#123622] disabled:cursor-not-allowed disabled:opacity-70 ${className}`.trim()}
    >
      <SignOutIcon />
    </button>
  );
}
