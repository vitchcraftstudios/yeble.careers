import { auth, currentUser } from "@clerk/nextjs/server";

function normalizeEmail(value: string | null | undefined) {
  return value?.trim().toLowerCase() || "";
}

function getAdminEmail() {
  return normalizeEmail(process.env.ADMIN_EMAIL || "vitchcraft14@gmail.com");
}

function getUserEmails(user: Awaited<ReturnType<typeof currentUser>>) {
  return Array.from(
    new Set(
      (user?.emailAddresses || [])
        .map((address) => normalizeEmail(address.emailAddress))
        .filter(Boolean),
    ),
  );
}

export async function isAdminRequest() {
  const { userId } = await auth();
  if (!userId) {
    return { ok: false as const, status: 401, error: "Unauthorized" };
  }

  const user = await currentUser();
  const emails = getUserEmails(user);
  const adminEmail = getAdminEmail();
  const email = emails.find((value) => value === adminEmail) || emails[0] || "";

  if (!email || email !== adminEmail) {
    return { ok: false as const, status: 403, error: "Forbidden" };
  }

  return { ok: true as const, email };
}

export async function isAdminUser(email: string | string[]) {
  const emails = Array.isArray(email) ? email : [email];
  const normalizedEmails = emails.map((value) => normalizeEmail(value)).filter(Boolean);
  return normalizedEmails.includes(getAdminEmail());
}