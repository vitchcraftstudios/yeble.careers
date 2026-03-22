"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function SignInClient() {
  const params = useSearchParams();
  const redirectUrl = params.get("callbackUrl") || "/admin";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffef0] via-[#f7f3dc] to-[#fffef0] text-[#0f2918]">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
        <div className="rounded-2xl border border-[#e3decf] bg-white/85 p-6 shadow-[0_20px_80px_rgba(84,255,138,0.25)] backdrop-blur">
          <div className="mb-4 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#2d6a3e]">Yeble</p>
            <h1 className="text-2xl font-semibold text-[#123622]">Sign in</h1>
            <p className="mt-2 text-sm text-[#31513c]">Use email, phone OTP, or social</p>
          </div>
          <SignIn
            path="/signin"
            routing="path"
            signUpUrl="/signup"
            // Clerk version in use expects forceRedirectUrl/fallbackRedirectUrl instead of redirectUrl
            forceRedirectUrl={redirectUrl}
            fallbackRedirectUrl={redirectUrl}
            appearance={{
              elements: {
                card: "bg-transparent border-0 shadow-none",
                headerTitle: "text-[#123622]",
                headerSubtitle: "text-lime-100/80",
                socialButtonsBlockButton: "border-[#e3decf] bg-white/85 text-[#123622]",
                formButtonPrimary: "bg-lime-400 text-[#06290f] hover:bg-lime-300",
                footerActionLink: "text-[#2d6a3e]",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}



