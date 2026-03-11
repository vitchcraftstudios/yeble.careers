import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { jobId, name, email, headline, linkedin, resumeUrl, note } = body;

    if (!jobId || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const candidate = await prisma.candidate.upsert({
      where: { email },
      update: { name, headline, linkedin, resumeUrl },
      create: { name, email, headline, linkedin, resumeUrl },
    });

    const application = await prisma.application.create({
      data: {
        jobId,
        candidateId: candidate.id,
        note: note ?? null,
      },
      include: {
        job: true,
        candidate: true,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to submit application" }, { status: 500 });
  }
}
