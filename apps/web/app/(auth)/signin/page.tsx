import { Suspense } from "react";
import SignInClient from "./signin-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fffef0] text-[#0f2918] flex items-center justify-center">Loadingâ€¦</div>}>
      <SignInClient />
    </Suspense>
  );
}

