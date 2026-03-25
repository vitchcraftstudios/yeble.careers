function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      <path d="M4 9.5A1.5 1.5 0 0 1 5.5 8h13A1.5 1.5 0 0 1 20 9.5v8A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5z" />
      <path d="M4 12h16" />
    </svg>
  );
}

function GraduationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m3 9 9-4 9 4-9 4-9-4Z" />
      <path d="M7 11.5V15c0 1.7 2.2 3 5 3s5-1.3 5-3v-3.5" />
      <path d="M21 10v5" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M16.5 19a4.5 4.5 0 0 0-9 0" />
      <circle cx="12" cy="9" r="3" />
      <path d="M19.5 19a3.5 3.5 0 0 0-3-3.45" />
      <path d="M7.5 15.55A3.5 3.5 0 0 0 4.5 19" />
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

const services = [
  {
    title: "Permanent Recruitment (RPO)",
    icon: BriefcaseIcon,
    points: [
      "End-to-end recruitment support for ongoing hiring mandates across technology, operations, support, and business teams.",
      "Structured sourcing, screening, shortlist coordination, and interview follow-up designed for employers who need steady hiring movement.",
      "Well suited for businesses that want a reliable recruitment partner instead of fragmented hiring efforts.",
    ],
  },
  {
    title: "Campus Recruitment Drives",
    icon: GraduationIcon,
    points: [
      "Planned campus outreach and early-career hiring support for employers looking to build fresher and trainee pipelines.",
      "Coordination for shortlisting, drive management, candidate communication, and employer scheduling across regional institutions.",
      "Useful for companies hiring at scale and for teams building long-term workforce strength in North India.",
    ],
  },
  {
    title: "Contract Staffing (Staff Augmentation)",
    icon: UsersIcon,
    points: [
      "Flexible staffing support for project-based hiring, urgent team expansion, and short-to-mid-term workforce needs.",
      "Suitable for employers who need deployable talent quickly without slowing delivery or business timelines.",
      "Coordinated with practical hiring support, role clarity, and dependable communication through the onboarding stage.",
    ],
  },
  {
    title: "Skill-Based Vetting (Assessment)",
    icon: ShieldIcon,
    points: [
      "Candidate evaluation support based on role fit, communication, practical capability, and job-readiness.",
      "Helps employers reduce mismatch risk by reviewing candidates beyond resume keywords alone.",
      "Useful for teams that want better screening confidence before interview rounds and final shortlist decisions.",
    ],
  },
];

const strengths = [
  "Dehradun-based hiring support with North India market understanding.",
  "Coverage across Uttarakhand, Uttar Pradesh, Haryana, and Himachal Pradesh.",
  "Structured support for employers, candidates, and fresher hiring programs.",
  "A practical approach focused on real roles, real follow-up, and credible placements.",
];

export const metadata = {
  title: "Services | Yeble Careers",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffef0] via-[#f7f3dc] to-[#fffef0] text-[#0f2918]">
      <div className="mx-auto max-w-5xl px-6 py-14 space-y-8">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-[#2d6a3e]">Services</p>
          <h1 className="text-3xl font-semibold text-[#123622]">Hiring solutions built for North India&apos;s growing employers</h1>
          <p className="text-lg leading-8 text-[#2f4a35]">
            From Dehradun, Yeble Careers supports employers with dependable recruitment, fresher hiring, staffing
            support, and candidate vetting services. Our work is shaped by practical hiring needs across North India,
            with a focus on speed, fit, and clearer hiring communication.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="rounded-2xl border border-[#e3decf] bg-white/85 p-5">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl border border-[#d8e5d9] bg-[#f5fbf6] p-3 text-[#2d6a3e]">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#123622]">{service.title}</h3>
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-[#2f4a35]">
                      {service.points.map((point) => (
                        <li key={point}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-[#e3decf] bg-white/85 p-6">
            <h2 className="text-xl font-semibold text-[#123622]">Why employers engage us</h2>
            <p className="mt-3 text-sm leading-7 text-[#2f4a35]">
              Employers work with Yeble Careers when they need a recruitment partner that understands local hiring
              realities, keeps communication active, and helps move genuine talent through the process with more
              confidence.
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#2f4a35]">
              {strengths.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-3xl border border-[#e3decf] bg-white/85">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
              alt="Hiring and staffing discussion"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-[#e3decf] bg-white/85 p-6">
          <h2 className="text-xl font-semibold text-[#123622]">Coverage</h2>
          <p className="mt-2 text-sm leading-7 text-[#2f4a35]">
            Based in Dehradun, we support hiring requirements across Uttarakhand, Uttar Pradesh, Haryana, and Himachal
            Pradesh, while also coordinating with employers hiring into connected growth corridors and metro-linked teams.
            Our focus stays on practical recruitment support, dependable candidate follow-up, and long-term hiring relationships.
          </p>
        </div>
      </div>
    </div>
  );
}
