"use client";

import { useState } from "react";
import { useClerk } from "@clerk/nextjs";

export function DashboardSignOutButton() {
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
      className="rounded-full border border-[#d6d1c1] bg-white px-4 py-2 text-sm font-medium text-[#31513c] transition hover:border-[#2d6a3e] hover:text-[#123622] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {signingOut ? "Signing out..." : "Sign out"}
    </button>
  );
}
