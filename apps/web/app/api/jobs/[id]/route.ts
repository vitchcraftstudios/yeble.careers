import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/clerk-access";
import { normalizeOptionalText, normalizeText, normalizeTextArray } from "@/lib/text-normalize";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await isAdminRequest();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    const { id } = await params;
    const body = await req.json();
    const job = await (prisma.job as any).update({
      where: { id },
      data: {
        title: normalizeText(body.title),
        company: normalizeText(body.company),
        sector: normalizeOptionalText(body.sector),
        city: normalizeOptionalText(body.city),
        locationType: body.locationType ? normalizeText(body.locationType) : undefined,
        experience: normalizeOptionalText(body.experience),
        salaryRange: normalizeOptionalText(body.salaryRange),
        type: body.type ? normalizeText(body.type) : undefined,
        openings: body.openings ? Number(body.openings) : undefined,
        status: body.status ? normalizeText(body.status) : undefined,
        location: normalizeText(body.location),
        description: normalizeText(body.description),
        salary: normalizeOptionalText(body.salary),
        tags: Array.isArray(body.tags) ? normalizeTextArray(body.tags) : undefined,
        source: "manual",
        isImported: false,
        isVerified: true,
        isActive: body.isActive === false ? false : true,
        syncStatus: "manual",
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to update job" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await isAdminRequest();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    const { id } = await params;
    await prisma.job.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to delete job" }, { status: 500 });
  }
}
