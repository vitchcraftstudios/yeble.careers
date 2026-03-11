export const metadata = {
  title: "Services | Yeble Careers",
};

const services = [
  {
    title: "Permanent hiring",
    points: [
      "End-to-end sourcing, screening, interview ops, and offer closure.",
      "Roles: SDE I/II/III, Leads, PMs, Designers, Data/ML, DevOps, SRE, GTM.",
      "Time-to-shortlist: <72h for common stacks; <10 days for niche.",
    ],
  },
  {
    title: "Contract & staff augmentation",
    points: [
      "Project-based tech talent with compliant contracts and payroll partners.",
      "Bench from vetted freelancers; deployment within 5-7 days.",
      "Options for hybrid/remote with city-based presence if needed.",
    ],
  },
  {
    title: "Leadership & niche search",
    points: [
      "Director/VP-level for Engineering, Product, Data, and GTM.",
      "Longlist + market mapping with weekly reports.",
      "Curated pitch and compensation benchmarking.",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03110a] via-[#062314] to-[#0a3a1a] text-white">
      <div className="mx-auto max-w-5xl px-6 py-14 space-y-8">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-lime-200">Services</p>
          <h1 className="text-3xl font-semibold text-lime-50">Hiring solutions built for Indian teams</h1>
          <p className="text-lg text-lime-100/80">
            Whether you need to scale fast, add contract talent, or close a leadership seat, we match you with vetted
            candidates and manage the process end-to-end.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-lime-50">{service.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-lime-100/80">
                {service.points.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-lime-50">Coverage</h2>
          <p className="mt-2 text-sm text-lime-100/80">
            Cities: Bengaluru, Hyderabad, Delhi NCR, Mumbai, Pune, Chennai. Remote-friendly roles pan India. Time zones:
            IST-first with overlap to EU/US as required.
          </p>
        </div>
      </div>
    </div>
  );
}
