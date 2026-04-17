import { ScrollReveal } from "@/components/scroll-reveal";
import { getSiteContentMap } from "@/lib/site-content";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      <path d="M4 9.5A1.5 1.5 0 0 1 5.5 8h13A1.5 1.5 0 0 1 20 9.5v8A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5z" />
      <path d="M4 12h16" />
    </svg>
  );
}

function GraduationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="m3 9 9-4 9 4-9 4-9-4Z" />
      <path d="M7 11.5V15c0 1.7 2.2 3 5 3s5-1.3 5-3v-3.5" />
      <path d="M21 10v5" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M16.5 19a4.5 4.5 0 0 0-9 0" />
      <circle cx="12" cy="9" r="3" />
      <path d="M19.5 19a3.5 3.5 0 0 0-3-3.45" />
      <path d="M7.5 15.55A3.5 3.5 0 0 0 4.5 19" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M12 3 5.5 5.5v5.7c0 4 2.5 7 6.5 9.8 4-2.8 6.5-5.8 6.5-9.8V5.5z" />
      <path d="m9.5 12 1.7 1.7 3.3-3.7" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8" />
      <path d="m14.8 9.2-2.4 5.6-5.6 2.4 2.4-5.6z" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 18.5V6.5A1.5 1.5 0 0 1 6.5 5h11A1.5 1.5 0 0 1 19 6.5v8A1.5 1.5 0 0 1 17.5 16H9z" />
      <path d="M9 16 5 20v-1.5" />
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

const services = [
  {
    title: "Permanent Recruitment (RPO)",
    icon: BriefcaseIcon,
    points: [
      "We work with employers on full-time hiring mandates and stay involved from requirement understanding to final closure.",
      "At the same time, we help serious candidates reach roles that genuinely match their experience, expectations, and long-term plans.",
      "This works best for companies that want a dependable hiring partner and for professionals looking for credible opportunities with proper follow-up.",
    ],
  },
  {
    title: "Campus Recruitment Drives",
    icon: GraduationIcon,
    points: [
      "We support fresher hiring through planned campus drives, pre-screening, and better coordination between institutions and employers.",
      "For students and early-career candidates, this creates a more organized path into real jobs instead of random application cycles.",
      "For employers, it helps build a stronger entry-level pipeline with clearer communication and better drive management.",
    ],
  },
  {
    title: "Contract Staffing (Staff Augmentation)",
    icon: UsersIcon,
    points: [
      "When teams need people quickly, we support short-term and project-based staffing with a practical, role-first approach.",
      "This helps employers keep delivery moving, while candidates get access to genuine contract opportunities with clear expectations.",
      "We stay focused on fit, availability, and reliable communication through the hiring and onboarding stage.",
    ],
  },
  {
    title: "Skill-Based Vetting (Assessment)",
    icon: ShieldIcon,
    points: [
      "We review candidates beyond resume keywords and look at practical fit, communication, role understanding, and readiness.",
      "This gives employers more confidence before interview rounds and helps candidates get evaluated more fairly on actual suitability.",
      "It is especially useful where the cost of a poor shortlist is high and better screening can save everyone time.",
    ],
  },
];

const strengths = [
  "We operate from Dehradun and understand the hiring pulse of North India from the ground up.",
  "We work with both employers and job seekers, so the process stays more balanced and more human.",
  "We focus on real openings, clear communication, and dependable follow-up instead of volume-driven profile circulation.",
  "We support hiring across Uttarakhand, Uttar Pradesh, Haryana, and Himachal Pradesh with practical regional understanding.",
];

const candidateSupport = [
  {
    title: "Role clarity",
    detail: "We help candidates understand the role, the employer's expectations, and what each stage of the process actually means.",
    icon: CompassIcon,
  },
  {
    title: "Better follow-up",
    detail: "Applicants should not be left guessing after every round, so we try to keep communication clearer and more timely.",
    icon: MessageIcon,
  },
  {
    title: "Genuine fit",
    detail: "We make a more careful effort to connect people with openings that suit their background, readiness, and long-term direction.",
    icon: ShieldIcon,
  },
];

const coverageRegions = ["Uttarakhand", "Uttar Pradesh", "Haryana", "Himachal Pradesh"];

const coverageNotes = [
  "Dehradun-led coordination with regional understanding of candidate movement and employer expectations.",
  "Support for freshers, experienced professionals, and employers hiring into the wider North India opportunity belt.",
  "A practical approach that stays local in understanding while remaining broad enough for multi-location hiring needs.",
];

export const metadata = buildMetadata({
  title: "Recruitment Services, Staffing, and Campus Hiring",
  description:
    "Explore Yeble Careers recruitment services including permanent hiring, contract staffing, campus recruitment, and candidate vetting for employers across Dehradun and North India.",
  path: "/services",
  keywords: [
    "recruitment services Dehradun",
    "staffing agency Uttarakhand",
    "campus hiring North India",
    "contract staffing Dehradun",
    "candidate vetting services",
  ],
});

export default async function ServicesPage() {
  const content = await getSiteContentMap();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffef0] via-[#f7f3dc] to-[#fffef0] text-[#0f2918]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Yeble Careers services",
              itemListElement: services.map((service, index) => ({
                "@type": "Service",
                position: index + 1,
                name: service.title,
                serviceType: service.title,
                areaServed: ["Dehradun", "Uttarakhand", "Uttar Pradesh", "Haryana", "Himachal Pradesh"],
                provider: {
                  "@type": "EmploymentAgency",
                  name: "Yeble Careers",
                  url: absoluteUrl("/"),
                },
              })),
            },
          ]),
        }}
      />
      <div className="mx-auto max-w-5xl px-6 py-14 space-y-8">
        <ScrollReveal>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.28em] text-[#2d6a3e]">Services</p>
            <h1 className="text-3xl font-semibold text-[#123622]">{content["services-page-intro"]?.body || "Strategic Talent Solutions Rooted in Regional Insight, Built for Professional Growth."}</h1>
            <p className="text-lg leading-8 text-[#2f4a35]">{content["services-page-summary"]?.body || "Yeble Careers works from Dehradun and supports both employers and job seekers across North India. Our services are built around practical hiring needs, honest communication, and a simple idea that good roles should reach the right people without unnecessary confusion or delay."}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={70}>
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="rounded-2xl border border-[#e3decf] bg-white/85 p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e] sm:h-16 sm:w-16">
                      <Icon />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#123622]">{service.title}</h3>
                      <ul className="mt-3 space-y-2 text-sm leading-7 text-[#2f4a35]">
                        {service.points.map((point) => (
                          <li key={point}>- {point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={110}>
          <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-[#e3decf] bg-white/85 p-6">
              <div className="flex items-center gap-3 text-[#123622]">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
                  <SparkIcon />
                </div>
                <h2 className="text-xl font-semibold">How we support hiring and placement</h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#2f4a35]">
                We are not just here to fill roles quickly. We try to make the hiring journey easier for both sides,
                whether that means helping an employer find dependable people or helping a candidate reach a better job with
                proper guidance and follow-up.
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[#2f4a35]">
                {strengths.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#2d6a3e]"><CheckDotIcon /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-3xl border border-[#e3decf] bg-white/85">
              <img
                src={content["services-page-media"]?.mediaUrl || "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80"}
                alt="Hiring team reviewing active placement work"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-[#e3decf] bg-white/85 p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[#123622]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
                      <UsersIcon />
                    </div>
                    <h2 className="text-xl font-semibold">For job seekers</h2>
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#2f4a35]">
                    We help candidates move forward with more clarity, better communication, and access to openings that feel real and relevant.
                  </p>
                </div>
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#2d6a3e]">
                  Candidate-first guidance
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {candidateSupport.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-[#e8e1cd] bg-[#fffdf6] p-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
                        <Icon />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-[#123622]">{item.title}</h3>
                        <p className="mt-1 text-sm leading-7 text-[#31513c]">{item.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-[#e3decf] bg-white/85 md:min-h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80"
                alt="Candidates discussing career options with optimism"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={190}>
          <div className="grid gap-6 md:grid-cols-[0.82fr_1.18fr]">
            <div className="overflow-hidden rounded-3xl border border-[#e3decf] bg-white/85 md:min-h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&w=1200&q=80"
                alt="Regional team collaboration across hiring markets"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-3xl border border-[#e3decf] bg-white/85 p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[#123622]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
                      <MapPinIcon />
                    </div>
                    <h2 className="text-xl font-semibold">Coverage</h2>
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#2f4a35]">
                    Based in Dehradun, we work across North India with a style that stays local in understanding and practical in execution.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#d8e5d9] bg-[#f5fbf6] px-4 py-2 text-sm font-medium text-[#2d6a3e]">
                  <MapPinIcon />
                  Dehradun, Uttarakhand
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {coverageRegions.map((region) => (
                  <div key={region} className="rounded-full border border-[#d6d1c1] bg-[#fffdf6] px-4 py-2 text-sm font-medium text-[#123622]">
                    {region}
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-4">
                {coverageNotes.map((note) => (
                  <div key={note} className="flex items-start gap-3 border-l-2 border-[#d8e5d9] pl-4 text-sm leading-7 text-[#31513c]">
                    <span className="text-[#2d6a3e]"><CheckDotIcon /></span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
