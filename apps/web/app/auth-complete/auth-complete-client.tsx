"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function AuthCompleteClient() {
  const router = useRouter();
  const params = useSearchParams();
  const { isLoaded, userId } = useAuth();
  const callbackUrl = params.get("callbackUrl") || "/dashboard";

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (userId) {
      router.replace(callbackUrl);
      return;
    }

    router.replace(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }, [callbackUrl, isLoaded, router, userId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fffef0] px-6 text-[#123622]">
      <div className="w-full max-w-md rounded-[2rem] border border-[#e3decf] bg-white/90 p-8 text-center shadow-[0_24px_80px_rgba(84,255,138,0.12)]">
        <p className="text-xs uppercase tracking-[0.32em] text-[#2d6a3e]">Yeble Careers</p>
        <h1 className="mt-4 text-3xl font-semibold">Signing you in</h1>
        <p className="mt-3 text-sm leading-7 text-[#31513c]">
          Your session is being confirmed. You will be redirected automatically in a moment.
        </p>
        <div className="mx-auto mt-6 h-10 w-10 animate-spin rounded-full border-2 border-[#27c06b] border-t-transparent" />
      </div>
    </div>
  );
}
