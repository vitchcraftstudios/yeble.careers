import { ScrollReveal } from "@/components/scroll-reveal";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6.6 4h2.8l1.2 4-1.8 1.8a15 15 0 0 0 5.4 5.4L16 13.4l4 1.2v2.8a1.6 1.6 0 0 1-1.6 1.6A14.4 14.4 0 0 1 4 5.6 1.6 1.6 0 0 1 5.6 4Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="m5.5 7 6.5 5 6.5-5" />
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

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l2.8 1.8" />
    </svg>
  );
}

export const metadata = {
  title: "Contact | Yeble Careers",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffef0] via-[#f7f3dc] to-[#fffef0] text-[#0f2918]">
      <div className="mx-auto max-w-5xl px-6 py-14 space-y-8">
        <ScrollReveal>
          <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:items-start">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.28em] text-[#2d6a3e]">Contact</p>
              <h1 className="text-4xl font-semibold leading-tight text-[#123622]">Partner with our Strategic Placement Hub</h1>
              <p className="max-w-3xl text-base leading-8 text-[#2f4a35]">
                Employers can share open mandates, team expansion plans, and hiring timelines. Candidates may send their
                profile, preferred location, and Job ID for faster screening support. Our team works with employers across
                Uttarakhand, Uttar Pradesh, Haryana, and Himachal Pradesh.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#e3decf] bg-white/85 p-4">
                  <div className="flex items-center gap-3 text-[#123622]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
                      <ClockIcon />
                    </div>
                    <p className="text-sm font-semibold">Response time</p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[#31513c]">Most enquiries are answered within one business day.</p>
                </div>
                <div className="rounded-2xl border border-[#e3decf] bg-white/85 p-4">
                  <div className="flex items-center gap-3 text-[#123622]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
                      <MapPinIcon />
                    </div>
                    <p className="text-sm font-semibold">Base location</p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[#31513c]">Dehradun-led support with strong North India coverage.</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-[#e3decf] bg-white/85 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80"
                alt="Professional contact desk conversation with a client"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={70}>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#e3decf] bg-white/85 p-5">
              <div className="flex items-center gap-3 text-[#123622]">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
                  <PhoneIcon />
                </div>
                <h3 className="text-lg font-semibold">Phone</h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#2f4a35]">
                Mobile: <a className="font-medium text-[#2d6a3e]" href="tel:+919429692113">+91 94296 92113</a>
                <br />
                Landline: <a className="font-medium text-[#2d6a3e]" href="tel:+911354222268">0135 422 2268</a>
                <br />
                Best for urgent hiring requirements and callback requests.
              </p>
            </div>
            <div className="rounded-2xl border border-[#e3decf] bg-white/85 p-5">
              <div className="flex items-center gap-3 text-[#123622]">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
                  <MailIcon />
                </div>
                <h3 className="text-lg font-semibold">Email</h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#2f4a35]">
                Business enquiries: <a className="font-medium text-[#2d6a3e]" href="mailto:growth@yeble.careers">growth@yeble.careers</a>
                <br />
                Share role count, locations, experience band, and expected joining timelines.
              </p>
            </div>
            <div className="rounded-2xl border border-[#e3decf] bg-white/85 p-5">
              <div className="flex items-center gap-3 text-[#123622]">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
                  <MapPinIcon />
                </div>
                <h3 className="text-lg font-semibold">Coverage</h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#2f4a35]">
                Uttarakhand, Uttar Pradesh, Haryana, and Himachal Pradesh.
                <br />
                Support for regional hiring, local coordination, and North India talent outreach.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="grid gap-6 md:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-3xl border border-[#d6d1c1] bg-white/90 p-6 shadow-sm">
              <div className="flex items-center gap-3 text-[#123622]">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
                  <MailIcon />
                </div>
                <h3 className="text-xl font-semibold">Quick enquiry</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-[#31513c]">
                Use this form for employer mandates, staffing enquiries, partnership outreach, or candidate screening
                follow-up. Clear role details help us respond faster.
              </p>
              <form className="mt-5 grid gap-4">
                <input
                  className="w-full rounded-xl border border-[#d6d1c1] bg-white px-4 py-3 text-[#0f2918] placeholder:text-[#8a8f87] outline-none"
                  placeholder="Full name"
                  required
                />
                <input
                  className="w-full rounded-xl border border-[#d6d1c1] bg-white px-4 py-3 text-[#0f2918] placeholder:text-[#8a8f87] outline-none"
                  placeholder="Work email"
                  type="email"
                  required
                />
                <input
                  className="w-full rounded-xl border border-[#d6d1c1] bg-white px-4 py-3 text-[#0f2918] placeholder:text-[#8a8f87] outline-none"
                  placeholder="Phone number"
                />
                <textarea
                  className="w-full rounded-xl border border-[#d6d1c1] bg-white px-4 py-3 text-[#0f2918] placeholder:text-[#8a8f87] outline-none"
                  placeholder="Share your hiring requirement, locations, experience range, or the Job ID you are applying for"
                  rows={5}
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-[#27c06b] px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#1fb35f]"
                >
                  Send enquiry
                </button>
                <p className="text-xs leading-6 text-[#31513c]">
                  We usually respond within one business day. For urgent business enquiries, call <a className="font-medium text-[#2d6a3e]" href="tel:+919429692113">+91 94296 92113</a>, call <a className="font-medium text-[#2d6a3e]" href="tel:+911354222268">0135 422 2268</a>, or email <a className="font-medium text-[#2d6a3e]" href="mailto:growth@yeble.careers">growth@yeble.careers</a>.
                </p>
              </form>
            </div>

            <div className="overflow-hidden rounded-3xl border border-[#e3decf] bg-white/85 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80"
                alt="Recruitment consultant speaking with a client team"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
