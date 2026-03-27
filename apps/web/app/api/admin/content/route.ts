import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/clerk-access";

export async function GET() {
  const auth = await isAdminRequest();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const items = await prisma.siteContent.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json(items);
}

export async function PATCH(req: Request) {
  const auth = await isAdminRequest();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    const body = await req.json();
    if (!body.id || !body.title || !body.body) {
      return NextResponse.json({ error: "Missing content fields" }, { status: 400 });
    }

    const item = await prisma.siteContent.upsert({
      where: { id: body.id },
      update: {
        title: body.title,
        body: body.body,
        mediaUrl: body.mediaUrl || null,
      },
      create: {
        id: body.id,
        title: body.title,
        body: body.body,
        mediaUrl: body.mediaUrl || null,
      },
    });

    return NextResponse.json({ ...item, updatedAt: item.updatedAt.toISOString() });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to save content" }, { status: 500 });
  }
}
