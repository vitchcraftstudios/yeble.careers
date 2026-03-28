import Link from "next/link";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function SignedOutPage() {
  return (
    <div className="bg-[#fffef0] px-6 py-16 text-[#123622] sm:py-24">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#e3decf] bg-white/90 p-8 shadow-[0_24px_80px_rgba(84,255,138,0.12)] sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
          <CheckIcon />
        </div>
        <p className="mt-6 text-center text-xs uppercase tracking-[0.32em] text-[#2d6a3e]">Yeble Careers</p>
        <h1 className="mt-4 text-center text-3xl font-semibold sm:text-4xl">You have been signed out</h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-7 text-[#31513c] sm:text-base">
          Your session has ended safely. You can return to the homepage, keep browsing the site, or sign back in whenever you are ready.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-[#27c06b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#22af61]"
          >
            Go to homepage
          </Link>
          <Link
            href="/signin"
            className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-[#d6d1c1] bg-white px-6 py-3 text-sm font-semibold text-[#123622] transition hover:border-[#2d6a3e]"
          >
            Sign in again
          </Link>
        </div>
      </div>
    </div>
  );
}
