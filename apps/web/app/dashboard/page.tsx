import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { RegistrantDashboardClient } from "@/components/dashboard/registrant-dashboard-client";
import { DashboardSignOutButton } from "@/components/dashboard/dashboard-sign-out-button";
import { DashboardHomeLink } from "@/components/dashboard/dashboard-home-link";
import { isAdminUser } from "@/lib/clerk-access";

type SearchParams = {
  applied?: string;
  applyJobId?: string;
};

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M4 7.5h16v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5v-9Z" />
      <path d="m5 8 7 5 7-5" />
    </svg>
  );
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { userId } = await auth();
  if (!userId) redirect("/signin?callbackUrl=/dashboard");

  const user = await currentUser();
  if (!user) redirect("/signin?callbackUrl=/dashboard");
  const emails = (user?.emailAddresses || []).map((address) => address.emailAddress || "");
  const email = user?.primaryEmailAddress?.emailAddress || emails[0] || "";
  if (!email) redirect("/signin?callbackUrl=/dashboard");

  if (await isAdminUser(emails)) {
    redirect("/admin");
  }

  const [candidate, pendingJob] = await Promise.all([
    prisma.candidate
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
      .catch(() => null),
    params?.applyJobId
      ? prisma.job
          .findUnique({
            where: { id: params.applyJobId },
            select: { id: true, title: true, company: true },
          })
          .catch(() => null)
      : Promise.resolve(null),
  ]);

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
    <div className="min-h-screen overflow-x-hidden bg-[#fffef0] text-[#0f2918]">
      <div className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.3em] text-[#2d6a3e]">Registrant Dashboard</p>
            <h1 className="mt-2 break-words text-3xl font-semibold text-[#123622]">Profile, files, and application records</h1>
            <p className="mt-2 max-w-2xl break-words text-sm leading-7 text-[#31513c]">
              Keep your profile updated, upload documents, and track the registration and application records linked to your account.
            </p>
          </div>
          <div className="flex min-w-0 flex-col items-start gap-3 sm:items-end">
            <div className="flex w-full items-center gap-2 sm:w-auto sm:justify-end">
              <div className="flex min-w-0 items-center gap-2 rounded-full border border-[#d6d1c1] bg-white px-3 py-2 text-sm text-[#31513c] sm:max-w-[260px]">
                <MailIcon />
                <span className="min-w-0 truncate">{email}</span>
              </div>
              <DashboardHomeLink />
              <DashboardSignOutButton />
            </div>
          </div>
        </div>

        {params?.applied ? (
          <div className="mb-6 rounded-2xl border border-[#b9e3c8] bg-[#e8f7ee] px-4 py-3 text-sm text-[#1f5c36]">
            Your application was recorded successfully.
          </div>
        ) : null}

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
          pendingApplicationJob={pendingJob}
        />
      </div>
    </div>
  );
}
