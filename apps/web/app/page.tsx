"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { EmployerIntakeModal } from "@/components/employer-intake-modal";
import { ScrollReveal } from "@/components/scroll-reveal";
import { jobs } from "@/lib/data";

function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m8 9-4 3 4 3" />
      <path d="m16 9 4 3-4 3" />
      <path d="m14 5-4 14" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 19V9" />
      <path d="M12 19V5" />
      <path d="M19 19v-7" />
      <path d="M4 19h16" />
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 13V9a1 1 0 0 1 1-1h3l8-3v12l-8-3H5a1 1 0 0 1-1-1Z" />
      <path d="m9 14 1.5 5" />
      <path d="M18 9a4 4 0 0 1 0 8" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3 5.5 5.5v5.7c0 4 2.5 7 6.5 9.8 4-2.8 6.5-5.8 6.5-9.8V5.5z" />
      <path d="m9.5 12 1.7 1.7 3.3-3.7" />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 9.5 5.5 5h13L20 9.5" />
      <path d="M5 10v8.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V10" />
      <path d="M9 20v-5h6v5" />
    </svg>
  );
}

function FactoryIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 20V9l6 3V9l6 3V5l6 3v12Z" />
      <path d="M7 20v-3" />
      <path d="M11 20v-3" />
      <path d="M15 20v-3" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

const industries = [
  {
    title: "Technology & SaaS",
    description: "Engineering, product, DevOps, QA, and customer-facing roles for software-led teams.",
    icon: CodeIcon,
  },
  {
    title: "Analytics & AI",
    description: "Data analysts, BI specialists, ML support roles, and analytics hiring for growing teams.",
    icon: ChartIcon,
  },
  {
    title: "GTM & Consumer",
    description: "Sales, growth, marketing, operations, and support roles across fast-moving businesses.",
    icon: MegaphoneIcon,
  },
  {
    title: "Staffing & Compliance",
    description: "Structured screening, documentation, and dependable hiring support for regulated workflows.",
    icon: ShieldIcon,
  },
  {
    title: "Retail & Services",
    description: "Hiring support for customer-facing businesses, regional operations, and service teams.",
    icon: StoreIcon,
  },
  {
    title: "Industrial & Operations",
    description: "Practical support for operations, coordination, and execution-heavy roles in North India markets.",
    icon: FactoryIcon,
  },
];

const testimonials = [
  {
    name: "Ritika Sharma",
    role: "Product Designer, Dehradun",
    quote:
      "The process felt more guided than random. I was not left guessing after every round, and that made a real difference.",
  },
  {
    name: "Aman Verma",
    role: "SDE-II, Noida",
    quote:
      "Yeble helped me understand the role properly before interviews. That clarity improved how I presented myself.",
  },
  {
    name: "Neha Rawat",
    role: "Data Analyst, Chandigarh",
    quote:
      "What stood out was the follow-up. The team kept communication simple, timely, and much more human than most agencies.",
  },
  {
    name: "Karan Malhotra",
    role: "Hiring Manager, Gurugram",
    quote:
      "Shortlists were cleaner and more relevant. We were not flooded with random profiles, which saved our team a lot of time.",
  },
];

const faqs = [
  {
    question: "What happens after I complete the registration payment?",
    answer:
      "Once your payment is verified, your registration details are sent to our team for review. We then reach out on your shared email or phone number with the next step.",
  },
  {
    question: "Is the registration flow for freshers or experienced candidates?",
    answer:
      "Both. We work with fresher, early-career, and experienced professionals depending on the role type, market demand, and profile fit.",
  },
  {
    question: "Which regions does Yeble mainly support?",
    answer:
      "Our base is in Dehradun, and we actively support opportunities and hiring movement across Uttarakhand, Uttar Pradesh, Haryana, and Himachal Pradesh, along with connected metro corridors.",
  },
  {
    question: "Do you also work with employers directly?",
    answer:
      "Yes. Alongside candidate registrations, we work with companies that need dependable hiring support, cleaner shortlists, and practical follow-up across North India.",
  },
];

export default function Home() {
  const featured = useMemo(() => jobs.slice(0, 3), []);
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const currentTestimonial = testimonials[activeTestimonial];

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
                  Register Now
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

        <ScrollReveal delay={60}>
          <section className="rounded-3xl border border-[#e3decf] bg-white/92 p-6 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Industries We Serve</p>
                <h2 className="text-2xl font-semibold text-[#123622]">Built for North India’s practical hiring needs across multiple sectors</h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-[#31513c]">
                We do not work like a generic profile-forwarding agency. Our focus is on real requirements, clearer fit,
                and hiring support that matches how teams actually hire on the ground.
              </p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {industries.map((industry) => {
                const Icon = industry.icon;
                return (
                  <div key={industry.title} className="rounded-2xl border border-[#e3decf] bg-[#fffdf6] p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
                      <Icon />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#123622]">{industry.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#31513c]">{industry.description}</p>
                  </div>
                );
              })}
            </div>
          </section>
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
                Start registration
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

        <ScrollReveal delay={150}>
          <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border border-[#e3decf] bg-white/92 p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Testimonials</p>
                  <h2 className="text-2xl font-semibold text-[#123622]">What people say about working with Yeble</h2>
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                  <button
                    type="button"
                    onClick={() => setActiveTestimonial((current) => (current - 1 + testimonials.length) % testimonials.length)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d6d1c1] bg-white text-[#123622] transition hover:border-[#2d6a3e]"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTestimonial((current) => (current + 1) % testimonials.length)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d6d1c1] bg-white text-[#123622] transition hover:border-[#2d6a3e]"
                    aria-label="Next testimonial"
                  >
                    <ChevronRightIcon />
                  </button>
                </div>
              </div>
              <div className="mt-6 rounded-[1.75rem] border border-[#e8e1cd] bg-[#fffdf6] p-5 sm:p-6">
                <p className="text-lg leading-8 text-[#23422f] sm:text-xl">“{currentTestimonial.quote}”</p>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[#123622]">{currentTestimonial.name}</p>
                    <p className="text-sm text-[#31513c]">{currentTestimonial.role}</p>
                  </div>
                  <div className="flex gap-2">
                    {testimonials.map((item, index) => (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setActiveTestimonial(index)}
                        className={`h-2.5 rounded-full transition-all ${index === activeTestimonial ? "w-8 bg-[#2d6a3e]" : "w-2.5 bg-[#d9d4c3]"}`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#e3decf] bg-white/92 p-6 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Process</p>
                  <h2 className="text-xl font-semibold text-[#123622]">How Yeble places talent</h2>
                </div>
                <Link href="/services" className="text-sm text-[#2d6a3e] hover:text-[#1a703d]">
                  See services
                </Link>
              </div>
              <div className="mt-4 grid gap-3 text-sm text-[#2f4a35] md:grid-cols-2">
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
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={190}>
          <section className="rounded-3xl border border-[#e3decf] bg-white/92 p-6 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Frequently Asked Questions</p>
                <h2 className="text-2xl font-semibold text-[#123622]">Clear answers before you register or reach out</h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[#31513c]">
                We prefer clear expectations over vague promises. Here are a few common questions candidates and employers usually ask first.
              </p>
            </div>
            <div className="mt-6 grid gap-3">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div key={faq.question} className="rounded-2xl border border-[#e3decf] bg-[#fffdf6] p-5">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 text-left"
                    >
                      <span className="text-base font-semibold text-[#123622]">{faq.question}</span>
                      <span className={`text-[#2d6a3e] transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>⌄</span>
                    </button>
                    {isOpen ? <p className="mt-3 text-sm leading-7 text-[#31513c]">{faq.answer}</p> : null}
                  </div>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={220}>
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
