"use client";

import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function SignUpClient() {
  const params = useSearchParams();
  const redirectUrl = params.get("callbackUrl") || "/admin";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03120a] via-[#052511] to-[#0b3b1b] text-white">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
        <div className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-[0_20px_80px_rgba(84,255,138,0.25)] backdrop-blur">
          <div className="mb-4 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-lime-200">Yeble</p>
            <h1 className="text-2xl font-semibold text-lime-50">Create account</h1>
            <p className="mt-2 text-sm text-lime-100/70">Email or phone OTP</p>
          </div>
          <SignUp
            path="/signup"
            routing="path"
            signInUrl="/signin"
            afterSignUpUrl={redirectUrl}
            appearance={{
              elements: {
                card: "bg-transparent border-0 shadow-none",
                headerTitle: "text-lime-50",
                headerSubtitle: "text-lime-100/80",
                socialButtonsBlockButton: "border-white/15 bg-white/5 text-lime-50",
                formButtonPrimary: "bg-lime-400 text-[#06290f] hover:bg-lime-300",
                footerActionLink: "text-lime-200",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
