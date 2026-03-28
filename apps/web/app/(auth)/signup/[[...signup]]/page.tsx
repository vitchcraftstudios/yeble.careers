import { Suspense } from "react";
import SignUpClient from "../signup-client";

export default function SignUpCatchAllPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-11rem)] items-center justify-center bg-[#fffef0] px-4 text-[#0f2918]">
          Loading...
        </div>
      }
    >
      <SignUpClient />
    </Suspense>
  );
}
