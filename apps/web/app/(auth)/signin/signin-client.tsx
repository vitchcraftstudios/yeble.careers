"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function SignInClient() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });
    setLoading(false);
    if (!res?.ok) {
      setError("Invalid credentials");
      return;
    }
    window.location.href = res.url || "/admin";
  };

  const handleGoogle = async () => {
    setError("");
    setGoogleLoading(true);
    await signIn("google", { callbackUrl });
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
              disabled={loading}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-lime-400 px-4 py-2 font-semibold text-[#06290f] transition hover:bg-lime-300 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <div className="mt-6 flex items-center gap-3 text-xs text-lime-100/60">
            <div className="h-px flex-1 bg-white/10" />
            <span>or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-lime-50 transition hover:border-lime-200/60 disabled:opacity-60"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.5 6.5 28.9 4.5 24 4.5 12.6 4.5 3.5 13.6 3.5 25S12.6 45.5 24 45.5 44.5 36.4 44.5 25c0-1.5-.1-2.5-.9-4.5z"
              />
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.3 16.2 18.8 14 24 14c3 0 5.7 1.1 7.8 3l5.7-5.7C33.5 6.5 28.9 4.5 24 4.5c-7.4 0-13.7 4.2-17.7 10.2z" />
              <path fill="#4CAF50" d="M24 45.5c5.2 0 10-1.8 13.6-5l-6.3-5.3C29.3 36 26.7 37 24 37c-5.3 0-9.7-3.1-11.5-7.5L6 34.9c3.9 6.1 10.5 10.6 18 10.6z" />
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1 2.9-3.6 5.1-6.6 5.9l6.3 5.3c-.4.3 6.4-4.7 6.4-14.2 0-1.5-.1-2.5-.8-4.5z" />
            </svg>
            {googleLoading ? "Redirecting…" : "Continue with Google"}
          </button>
        </div>
      </div>
    </div>
  );
}
