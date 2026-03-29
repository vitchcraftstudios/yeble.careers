import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { AdminDashboardClient } from "@/components/dashboard/admin-dashboard-client";
import { DashboardSignOutButton } from "@/components/dashboard/dashboard-sign-out-button";
import { DashboardHomeLink } from "@/components/dashboard/dashboard-home-link";
import { isAdminUser } from "@/lib/clerk-access";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M4 7.5h16v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5v-9Z" />
      <path d="m5 8 7 5 7-5" />
    </svg>
  );
}

const defaultContent = [
  {
    id: "home-hero",
    title: "Homepage Hero",
    body: "Connecting innovative companies with the talent that drives excellence and growth.",
    mediaUrl: null,
  },
  {
    id: "services-summary",
    title: "Services Summary",
    body: "Practical hiring support across sectors we can genuinely serve well.",
    mediaUrl: null,
  },
  {
    id: "contact-summary",
    title: "Contact Summary",
    body: "Connect with our hiring desk for mandates, enquiries, and regional hiring coordination.",
    mediaUrl: null,
  },
];

export default async function AdminPage() {
  const { userId } = await auth();
  if (!userId) redirect("/signin?callbackUrl=/admin");

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress || "";
  const role = user?.publicMetadata?.role;

  if (!(await isAdminUser(email, role))) {
    redirect("/dashboard");
  }

  const [jobs, registrants, content] = await Promise.all([
    prisma.job.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []),
    prisma.candidate
      .findMany({
        orderBy: { createdAt: "desc" },
        include: { files: true, applications: true },
      })
      .catch(() => []),
    prisma.siteContent.findMany({ orderBy: { id: "asc" } }).catch(() => []),
  ]);

  const seededContent = content.length ? content : defaultContent.map((item) => ({ ...item, updatedAt: new Date() }));

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fffef0] text-[#0f2918]">
      <div className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.3em] text-[#2d6a3e]">Admin Dashboard</p>
            <h1 className="mt-2 break-words text-3xl font-semibold text-[#123622]">Jobs, registrants, and site content</h1>
            <p className="mt-2 max-w-2xl break-words text-sm leading-7 text-[#31513c]">
              Manage live mandates, monitor registrants and payments, and update key public-site content from one place.
            </p>
          </div>
          <div className="flex min-w-0 flex-col items-start gap-3 sm:items-end">
            <div className="flex w-full items-center gap-2 sm:w-auto sm:justify-end">
              <div className="flex min-w-0 items-center gap-2 rounded-full border border-[#d6d1c1] bg-white px-3 py-2 text-sm text-[#31513c] sm:max-w-[260px]">
                <MailIcon />
                <span className="min-w-0 truncate">{email || "Admin"}</span>
              </div>
              <DashboardHomeLink />
              <DashboardSignOutButton />
            </div>
          </div>
        </div>

        <AdminDashboardClient
          initialJobs={jobs.map((job) => ({ ...job, createdAt: job.createdAt.toISOString() }))}
          initialRegistrants={registrants.map((candidate) => ({
            id: candidate.id,
            name: candidate.name,
            email: candidate.email,
            phone: candidate.phone,
            currentCity: candidate.currentCity,
            experienceLevel: candidate.experienceLevel,
            serviceInterest: candidate.serviceInterest,
            paymentStatus: candidate.paymentStatus,
            latestPaymentReference: candidate.latestPaymentReference,
            filesCount: candidate.files.length,
            applicationsCount: candidate.applications.length,
            createdAt: candidate.createdAt.toISOString(),
          }))}
          initialContent={seededContent.map((item) => ({
            id: item.id,
            title: item.title,
            body: item.body,
            mediaUrl: item.mediaUrl,
            updatedAt: item.updatedAt.toISOString(),
          }))}
        />
      </div>
    </div>
  );
}
