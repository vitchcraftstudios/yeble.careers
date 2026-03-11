"use client";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03120a] text-white">
      <div className="absolute inset-0 animate-gradient bg-[radial-gradient(circle_at_20%_20%,#27e58a66,transparent_35%),radial-gradient(circle_at_80%_10%,#dff95b44,transparent_30%),radial-gradient(circle_at_50%_80%,#1baa5f55,transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0b2616,#05160d_40%,#0d2f12)] opacity-80" />
      <div className="absolute inset-0 noise" />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-lime-200">
          Yeble Placement · Vercel · Neon · Blob
        </div>

        <h1 className="text-4xl font-semibold leading-tight text-lime-100 md:text-5xl">
          Matching talent to teams, launching soon.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-lime-50/80">
          We’re crafting a fast, human placement experience. Roles go live here first—stay tuned.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            className="rounded-full bg-lime-400 px-6 py-3 text-sm font-semibold text-[#06290f] shadow-[0_15px_50px_0_rgba(84,255,138,0.35)] transition hover:translate-y-[-2px] hover:shadow-[0_20px_60px_0_rgba(84,255,138,0.45)]"
            href="mailto:hello@yeble.careers"
          >
            Partner with us
          </a>
          <a
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-lime-50 transition hover:border-lime-300/70 hover:text-lime-200"
            href="https://cal.com"
            target="_blank"
            rel="noreferrer"
          >
            Book an intro
          </a>
        </div>

        <div className="mt-12 grid gap-3 text-left text-sm text-lime-50/80 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <p className="text-lime-200">Zero-lag hiring</p>
            <p>Neon-backed pipelines with real-time shortlist updates.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <p className="text-lime-200">Signal-first matching</p>
            <p>We pair candidates with roles using curated, human-led review.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <p className="text-lime-200">Secure submissions</p>
            <p>Resumes land in Vercel Blob with privacy-respecting defaults.</p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 flex items-center justify-center pb-8 text-xs text-lime-50/70">
        © {new Date().getFullYear()} Yeble — Accelerate your Placement
      </footer>

      {showSplash && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-[#03120a]">
          <div className="absolute inset-0 animate-gradient bg-[radial-gradient(circle_at_30%_30%,#27e58a66,transparent_35%),radial-gradient(circle_at_70%_20%,#dff95b55,transparent_32%),radial-gradient(circle_at_60%_70%,#1baa5f55,transparent_30%)] opacity-80" />
          <div className="absolute inset-0 bg-[linear-gradient(145deg,#0a1f12,#06230f_50%,#0c2f14)] opacity-85" />
          <div className="relative flex flex-col items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-10 py-8 backdrop-blur-xl shadow-[0_20px_80px_rgba(20,255,120,0.25)] animate-pop">
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-lime-200">
              <span className="h-2 w-2 animate-pulse rounded-full bg-lime-300 shadow-[0_0_12px_2px_rgba(132,255,147,0.8)]" />
              Yeble
            </div>
            <h2 className="text-2xl font-semibold text-lime-50">Accelerate your Placement</h2>
          </div>
        </div>
      )}

      <style jsx global>{`
        .animate-pop {
          animation: popIn 600ms ease forwards;
          transform: scale(0.96);
          opacity: 0;
        }
        @keyframes popIn {
          0% {
            transform: scale(0.96);
            opacity: 0;
          }
          60% {
            transform: scale(1.03);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes drift {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(4%, -3%, 0) scale(1.05);
          }
          100% {
            transform: translate3d(-2%, 3%, 0) scale(1);
          }
        }
        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientFlow 18s ease-in-out infinite, drift 24s ease-in-out infinite;
        }
        .noise {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'%3E%3C/feTurbulence%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          mix-blend-mode: soft-light;
          opacity: 0.4;
        }
      `}</style>
    </div>
  );
}
