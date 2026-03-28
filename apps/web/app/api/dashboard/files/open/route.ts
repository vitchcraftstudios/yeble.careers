import { head } from "@vercel/blob";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

async function getCandidate() {
  const { userId } = await auth();
  if (!userId) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
  if (!email) return { error: NextResponse.json({ error: "Missing account email" }, { status: 400 }) };

  try {
    const candidate = await prisma.candidate.findFirst({
      where: {
        OR: [{ email }, { clerkUserId: userId }],
      },
    });

    if (!candidate) {
      return { error: NextResponse.json({ error: "Profile not found" }, { status: 404 }) };
    }

    return { candidate };
  } catch (error) {
    console.error("Dashboard file open candidate lookup error", error);
    return {
      error: NextResponse.json(
        { error: "We could not connect to your profile data right now. Please try again in a moment." },
        { status: 500 },
      ),
    };
  }
}

export async function GET(req: Request) {
  const result = await getCandidate();
  if ("error" in result) return result.error;

  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing file id" }, { status: 400 });
  }

  try {
    const file = await prisma.registrantFile.findFirst({
      where: { id, candidateId: result.candidate.id },
    });

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: "Missing BLOB_READ_WRITE_TOKEN" }, { status: 500 });
    }

    const blob = await head(file.url, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.redirect(blob.downloadUrl, {
      headers: {
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("Dashboard file open error", error);
    return NextResponse.json(
      { error: "We could not open this file right now. Please try again in a moment." },
      { status: 500 },
    );
  }
}
