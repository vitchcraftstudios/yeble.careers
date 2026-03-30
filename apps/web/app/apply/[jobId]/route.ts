import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveCandidate } from "@/lib/dashboard-candidate";

const APPLY_REDIRECT_COOKIE = "yeble_apply_callback";

type RouteContext = {
  params: Promise<{
    jobId: string;
  }>;
};

function buildRedirectResponse(request: Request, pathname: string) {
  return NextResponse.redirect(new URL(pathname, request.url));
}

function attachPendingApplyCookie(response: NextResponse, callbackUrl: string) {
  response.cookies.set(APPLY_REDIRECT_COOKIE, callbackUrl, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 20,
  });
}

function clearPendingApplyCookie(response: NextResponse) {
  response.cookies.set(APPLY_REDIRECT_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}

export async function GET(request: Request, context: RouteContext) {
  const { jobId } = await context.params;
  const callbackUrl = `/apply/${jobId}`;

  const { userId } = await auth();
  if (!userId) {
    const response = buildRedirectResponse(request, `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    attachPendingApplyCookie(response, callbackUrl);
    return response;
  }

  const user = await currentUser();
  const emails = (user?.emailAddresses || []).map((address) => address.emailAddress || "");
  const email = user?.primaryEmailAddress?.emailAddress || emails[0] || "";
  const name = user?.fullName || "";

  if (!user || !email) {
    const response = buildRedirectResponse(request, `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    attachPendingApplyCookie(response, callbackUrl);
    return response;
  }

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    select: { id: true },
  });

  if (!job) {
    const response = buildRedirectResponse(request, "/jobs?apply=unavailable");
    clearPendingApplyCookie(response);
    return response;
  }

  const candidate = await resolveCandidate({
    userId,
    email,
    name,
  });

  const existingApplication = await prisma.application.findFirst({
    where: {
      jobId,
      candidateId: candidate.id,
    },
    select: { id: true },
  });

  if (existingApplication) {
    const response = buildRedirectResponse(request, `/dashboard?applied=${encodeURIComponent(jobId)}`);
    clearPendingApplyCookie(response);
    return response;
  }

  const response = buildRedirectResponse(request, `/dashboard?applyJobId=${encodeURIComponent(jobId)}`);
  clearPendingApplyCookie(response);
  return response;
}
