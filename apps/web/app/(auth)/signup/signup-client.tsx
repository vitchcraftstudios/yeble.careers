"use client";

import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function SignUpClient() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/dashboard";
  const redirectUrl = `/auth-complete?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#fffef0] via-[#f7f3dc] to-[#fffef0] px-4 py-6 text-[#0f2918] sm:px-6 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-md items-center">
        <div className="w-full rounded-[2rem] border border-[#e3decf] bg-white/92 p-5 shadow-[0_20px_80px_rgba(84,255,138,0.14)] backdrop-blur">
          <div className="mb-5 border-b border-[#ece6d7] pb-5 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#2d6a3e]">Yeble Careers</p>
            <h1 className="mt-3 text-3xl font-semibold text-[#123622]">Create account</h1>
            <p className="mt-2 text-sm leading-6 text-[#31513c]">Use email or phone OTP to create your Yeble account.</p>
          </div>
          <SignUp
            path="/signup"
            routing="path"
            signInUrl="/signin"
            forceRedirectUrl={redirectUrl}
            fallbackRedirectUrl={redirectUrl}
            appearance={{
              elements: {
                rootBox: "w-full",
                cardBox: "w-full",
                card: "w-full bg-transparent border-0 shadow-none p-0",
                header: "hidden",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                main: "gap-0",
                socialButtonsBlockButton: "border-[#e3decf] bg-white text-[#123622] shadow-none hover:bg-[#f8f4e7]",
                formFieldLabel: "text-[#21412b]",
                formFieldInput:
                  "border-[#ddd5c5] bg-white text-[#123622] focus:border-[#2d6a3e] focus:ring-[#2d6a3e]",
                formButtonPrimary: "bg-[#2fc267] text-white hover:bg-[#29af5d] shadow-[0_10px_24px_rgba(47,194,103,0.22)]",
                footerActionLink: "text-[#2d6a3e] hover:text-[#21412b]",
              },
            }}
          />
        </div>
      </div>
    </section>
  );
}
