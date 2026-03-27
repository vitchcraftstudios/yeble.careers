import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

async function getCandidate() {
  const { userId } = await auth();
  if (!userId) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
  if (!email) return { error: NextResponse.json({ error: "Missing account email" }, { status: 400 }) };

  const existing = await prisma.candidate.findFirst({
    where: {
      OR: [{ email }, { clerkUserId: userId }],
    },
  });

  const candidate = existing
    ? await prisma.candidate.update({
        where: { id: existing.id },
        data: { clerkUserId: userId, email, name: user?.fullName || email },
      })
    : await prisma.candidate.create({
        data: { clerkUserId: userId, email, name: user?.fullName || email },
      });

  return { candidate };
}

export async function POST(req: Request) {
  const result = await getCandidate();
  if ("error" in result) return result.error;

  try {
    const body = await req.json();
    if (!body.name || !body.url) {
      return NextResponse.json({ error: "Missing file details" }, { status: 400 });
    }

    const file = await prisma.registrantFile.create({
      data: {
        candidateId: result.candidate.id,
        name: body.name,
        url: body.url,
        type: body.type ?? null,
      },
    });

    return NextResponse.json({ file: { ...file, createdAt: file.createdAt.toISOString() } }, { status: 201 });
  } catch (error) {
    console.error("Dashboard file save error", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to save file" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const result = await getCandidate();
  if ("error" in result) return result.error;

  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing file id" }, { status: 400 });
  }

  try {
    await prisma.registrantFile.deleteMany({
      where: { id, candidateId: result.candidate.id },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Dashboard file delete error", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to delete file" },
      { status: 500 },
    );
  }
}
