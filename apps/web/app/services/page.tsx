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
  "Guidance for candidates who need help understanding the role, employer expectations, and hiring stages.",
  "Better coordination so applicants are not left guessing after every round.",
  "A more genuine effort to connect people with openings that make sense for their background and goals.",
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
          <h1 className="text-3xl font-semibold text-[#123622]">Hiring and placement support shaped by Dehradun, built for North India.</h1>
          <p className="text-lg leading-8 text-[#2f4a35]">
            Yeble Careers works from Dehradun and supports both employers and job seekers across North India. Our
            services are built around practical hiring needs, honest communication, and a simple idea that good roles
            should reach the right people without unnecessary confusion or delay.
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
            <h2 className="text-xl font-semibold text-[#123622]">How we support hiring and placement</h2>
            <p className="mt-3 text-sm leading-7 text-[#2f4a35]">
              We are not just here to fill roles quickly. We try to make the hiring journey easier for both sides,
              whether that means helping an employer find dependable people or helping a candidate reach a better job with
              proper guidance and follow-up.
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
          <h2 className="text-xl font-semibold text-[#123622]">For job seekers</h2>
          <p className="mt-2 text-sm leading-7 text-[#2f4a35]">
            A good employment agency should not only speak to companies. We also work to help candidates move forward
            with more clarity, better coordination, and access to opportunities that feel genuine.
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[#2f4a35]">
            {candidateSupport.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-[#e3decf] bg-white/85 p-6">
          <h2 className="text-xl font-semibold text-[#123622]">Coverage</h2>
          <p className="mt-2 text-sm leading-7 text-[#2f4a35]">
            Based in Dehradun, we work across Uttarakhand, Uttar Pradesh, Haryana, and Himachal Pradesh. Our approach is
            local in understanding, but broad enough to support employers, freshers, and experienced professionals across
            the wider North India opportunity belt.
          </p>
        </div>
      </div>
    </div>
  );
}
