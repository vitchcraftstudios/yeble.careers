"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const APPLY_CALLBACK_STORAGE_KEY = "yeble_auth_callback_url";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function AuthCompleteClient() {
  const router = useRouter();
  const params = useSearchParams();
  const { isLoaded, userId } = useAuth();
  const [status, setStatus] = useState<"checking" | "success">("checking");

  const callbackUrl = useMemo(() => {
    const fromParams = params.get("callbackUrl");
    if (fromParams) return fromParams;

    if (typeof window !== "undefined") {
      return window.sessionStorage.getItem(APPLY_CALLBACK_STORAGE_KEY) || "/dashboard";
    }

    return "/dashboard";
  }, [params]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!userId) {
      router.replace(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
      return;
    }

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(APPLY_CALLBACK_STORAGE_KEY, callbackUrl);
    }

    setStatus("success");
    const timer = window.setTimeout(() => {
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(APPLY_CALLBACK_STORAGE_KEY);
      }
      router.replace(callbackUrl);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [callbackUrl, isLoaded, router, userId]);

  const success = status === "success";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fffef0] px-6 text-[#123622]">
      <div className="w-full max-w-md rounded-[2rem] border border-[#e3decf] bg-white/90 p-8 text-center shadow-[0_24px_80px_rgba(84,255,138,0.12)]">
        <p className="text-xs uppercase tracking-[0.32em] text-[#2d6a3e]">Yeble Careers</p>
        <div className="mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
          {success ? (
            <CheckIcon />
          ) : (
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#27c06b] border-t-transparent" />
          )}
        </div>
        <h1 className="mt-5 text-3xl font-semibold">{success ? "Signed in successfully" : "Signing you in"}</h1>
        <p className="mt-3 text-sm leading-7 text-[#31513c]">
          {success
            ? "Your account is ready. Redirecting you to the next page now."
            : "Your session is being confirmed. You will be redirected automatically in a moment."}
        </p>
      </div>
    </div>
  );
}
