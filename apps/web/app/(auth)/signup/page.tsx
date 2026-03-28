import { Suspense } from "react";
import SignUpClient from "./signup-client";

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fffef0] text-[#0f2918] flex items-center justify-center">Loading...</div>}>
      <SignUpClient />
    </Suspense>
  );
}
