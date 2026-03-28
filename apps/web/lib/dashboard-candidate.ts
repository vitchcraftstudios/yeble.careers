import { prisma } from "@/lib/prisma";

type CandidateIdentity = {
  userId: string;
  email: string;
  name: string;
};

export async function resolveCandidate(identity: CandidateIdentity) {
  const normalizedEmail = identity.email.trim().toLowerCase();
  const normalizedName = identity.name.trim() || normalizedEmail;

  const byClerk = await prisma.candidate.findUnique({
    where: { clerkUserId: identity.userId },
  }).catch(() => null);

  if (byClerk) {
    return prisma.candidate.update({
      where: { id: byClerk.id },
      data: {
        clerkUserId: identity.userId,
        email: normalizedEmail,
        name: normalizedName,
      },
    });
  }

  const byEmail = await prisma.candidate.findUnique({
    where: { email: normalizedEmail },
  }).catch(() => null);

  if (byEmail) {
    return prisma.candidate.update({
      where: { id: byEmail.id },
      data: {
        clerkUserId: identity.userId,
        email: normalizedEmail,
        name: byEmail.name || normalizedName,
      },
    });
  }

  return prisma.candidate.create({
    data: {
      clerkUserId: identity.userId,
      email: normalizedEmail,
      name: normalizedName,
    },
  });
}
