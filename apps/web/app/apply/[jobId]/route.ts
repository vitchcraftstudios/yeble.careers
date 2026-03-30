import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { resolveCandidate } from "@/lib/dashboard-candidate";

type RouteContext = {
  params: Promise<{
    jobId: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { jobId } = await context.params;
  const callbackUrl = `/apply/${jobId}`;

  const { userId } = await auth();
  if (!userId) {
    redirect(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  const user = await currentUser();
  const emails = (user?.emailAddresses || []).map((address) => address.emailAddress || "");
  const email = user?.primaryEmailAddress?.emailAddress || emails[0] || "";
  const name = user?.fullName || "";

  if (!user || !email) {
    redirect(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    select: { id: true },
  });

  if (!job) {
    redirect("/jobs?apply=unavailable");
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
    redirect(`/dashboard?applied=${encodeURIComponent(jobId)}`);
  }

  redirect(`/dashboard?applyJobId=${encodeURIComponent(jobId)}`);
}
