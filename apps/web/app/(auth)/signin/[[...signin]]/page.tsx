import { Suspense } from "react";
import SignInClient from "../signin-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function SignInCatchAllPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-11rem)] items-center justify-center bg-[#fffef0] px-4 text-[#0f2918]">
          Loading...
        </div>
      }
    >
      <SignInClient />
    </Suspense>
  );
}
