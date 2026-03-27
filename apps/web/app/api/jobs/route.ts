import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/clerk-access";

export async function GET() {
  const auth = await isAdminRequest();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  const auth = await isAdminRequest();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    const body = await req.json();
    const {
      title,
      company,
      sector,
      city,
      locationType,
      experience,
      salaryRange,
      type,
      openings,
      status,
      location,
      description,
      salary,
      tags,
    } = body;

    if (!title || !company || !location || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const job = await prisma.job.create({
      data: {
        title,
        company,
        sector: sector ?? null,
        city: city ?? null,
        locationType: locationType ?? "On-site",
        experience: experience ?? null,
        salaryRange: salaryRange ?? null,
        type: type ?? "Full-time",
        openings: Number(openings || 1),
        status: status ?? "Open",
        location,
        description,
        salary: salary ?? null,
        tags: Array.isArray(tags) ? tags : [],
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create job" }, { status: 500 });
  }
}
