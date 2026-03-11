"use client";

import { FormEvent, useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInShell loading />}>
      <SignInShell />
    </Suspense>
  );
}

function SignInShell({ loading = false }: { loading?: boolean }) {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });
    setSubmitting(false);
    if (!res?.ok) {
      setError("Invalid credentials");
      return;
    }
    window.location.href = res.url || "/admin";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03120a] via-[#052511] to-[#0b3b1b] text-white">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
        <div className="rounded-2xl border border-white/15 bg-white/5 p-8 shadow-[0_20px_80px_rgba(84,255,138,0.25)] backdrop-blur">
          <div className="mb-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-lime-200">Yeble</p>
            <h1 className="text-2xl font-semibold text-lime-50">Sign in</h1>
            <p className="mt-2 text-sm text-lime-100/70">Admin access only</p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <label className="text-sm text-lime-100/80">Email</label>
              <input
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm text-lime-100/80">Password</label>
              <input
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-amber-300">{error}</p>}
            <button
              type="submit"
              disabled={loading || submitting}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-lime-400 px-4 py-2 font-semibold text-[#06290f] transition hover:bg-lime-300 disabled:opacity-60"
            >
              {loading || submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
