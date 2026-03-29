import { auth, currentUser } from "@clerk/nextjs/server";

function getAdminEmail() {
  return (process.env.ADMIN_EMAIL || "vitchcraft14@gmail.com").trim().toLowerCase();
}

export async function isAdminRequest() {
  const { userId } = await auth();
  if (!userId) {
    return { ok: false as const, status: 401, error: "Unauthorized" };
  }

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase() || "";

  if (!email || email !== getAdminEmail()) {
    return { ok: false as const, status: 403, error: "Forbidden" };
  }

  return { ok: true as const, email };
}

export async function isAdminUser(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  return Boolean(normalizedEmail) && normalizedEmail === getAdminEmail();
}
