import { Suspense } from "react";
import SignInClient from "./signin-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading…</div>}>
      <SignInClient />
    </Suspense>
  );
}
