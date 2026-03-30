import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/clerk-access";
import { fetchJoobleJobs } from "@/lib/jooble";

export async function POST(req: Request) {
  const auth = await isAdminRequest();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const apiKey = process.env.JOOBLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "JOOBLE_API_KEY is missing." }, { status: 400 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const batchLimit = Number(body?.batchLimit || 4);
    const result = await fetchJoobleJobs({ apiKey, batchLimit });

    if (!result.jobs.length) {
      return NextResponse.json({
        ok: true,
        imported: 0,
        deactivated: 0,
        requestCount: result.requestCount,
        requestStats: result.requestStats,
        syncedAt: result.syncTime.toISOString(),
      });
    }

    const seenIds = new Set<string>();

    for (const job of result.jobs) {
      seenIds.add(job.sourceJobId);
      await (prisma.job as any).upsert({
        where: {
          source_sourceJobId: {
            source: job.source,
            sourceJobId: job.sourceJobId,
          },
        },
        update: {
          title: job.title,
          company: job.company,
          sector: job.sector,
          city: job.city,
          locationType: job.locationType,
          experience: job.experience,
          salaryRange: job.salaryRange,
          type: job.type,
          openings: job.openings,
          status: job.status,
          location: job.location,
          description: job.description,
          salary: job.salary,
          tags: job.tags,
          sourceUrl: job.sourceUrl,
          sourcePayload: job.sourcePayload,
          isImported: true,
          isVerified: false,
          isActive: true,
          syncStatus: job.syncStatus,
          importHash: job.importHash,
          lastSyncedAt: job.lastSyncedAt,
          expiresAt: job.expiresAt,
        },
        create: job,
      });
    }

    const staleJobs = await (prisma.job as any).findMany({
      where: {
        source: "jooble",
        sourceJobId: { notIn: Array.from(seenIds) },
        isImported: true,
        isActive: true,
      },
      select: { id: true },
    });

    if (staleJobs.length) {
      await (prisma.job as any).updateMany({
        where: { id: { in: staleJobs.map((job: { id: string }) => job.id) } },
        data: {
          isActive: false,
          syncStatus: "stale",
          expiresAt: result.syncTime,
        },
      });
    }

    return NextResponse.json({
      ok: true,
      imported: result.jobs.length,
      deactivated: staleJobs.length,
      requestCount: result.requestCount,
      requestStats: result.requestStats,
      syncedAt: result.syncTime.toISOString(),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to sync Jooble jobs." }, { status: 500 });
  }
}
