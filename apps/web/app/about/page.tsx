export const metadata = {
  title: "About Yeble Careers | India-first employment agency",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffef0] via-[#f7f3dc] to-[#fffef0] text-[#0f2918]">
      <div className="mx-auto max-w-5xl px-6 py-14 space-y-10">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-[#2d6a3e]">About us</p>
          <h1 className="text-3xl font-semibold text-[#123622]">We place talent into teams that ship.</h1>
          <p className="text-lg text-[#2f4a35]">
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
            <div key={item.label} className="rounded-2xl border border-[#e3decf] bg-white/85 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]/80">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-[#123622]">{item.value}</p>
              <p className="mt-2 text-sm text-[#31513c]">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-[#e3decf] bg-white/85 p-6">
          <h2 className="text-xl font-semibold text-[#123622]">What makes us different</h2>
          <ul className="mt-4 space-y-3 text-[#2f4a35]">
            <li>âœ” Local insight: salary bands, notice-period realities, and counter-offer risk by city.</li>
            <li>âœ” Structured scorecards: each submission carries skills, project depth, stability, and comp fit.</li>
            <li>âœ” SLA-driven: shortlists in 72h, interview scheduling, and offer negotiation handled.</li>
            <li>âœ” Compliance aware: IT/ITES staffing, NDAs, data handling, and background verification liaison.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}




