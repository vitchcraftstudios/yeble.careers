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

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h13A1.5 1.5 0 0 1 20 8.5v8A1.5 1.5 0 0 1 18.5 18h-13A1.5 1.5 0 0 1 4 16.5Z" />
      <path d="M4 11h16" />
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

function HospitalityIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 19v-8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8" />
      <path d="M4 14h16" />
      <path d="M7 9V6.5A1.5 1.5 0 0 1 8.5 5h2A1.5 1.5 0 0 1 12 6.5V9" />
      <path d="M20 19H4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m5 12 4 4L19 6" />
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

function PlusChevronIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
      <span className="absolute h-0.5 w-4 rounded-full bg-current" />
      <span className={`absolute h-4 w-0.5 rounded-full bg-current transition-transform duration-300 ${open ? "scale-y-0" : "scale-y-100"}`} />
    </span>
  );
}

const industries = [
  {
    title: "Technology & SaaS",
    description: "Engineering, product support, QA, and software delivery roles for lean teams building steadily.",
    icon: CodeIcon,
  },
  {
    title: "Business Support & Coordination",
    description: "Back-office, operations support, executive assistance, MIS, and coordination roles that a young agency can handle properly.",
    icon: BriefcaseIcon,
  },
  {
    title: "GTM & Consumer",
    description: "Sales, growth, marketing, operations, and support roles across fast-moving businesses and local market teams.",
    icon: MegaphoneIcon,
  },
  {
    title: "Staffing & Compliance",
    description: "Structured screening, documentation, and dependable hiring support for regulated and process-led workflows.",
    icon: ShieldIcon,
  },
  {
    title: "Retail & Services",
    description: "Hiring support for customer-facing businesses, store operations, service teams, and regional brand expansion.",
    icon: StoreIcon,
  },
  {
    title: "Industrial & Operations",
    description: "Practical support for operations, site coordination, dispatch, production, and execution-heavy roles.",
    icon: FactoryIcon,
  },
  {
    title: "Hospitality & Travel",
    description: "Support for hotels, guest experience teams, travel operations, front office, and service-first hiring mandates.",
    icon: HospitalityIcon,
  },
];

const testimonials = [
  {
    name: "Ritika Sharma",
    role: "Front-End Designer, Dehradun",
    quote:
      "The team explained the company properly before my interview. It did not feel like random forwarding. I knew what I was walking into.",
  },
  {
    name: "Aman Verma",
    role: "Operations Executive, Noida",
    quote:
      "What helped most was the follow-up. After every round, someone from Yeble actually updated me instead of going silent.",
  },
  {
    name: "Pooja Rawat",
    role: "HR Coordinator, Chandigarh",
    quote:
      "As a candidate from Uttarakhand, it felt good to deal with a team that understood regional hiring realities and salary expectations.",
  },
  {
    name: "Saurabh Chauhan",
    role: "Sales Associate, Gurugram",
    quote:
      "The process was simple, clear, and practical. They only pushed me toward roles that genuinely matched my background.",
  },
];

const faqs = [
  {
    question: "What happens after I complete the registration payment?",
    answer:
      "After payment verification, your registration details reach our team for profile review. We then contact you on your shared phone number or email with the next step.",
  },
  {
    question: "Is this useful for freshers as well as experienced candidates?",
    answer:
      "Yes. We support fresher, early-career, and experienced candidates, depending on market demand, role suitability, and how job-ready the profile is.",
  },
  {
    question: "Which regions does Yeble mainly serve?",
    answer:
      "We work from Dehradun and mainly support opportunities across Uttarakhand, Uttar Pradesh, Haryana, and Himachal Pradesh, along with nearby hiring corridors like Noida, Gurugram, Chandigarh, and Mohali.",
  },
  {
    question: "Do employers also work with Yeble directly?",
    answer:
      "Yes. Companies reach out to us for shortlist support, intake coordination, and practical hiring help, especially when they need regional understanding with dependable follow-up.",
  },
];

const processSteps = [
  {
    title: "Register your profile",
    desc: "Share your details, preferred roles, locations, and resume link in one clear form.",
  },
  {
    title: "Profile review",
    desc: "We check fit, readiness, and whether your background matches the openings we are actively working on.",
  },
  {
    title: "Relevant introductions",
    desc: "If your profile fits, we line you up for roles that make practical sense for your experience and location preference.",
  },
  {
    title: "Interview to joining",
    desc: "We stay in touch through rounds, feedback, and offer-stage coordination so you are not left guessing.",
  },
];

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    alt: "Recruitment team collaboration",
  },
  {
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    alt: "Business support and coordination team at work",
  },
  {
    src: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?auto=format&fit=crop&w=1200&q=80",
    alt: "Hospitality and customer service team on the floor",
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
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#fffef0] text-[#0f2918]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(184,243,199,0.38),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(243,240,176,0.34),transparent_28%),linear-gradient(135deg,#ffffff,#f7f3dc_40%,#fffef0)]" />

      <main className="relative z-10 mx-auto flex max-w-7xl flex-col gap-14 px-5 py-12 sm:px-6 lg:px-8">
        <ScrollReveal>
          <section className="overflow-hidden rounded-[2rem] border border-[#e3decf] bg-white/95 shadow-sm">
            <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="text-xs uppercase tracking-[0.28em] text-[#2d6a3e]">Yeble.careers - Accelerate your Placement</p>
                <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-[#123622] sm:text-5xl lg:text-[3.7rem]">
                  Connecting innovative companies with the talent that drives excellence and growth.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[#2f4a35] sm:text-lg">
                  Founded in 2026 from Selaqui, Dehradun, Yeble works across Uttarakhand, Uttar Pradesh, Haryana, and Himachal Pradesh with practical hiring support, tighter follow-up, and clearer communication.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setIntakeOpen(true)}
                    className="rounded-full bg-[#27c06b] px-7 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#1fb35f]"
                  >
                    Register Now
                  </button>
                  <Link
                    href="/jobs"
                    className="rounded-full border border-[#cfd8d0] px-7 py-3 text-center text-sm font-semibold text-[#1d402a] transition hover:border-[#27c06b] hover:text-[#1a703d]"
                  >
                    View open roles
                  </Link>
                </div>
                <div className="mt-7 flex flex-wrap gap-3 text-xs text-[#31513c] sm:text-sm">
                  <span className="rounded-full border border-[#d6d1c1] bg-white px-4 py-2">Shortlist support in 72 hours</span>
                  <span className="rounded-full border border-[#d6d1c1] bg-white px-4 py-2">Dehradun-led, 4-state coverage</span>
                  <span className="rounded-full border border-[#d6d1c1] bg-white px-4 py-2">Practical screening and follow-up</span>
                </div>
              </div>
              <div className="min-h-[320px] lg:min-h-full">
                <img src={gallery[0].src} alt={gallery[0].alt} className="h-full w-full object-cover" loading="eager" />
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={70}>
          <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
            <div className="rounded-[2rem] border border-[#e3decf] bg-white/95 p-7 shadow-sm sm:p-8">
              <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Industries We Serve</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight text-[#123622]">
                Practical hiring support across the sectors a young North India agency can genuinely serve well
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#31513c] sm:text-base">
                We are not trying to sound bigger than we are. We focus on the sectors where we can actually add value through clearer screening, regional understanding, and dependable follow-up.
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {industries.map((industry) => {
                  const Icon = industry.icon;
                  return (
                    <article key={industry.title} className="rounded-2xl border border-[#e3decf] bg-[#fffdf6] p-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
                        <Icon />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-[#123622]">{industry.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#31513c]">{industry.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-1">
              {gallery.slice(1).map((item) => (
                <div key={item.src} className="overflow-hidden rounded-[2rem] border border-[#e3decf] bg-white shadow-sm">
                  <img src={item.src} alt={item.alt} className="h-72 w-full object-cover xl:h-[21rem]" loading="lazy" />
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={90}>
          <section className="rounded-[2rem] border border-[#e3decf] bg-white/95 p-7 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Featured roles</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#123622]">Select openings this week</h2>
              </div>
              <Link href="/jobs" className="text-sm font-medium text-[#2d6a3e] hover:text-[#1a703d]">
                See all openings
              </Link>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {featured.map((job) => (
                <article key={job.id} className="rounded-2xl border border-[#e3decf] bg-[#fffdf6] p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#2d6a3e]">{job.company}</p>
                  <h3 className="mt-2 text-xl font-semibold text-[#123622]">{job.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#31513c]">
                    {job.city} · {job.locationType} · {job.experience}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#2f4a35]">
                    <span className="rounded-full bg-[#f4f2e3] px-3 py-1.5">{job.salaryRange}</span>
                    <span className="rounded-full border border-[#d6d1c1] bg-white px-3 py-1.5">{job.type}</span>
                    <span className="rounded-full border border-[#d6d1c1] bg-white px-3 py-1.5">{job.sector}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-[#e3decf] bg-white/95 p-7 shadow-sm sm:p-8">
              <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">For employers</p>
              <h2 className="mt-3 text-2xl font-semibold text-[#123622]">Dependable hiring support for growing teams</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-[#2f4a35] sm:text-base">
                <li className="flex gap-3"><span className="mt-1 text-[#2d6a3e]"><CheckIcon /></span><span>Targeted sourcing across tech, GTM, staffing, retail, hospitality, and operations roles.</span></li>
                <li className="flex gap-3"><span className="mt-1 text-[#2d6a3e]"><CheckIcon /></span><span>Structured screening for fit, communication, salary alignment, and practical availability.</span></li>
                <li className="flex gap-3"><span className="mt-1 text-[#2d6a3e]"><CheckIcon /></span><span>Regional understanding across Uttarakhand, Uttar Pradesh, Haryana, and Himachal Pradesh.</span></li>
              </ul>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href="tel:+919429692113" className="inline-flex items-center justify-center rounded-full bg-[#27c06b] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1fb35f]">Request Intake Call</a>
                <a href="tel:+911354222268" className="inline-flex items-center justify-center rounded-full border border-[#d6d1c1] px-6 py-3 text-sm font-semibold text-[#123622] transition hover:border-[#2d6a3e]">Dial Landline</a>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#31513c]">
                Mobile: +91 94296 92113
                <br />
                Landline: 0135 422 2268
              </p>
            </div>
            <div className="rounded-[2rem] border border-[#e3decf] bg-white/95 p-7 shadow-sm sm:p-8">
              <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">For candidates</p>
              <h2 className="mt-3 text-2xl font-semibold text-[#123622]">Guided support for serious job seekers in North India</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-[#2f4a35] sm:text-base">
                <li className="flex gap-3"><span className="mt-1 text-[#2d6a3e]"><CheckIcon /></span><span>Openings across Dehradun, Noida, Ghaziabad, Gurugram, Chandigarh, Mohali, and nearby hiring corridors.</span></li>
                <li className="flex gap-3"><span className="mt-1 text-[#2d6a3e]"><CheckIcon /></span><span>Role clarity before interviews, so you understand the company, salary range, and expectations properly.</span></li>
                <li className="flex gap-3"><span className="mt-1 text-[#2d6a3e]"><CheckIcon /></span><span>Cleaner communication and follow-up instead of silent gaps after every round.</span></li>
              </ul>
              <Link href="/jobs" className="mt-6 inline-flex items-center rounded-full border border-[#d6d1c1] px-6 py-3 text-sm font-semibold text-[#123622] transition hover:border-[#27c06b]">
                View openings
              </Link>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
            <div className="rounded-[2rem] border border-[#e3decf] bg-white/95 p-7 shadow-sm sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Testimonials</p>
                  <h2 className="mt-2 text-2xl font-semibold text-[#123622]">What people say about working with Yeble</h2>
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                  <button
                    type="button"
                    onClick={() => setActiveTestimonial((current) => (current - 1 + testimonials.length) % testimonials.length)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d6d1c1] bg-white text-[#123622] transition hover:border-[#2d6a3e]"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTestimonial((current) => (current + 1) % testimonials.length)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d6d1c1] bg-white text-[#123622] transition hover:border-[#2d6a3e]"
                    aria-label="Next testimonial"
                  >
                    <ChevronRightIcon />
                  </button>
                </div>
              </div>
              <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-[#e8e1cd] bg-[#fffdf6]">
                <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                  {testimonials.map((item) => (
                    <article key={item.name} className="min-w-full p-6 sm:p-8">
                      <p className="text-xl leading-9 text-[#23422f] sm:text-2xl">“{item.quote}”</p>
                      <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#e7dfcb] pt-5">
                        <div>
                          <p className="font-semibold text-[#123622]">{item.name}</p>
                          <p className="text-sm text-[#31513c]">{item.role}</p>
                        </div>
                        <span className="rounded-full border border-[#d8e5d9] bg-[#f5fbf6] px-4 py-2 text-xs font-medium text-[#2d6a3e]">Candidate story</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between gap-4">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#e4decd]">
                  <div className="h-full rounded-full bg-[#2d6a3e] transition-all duration-500 ease-out" style={{ width: `${((activeTestimonial + 1) / testimonials.length) * 100}%` }} />
                </div>
                <div className="flex gap-2">
                  {testimonials.map((item, index) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setActiveTestimonial(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${index === activeTestimonial ? "w-8 bg-[#2d6a3e]" : "w-2.5 bg-[#d9d4c3]"}`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#e3decf] bg-white/95 p-7 shadow-sm sm:p-8">
              <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">How Yeble Works</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#123622]">A simple process that candidates can actually follow</h2>
              <div className="mt-6 space-y-4">
                {processSteps.map((step, idx) => (
                  <article key={step.title} className="flex gap-4 rounded-2xl border border-[#e3decf] bg-[#fffdf6] p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#d8e5d9] bg-[#f5fbf6] text-sm font-semibold text-[#2d6a3e]">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#123622]">{step.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-[#31513c]">{step.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={180}>
          <section className="rounded-[2rem] border border-[#e3decf] bg-white/95 p-7 shadow-sm sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Frequently Asked Questions</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#123622]">Clear answers before you register or reach out</h2>
                <p className="mt-4 text-sm leading-7 text-[#31513c] sm:text-base">
                  We prefer clear expectations over vague promises. Here are a few common questions candidates and employers usually ask first.
                </p>
              </div>
              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = activeFaq === index;
                  return (
                    <div key={faq.question} className="rounded-2xl border border-[#e3decf] bg-[#fffdf6] px-5 py-3 transition-shadow duration-300 hover:shadow-sm">
                      <button
                        type="button"
                        onClick={() => setActiveFaq(isOpen ? null : index)}
                        className="flex w-full items-center justify-between gap-4 py-1 text-left"
                      >
                        <span className="text-base font-semibold text-[#123622]">{faq.question}</span>
                        <PlusChevronIcon open={isOpen} />
                      </button>
                      <div className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-70"}`}>
                        <div className="overflow-hidden">
                          <p className="pt-3 text-sm leading-7 text-[#31513c]">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>

      <EmployerIntakeModal open={intakeOpen} onClose={() => setIntakeOpen(false)} />
    </div>
  );
}
