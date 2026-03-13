export const metadata = {
  title: "About Yeble Careers | India-first employment agency",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03110a] via-[#062314] to-[#0a3a1a] text-white">
      <div className="mx-auto max-w-5xl px-6 py-14 space-y-10">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-lime-200">About us</p>
          <h1 className="text-3xl font-semibold text-lime-50">We place talent into teams that ship.</h1>
          <p className="text-lg text-lime-100/80">
            Yeble Careers is the most trusted employment agency helping enterprises hire
            Talents. We combine on-ground sourcing hubs
            with structured evaluation so you get calibrated shortlists in under 72 hours.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Founded", value: "2026", detail: "Dehradun HQ, recruiters across 5 cities" },
            { label: "Placements FY25", value: "312", detail: "Across tech, product, analytics, GTM" },
            { label: "Acceptance rate", value: "82%", detail: "Offer-to-join backed by prep + closing" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-lime-200/80">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-lime-50">{item.value}</p>
              <p className="mt-2 text-sm text-lime-100/70">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-lime-50">What makes us different</h2>
          <ul className="mt-4 space-y-3 text-lime-100/80">
            <li>✔ Local insight: salary bands, notice-period realities, and counter-offer risk by city.</li>
            <li>✔ Structured scorecards: each submission carries skills, project depth, stability, and comp fit.</li>
            <li>✔ SLA-driven: shortlists in 72h, interview scheduling, and offer negotiation handled.</li>
            <li>✔ Compliance aware: IT/ITES staffing, NDAs, data handling, and background verification liaison.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
