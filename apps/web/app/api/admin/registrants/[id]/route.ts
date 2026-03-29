import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/clerk-access";
import { normalizeOptionalText, normalizeText } from "@/lib/text-normalize";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await isAdminRequest();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    const { id } = await params;
    const body = await req.json();

    const candidate = await prisma.candidate.update({
      where: { id },
      data: {
        name: normalizeText(body.name),
        email: normalizeText(body.email).toLowerCase(),
        phone: normalizeOptionalText(body.phone),
        currentCity: normalizeOptionalText(body.currentCity),
        headline: normalizeOptionalText(body.headline),
        experienceLevel: normalizeOptionalText(body.experienceLevel),
        serviceInterest: normalizeOptionalText(body.serviceInterest),
        linkedin: normalizeOptionalText(body.linkedin),
        resumeUrl: normalizeOptionalText(body.resumeUrl),
        note: normalizeOptionalText(body.note),
        paymentStatus: body.paymentStatus || undefined,
        latestPaymentReference: normalizeOptionalText(body.latestPaymentReference),
      },
      include: {
        files: { orderBy: { createdAt: "desc" } },
        applications: {
          orderBy: { createdAt: "desc" },
          include: { job: true },
        },
        payments: { orderBy: { createdAt: "desc" } },
      },
    });

    return NextResponse.json({
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
        name: normalizeText(file.name),
        url: file.url,
        type: file.type,
        createdAt: file.createdAt.toISOString(),
      })),
      applications: candidate.applications.map((application) => ({
        id: application.id,
        status: normalizeText(application.status),
        note: normalizeOptionalText(application.note),
        createdAt: application.createdAt.toISOString(),
        jobTitle: normalizeText(application.job.title),
        company: normalizeText(application.job.company),
      })),
      payments: candidate.payments.map((payment) => ({
        id: payment.id,
        provider: payment.provider,
        status: normalizeText(payment.status),
        amount: payment.amount,
        currency: payment.currency,
        label: normalizeOptionalText(payment.label),
        reference: normalizeOptionalText(payment.reference),
        createdAt: payment.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to update registrant profile" }, { status: 500 });
  }
}