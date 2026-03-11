export const metadata = {
  title: "Contact | Yeble Careers",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03110a] via-[#062314] to-[#0a3a1a] text-white">
      <div className="mx-auto max-w-4xl px-6 py-14 space-y-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.28em] text-lime-200">Contact</p>
          <h1 className="text-3xl font-semibold text-lime-50">Talk to our team</h1>
          <p className="text-sm text-lime-100/75">
            Employers: share your roles and hiring timelines. Candidates: include your résumé link and the Job ID if
            applicable.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-lime-50">Email</h3>
            <p className="mt-2 text-sm text-lime-100/80">
              Hiring: <a className="text-lime-200" href="mailto:hello@yeble.careers">hello@yeble.careers</a>
              <br />
              Candidates: <a className="text-lime-200" href="mailto:hr@yeble.careers">hr@yeble.careers</a>
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-lime-50">Locations</h3>
            <p className="mt-2 text-sm text-lime-100/80">
              Bengaluru · Hyderabad · Delhi NCR · Mumbai · Pune <br />
              PAN India remote support for candidate coordination.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-lime-50">Quick enquiry</h3>
          <form className="mt-4 grid gap-4">
            <input
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none"
              placeholder="Name"
              required
            />
            <input
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none"
              placeholder="Work email"
              type="email"
              required
            />
            <input
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none"
              placeholder="Phone (optional)"
            />
            <textarea
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none"
              placeholder="Share your hiring needs or the Job ID you’re applying for"
              rows={4}
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-lime-400 px-5 py-2 text-sm font-semibold text-[#06290f] shadow-lg hover:bg-lime-300"
            >
              Send enquiry
            </button>
            <p className="text-xs text-lime-100/70">
              Submissions route to our inbox; we respond within one business day. For faster responses, email
              hello@yeble.careers directly.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
