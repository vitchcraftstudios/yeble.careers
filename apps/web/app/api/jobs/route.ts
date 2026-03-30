import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/clerk-access";
import { normalizeOptionalText, normalizeText, normalizeTextArray } from "@/lib/text-normalize";

export async function GET() {
  const auth = await isAdminRequest();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const jobs = await (prisma.job as any).findMany({
    orderBy: [
      { isVerified: "desc" },
      { isImported: "asc" },
      { createdAt: "desc" },
    ],
    take: 250,
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

    const job = await (prisma.job as any).create({
      data: {
        title: normalizeText(title),
        company: normalizeText(company),
        sector: normalizeOptionalText(sector),
        city: normalizeOptionalText(city),
        locationType: normalizeText(locationType ?? "On-site"),
        experience: normalizeOptionalText(experience),
        salaryRange: normalizeOptionalText(salaryRange),
        type: normalizeText(type ?? "Full-time"),
        openings: Number(openings || 1),
        status: normalizeText(status ?? "Open"),
        location: normalizeText(location),
        description: normalizeText(description),
        salary: normalizeOptionalText(salary),
        tags: normalizeTextArray(Array.isArray(tags) ? tags : []),
        source: "manual",
        isImported: false,
        isVerified: true,
        isActive: true,
        syncStatus: "manual",
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create job" }, { status: 500 });
  }
}
