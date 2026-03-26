import { ScrollReveal } from "@/components/scroll-reveal";

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 9h16" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s6-4.35 6-10a6 6 0 1 0-12 0c0 5.65 6 10 6 10Z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="3" />
      <path d="M19 5 14.5 9.5" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 20V6.5A1.5 1.5 0 0 1 5.5 5h8A1.5 1.5 0 0 1 15 6.5V20" />
      <path d="M15 20v-9.5A1.5 1.5 0 0 1 16.5 9H19a1 1 0 0 1 1 1v10" />
      <path d="M8 9h3M8 12h3M8 15h3" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3" />
      <path d="M6 19a6 6 0 0 1 12 0" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8" />
      <path d="M4.5 9h15M4.5 15h15M12 4a13 13 0 0 1 0 16M12 4a13 13 0 0 0 0 16" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4Z" />
    </svg>
  );
}

function CheckDotIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="10" cy="10" r="7" />
      <path d="m7.5 10 1.6 1.6L12.5 8.4" />
    </svg>
  );
}

export const metadata = {
  title: "About Yeble Careers | India-first employment agency",
};

const highlights = [
  {
    label: "Founded",
    value: "2026",
    detail: "Built to serve employers and job seekers with a practical, local-first hiring approach",
    icon: CalendarIcon,
  },
  {
    label: "Location",
    value: "Dehradun HQ",
    detail: "9W5Q+3RJ, Sudhowala, Dehradun, Uttarakhand 248015",
    icon: MapPinIcon,
  },
  {
    label: "Our focus",
    value: "Real placements",
    detail: "Connecting verified candidates with credible roles and guided hiring support",
    icon: TargetIcon,
  },
];

const pillars = [
  {
    title: "Employers",
    detail:
      "We support founders, business heads, and hiring teams that need dependable shortlist movement, clearer candidate communication, and local market understanding.",
    icon: BuildingIcon,
  },
  {
    title: "Job Seekers",
    detail:
      "We help serious candidates find genuine openings, understand expectations better, and approach hiring conversations with stronger preparation.",
    icon: UserIcon,
  },
  {
    title: "North India Markets",
    detail:
      "Our focus stays close to Uttarakhand, Uttar Pradesh, Haryana, and Himachal Pradesh, while also supporting companies hiring into connected growth corridors.",
    icon: GlobeIcon,
  },
];

const differentiators = [
  "North India understanding: we know the hiring realities, salary expectations, notice-period challenges, and candidate sentiment across Uttarakhand and nearby markets.",
  "A grounded background story: we started in 2026 from Dehradun to bridge the gap between genuine talent and employers looking for accountable, job-ready professionals.",
  "Better support for real talent: we help candidates present their profiles properly, understand role expectations, and reach employers who are actually hiring.",
  "Practical employer service: from requirement intake to shortlist coordination and follow-up, we focus on clear communication and dependable hiring movement.",
  "Trust-led placements: our platform is built to help deserving people find better jobs, not just collect profiles. We care about fit, credibility, and long-term opportunity.",
];

const candidateSupport = [
  "Profile positioning support so candidates present their work and experience with more clarity.",
  "Role matching based on practical fit, not just keyword filtering or mass forwarding.",
  "Interview coordination and follow-up so good candidates do not get lost in slow hiring cycles.",
  "Guidance at the offer stage so deserving talent can evaluate the opportunity with confidence.",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffef0] via-[#f7f3dc] to-[#fffef0] text-[#0f2918]">
      <div className="mx-auto max-w-5xl px-6 py-14 space-y-10">
        <ScrollReveal>
          <div className="grid gap-6 md:grid-cols-[1.08fr_0.92fr] md:items-start">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.28em] text-[#2d6a3e]">About us</p>
              <h1 className="text-4xl font-semibold leading-tight text-[#123622]">Your Partner in Building Resilient Teams for Emerging Growth Corridors.</h1>
              <p className="text-lg leading-8 text-[#2f4a35]">
                Yeble Careers started in 2026 with a simple belief: strong companies deserve better hiring support, and good
                candidates deserve access to genuine opportunities. From our Dehradun base, we work closely with employers
                and job seekers to make hiring more transparent, faster, and more dependable across regional and growth
                markets.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-[#e3decf] bg-white/85 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1552664688-cf412ec27db2?auto=format&fit=crop&w=1200&q=80"
                alt="Recruitment team reviewing candidate profiles together"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={70}>
          <div className="grid gap-4 md:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-2xl border border-[#e3decf] bg-white/85 p-5">
                  <div className="flex items-center gap-3 text-[#123622]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
                      <Icon />
                    </div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]/80">{item.label}</p>
                  </div>
                  <p className="mt-4 text-2xl font-semibold text-[#123622]">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-[#31513c]">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={110}>
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-[#e3decf] bg-white/85 p-6">
              <div className="flex items-center gap-3 text-[#123622]">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
                  <SparkIcon />
                </div>
                <h2 className="text-xl font-semibold">Our story</h2>
              </div>
              <div className="mt-4 space-y-4 text-sm leading-7 text-[#2f4a35]">
                <p>
                  We began in 2026 from Dehradun with a practical goal: reduce the gap between deserving talent and
                  employers who genuinely want to hire well. In many regional markets, candidates often struggle to find
                  trustworthy openings, while employers struggle to identify candidates who are serious, informed, and job-ready.
                </p>
                <p>
                  Yeble Careers was built to make that process more human and more dependable. We focus on real conversations,
                  stronger role understanding, and better follow-up so the right people do not miss the right opportunities.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-[#e3decf] bg-white/85 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80"
                alt="Professional handshake after a successful hiring conversation"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="rounded-3xl border border-[#e3decf] bg-white/85 p-6">
            <div className="flex items-center gap-3 text-[#123622]">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
                <SparkIcon />
              </div>
              <h2 className="text-xl font-semibold">What makes us different</h2>
            </div>
            <ul className="mt-5 space-y-4 text-[#2f4a35]">
              {differentiators.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7">
                  <span className="text-[#2d6a3e]"><CheckDotIcon /></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={190}>
          <div className="grid gap-4 md:grid-cols-3">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-[#e3decf] bg-white/85 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
                    <Icon />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#123622]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#31513c]">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={230}>
          <div className="grid gap-6 md:grid-cols-[0.92fr_1.08fr]">
            <div className="overflow-hidden rounded-3xl border border-[#e3decf] bg-white/85 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80"
                alt="Career guidance session with candidates reviewing opportunities"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-3xl border border-[#e3decf] bg-white/85 p-6">
              <div className="flex items-center gap-3 text-[#123622]">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
                  <UserIcon />
                </div>
                <h2 className="text-xl font-semibold">How we help real talent move forward</h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#2f4a35]">
                Our platform is meant to do more than collect registrations. We work to help credible candidates get seen,
                get guided, and get introduced to opportunities where their profile has a genuine chance of moving ahead.
              </p>
              <ul className="mt-5 space-y-4 text-[#2f4a35]">
                {candidateSupport.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-7">
                    <span className="text-[#2d6a3e]"><CheckDotIcon /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
