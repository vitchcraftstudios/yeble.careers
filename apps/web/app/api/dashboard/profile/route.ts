import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
  if (!email) {
    return NextResponse.json({ error: "Missing account email" }, { status: 400 });
  }

  const candidate = await prisma.candidate.findUnique({ where: { email } });
  return NextResponse.json({ profile: candidate });
}

export async function PATCH(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
  if (!email) {
    return NextResponse.json({ error: "Missing account email" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const profile = await prisma.candidate.upsert({
      where: { email },
      update: {
        clerkUserId: userId,
        name: body.name || user?.fullName || email,
        phone: body.phone || null,
        currentCity: body.currentCity || null,
        headline: body.headline || null,
        experienceLevel: body.experienceLevel || null,
        serviceInterest: body.serviceInterest || null,
        linkedin: body.linkedin || null,
        resumeUrl: body.resumeUrl || null,
        note: body.note || null,
      },
      create: {
        clerkUserId: userId,
        email,
        name: body.name || user?.fullName || email,
        phone: body.phone || null,
        currentCity: body.currentCity || null,
        headline: body.headline || null,
        experienceLevel: body.experienceLevel || null,
        serviceInterest: body.serviceInterest || null,
        linkedin: body.linkedin || null,
        resumeUrl: body.resumeUrl || null,
        note: body.note || null,
      },
    });

    return NextResponse.json({
      profile: {
        name: profile.name,
        email: profile.email,
        phone: profile.phone || "",
        currentCity: profile.currentCity || "",
        headline: profile.headline || "",
        experienceLevel: profile.experienceLevel || "",
        serviceInterest: profile.serviceInterest || "",
        linkedin: profile.linkedin || "",
        resumeUrl: profile.resumeUrl || "",
        note: profile.note || "",
        paymentStatus: profile.paymentStatus,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to save profile" }, { status: 500 });
  }
}
