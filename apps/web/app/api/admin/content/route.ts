import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

async function ensureAdmin() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress || "";
  const role = user?.publicMetadata?.role;
  const adminEmail = process.env.ADMIN_EMAIL || "admin@yeble.careers";

  if (role !== "ADMIN" && email.toLowerCase() !== adminEmail.toLowerCase()) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}

export async function GET() {
  const authError = await ensureAdmin();
  if (authError) return authError;

  const items = await prisma.siteContent.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json(items);
}

export async function PATCH(req: Request) {
  const authError = await ensureAdmin();
  if (authError) return authError;

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
