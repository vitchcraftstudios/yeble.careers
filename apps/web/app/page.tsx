"use client";

import Link from "next/link";
import { useMemo } from "react";
import { jobs } from "@/lib/data";

export default function Home() {
  const featured = useMemo(() => jobs.slice(0, 3), []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fffef0] text-[#0f2918]">
      <div className="absolute inset-0 animate-gradient bg-[radial-gradient(circle_at_20%_20%,#b8f3c780,transparent_35%),radial-gradient(circle_at_80%_10%,#f3f0b080,transparent_30%),radial-gradient(circle_at_50%_80%,#9dd8a560,transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#ffffff,#f7f3dc_40%,#ffffff)] opacity-90" />
      <div className="absolute inset-0 noise opacity-20" />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-6 py-14">
        <header className="flex flex-col gap-6 rounded-3xl border border-[#e3decf] bg-white/80 p-6 shadow-lg backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="space-y-4 max-w-3xl text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.28em] text-[#2d6a3e]">Yeble.careers - Accelerate your Placement</p>
            <h1 className="text-4xl font-semibold leading-tight text-[#123622] md:text-5xl">
              Connecting innovative companies with the talent that drives excellence and growth.
            </h1>
            <p className="text-lg text-[#2f4a35]">
              Founded 2026 Â· HQ Selaqui, Dehradun, Uttarakhand. We staff across Uttarakhand, Uttar Pradesh, Haryana, and
              Himachal Pradesh with on-ground recruiters and tight feedback loops.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-[#27c06b] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_0_rgba(39,192,107,0.35)] transition hover:translate-y-[-2px] hover:shadow-[0_14px_46px_0_rgba(39,192,107,0.45)] text-center"
              >
                Hire with Yeble
              </Link>
              <Link
                href="/jobs"
                className="rounded-full border border-[#cfd8d0] px-6 py-3 text-sm font-semibold text-[#1d402a] transition hover:border-[#27c06b] hover:text-[#1a703d] text-center"
              >
                View open roles
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-[#31513c]">
              <span className="rounded-full border border-[#d6d1c1] bg-white/70 px-3 py-1">Turnaround: shortlist in 72h</span>
              <span className="rounded-full border border-[#d6d1c1] bg-white/70 px-3 py-1">Dehradun-led sourcing, 4-state coverage</span>
              <span className="rounded-full border border-[#d6d1c1] bg-white/70 px-3 py-1">Compliance: IT/ITES staffing</span>
            </div>
          </div>
          <div className="rounded-3xl border border-[#e3decf] bg-white/80 overflow-hidden backdrop-blur md:min-w-[340px] shadow-lg">
            <video
              className="w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4" />
            </video>
          </div>
        </header>

        <section className="rounded-3xl border border-[#e3decf] bg-white/85 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Featured roles</p>
              <h2 className="text-xl font-semibold text-[#123622]">Select openings this week</h2>
            </div>
            <Link href="/jobs" className="text-sm text-[#2d6a3e] hover:text-[#1a703d]">
              See all
            </Link>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {featured.map((job) => (
              <article key={job.id} className="rounded-2xl border border-[#e3decf] bg-white/85 p-4">
                <p className="text-xs text-[#2d6a3e]">{job.company}</p>
                <h3 className="mt-1 text-lg font-semibold text-[#123622]">{job.title}</h3>
                <p className="text-sm text-[#31513c]">
                  {job.city} Â· {job.locationType} Â· {job.experience}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#2f4a35]">
                  <span className="rounded-full bg-[#f4f2e3] px-3 py-1">{job.salaryRange}</span>
                  <span className="rounded-full border border-[#d6d1c1] px-3 py-1">{job.type}</span>
                  <span className="rounded-full border border-[#d6d1c1] px-3 py-1">{job.sector}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-[#e3decf] bg-white/85 p-6 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">For employers</p>
            <h2 className="text-xl font-semibold text-[#123622]">Build teams faster, compliantly</h2>
            <ul className="mt-4 space-y-2 text-sm text-[#2f4a35]">
              <li>âœ” Targeted sourcing across tech, product, data, GTM, and TA.</li>
              <li>âœ” Structured screening: skills + background + compensation sanity.</li>
              <li>âœ” Interview scheduling, feedback loops, and offer negotiation.</li>
              <li>âœ” Compliance ready: offer letters, NDAs, BGV liaison on request.</li>
            </ul>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#27c06b] px-5 py-2 text-sm font-semibold text-[#06290f] shadow-lg hover:bg-[#1fb35f]"
            >
              Book an intake call
            </Link>
          </div>
          <div className="rounded-3xl border border-[#e3decf] bg-white/85 p-6 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">For candidates</p>
            <h2 className="text-xl font-semibold text-[#123622]">Curated intros to vetted employers</h2>
            <ul className="mt-4 space-y-2 text-sm text-[#2f4a35]">
              <li>âœ” Roles across Bengaluru, Hyderabad, NCR, Mumbai, Pune, Remote.</li>
              <li>âœ” Interview coaching and salary guidance specific to your stack.</li>
              <li>âœ” Confidential submissionsâ€”your resume is never blasted.</li>
              <li>âœ” Rapid feedback; we keep you updated at every stage.</li>
            </ul>
            <Link
              href="/jobs"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#d6d1c1] px-5 py-2 text-sm font-semibold text-[#123622] hover:border-[#27c06b]"
            >
              View openings
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-[#e3decf] bg-white/85 p-6 backdrop-blur">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Process</p>
              <h2 className="text-xl font-semibold text-[#123622]">How Yeble places talent</h2>
            </div>
            <Link href="/services" className="text-sm text-[#2d6a3e] hover:text-[#1a703d]">
              See services
            </Link>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-4 text-sm text-[#2f4a35]">
            {[
              { title: "Intake", desc: "Role scorecard, comp bands, timeline, DEI notes." },
              { title: "Source", desc: "Targeted outreach + inbound curation from referral pools." },
              { title: "Assess", desc: "Skill screens, structured notes, compensation sanity check." },
              { title: "Close", desc: "Scheduling, panel prep, offer negotiation, joining follow-up." },
            ].map((step, idx) => (
              <div key={step.title} className="rounded-2xl border border-[#e3decf] bg-white/85 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[#2d6a3e]/70">Step {idx + 1}</p>
                <h3 className="mt-2 text-base font-semibold text-[#123622]">{step.title}</h3>
                <p className="mt-1 text-[#31513c]">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-[#e3decf] bg-white/85 p-6 backdrop-blur">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Inside Yeble</p>
              <h2 className="text-xl font-semibold text-[#123622]">In the field</h2>
            </div>
            <span className="text-sm text-[#2d6a3e]">Real teams, real candidates</span>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              {
                type: "image",
                src: "https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=900&q=80",
                alt: "Team collaboration",
              },
              {
                type: "video",
                src: "https://storage.googleapis.com/coverr-main/mp4/Night_City.mp4",
                poster:
                  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
              },
              {
                type: "image",
                src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80",
                alt: "Interview panel",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative overflow-hidden rounded-2xl border border-[#d6d1c1]">
                {item.type === "image" ? (
                  <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
                ) : (
                  <video
                    className="h-full w-full object-cover"
                    poster={item.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

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





