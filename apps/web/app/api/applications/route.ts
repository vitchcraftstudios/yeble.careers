import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { resolveCandidate } from "@/lib/dashboard-candidate";
import { getMissingCandidateProfileFields } from "@/lib/candidate-profile";

const resendApiKey = process.env.RESEND_API_KEY;
const mailFrom = process.env.MAIL_FROM;
const mailTo = process.env.MAIL_TO || "growth@yeble.careers";
const resend = resendApiKey && mailFrom ? new Resend(resendApiKey) : null;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildApplicationSnapshot(candidate: {
  phone: string | null;
  currentCity: string | null;
  headline: string | null;
  experienceLevel: string | null;
  serviceInterest: string | null;
  linkedin: string | null;
  resumeUrl: string | null;
  note: string | null;
  files: { id: string; name: string; type: string | null; url: string }[];
}, applicantNote: string | null) {
  const lines = [
    `Phone: ${candidate.phone || "Not provided"}`,
    `Current city: ${candidate.currentCity || "Not provided"}`,
    `Headline: ${candidate.headline || "Not provided"}`,
    `Experience level: ${candidate.experienceLevel || "Not provided"}`,
    `Service interest: ${candidate.serviceInterest || "Not provided"}`,
    `LinkedIn: ${candidate.linkedin || "Not provided"}`,
    `Primary resume: ${candidate.resumeUrl || "Not provided"}`,
    `Uploaded documents: ${candidate.files.length ? candidate.files.map((file) => `${file.name}${file.type ? ` (${file.type})` : ""}`).join(", ") : "None"}`,
    `Profile note: ${candidate.note || "Not provided"}`,
  ];

  if (applicantNote) {
    lines.push(`Application note: ${applicantNote}`);
  }

  return lines.join("\n");
}

async function notifyNewApplication(args: {
  baseUrl: string;
  candidate: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    currentCity: string | null;
    headline: string | null;
    experienceLevel: string | null;
    serviceInterest: string | null;
    linkedin: string | null;
    resumeUrl: string | null;
    note: string | null;
    files: { id: string; name: string; type: string | null; url: string }[];
  };
  job: {
    title: string;
    company: string;
    id: string;
  };
  applicantNote: string | null;
}) {
  if (!resend || !mailFrom) return;

  const adminRegistrantUrl = `${args.baseUrl}/admin?section=registrants&registrantId=${encodeURIComponent(args.candidate.id)}`;
  const primaryResumeFile = args.candidate.files.find((file) => file.url === args.candidate.resumeUrl) || args.candidate.files[0] || null;
  const primaryResumeReference = primaryResumeFile
    ? `${args.baseUrl}/api/admin/files/open?id=${encodeURIComponent(primaryResumeFile.id)}`
    : args.candidate.resumeUrl || "Not provided";

  const text = [
    "New application received",
    `Job: ${args.job.title}`,
    `Company: ${args.job.company}`,
    `Job ID: ${args.job.id}`,
    `Candidate: ${args.candidate.name}`,
    `Email: ${args.candidate.email}`,
    `Phone: ${args.candidate.phone || "Not provided"}`,
    `Current city: ${args.candidate.currentCity || "Not provided"}`,
    `Headline: ${args.candidate.headline || "Not provided"}`,
    `Experience level: ${args.candidate.experienceLevel || "Not provided"}`,
    `Service interest: ${args.candidate.serviceInterest || "Not provided"}`,
    `LinkedIn: ${args.candidate.linkedin || "Not provided"}`,
    `Primary resume: ${primaryResumeReference}`,
    `Admin review: ${adminRegistrantUrl}`,
    `Uploaded documents: ${args.candidate.files.length ? args.candidate.files.map((file) => `${file.name}: ${args.baseUrl}/api/admin/files/open?id=${encodeURIComponent(file.id)}`).join(", ") : "None"}`,
    `Profile note: ${args.candidate.note || "Not provided"}`,
    `Application note: ${args.applicantNote || "Not provided"}`,
  ].join("\n");

  const safeFiles = args.candidate.files.length
    ? args.candidate.files
        .map(
          (file) =>
            `<li><a href="${escapeHtml(`${args.baseUrl}/api/admin/files/open?id=${encodeURIComponent(file.id)}`)}">${escapeHtml(file.name)}</a>${file.type ? ` <span style="color:#56705d;">(${escapeHtml(file.type)})</span>` : ""}</li>`,
        )
        .join("")
    : "<li>No supporting documents uploaded.</li>";

  await resend.emails.send({
    from: mailFrom,
    to: [mailTo],
    replyTo: args.candidate.email,
    subject: `New application: ${args.job.title} - ${args.candidate.name}`,
    text,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #123622; line-height: 1.6;">
        <h2 style="margin: 0 0 16px;">New application received</h2>
        <p style="margin: 0 0 8px;"><strong>Job:</strong> ${escapeHtml(args.job.title)}</p>
        <p style="margin: 0 0 8px;"><strong>Company:</strong> ${escapeHtml(args.job.company)}</p>
        <p style="margin: 0 0 8px;"><strong>Job ID:</strong> ${escapeHtml(args.job.id)}</p>
        <p style="margin: 16px 0 8px;"><strong>Candidate:</strong> ${escapeHtml(args.candidate.name)}</p>
        <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(args.candidate.email)}</p>
        <p style="margin: 0 0 8px;"><strong>Phone:</strong> ${escapeHtml(args.candidate.phone || "Not provided")}</p>
        <p style="margin: 0 0 8px;"><strong>Current city:</strong> ${escapeHtml(args.candidate.currentCity || "Not provided")}</p>
        <p style="margin: 0 0 8px;"><strong>Headline:</strong> ${escapeHtml(args.candidate.headline || "Not provided")}</p>
        <p style="margin: 0 0 8px;"><strong>Experience level:</strong> ${escapeHtml(args.candidate.experienceLevel || "Not provided")}</p>
        <p style="margin: 0 0 8px;"><strong>Service interest:</strong> ${escapeHtml(args.candidate.serviceInterest || "Not provided")}</p>
        <p style="margin: 0 0 8px;"><strong>LinkedIn:</strong> ${args.candidate.linkedin ? `<a href="${escapeHtml(args.candidate.linkedin)}">${escapeHtml(args.candidate.linkedin)}</a>` : "Not provided"}</p>
        <p style="margin: 0 0 8px;"><strong>Primary resume:</strong> ${primaryResumeReference === "Not provided" ? "Not provided" : `<a href="${escapeHtml(primaryResumeReference)}">Open resume</a>`}</p>
        <p style="margin: 0 0 8px;"><strong>Admin review:</strong> <a href="${escapeHtml(adminRegistrantUrl)}">Open candidate in admin</a></p>
        <p style="margin: 16px 0 8px;"><strong>Uploaded documents</strong></p>
        <ul style="margin: 0 0 16px 18px; padding: 0;">${safeFiles}</ul>
        <p style="margin: 16px 0 8px;"><strong>Profile note</strong></p>
        <div style="padding: 12px 16px; border: 1px solid #e3decf; border-radius: 12px; background: #fffef7; margin-bottom: 16px;">
          ${escapeHtml(args.candidate.note || "Not provided").replaceAll("\n", "<br />")}
        </div>
        <p style="margin: 16px 0 8px;"><strong>Application note</strong></p>
        <div style="padding: 12px 16px; border: 1px solid #e3decf; border-radius: 12px; background: #fffef7;">
          ${escapeHtml(args.applicantNote || "Not provided").replaceAll("\n", "<br />")}
        </div>
      </div>
    `,
  });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
    if (!email) {
      return NextResponse.json({ error: "Missing account email" }, { status: 400 });
    }

    const body = await req.json();
    const baseUrl = new URL(req.url).origin;
    const jobId = (body.jobId || "").trim();
    const applicantNote = (body.note || "").trim() || null;

    if (!jobId) {
      return NextResponse.json({ error: "Missing job id" }, { status: 400 });
    }

    const candidate = await resolveCandidate({
      userId,
      email,
      name: user?.fullName || email,
    });

    const hydratedCandidate = await prisma.candidate.findUnique({
      where: { id: candidate.id },
      include: {
        files: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!hydratedCandidate) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const missingFields = getMissingCandidateProfileFields({
      name: hydratedCandidate.name,
      email: hydratedCandidate.email,
      phone: hydratedCandidate.phone,
      currentCity: hydratedCandidate.currentCity,
      headline: hydratedCandidate.headline,
      experienceLevel: hydratedCandidate.experienceLevel,
      resumeUrl: hydratedCandidate.resumeUrl,
    });

    if (missingFields.length) {
      return NextResponse.json({ error: `Complete your profile before applying. Missing: ${missingFields.join(", ")}.` }, { status: 400 });
    }

    if (!hydratedCandidate.files.length) {
      return NextResponse.json({ error: "Upload your resume or supporting document before applying." }, { status: 400 });
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: { id: true, title: true, company: true },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId,
        candidateId: hydratedCandidate.id,
      },
      include: {
        job: true,
      },
    });

    if (existingApplication) {
      return NextResponse.json({
        application: {
          id: existingApplication.id,
          status: existingApplication.status,
          note: existingApplication.note,
          createdAt: existingApplication.createdAt.toISOString(),
          jobTitle: existingApplication.job.title,
          company: existingApplication.job.company,
        },
        alreadyApplied: true,
      });
    }

    const snapshotNote = buildApplicationSnapshot(
      {
        phone: hydratedCandidate.phone,
        currentCity: hydratedCandidate.currentCity,
        headline: hydratedCandidate.headline,
        experienceLevel: hydratedCandidate.experienceLevel,
        serviceInterest: hydratedCandidate.serviceInterest,
        linkedin: hydratedCandidate.linkedin,
        resumeUrl: hydratedCandidate.resumeUrl,
        note: hydratedCandidate.note,
        files: hydratedCandidate.files.map((file) => ({ id: file.id, name: file.name, type: file.type, url: file.url })),
      },
      applicantNote,
    );

    const application = await prisma.application.create({
      data: {
        jobId,
        candidateId: hydratedCandidate.id,
        note: snapshotNote,
      },
      include: {
        job: true,
      },
    });

    try {
      await notifyNewApplication({
        baseUrl,
        candidate: {
          id: hydratedCandidate.id,
          name: hydratedCandidate.name,
          email: hydratedCandidate.email,
          phone: hydratedCandidate.phone,
          currentCity: hydratedCandidate.currentCity,
          headline: hydratedCandidate.headline,
          experienceLevel: hydratedCandidate.experienceLevel,
          serviceInterest: hydratedCandidate.serviceInterest,
          linkedin: hydratedCandidate.linkedin,
          resumeUrl: hydratedCandidate.resumeUrl,
          note: hydratedCandidate.note,
          files: hydratedCandidate.files.map((file) => ({ id: file.id, name: file.name, type: file.type, url: file.url })),
        },
        job,
        applicantNote,
      });
    } catch (mailError) {
      console.error("Application notification email error", mailError);
    }

    return NextResponse.json(
      {
        application: {
          id: application.id,
          status: application.status,
          note: application.note,
          createdAt: application.createdAt.toISOString(),
          jobTitle: application.job.title,
          company: application.job.company,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to submit application" }, { status: 500 });
  }
}
