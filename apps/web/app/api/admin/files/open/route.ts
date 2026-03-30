import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/clerk-access";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const auth = await isAdminRequest();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing file id" }, { status: 400 });
  }

  try {
    const file = await prisma.registrantFile.findUnique({
      where: { id },
    });

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: "Missing BLOB_READ_WRITE_TOKEN" }, { status: 500 });
    }

    const blobResponse = await fetch(file.url, {
      headers: {
        Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!blobResponse.ok || !blobResponse.body) {
      return NextResponse.json({ error: "We could not open this file right now. Please try again in a moment." }, { status: blobResponse.status || 500 });
    }

    return new NextResponse(blobResponse.body, {
      status: 200,
      headers: {
        "Content-Type": blobResponse.headers.get("content-type") || file.type || "application/octet-stream",
        "Content-Disposition": blobResponse.headers.get("content-disposition") || `inline; filename="${file.name.replace(/"/g, "")}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Admin file open error", error);
    return NextResponse.json(
      { error: "We could not open this file right now. Please try again in a moment." },
      { status: 500 },
    );
  }
}
