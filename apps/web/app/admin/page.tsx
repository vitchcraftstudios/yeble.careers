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
    id: "home-hero-title",
    title: "Home - Hero Title",
    body: "Powering Companies With Talent That Drives Real Growth.",
    mediaUrl: null,
  },
  {
    id: "home-hero-summary",
    title: "Home - Hero Summary",
    body: "Founded in 2026 from Selaqui, Dehradun, Yeble works across Uttarakhand, Uttar Pradesh, Haryana, and Himachal Pradesh with practical hiring support, tighter follow-up, and clearer communication.",
    mediaUrl: null,
  },
  {
    id: "home-testimonials-heading",
    title: "Home - Testimonials Heading",
    body: "What people say about working with Yeble",
    mediaUrl: null,
  },
  {
    id: "services-page-intro",
    title: "Services - Intro",
    body: "Strategic Talent Solutions Rooted in Regional Insight, Built for Professional Growth.",
    mediaUrl: null,
  },
  {
    id: "services-page-media",
    title: "Services - Hero Media",
    body: "Primary supporting media for the services page.",
    mediaUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "jobs-page-intro",
    title: "Jobs - Intro",
    body: "Explore active roles across the North India hiring corridor.",
    mediaUrl: null,
  },
  {
    id: "about-page-summary",
    title: "About - Summary",
    body: "A Dehradun-led hiring team focused on practical support, regional understanding, and dependable communication.",
    mediaUrl: null,
  },
  {
    id: "contact-page-summary",
    title: "Contact - Summary",
    body: "Connect with our hiring desk for mandates, enquiries, and regional hiring coordination.",
    mediaUrl: null,
  },
];

export default async function AdminPage() {
  const { userId } = await auth();
  if (!userId) redirect("/signin?callbackUrl=/admin");

  const user = await currentUser();
  const emails = (user?.emailAddresses || []).map((address) => address.emailAddress || "");
  const email = user?.primaryEmailAddress?.emailAddress || emails[0] || "";

  if (!(await isAdminUser(emails))) {
    redirect("/dashboard");
  }

  const [jobs, registrants, content] = await Promise.all([
    prisma.job.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []),
    prisma.candidate
      .findMany({
        orderBy: { createdAt: "desc" },
        include: {
          files: { orderBy: { createdAt: "desc" } },
          applications: {
            orderBy: { createdAt: "desc" },
            include: { job: true },
          },
          payments: { orderBy: { createdAt: "desc" } },
        },
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
            <p className="text-xs uppercase tracking-[0.3em] text-[#2d6a3e]">Admin CMS</p>
            <h1 className="mt-2 break-words text-3xl font-semibold text-[#123622]">Content, jobs, and registrations</h1>
            <p className="mt-2 max-w-2xl break-words text-sm leading-7 text-[#31513c]">
              Run the site from one workspace: publish jobs, manage registrant profiles, review files and payments, and maintain editable page content blocks.
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
            headline: candidate.headline,
            experienceLevel: candidate.experienceLevel,
            serviceInterest: candidate.serviceInterest,
            linkedin: candidate.linkedin,
            resumeUrl: candidate.resumeUrl,
            note: candidate.note,
            paymentStatus: candidate.paymentStatus,
            latestPaymentReference: candidate.latestPaymentReference,
            filesCount: candidate.files.length,
            applicationsCount: candidate.applications.length,
            createdAt: candidate.createdAt.toISOString(),
            updatedAt: candidate.updatedAt.toISOString(),
            files: candidate.files.map((file) => ({
              id: file.id,
              name: file.name,
              url: file.url,
              type: file.type,
              createdAt: file.createdAt.toISOString(),
            })),
            applications: candidate.applications.map((application) => ({
              id: application.id,
              status: application.status,
              note: application.note,
              createdAt: application.createdAt.toISOString(),
              jobTitle: application.job.title,
              company: application.job.company,
            })),
            payments: candidate.payments.map((payment) => ({
              id: payment.id,
              provider: payment.provider,
              status: payment.status,
              amount: payment.amount,
              currency: payment.currency,
              label: payment.label,
              reference: payment.reference,
              createdAt: payment.createdAt.toISOString(),
            })),
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
