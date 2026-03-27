import { auth, currentUser } from "@clerk/nextjs/server";

export async function isAdminRequest() {
  const { userId } = await auth();
  if (!userId) {
    return { ok: false as const, status: 401, error: "Unauthorized" };
  }

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress || "";
  const role = user?.publicMetadata?.role;
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@yeble.careers").toLowerCase();

  if (role !== "ADMIN" && email.toLowerCase() !== adminEmail) {
    return { ok: false as const, status: 403, error: "Forbidden" };
  }

  return { ok: true as const, email: email.toLowerCase() };
}
