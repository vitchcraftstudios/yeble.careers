import { Suspense } from "react";
import SignUpClient from "./signup-client";

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#03120a] text-white flex items-center justify-center">Loading…</div>}>
      <SignUpClient />
    </Suspense>
  );
}
