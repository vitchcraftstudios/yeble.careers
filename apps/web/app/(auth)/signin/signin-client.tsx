"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function SignInClient() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/dashboard";
  const redirectUrl = `/auth-complete?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#fffef0] via-[#f7f3dc] to-[#fffef0] px-4 py-6 text-[#0f2918] sm:px-6 sm:py-8 lg:px-8 lg:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center">
        <div className="relative w-full overflow-hidden rounded-[2rem] border border-[#e3decf] bg-white/92 shadow-[0_24px_80px_rgba(84,255,138,0.14)] backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,rgba(170,214,178,0.28),transparent_48%),radial-gradient(circle_at_top_right,rgba(255,238,188,0.5),transparent_40%)]" />
          <div className="relative grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="hidden border-r border-[#ece6d7] px-10 py-12 lg:flex lg:flex-col lg:justify-center">
              <div className="max-w-xl">
                <p className="text-xs uppercase tracking-[0.36em] text-[#2d6a3e]">Yeble Careers</p>
                <h1 className="mt-4 max-w-lg text-5xl font-semibold leading-[1.02] text-[#123622]">
                  Sign in to continue with your profile and application journey.
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-8 text-[#31513c]">
                  Access your registration details, payment status, resume links, and candidate profile from one clean dashboard built to feel like part of the Yeble experience.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-[#e3decf] bg-[#fffdf5] px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#6c8d74]">Profile</p>
                    <p className="mt-2 text-sm leading-6 text-[#21412b]">Keep your details, links, and role preferences updated.</p>
                  </div>
                  <div className="rounded-2xl border border-[#e3decf] bg-[#fffdf5] px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#6c8d74]">Payments</p>
                    <p className="mt-2 text-sm leading-6 text-[#21412b]">Check registration status and stay clear on the next step.</p>
                  </div>
                  <div className="rounded-2xl border border-[#e3decf] bg-[#fffdf5] px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#6c8d74]">Updates</p>
                    <p className="mt-2 text-sm leading-6 text-[#21412b]">Return anytime to manage your documents and activity.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-10">
              <div className="w-full rounded-[1.6rem] border border-[#e7e1d2] bg-[#fffef9] p-4 shadow-[0_18px_50px_rgba(18,54,34,0.08)] sm:p-6 lg:p-7">
                <div className="mb-5 border-b border-[#ece6d7] pb-5 text-center lg:text-left">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#2d6a3e]">Yeble Careers</p>
                  <h1 className="mt-3 text-3xl font-semibold leading-tight text-[#123622] lg:hidden">Sign in</h1>
                  <p className="mt-2 text-sm leading-6 text-[#4e6958] lg:hidden">
                    Access your profile, payment status, and registration details.
                  </p>
                  <p className="hidden text-xs uppercase tracking-[0.3em] text-[#2d6a3e] lg:block">Welcome back</p>
                  <h2 className="hidden text-2xl font-semibold text-[#123622] lg:mt-3 lg:block">Sign in</h2>
                  <p className="hidden text-sm leading-6 text-[#4e6958] lg:mt-2 lg:block">
                    Use your email, phone OTP, or available social sign-in method to access your Yeble account.
                  </p>
                </div>
                <SignIn
                  path="/signin"
                  routing="path"
                  signUpUrl="/signup"
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
                      footer: "pt-4",
                      socialButtonsBlockButton:
                        "border-[#e3decf] bg-white text-[#123622] shadow-none hover:bg-[#f8f4e7]",
                      formFieldLabel: "text-[#21412b]",
                      formFieldInput:
                        "border-[#ddd5c5] bg-white text-[#123622] focus:border-[#2d6a3e] focus:ring-[#2d6a3e]",
                      formButtonPrimary:
                        "bg-[#2fc267] text-white hover:bg-[#29af5d] shadow-[0_10px_24px_rgba(47,194,103,0.22)]",
                      footerActionLink: "text-[#2d6a3e] hover:text-[#21412b]",
                      identityPreviewText: "text-[#31513c]",
                      formResendCodeLink: "text-[#2d6a3e]",
                      otpCodeFieldInput:
                        "border-[#ddd5c5] bg-white text-[#123622] focus:border-[#2d6a3e] focus:ring-[#2d6a3e]",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
