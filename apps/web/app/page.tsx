"use client";

import Link from "next/link";
import { useMemo } from "react";
import { jobs } from "@/lib/data";

export default function Home() {
  const featured = useMemo(() => jobs.slice(0, 3), []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03120a] text-white">
      <div className="absolute inset-0 animate-gradient bg-[radial-gradient(circle_at_20%_20%,#27e58a66,transparent_35%),radial-gradient(circle_at_80%_10%,#dff95b44,transparent_30%),radial-gradient(circle_at_50%_80%,#1baa5f55,transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0b2616,#05160d_40%,#0d2f12)] opacity-80" />
      <div className="absolute inset-0 noise" />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-6 py-14">
        <header className="flex flex-col gap-6 text-center md:text-left md:flex-row md:items-center md:justify-between">
          <div className="space-y-4 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-lime-200">India-first employment agency</p>
            <h1 className="text-4xl font-semibold leading-tight text-lime-50 md:text-5xl">
              Permanent & contract hiring across tech, product, analytics, and GTM.
            </h1>
            <p className="text-lg text-lime-50/80">
              Yeble partners with funded startups and enterprises to place vetted talent faster—PAN India reach, with
              on-ground recruiters in Bengaluru, Hyderabad, Delhi NCR, Mumbai, and Pune.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-lime-400 px-6 py-3 text-sm font-semibold text-[#06290f] shadow-[0_15px_50px_0_rgba(84,255,138,0.35)] transition hover:translate-y-[-2px] hover:shadow-[0_20px_60px_0_rgba(84,255,138,0.45)] text-center"
              >
                Hire with Yeble
              </Link>
              <Link
                href="/jobs"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-lime-50 transition hover:border-lime-300/70 hover:text-lime-200 text-center"
              >
                View open roles
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-lime-100/70">
              <span className="rounded-full border border-white/10 px-3 py-1">Turnaround: shortlist in 72h</span>
              <span className="rounded-full border border-white/10 px-3 py-1">Compliance: IT/ITES staffing</span>
              <span className="rounded-full border border-white/10 px-3 py-1">PAN India sourcing hubs</span>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur md:min-w-[320px]">
            <p className="text-xs uppercase tracking-[0.24em] text-lime-200/80">Snapshot</p>
            <div className="mt-3 space-y-3 text-sm text-lime-100/80">
              <div className="flex items-center justify-between">
                <span>Active mandates</span> <span className="text-lime-50 font-semibold">48</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Avg. shortlist time</span> <span className="text-lime-50 font-semibold">2.1 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Offer acceptance</span> <span className="text-lime-50 font-semibold">82%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Roles filled in FY25</span> <span className="text-lime-50 font-semibold">312</span>
              </div>
            </div>
          </div>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-lime-200/80">Featured roles</p>
              <h2 className="text-xl font-semibold text-lime-50">Select openings this week</h2>
            </div>
            <Link href="/jobs" className="text-sm text-lime-200 hover:text-lime-100">
              See all
            </Link>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {featured.map((job) => (
              <article key={job.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-lime-200/80">{job.company}</p>
                <h3 className="mt-1 text-lg font-semibold text-lime-50">{job.title}</h3>
                <p className="text-sm text-lime-100/70">
                  {job.city} · {job.locationType} · {job.experience}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-lime-100/80">
                  <span className="rounded-full bg-white/10 px-3 py-1">{job.salaryRange}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1">{job.type}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1">{job.sector}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-lime-200/80">For employers</p>
            <h2 className="text-xl font-semibold text-lime-50">Build teams faster, compliantly</h2>
            <ul className="mt-4 space-y-2 text-sm text-lime-100/80">
              <li>✔ Targeted sourcing across tech, product, data, GTM, and TA.</li>
              <li>✔ Structured screening: skills + background + compensation sanity.</li>
              <li>✔ Interview scheduling, feedback loops, and offer negotiation.</li>
              <li>✔ Compliance ready: offer letters, NDAs, BGV liaison on request.</li>
            </ul>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-lime-400 px-5 py-2 text-sm font-semibold text-[#06290f] shadow-lg hover:bg-lime-300"
            >
              Book an intake call
            </Link>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-lime-200/80">For candidates</p>
            <h2 className="text-xl font-semibold text-lime-50">Curated intros to vetted employers</h2>
            <ul className="mt-4 space-y-2 text-sm text-lime-100/80">
              <li>✔ Roles across Bengaluru, Hyderabad, NCR, Mumbai, Pune, Remote.</li>
              <li>✔ Interview coaching and salary guidance specific to your stack.</li>
              <li>✔ Confidential submissions—your résumé is never blasted.</li>
              <li>✔ Rapid feedback; we keep you updated at every stage.</li>
            </ul>
            <Link
              href="/jobs"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-lime-50 hover:border-lime-200"
            >
              View openings
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-lime-200/80">Process</p>
              <h2 className="text-xl font-semibold text-lime-50">How Yeble places talent</h2>
            </div>
            <Link href="/services" className="text-sm text-lime-200 hover:text-lime-100">
              See services
            </Link>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-4 text-sm text-lime-100/80">
            {[
              { title: "Intake", desc: "Role scorecard, comp bands, timeline, DEI notes." },
              { title: "Source", desc: "Targeted outreach + inbound curation from referral pools." },
              { title: "Assess", desc: "Skill screens, structured notes, compensation sanity check." },
              { title: "Close", desc: "Scheduling, panel prep, offer negotiation, joining follow-up." },
            ].map((step, idx) => (
              <div key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-lime-200/70">Step {idx + 1}</p>
                <h3 className="mt-2 text-base font-semibold text-lime-50">{step.title}</h3>
                <p className="mt-1 text-lime-100/70">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-5 text-sm text-lime-100/70 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Yeble Careers · India</div>
          <div className="flex flex-wrap gap-3">
            <Link href="/about" className="hover:text-lime-200">
              About
            </Link>
            <Link href="/services" className="hover:text-lime-200">
              Services
            </Link>
            <Link href="/jobs" className="hover:text-lime-200">
              Jobs
            </Link>
            <Link href="/contact" className="hover:text-lime-200">
              Contact
            </Link>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .bg-grid {
          background-image: radial-gradient(circle, rgba(255, 255, 255, 0.06) 1px, transparent 0);
          background-size: 30px 30px;
          animation: pan 18s linear infinite;
          opacity: 0.4;
        }
        @keyframes pan {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(30px, 30px, 0);
          }
        }
        .animate-sway {
          animation: sway 14s ease-in-out infinite alternate;
        }
        @keyframes sway {
          0% {
            transform: translate3d(-2%, -2%, 0) scale(1);
          }
          100% {
            transform: translate3d(3%, 3%, 0) scale(1.05);
          }
        }
        .progress-bar {
          animation: progress 2000ms ease forwards;
          transform-origin: left center;
        }
        @keyframes progress {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientFlow 18s ease-in-out infinite, drift 24s ease-in-out infinite;
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
        .noise {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'%3E%3C/feTurbulence%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          mix-blend-mode: soft-light;
          opacity: 0.4;
        }
      `}</style>
    </div>
  );
}
