import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

function getAdminEmails() {
  const configured = [
    process.env.ADMIN_EMAILS,
    process.env.ADMIN_EMAIL,
    "admin@yeble.careers",
    "vitchcraft14@gmail.com",
  ]
    .filter(Boolean)
    .flatMap((value) => (value as string).split(","))
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return Array.from(new Set(configured));
}

export async function isAdminRequest() {
  const { userId } = await auth();
  if (!userId) {
    return { ok: false as const, status: 401, error: "Unauthorized" };
  }

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase() || "";
  const role = user?.publicMetadata?.role;

  const dbUser = email
    ? await prisma.user.findUnique({ where: { email } }).catch(() => null)
    : null;

  if (role !== "ADMIN" && dbUser?.role !== "ADMIN" && !getAdminEmails().includes(email)) {
    return { ok: false as const, status: 403, error: "Forbidden" };
  }

  return { ok: true as const, email };
}

export async function isAdminUser(email: string, role: unknown) {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) return false;

  if (role === "ADMIN" || getAdminEmails().includes(normalizedEmail)) {
    return true;
  }

  const dbUser = await prisma.user.findUnique({ where: { email: normalizedEmail } }).catch(() => null);
  return dbUser?.role === "ADMIN";
}
