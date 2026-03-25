export const metadata = {
  title: "Contact | Yeble Careers",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffef0] via-[#f7f3dc] to-[#fffef0] text-[#0f2918]">
      <div className="mx-auto max-w-4xl px-6 py-14 space-y-8">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-[#2d6a3e]">Contact</p>
          <h1 className="text-3xl font-semibold text-[#123622]">Connect with our hiring desk</h1>
          <p className="max-w-3xl text-sm leading-7 text-[#2f4a35]">
            Employers can share open mandates, team expansion plans, and hiring timelines. Candidates may send their
            profile, preferred location, and Job ID for faster screening support. Our team works with employers across
            Uttarakhand, Uttar Pradesh, Haryana, and Himachal Pradesh.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#e3decf] bg-white/85 p-5">
            <h3 className="text-lg font-semibold text-[#123622]">Phone</h3>
            <p className="mt-2 text-sm leading-7 text-[#2f4a35]">
              Mobile: <a className="font-medium text-[#2d6a3e]" href="tel:+919429692113">+91 94296 92113</a>
              <br />
              Landline: <a className="font-medium text-[#2d6a3e]" href="tel:+911354222268">0135 422 2268</a>
              <br />
              Best for urgent hiring requirements and callback requests.
            </p>
          </div>
          <div className="rounded-2xl border border-[#e3decf] bg-white/85 p-5">
            <h3 className="text-lg font-semibold text-[#123622]">Email</h3>
            <p className="mt-2 text-sm leading-7 text-[#2f4a35]">
              Business enquiries: <a className="font-medium text-[#2d6a3e]" href="mailto:growth@yeble.careers">growth@yeble.careers</a>
              <br />
              Share role count, locations, experience band, and expected joining timelines.
            </p>
          </div>
          <div className="rounded-2xl border border-[#e3decf] bg-white/85 p-5">
            <h3 className="text-lg font-semibold text-[#123622]">Coverage</h3>
            <p className="mt-2 text-sm leading-7 text-[#2f4a35]">
              Uttarakhand, Uttar Pradesh, Haryana, and Himachal Pradesh.
              <br />
              Support for regional hiring, local coordination, and north India talent outreach.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-[#d6d1c1] bg-white/90 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#123622]">Quick enquiry</h3>
          <p className="mt-2 text-sm leading-6 text-[#31513c]">
            Use this form for employer mandates, staffing enquiries, partnership outreach, or candidate screening
            follow-up. Clear role details help us respond faster.
          </p>
          <form className="mt-4 grid gap-4">
            <input
              className="w-full rounded-lg border border-[#d6d1c1] bg-white px-3 py-2 text-[#0f2918] placeholder:text-[#8a8f87] outline-none"
              placeholder="Full name"
              required
            />
            <input
              className="w-full rounded-lg border border-[#d6d1c1] bg-white px-3 py-2 text-[#0f2918] placeholder:text-[#8a8f87] outline-none"
              placeholder="Work email"
              type="email"
              required
            />
            <input
              className="w-full rounded-lg border border-[#d6d1c1] bg-white px-3 py-2 text-[#0f2918] placeholder:text-[#8a8f87] outline-none"
              placeholder="Phone number"
            />
            <textarea
              className="w-full rounded-lg border border-[#d6d1c1] bg-white px-3 py-2 text-[#0f2918] placeholder:text-[#8a8f87] outline-none"
              placeholder="Share your hiring requirement, locations, experience range, or the Job ID you are applying for"
              rows={4}
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-[#27c06b] px-5 py-2 text-sm font-semibold text-white shadow-lg hover:bg-[#1fb35f]"
            >
              Send enquiry
            </button>
            <p className="text-xs leading-6 text-[#31513c]">
              We usually respond within one business day. For urgent business enquiries, call <a className="font-medium text-[#2d6a3e]" href="tel:+919429692113">+91 94296 92113</a>, call <a className="font-medium text-[#2d6a3e]" href="tel:+911354222268">0135 422 2268</a>, or email <a className="font-medium text-[#2d6a3e]" href="mailto:growth@yeble.careers">growth@yeble.careers</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
