import { Suspense } from "react";
import AuthCompleteClient from "./auth-complete-client";

export default function AuthCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#fffef0] px-6 text-[#123622]">
          Loading...
        </div>
      }
    >
      <AuthCompleteClient />
    </Suspense>
  );
}
