export const metadata = {
  title: "About Yeble Careers | India-first employment agency",
};

const pillars = [
  {
    title: "Employers",
    detail:
      "We support founders, business heads, and hiring teams that need dependable shortlist movement, clearer candidate communication, and local market understanding.",
  },
  {
    title: "Job Seekers",
    detail:
      "We help serious candidates find genuine openings, understand expectations better, and approach hiring conversations with stronger preparation.",
  },
  {
    title: "North India Markets",
    detail:
      "Our focus stays close to Uttarakhand, Uttar Pradesh, Haryana, and Himachal Pradesh, while also supporting companies hiring into connected growth corridors.",
  },
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
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-[#2d6a3e]">About us</p>
          <h1 className="text-3xl font-semibold text-[#123622]">Helping serious employers hire dependable talent across North India.</h1>
          <p className="text-lg leading-8 text-[#2f4a35]">
            Yeble Careers started in 2026 with a simple belief: strong companies deserve better hiring support, and good
            candidates deserve access to genuine opportunities. From our Dehradun base, we work closely with employers
            and job seekers to make hiring more transparent, faster, and more dependable across regional and growth
            markets.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Founded", value: "2026", detail: "Built to serve employers and job seekers with a practical, local-first hiring approach" },
            { label: "Location", value: "Dehradun HQ", detail: "9W5Q+3RJ, Sudhowala, Dehradun, Uttarakhand 248015" },
            { label: "Our focus", value: "Real placements", detail: "Connecting verified candidates with credible roles and guided hiring support" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-[#e3decf] bg-white/85 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]/80">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-[#123622]">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-[#31513c]">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-[#e3decf] bg-white/85 p-6">
            <h2 className="text-xl font-semibold text-[#123622]">Our story</h2>
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
          <div className="overflow-hidden rounded-3xl border border-[#e3decf] bg-white/85">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80"
              alt="Professional hiring discussion"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-[#e3decf] bg-white/85 p-6">
          <h2 className="text-xl font-semibold text-[#123622]">What makes us different</h2>
          <ul className="mt-4 space-y-3 text-[#2f4a35]">
            <li>✔ North India understanding: we know the hiring realities, salary expectations, notice-period challenges, and candidate sentiment across Uttarakhand and nearby markets.</li>
            <li>✔ A grounded background story: we started in 2026 from Dehradun to bridge the gap between genuine talent and employers looking for accountable, job-ready professionals.</li>
            <li>✔ Better support for real talent: we help candidates present their profiles properly, understand role expectations, and reach employers who are actually hiring.</li>
            <li>✔ Practical employer service: from requirement intake to shortlist coordination and follow-up, we focus on clear communication and dependable hiring movement.</li>
            <li>✔ Trust-led placements: our platform is built to help deserving people find better jobs, not just collect profiles. We care about fit, credibility, and long-term opportunity.</li>
          </ul>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((item) => (
            <div key={item.title} className="rounded-2xl border border-[#e3decf] bg-white/85 p-5">
              <h3 className="text-lg font-semibold text-[#123622]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#31513c]">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-[#e3decf] bg-white/85 p-6">
          <h2 className="text-xl font-semibold text-[#123622]">How we help real talent move forward</h2>
          <p className="mt-3 text-sm leading-7 text-[#2f4a35]">
            Our platform is meant to do more than collect registrations. We work to help credible candidates get seen,
            get guided, and get introduced to opportunities where their profile has a genuine chance of moving ahead.
          </p>
          <ul className="mt-4 space-y-3 text-[#2f4a35]">
            {candidateSupport.map((item) => (
              <li key={item}>✔ {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
