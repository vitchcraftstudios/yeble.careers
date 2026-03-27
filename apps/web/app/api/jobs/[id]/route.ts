import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/clerk-access";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await isAdminRequest();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    const { id } = await params;
    const body = await req.json();
    const job = await prisma.job.update({
      where: { id },
      data: {
        title: body.title,
        company: body.company,
        sector: body.sector ?? null,
        city: body.city ?? null,
        locationType: body.locationType ?? null,
        experience: body.experience ?? null,
        salaryRange: body.salaryRange ?? null,
        type: body.type ?? null,
        openings: body.openings ? Number(body.openings) : undefined,
        status: body.status ?? null,
        location: body.location,
        description: body.description,
        salary: body.salary ?? null,
        tags: Array.isArray(body.tags) ? body.tags : undefined,
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
