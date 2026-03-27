import Link from "next/link";

function AnimatedCheckmark() {
  return (
    <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-[#f5fbf6] shadow-[0_18px_40px_rgba(39,192,107,0.18)]">
      <span className="absolute h-full w-full animate-ping rounded-full border border-[#8fe2b0] opacity-30" />
      <svg viewBox="0 0 120 120" aria-hidden="true" className="h-24 w-24">
        <circle
          cx="60"
          cy="60"
          r="42"
          fill="none"
          stroke="#27c06b"
          strokeWidth="8"
          strokeDasharray="264"
          strokeDashoffset="264"
          className="animate-[dash-circle_0.8s_ease-out_forwards]"
        />
        <path
          d="m42 61 12 12 24-26"
          fill="none"
          stroke="#1f6a45"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="54"
          strokeDashoffset="54"
          className="animate-[dash-check_0.45s_ease-out_0.55s_forwards]"
        />
      </svg>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-92px)] w-full max-w-5xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <section className="w-full rounded-[2rem] border border-[#e3decf] bg-white/95 p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <AnimatedCheckmark />
          </div>
          <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-[#2d6a3e]">Thank you</p>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#123622] sm:text-4xl">
            Your registration request has been received successfully.
          </h1>
          <p className="mt-4 text-base leading-8 text-[#31513c] sm:text-lg">
            We have received your details and our team will review the request carefully. Once everything is in order, we will reach out on your shared email address or phone number with the next step.
          </p>

          <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
            <article className="rounded-2xl border border-[#e8e1cd] bg-[#fffdf6] p-4">
              <p className="text-sm font-semibold text-[#123622]">Request received</p>
              <p className="mt-2 text-sm leading-6 text-[#31513c]">Your submission is now in our workflow for review.</p>
            </article>
            <article className="rounded-2xl border border-[#e8e1cd] bg-[#fffdf6] p-4">
              <p className="text-sm font-semibold text-[#123622]">Team review</p>
              <p className="mt-2 text-sm leading-6 text-[#31513c]">Our Dehradun team will check the details and next-step fit.</p>
            </article>
            <article className="rounded-2xl border border-[#e8e1cd] bg-[#fffdf6] p-4">
              <p className="text-sm font-semibold text-[#123622]">Follow-up</p>
              <p className="mt-2 text-sm leading-6 text-[#31513c]">We will get in touch with a clear update instead of leaving you guessing.</p>
            </article>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center rounded-full bg-[#27c06b] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1fb35f]"
            >
              View open roles
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-[#d6d1c1] px-6 py-3 text-sm font-semibold text-[#123622] transition hover:border-[#2d6a3e]"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
