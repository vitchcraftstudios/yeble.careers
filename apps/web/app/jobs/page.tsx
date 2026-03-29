import { ScrollReveal } from "@/components/scroll-reveal";
import { JobsListClient } from "@/components/jobs-list-client";
import { jobs as fallbackJobs } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { getSiteContentMap } from "@/lib/site-content";
import { normalizeText } from "@/lib/text-normalize";

export const metadata = {
  title: "Open Jobs | Yeble Careers",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
        postedAt: job.createdAt.toISOString(),
      }))
    : fallbackJobs.map((job) => ({
        ...job,
        company: normalizeText(job.company),
        title: normalizeText(job.title),
        city: normalizeText(job.city),
        locationType: normalizeText(job.locationType),
        experience: normalizeText(job.experience),
        type: normalizeText(job.type),
        salaryRange: normalizeText(job.salaryRange),
        sector: normalizeText(job.sector),
        status: normalizeText(job.status),
        postedAt: job.postedAt,
      }));

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

        <JobsListClient jobs={jobs} />

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