import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/clerk-access";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await isAdminRequest();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    const { id } = await params;
    const body = await req.json();

    const candidate = await prisma.candidate.update({
      where: { id },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        currentCity: body.currentCity || null,
        headline: body.headline || null,
        experienceLevel: body.experienceLevel || null,
        serviceInterest: body.serviceInterest || null,
        linkedin: body.linkedin || null,
        resumeUrl: body.resumeUrl || null,
        note: body.note || null,
        paymentStatus: body.paymentStatus || undefined,
        latestPaymentReference: body.latestPaymentReference || null,
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
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to update registrant profile" }, { status: 500 });
  }
}
