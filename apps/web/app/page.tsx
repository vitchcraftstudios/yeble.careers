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
    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e] sm:h-11 sm:w-11">
      <span className={`block h-0.5 w-4 rounded-full bg-current transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`} />
      <span className={`absolute block h-4 w-0.5 rounded-full bg-current transition-transform duration-300 ${open ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"}`} />
    </span>
  );
}

const industries = [
  {
    title: "Office Administration & MIS",
    description: "Hiring support for office admins, coordinators, documentation roles, MIS support, and dependable back-office teams.",
    icon: CodeIcon,
    image: "/industry-technology.svg",
  },
  {
    title: "Business Support & Coordination",
    description: "Back-office, operations support, executive assistance, MIS, and coordination roles that a young agency can handle properly.",
    icon: BriefcaseIcon,
    image: "/industry-business.svg",
  },
  {
    title: "GTM & Consumer",
    description: "Sales, growth, marketing, operations, and support roles across fast-moving businesses and local market teams.",
    icon: MegaphoneIcon,
    image: "/industry-gtm.svg",
  },
  {
    title: "Staffing & Compliance",
    description: "Structured screening, documentation, and dependable hiring support for regulated and process-led workflows.",
    icon: ShieldIcon,
    image: "/industry-staffing.svg",
  },
  {
    title: "Retail & Services",
    description: "Hiring support for customer-facing businesses, store operations, service teams, and regional brand expansion.",
    icon: StoreIcon,
    image: "/industry-retail.svg",
  },
  {
    title: "Industrial & Operations",
    description: "Practical support for operations, site coordination, dispatch, production, and execution-heavy roles.",
    icon: FactoryIcon,
    image: "/industry-industrial.svg",
  },
  {
    title: "Hospitality & Travel",
    description: "Support for hotels, guest experience teams, travel operations, front office, and service-first hiring mandates.",
    icon: HospitalityIcon,
    image: "/industry-hospitality.svg",
  },
  {
    title: "BFSI & Financial Services",
    description: "Hiring support for banking, insurance, lending, customer operations, and process-led financial services teams.",
    icon: BriefcaseIcon,
    image: "/industry-bfsi.svg",
  },
  {
    title: "Healthcare & Life Sciences",
    description: "Support for care operations, diagnostics, coordination, front-desk, and healthcare-adjacent hiring requirements.",
    icon: ShieldIcon,
    image: "/industry-healthcare.svg",
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
  {
    question: "Will I get interview updates if I am shortlisted?",
    answer:
      "Yes. If your profile moves forward, we try to keep communication clear around interview schedules, feedback, and next steps instead of leaving long silent gaps.",
  },
  {
    question: "Can I apply if I am open to relocation within North India?",
    answer:
      "Yes. If you are open to moving for the right role, mention your preferred cities and flexibility clearly during registration so we can align you with suitable openings.",
  },
  {
    question: "Do you support only white-collar roles?",
    answer:
      "No. We support a mix of corporate, coordination, operations, customer-facing, and execution-heavy roles depending on the active mandates we are working on.",
  },
  {
    question: "How should employers share a new hiring requirement?",
    answer:
      "Employers can call us directly or submit an enquiry with the role details, location, urgency, compensation range, and expected candidate profile so we can start intake properly.",
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

const registrationPageUrl = "https://rzp.io/rzp/NGttdbN";

const homeContentDefaults = {
  heroTitle: "Powering Companies With Talent That Drives Real Growth.",
  heroSummary: "Founded in 2026 from Selaqui, Dehradun, Yeble works across Uttarakhand, Uttar Pradesh, Haryana, and Himachal Pradesh with practical hiring support, tighter follow-up, and clearer communication.",
  testimonialsHeading: "What people say about working with Yeble",
};

const heroMedia = {
  poster: "https://images.pexels.com/photos/7652178/pexels-photo-7652178.jpeg?auto=compress&cs=tinysrgb&w=1200",
  video: "https://www.pexels.com/download/video/7643604/",
  alt: "Professionals collaborating in a business meeting",
};

export default function Home() {
  const featured = useMemo(() => jobs.slice(0, 3), []);
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [homeContent, setHomeContent] = useState(homeContentDefaults);
  const [openingRoles, setOpeningRoles] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadContent() {
      try {
        const response = await fetch("/api/public/content", { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as Record<string, { body?: string }>;
        if (!mounted) return;

        setHomeContent({
          heroTitle: data["home-hero-title"]?.body || homeContentDefaults.heroTitle,
          heroSummary: data["home-hero-summary"]?.body || homeContentDefaults.heroSummary,
          testimonialsHeading: data["home-testimonials-heading"]?.body || homeContentDefaults.testimonialsHeading,
        });
      } catch {
        // keep design stable with built-in defaults when content fetch is unavailable
      }
    }

    loadContent();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fffef0] text-[#0f2918]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(184,243,199,0.38),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(243,240,176,0.34),transparent_28%),linear-gradient(135deg,#ffffff,#f7f3dc_40%,#fffef0)]" />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <ScrollReveal>
          <section className="overflow-hidden rounded-[2rem] border border-[#e3decf] bg-white/95 shadow-sm">
            <div className="grid gap-0 lg:grid-cols-[1.18fr_0.82fr]">
              <div className="p-6 sm:p-8 lg:p-10 xl:pr-8">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#2d6a3e]">Yeble.careers - Accelerate your Placement</p>
                <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.08] tracking-[-0.045em] text-[#123622] sm:text-[3.35rem] lg:text-[3.9rem]">
                  <strong>{homeContent.heroTitle}</strong>
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-[#2f4a35]">
                  {homeContent.heroSummary}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setIntakeOpen(true)}
                    className="rounded-full bg-[#27c06b] px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#1fb35f]"
                  >
                    Register Now
                  </button>
                  <Link
                    href="/jobs"
                    onClick={() => setOpeningRoles(true)}
                    aria-busy={openingRoles}
                    className={`rounded-full border px-6 py-3 text-center text-sm font-semibold transition ${openingRoles ? "pointer-events-none border-[#27c06b] bg-[#f3fff7] text-[#1a703d]" : "border-[#cfd8d0] text-[#1d402a] hover:border-[#27c06b] hover:text-[#1a703d]"}`}
                  >
                    {openingRoles ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#1a703d]/30 border-t-[#1a703d]" aria-hidden="true" />
                        Opening roles...
                      </span>
                    ) : (
                      "View open roles"
                    )}
                  </Link>
                </div>
                <div className="mt-6 flex flex-wrap gap-3 text-xs text-[#31513c] sm:text-sm">
                  <span className="rounded-full border border-[#d6d1c1] bg-white px-4 py-2">Shortlist support in 72 hours</span>
                  <span className="rounded-full border border-[#d6d1c1] bg-white px-4 py-2">Dehradun-led, 4-state coverage</span>
                  <span className="rounded-full border border-[#d6d1c1] bg-white px-4 py-2">Practical screening and follow-up</span>
                </div>
              </div>
              <div className="min-h-[260px] lg:min-h-full">
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={heroMedia.poster}
                  aria-label={heroMedia.alt}
                >
                  <source src={heroMedia.video} type="video/mp4" />
                </video>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={60}>
          <section className="rounded-[2rem] border border-[#e3decf] bg-white/95 p-5 shadow-sm sm:p-8">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#2d6a3e]">Industries We Serve</p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight text-[#123622] sm:text-3xl">
                Practical hiring support across sectors we can genuinely serve well
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#31513c] sm:text-base">
                We focus on the sectors where we can actually add value through cleaner screening, regional understanding, and dependable follow-up.
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {industries.map((industry) => {
                return (
                  <article key={industry.title} className="rounded-2xl border border-[#e3decf] bg-[#fffdf6] p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="min-w-0 flex-1 text-base font-semibold text-[#123622] sm:text-lg">{industry.title}</h3>
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[#d8e5d9] bg-white shadow-[0_8px_18px_rgba(24,83,55,0.08)] sm:h-16 sm:w-16">
                        <img src={industry.image} alt={`${industry.title} industry illustration`} className="h-full w-full object-cover" loading="lazy" />
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#31513c]">{industry.description}</p>
                  </article>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <section className="rounded-[2rem] border border-[#e3decf] bg-white/95 p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#2d6a3e]">Featured roles</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#123622]">Select openings this week</h2>
              </div>
              <Link href="/jobs" className="text-sm font-medium text-[#2d6a3e] hover:text-[#1a703d]">
                See all openings
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {featured.map((job) => (
                <article key={job.id} className="rounded-2xl border border-[#e3decf] bg-[#fffdf6] p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#2d6a3e]">{job.company}</p>
                  <h3 className="mt-2 text-xl font-semibold text-[#123622]">{job.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#31513c]">
                    {job.city} | {job.locationType} | {job.experience}
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

        <ScrollReveal delay={110}>
          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[2rem] border border-[#e3decf] bg-white/95 p-6 shadow-sm sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#2d6a3e]">For employers</p>
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
            <div className="rounded-[2rem] border border-[#e3decf] bg-white/95 p-6 shadow-sm sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#2d6a3e]">For candidates</p>
              <h2 className="mt-3 text-2xl font-semibold text-[#123622]">Guided support for serious job seekers in North India</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-[#2f4a35] sm:text-base">
                <li className="flex gap-3"><span className="mt-1 text-[#2d6a3e]"><CheckIcon /></span><span>Openings across Dehradun, Noida, Ghaziabad, Gurugram, Chandigarh, Mohali, and nearby hiring corridors.</span></li>
                <li className="flex gap-3"><span className="mt-1 text-[#2d6a3e]"><CheckIcon /></span><span>Role clarity before interviews, so you understand the company, salary range, and expectations properly.</span></li>
                <li className="flex gap-3"><span className="mt-1 text-[#2d6a3e]"><CheckIcon /></span><span>Cleaner communication and follow-up instead of silent gaps after every round.</span></li>
              </ul>
              <Link href="/jobs" onClick={() => setOpeningRoles(true)} className={`mt-6 inline-flex items-center rounded-full border px-6 py-3 text-sm font-semibold transition ${openingRoles ? "pointer-events-none border-[#27c06b] bg-[#f3fff7] text-[#1a703d]" : "border-[#d6d1c1] text-[#123622] hover:border-[#27c06b]"}`}>
                {openingRoles ? "Opening roles..." : "View openings"}
              </Link>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <section className="grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="min-w-0 space-y-6">
              <div className="rounded-[2rem] border border-[#e3decf] bg-white/95 p-5 shadow-sm sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#2d6a3e]">Testimonials</p>
                    <h2 className="mt-2 text-xl font-semibold text-[#123622] sm:text-2xl">{homeContent.testimonialsHeading}</h2>
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
                <div className="mt-5 min-w-0 overflow-hidden rounded-[1.5rem] border border-[#e8e1cd] bg-[#fffdf6]">
                  <div className="flex min-w-0 w-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                    {testimonials.map((item) => (
                      <article key={item.name} className="w-full min-w-full shrink-0 p-5 sm:p-6">
                        <p className="max-w-full break-words text-base leading-7 text-[#23422f] sm:text-lg sm:leading-8">"{item.quote}"</p>
                        <div className="mt-5 border-t border-[#e7dfcb] pt-4">
                          <p className="font-semibold text-[#123622]">{item.name}</p>
                          <p className="text-sm text-[#31513c]">{item.role}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#e4decd]">
                    <div className="h-full rounded-full bg-[#2d6a3e] transition-all duration-500 ease-out" style={{ width: `${((activeTestimonial + 1) / testimonials.length) * 100}%` }} />
                  </div>
                  <div className="flex gap-2">
                    {testimonials.map((item, index) => (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setActiveTestimonial(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${index === activeTestimonial ? "w-7 bg-[#2d6a3e]" : "w-2.5 bg-[#d9d4c3]"}`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#e3decf] bg-white/95 p-5 shadow-sm sm:p-6">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#2d6a3e]">Why it works</p>
                <h3 className="mt-2 text-xl font-semibold text-[#123622]">Grounded support from first call to final shortlist</h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <article className="rounded-2xl border border-[#e8e1cd] bg-[#fffdf6] p-4">
                    <p className="text-2xl font-black text-[#123622]">72 hrs</p>
                    <p className="mt-2 text-sm leading-6 text-[#31513c]">Typical shortlist turnaround for active mandates.</p>
                  </article>
                  <article className="rounded-2xl border border-[#e8e1cd] bg-[#fffdf6] p-4">
                    <p className="text-2xl font-black text-[#123622]">4 states</p>
                    <p className="mt-2 text-sm leading-6 text-[#31513c]">Core hiring coverage across the North India corridor we know best.</p>
                  </article>
                  <article className="rounded-2xl border border-[#e8e1cd] bg-[#fffdf6] p-4">
                    <p className="text-2xl font-black text-[#123622]">Clear follow-up</p>
                    <p className="mt-2 text-sm leading-6 text-[#31513c]">Practical updates for both employers and candidates at every stage.</p>
                  </article>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#e3decf] bg-white/95 p-6 shadow-sm sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#2d6a3e]">How Yeble Works</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#123622]">A simple process that candidates can actually follow</h2>
              <div className="mt-6 space-y-3">
                {processSteps.map((step, idx) => (
                  <article key={step.title} className="flex min-w-0 gap-4 rounded-2xl border border-[#e3decf] bg-[#fffdf6] p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#d8e5d9] bg-[#f5fbf6] text-sm font-semibold text-[#2d6a3e]">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#123622]">{step.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-[#31513c]">{step.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={170}>
          <section className="rounded-[2rem] border border-[#e3decf] bg-white/95 p-5 shadow-sm sm:p-8">
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#2d6a3e]">Frequently Asked Questions</p>
                <h2 className="mt-2 text-xl font-semibold text-[#123622] sm:text-2xl">Clear answers before you register or reach out</h2>
                <p className="mt-3 text-sm leading-7 text-[#31513c] sm:text-base">
                  We prefer clear expectations over vague promises. Here are a few common questions candidates and employers usually ask first.
                </p>
                <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-[#e8e1cd] bg-[#fffdf6]">
                  <img
                    src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=900"
                    alt="Professionals discussing documents in an office"
                    className="h-52 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="grid gap-3 border-t border-[#e8e1cd] p-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-[#2d6a3e]">Quick response</p>
                      <p className="mt-2 text-sm leading-6 text-[#31513c]">Straight answers on payments, next steps, and hiring coverage.</p>
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-[#2d6a3e]">Human follow-up</p>
                      <p className="mt-2 text-sm leading-6 text-[#31513c]">A practical team based in Dehradun, not a silent form inbox.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = activeFaq === index;
                  return (
                    <div key={faq.question} className="rounded-2xl border border-[#e3decf] bg-[#fffdf6] px-4 py-3 sm:px-5">
                      <button
                        type="button"
                        onClick={() => setActiveFaq(isOpen ? null : index)}
                        className="flex w-full items-center justify-between gap-3 py-1 text-left"
                      >
                        <span className="text-sm font-semibold leading-6 text-[#123622] sm:text-base">{faq.question}</span>
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

      <EmployerIntakeModal open={intakeOpen} onClose={() => setIntakeOpen(false)} paymentPageUrl={registrationPageUrl} />
    </div>
  );
}








