import { ScrollReveal } from "@/components/scroll-reveal";
import { jobs as fallbackJobs } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { getSiteContentMap } from "@/lib/site-content";
import { normalizeText } from "@/lib/text-normalize";

export const metadata = {
  title: "Open Jobs | Yeble Careers",
};

export default async function JobsPage() {
  const content = await getSiteContentMap();
  const dbJobs = await prisma.job.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []);

  const jobs = dbJobs.length
    ? dbJobs.map((job) => ({
        id: job.id,
        company: normalizeText(job.company),
        title: normalizeText(job.title),
        city: normalizeText(job.city || job.location),
        locationType: normalizeText(job.locationType || "On-site"),
        experience: normalizeText(job.experience || "Experience on request"),
        type: normalizeText(job.type || "Full-time"),
        salaryRange: normalizeText(job.salaryRange || job.salary || "Compensation on request"),
        sector: normalizeText(job.sector || (job.tags[0] ?? "General hiring")),
        openings: job.openings,
        status: normalizeText(job.status),
      }))
    : fallbackJobs;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffef0] via-[#f7f3dc] to-[#fffef0] text-[#0f2918]">
      <div className="mx-auto max-w-6xl space-y-6 px-6 py-14">
        <ScrollReveal>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.28em] text-[#2d6a3e]">Open roles</p>
            <h1 className="text-3xl font-semibold text-[#123622]">Current mandates</h1>
            <p className="text-sm text-[#56705d]">{content["jobs-page-intro"]?.body || "Updated regularly. Candidates can currently apply or reach out via growth@yeble.careers."}</p>
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
                      {job.city} | {job.locationType} | {job.experience} | {job.type}
                    </p>
                    <p className="text-sm text-[#31513c]">Salary: {job.salaryRange} | Job ID: {job.id}</p>
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
          <div className="rounded-3xl border border-[#e3decf] bg-white/85 p-6 text-sm leading-7 text-[#4d6654]">
            Candidates can currently apply or reach out with the Job ID at <a className="font-medium text-[#1f5c36]" href="mailto:growth@yeble.careers">growth@yeble.careers</a>.
            <br />
            A dedicated HR email will be released soon, but for now all job-related queries are being handled through the same inbox for faster coordination.
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
