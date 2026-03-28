import { prisma } from "@/lib/prisma";

type CandidateIdentity = {
  userId: string;
  email: string;
  name: string;
};

export async function resolveCandidate(identity: CandidateIdentity) {
  const normalizedEmail = identity.email.trim().toLowerCase();
  const normalizedName = identity.name.trim() || normalizedEmail;

  const [byClerk, byEmail] = await Promise.all([
    prisma.candidate.findUnique({ where: { clerkUserId: identity.userId } }).catch(() => null),
    prisma.candidate.findUnique({ where: { email: normalizedEmail } }).catch(() => null),
  ]);

  if (byClerk && byEmail && byClerk.id !== byEmail.id) {
    return byEmail;
  }

  if (byClerk) {
    if (byClerk.email !== normalizedEmail || byClerk.name !== normalizedName) {
      return prisma.candidate.update({
        where: { id: byClerk.id },
        data: {
          email: normalizedEmail,
          name: normalizedName,
        },
      });
    }

    return byClerk;
  }

  if (byEmail) {
    if (byEmail.clerkUserId !== identity.userId || byEmail.name !== normalizedName) {
      return prisma.candidate.update({
        where: { id: byEmail.id },
        data: {
          clerkUserId: identity.userId,
          name: byEmail.name || normalizedName,
        },
      });
    }

    return byEmail;
  }

  return prisma.candidate.create({
    data: {
      clerkUserId: identity.userId,
      email: normalizedEmail,
      name: normalizedName,
    },
  });
}
