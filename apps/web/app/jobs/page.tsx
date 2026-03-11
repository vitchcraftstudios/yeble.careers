import { jobs } from "@/lib/data";

export const metadata = {
  title: "Open Jobs | Yeble Careers",
};

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03110a] via-[#062314] to-[#0a3a1a] text-white">
      <div className="mx-auto max-w-6xl px-6 py-14 space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.28em] text-lime-200">Open roles</p>
          <h1 className="text-3xl font-semibold text-lime-50">Current mandates</h1>
          <p className="text-sm text-lime-100/75">Updated daily. Apply via hr@yeble.careers with the Job ID.</p>
        </div>

        <div className="grid gap-3">
          {jobs.map((job) => (
            <article key={job.id} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-lime-200/80">{job.company}</p>
                  <h2 className="text-xl font-semibold text-lime-50">{job.title}</h2>
                  <p className="text-sm text-lime-100/70">
                    {job.city} · {job.locationType} · {job.experience} · {job.type}
                  </p>
                  <p className="text-sm text-lime-100/70">Salary: {job.salaryRange} · Job ID: {job.id}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-lime-100/80">
                  <span className="rounded-full bg-white/10 px-3 py-1">{job.sector}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1">{job.openings} openings</span>
                  <span className="rounded-full border border-white/10 px-3 py-1">{job.status}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-lime-100/75">
          To apply, email your résumé with the Job ID to <a className="text-lime-200" href="mailto:hr@yeble.careers">hr@yeble.careers</a>.
          Hiring managers can send new mandates to <a className="text-lime-200" href="mailto:hello@yeble.careers">hello@yeble.careers</a>.
        </div>
      </div>
    </div>
  );
}
