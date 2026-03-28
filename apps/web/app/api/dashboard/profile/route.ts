import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { resolveCandidate } from "@/lib/dashboard-candidate";

async function getCurrentIdentity() {
  const { userId } = await auth();
  if (!userId) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
  if (!email) {
    return { error: NextResponse.json({ error: "Missing account email" }, { status: 400 }) };
  }

  return { userId, user, email };
}

function serializeProfile(profile: Awaited<ReturnType<typeof resolveCandidate>>) {
  return {
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
  };
}

export async function GET() {
  const identity = await getCurrentIdentity();
  if ("error" in identity) return identity.error;

  try {
    const candidate = await resolveCandidate({
      userId: identity.userId,
      email: identity.email,
      name: identity.user?.fullName || identity.email,
    });

    return NextResponse.json({ profile: serializeProfile(candidate) });
  } catch (error) {
    console.error("Dashboard profile fetch error", error);
    return NextResponse.json({ error: "Unable to load profile" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const identity = await getCurrentIdentity();
  if ("error" in identity) return identity.error;

  try {
    const body = await req.json();
    const candidate = await resolveCandidate({
      userId: identity.userId,
      email: identity.email,
      name: body.name || identity.user?.fullName || identity.email,
    });

    const profile = await prisma.candidate.update({
      where: { id: candidate.id },
      data: {
        email: identity.email,
        name: body.name || identity.user?.fullName || identity.email,
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

    return NextResponse.json({ profile: serializeProfile(profile) });
  } catch (error) {
    console.error("Dashboard profile save error", error);
    return NextResponse.json(
      { error: "We could not save your profile right now. Please try again in a moment." },
      { status: 500 },
    );
  }
}
