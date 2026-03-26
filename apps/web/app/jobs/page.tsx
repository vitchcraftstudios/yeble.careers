import { ScrollReveal } from "@/components/scroll-reveal";
import { jobs } from "@/lib/data";

export const metadata = {
  title: "Open Jobs | Yeble Careers",
};

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffef0] via-[#f7f3dc] to-[#fffef0] text-[#0f2918]">
      <div className="mx-auto max-w-6xl px-6 py-14 space-y-6">
        <ScrollReveal>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.28em] text-[#2d6a3e]">Open roles</p>
            <h1 className="text-3xl font-semibold text-[#123622]">Current mandates</h1>
            <p className="text-sm text-[#56705d]">Updated daily. Apply via hr@yeble.careers with the Job ID.</p>
          </div>
        </ScrollReveal>

        <div className="grid gap-3">
          {jobs.map((job, index) => (
            <ScrollReveal key={job.id} delay={Math.min(index * 45, 220)}>
              <article className="rounded-2xl border border-[#e3decf] bg-white/85 p-5 backdrop-blur">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#2d6a3e]/80">{job.company}</p>
                    <h2 className="text-xl font-semibold text-[#123622]">{job.title}</h2>
                    <p className="text-sm text-[#31513c]">
                      {job.city} · {job.locationType} · {job.experience} · {job.type}
                    </p>
                    <p className="text-sm text-[#31513c]">Salary: {job.salaryRange} · Job ID: {job.id}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-[#2f4a35]">
                    <span className="rounded-full bg-[#f6f2e6] px-3 py-1">{job.sector}</span>
                    <span className="rounded-full border border-[#e3decf] bg-white px-3 py-1">{job.openings} openings</span>
                    <span className="rounded-full border border-[#e3decf] bg-white px-3 py-1">{job.status}</span>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={140}>
          <div className="rounded-3xl border border-[#e3decf] bg-white/85 p-6 text-sm text-[#4d6654]">
            To apply, email your resume with the Job ID to <a className="font-medium text-[#1f5c36]" href="mailto:hr@yeble.careers">hr@yeble.careers</a>.
            Hiring managers can send new mandates to <a className="font-medium text-[#1f5c36]" href="mailto:hello@yeble.careers">hello@yeble.careers</a>.
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
