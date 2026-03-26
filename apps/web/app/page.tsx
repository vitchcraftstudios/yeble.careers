"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { EmployerIntakeModal } from "@/components/employer-intake-modal";
import { ScrollReveal } from "@/components/scroll-reveal";
import { jobs } from "@/lib/data";

export default function Home() {
  const featured = useMemo(() => jobs.slice(0, 3), []);
  const [intakeOpen, setIntakeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#fffef0] text-[#0f2918]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(184,243,199,0.38),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(243,240,176,0.34),transparent_28%),linear-gradient(135deg,#ffffff,#f7f3dc_40%,#fffef0)]" />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-6 py-14">
        <ScrollReveal>
          <header className="flex flex-col gap-6 rounded-3xl border border-[#e3decf] bg-white/92 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl space-y-4 text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.28em] text-[#2d6a3e]">Yeble.careers - Accelerate your Placement</p>
              <h1 className="text-4xl font-semibold leading-tight text-[#123622] md:text-5xl">
                Connecting innovative companies with the talent that drives excellence and growth.
              </h1>
              <p className="text-lg text-[#2f4a35]">
                Founded 2026 · HQ Selaqui, Dehradun, Uttarakhand. We staff across Uttarakhand, Uttar Pradesh, Haryana, and
                Himachal Pradesh with on-ground recruiters and tight feedback loops.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setIntakeOpen(true)}
                  className="rounded-full bg-[#27c06b] px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#1fb35f]"
                >
                  Hire with Yeble
                </button>
                <Link
                  href="/jobs"
                  className="rounded-full border border-[#cfd8d0] px-6 py-3 text-center text-sm font-semibold text-[#1d402a] transition hover:border-[#27c06b] hover:text-[#1a703d]"
                >
                  View open roles
                </Link>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-[#31513c]">
                <span className="rounded-full border border-[#d6d1c1] bg-white px-3 py-1">Turnaround: shortlist in 72h</span>
                <span className="rounded-full border border-[#d6d1c1] bg-white px-3 py-1">Dehradun-led sourcing, 4-state coverage</span>
                <span className="rounded-full border border-[#d6d1c1] bg-white px-3 py-1">Compliance: IT/ITES staffing</span>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-[#e3decf] bg-white shadow-sm md:min-w-[340px]">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
                alt="Recruitment team collaboration"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </header>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <section className="rounded-3xl border border-[#e3decf] bg-white/92 p-6 shadow-sm">
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
                <article key={job.id} className="rounded-2xl border border-[#e3decf] bg-white p-4">
                  <p className="text-xs text-[#2d6a3e]">{job.company}</p>
                  <h3 className="mt-1 text-lg font-semibold text-[#123622]">{job.title}</h3>
                  <p className="text-sm text-[#31513c]">
                    {job.city} · {job.locationType} · {job.experience}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#2f4a35]">
                    <span className="rounded-full bg-[#f4f2e3] px-3 py-1">{job.salaryRange}</span>
                    <span className="rounded-full border border-[#d6d1c1] bg-white px-3 py-1">{job.type}</span>
                    <span className="rounded-full border border-[#d6d1c1] bg-white px-3 py-1">{job.sector}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-[#e3decf] bg-white/92 p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">For employers</p>
              <h2 className="text-xl font-semibold text-[#123622]">Build teams faster, compliantly</h2>
              <ul className="mt-4 space-y-2 text-sm text-[#2f4a35]">
                <li>✔ Targeted sourcing across tech, product, data, GTM, and TA.</li>
                <li>✔ Structured screening: skills + background + compensation sanity.</li>
                <li>✔ Interview scheduling, feedback loops, and offer negotiation.</li>
                <li>✔ Compliance ready: offer letters, NDAs, BGV liaison on request.</li>
              </ul>
              <button
                type="button"
                onClick={() => setIntakeOpen(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#27c06b] px-5 py-2 text-sm font-semibold text-[#06290f] shadow-sm hover:bg-[#1fb35f]"
              >
                Book an intake call
              </button>
            </div>
            <div className="rounded-3xl border border-[#e3decf] bg-white/92 p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">For candidates</p>
              <h2 className="text-xl font-semibold text-[#123622]">Curated intros to vetted employers</h2>
              <ul className="mt-4 space-y-2 text-sm text-[#2f4a35]">
                <li>✔ Roles across Bengaluru, Hyderabad, NCR, Mumbai, Pune, Remote.</li>
                <li>✔ Interview coaching and salary guidance specific to your stack.</li>
                <li>✔ Confidential submissions; your resume is never blasted.</li>
                <li>✔ Rapid feedback; we keep you updated at every stage.</li>
              </ul>
              <Link
                href="/jobs"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#d6d1c1] px-5 py-2 text-sm font-semibold text-[#123622] hover:border-[#27c06b]"
              >
                View openings
              </Link>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <section className="rounded-3xl border border-[#e3decf] bg-white/92 p-6 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Process</p>
                <h2 className="text-xl font-semibold text-[#123622]">How Yeble places talent</h2>
              </div>
              <Link href="/services" className="text-sm text-[#2d6a3e] hover:text-[#1a703d]">
                See services
              </Link>
            </div>
            <div className="mt-4 grid gap-3 text-sm text-[#2f4a35] md:grid-cols-4">
              {[
                { title: "Intake", desc: "Role scorecard, comp bands, timeline, DEI notes." },
                { title: "Source", desc: "Targeted outreach + inbound curation from referral pools." },
                { title: "Assess", desc: "Skill screens, structured notes, compensation sanity check." },
                { title: "Close", desc: "Scheduling, panel prep, offer negotiation, joining follow-up." },
              ].map((step, idx) => (
                <div key={step.title} className="rounded-2xl border border-[#e3decf] bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#2d6a3e]/70">Step {idx + 1}</p>
                  <h3 className="mt-2 text-base font-semibold text-[#123622]">{step.title}</h3>
                  <p className="mt-1 text-[#31513c]">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <section className="rounded-3xl border border-[#e3decf] bg-white/92 p-6 shadow-sm">
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
                  src: "https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=900&q=80",
                  alt: "Team collaboration",
                },
                {
                  src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
                  alt: "Hiring team collaboration",
                },
                {
                  src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80",
                  alt: "Interview panel",
                },
              ].map((item, idx) => (
                <div key={idx} className="relative overflow-hidden rounded-2xl border border-[#d6d1c1] bg-white">
                  <img src={item.src} alt={item.alt} className="h-full w-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </main>

      <EmployerIntakeModal open={intakeOpen} onClose={() => setIntakeOpen(false)} />
    </div>
  );
}
