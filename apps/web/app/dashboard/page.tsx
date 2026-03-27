import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { RegistrantDashboardClient } from "@/components/dashboard/registrant-dashboard-client";
import { DashboardSignOutButton } from "@/components/dashboard/dashboard-sign-out-button";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/signin?callbackUrl=/dashboard");

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;
  if (!email) redirect("/signin?callbackUrl=/dashboard");

  const candidate = await prisma.candidate
    .findUnique({
      where: { email: email.toLowerCase() },
      include: {
        files: { orderBy: { createdAt: "desc" } },
        payments: { orderBy: { createdAt: "desc" } },
        applications: {
          orderBy: { createdAt: "desc" },
          include: { job: true },
        },
      },
    })
    .catch(() => null);

  const profile = {
    name: candidate?.name || user.fullName || "",
    email: email.toLowerCase(),
    phone: candidate?.phone || user.phoneNumbers?.[0]?.phoneNumber || "",
    currentCity: candidate?.currentCity || "",
    headline: candidate?.headline || "",
    experienceLevel: candidate?.experienceLevel || "",
    serviceInterest: candidate?.serviceInterest || "",
    linkedin: candidate?.linkedin || "",
    resumeUrl: candidate?.resumeUrl || "",
    note: candidate?.note || "",
    paymentStatus: candidate?.paymentStatus || "pending",
  };

  return (
    <div className="min-h-screen bg-[#fffef0] text-[#0f2918]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#2d6a3e]">Registrant Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#123622]">Profile, files, and payment status</h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[#31513c]">
              Keep your profile updated, upload documents, and track the registration and application records linked to your account.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <div className="rounded-full border border-[#d6d1c1] bg-white px-4 py-2 text-sm text-[#31513c]">{email}</div>
            <DashboardSignOutButton />
          </div>
        </div>

        <RegistrantDashboardClient
          initialProfile={profile}
          files={(candidate?.files || []).map((file) => ({ ...file, createdAt: file.createdAt.toISOString() }))}
          payments={(candidate?.payments || []).map((payment) => ({
            ...payment,
            label: payment.label,
            reference: payment.reference,
            createdAt: payment.createdAt.toISOString(),
          }))}
          applications={(candidate?.applications || []).map((application) => ({
            id: application.id,
            status: application.status,
            note: application.note,
            createdAt: application.createdAt.toISOString(),
            jobTitle: application.job.title,
            company: application.job.company,
          }))}
        />
      </div>
    </div>
  );
}
