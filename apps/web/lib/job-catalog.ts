import { jobs as fallbackJobs } from "@/lib/data";
import { prisma } from "@/lib/prisma";

type JobSummary = {
  id: string;
  title: string;
  company: string;
};

export async function getJobSummary(jobId: string): Promise<JobSummary | null> {
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

  return {
    id: fallbackJob.id,
    title: fallbackJob.title,
    company: fallbackJob.company,
  };
}

export async function ensureJobRecord(jobId: string) {
  const existingJob = await getJobSummary(jobId);
  if (!existingJob) {
    return null;
  }

  const alreadyPersisted = await prisma.job.findUnique({
    where: { id: jobId },
    select: { id: true, title: true, company: true },
  });

  if (alreadyPersisted) {
    return alreadyPersisted;
  }

  const fallbackJob = fallbackJobs.find((job) => job.id === jobId);
  if (!fallbackJob) {
    return existingJob;
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
