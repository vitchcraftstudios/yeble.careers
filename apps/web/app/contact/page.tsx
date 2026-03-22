export const metadata = {
  title: "Contact | Yeble Careers",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffef0] via-[#f7f3dc] to-[#fffef0] text-[#0f2918]">
      <div className="mx-auto max-w-4xl px-6 py-14 space-y-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.28em] text-[#2d6a3e]">Contact</p>
          <h1 className="text-3xl font-semibold text-[#123622]">Talk to our team</h1>
          <p className="text-sm text-[#2f4a35]">
            Employers: share your roles and hiring timelines. Candidates: include your résumé link and the Job ID if
            applicable.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#e3decf] bg-white/85 p-5">
            <h3 className="text-lg font-semibold text-[#123622]">Email</h3>
            <p className="mt-2 text-sm text-[#2f4a35]">
              Hiring: <a className="text-[#2d6a3e]" href="mailto:hello@yeble.careers">hello@yeble.careers</a>
              <br />
              Candidates: <a className="text-[#2d6a3e]" href="mailto:hr@yeble.careers">hr@yeble.careers</a>
            </p>
          </div>
          <div className="rounded-2xl border border-[#e3decf] bg-white/85 p-5">
            <h3 className="text-lg font-semibold text-[#123622]">Locations</h3>
            <p className="mt-2 text-sm text-[#2f4a35]">
              Bengaluru · Hyderabad · Delhi NCR · Mumbai · Pune <br />
              PAN India remote support for candidate coordination.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-[#d6d1c1] bg-white/90 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#123622]">Quick enquiry</h3>
          <form className="mt-4 grid gap-4">
            <input
              className="w-full rounded-lg border border-[#d6d1c1] bg-white px-3 py-2 text-[#0f2918] placeholder:text-[#8a8f87] outline-none"
              placeholder="Name"
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
              placeholder="Phone (optional)"
            />
            <textarea
              className="w-full rounded-lg border border-[#d6d1c1] bg-white px-3 py-2 text-[#0f2918] placeholder:text-[#8a8f87] outline-none"
              placeholder="Share your hiring needs or the Job ID you're applying for"
              rows={4}
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-[#27c06b] px-5 py-2 text-sm font-semibold text-white shadow-lg hover:bg-[#1fb35f]"
            >
              Send enquiry
            </button>
            <p className="text-xs text-[#31513c]">
              Submissions route to our inbox; we respond within one business day. For faster responses, email
              hello@yeble.careers directly.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
