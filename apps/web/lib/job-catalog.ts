import { jobs as fallbackJobs } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export async function ensureJobRecord(jobId: string) {
  const existingJob = await prisma.job.findUnique({
    where: { id: jobId },
    select: { id: true, title: true, company: true },
  });

  if (existingJob) {
    return existingJob;
  }

  const fallbackJob = fallbackJobs.find((job) => job.id === jobId);
  if (!fallbackJob) {
    return null;
  }

  try {
    return await (prisma.job as any).create({
      data: {
        id: fallbackJob.id,
        title: fallbackJob.title,
        company: fallbackJob.company,
        sector: fallbackJob.sector,
        city: fallbackJob.city,
        locationType: fallbackJob.locationType,
        experience: fallbackJob.experience,
        salaryRange: fallbackJob.salaryRange,
        type: fallbackJob.type,
        openings: fallbackJob.openings,
        status: fallbackJob.status,
        location: fallbackJob.city,
        description: `${fallbackJob.title} opportunity in ${fallbackJob.city}.`,
        salary: fallbackJob.salaryRange,
        tags: [fallbackJob.sector],
        source: "manual",
        sourceJobId: fallbackJob.id,
        isActive: fallbackJob.status !== "Closed",
        isVerified: true,
        isImported: false,
        syncStatus: "manual",
      },
      select: { id: true, title: true, company: true },
    });
  } catch {
    return (prisma.job as any).findFirst({
      where: {
        OR: [
          { id: jobId },
          {
            source: "manual",
            sourceJobId: fallbackJob.id,
          },
        ],
      },
      select: { id: true, title: true, company: true },
    });
  }
}
