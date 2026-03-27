import crypto from "crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { paymentAmount, paymentCurrency, paymentLabel } from "@/lib/payments";

const resendApiKey = process.env.RESEND_API_KEY;
const mailFrom = process.env.MAIL_FROM;
const mailTo = process.env.MAIL_TO;
const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(req: Request) {
  try {
    if (!resend || !mailFrom || !mailTo || !razorpaySecret) {
      return NextResponse.json({ error: "Payment or email service is not configured yet." }, { status: 500 });
    }

    const body = (await req.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      currentCity?: string;
      service?: string;
      experienceLevel?: string;
      resumeLink?: string;
      note?: string;
      razorpayOrderId?: string;
      razorpayPaymentId?: string;
      razorpaySignature?: string;
      company?: string;
    };

    if (body.company?.trim()) {
      return NextResponse.json({ message: "Registration completed." }, { status: 200 });
    }

    const {
      name = "",
      email = "",
      phone = "",
      currentCity = "",
      service = "",
      experienceLevel = "",
      resumeLink = "",
      note = "",
      razorpayOrderId = "",
      razorpayPaymentId = "",
      razorpaySignature = "",
    } = body;

    if (!name.trim() || !email.trim() || !phone.trim() || !service.trim() || !resumeLink.trim()) {
      return NextResponse.json({ error: "Missing required registration details." }, { status: 400 });
    }

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({ error: "Payment verification details are missing." }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", razorpaySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
    }

    const candidate = await prisma.candidate.upsert({
      where: { email: email.trim().toLowerCase() },
      update: {
        name: name.trim(),
        phone: phone.trim(),
        currentCity: currentCity.trim() || null,
        experienceLevel: experienceLevel.trim() || null,
        serviceInterest: service.trim(),
        linkedin: resumeLink.trim().includes("linkedin.com") ? resumeLink.trim() : null,
        resumeUrl: resumeLink.trim(),
        note: note.trim() || null,
        paymentStatus: "paid",
        latestPaymentReference: razorpayPaymentId,
      },
      create: {
        email: email.trim().toLowerCase(),
        name: name.trim(),
        phone: phone.trim(),
        currentCity: currentCity.trim() || null,
        experienceLevel: experienceLevel.trim() || null,
        serviceInterest: service.trim(),
        linkedin: resumeLink.trim().includes("linkedin.com") ? resumeLink.trim() : null,
        resumeUrl: resumeLink.trim(),
        note: note.trim() || null,
        paymentStatus: "paid",
        latestPaymentReference: razorpayPaymentId,
      },
    });

    await prisma.payment.upsert({
      where: { reference: razorpayPaymentId },
      update: {
        candidateId: candidate.id,
        status: "paid",
        amount: paymentAmount,
        currency: paymentCurrency,
        label: paymentLabel,
        orderId: razorpayOrderId,
      },
      create: {
        candidateId: candidate.id,
        provider: "razorpay",
        status: "paid",
        amount: paymentAmount,
        currency: paymentCurrency,
        label: paymentLabel,
        orderId: razorpayOrderId,
        reference: razorpayPaymentId,
      },
    });

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = escapeHtml(phone.trim());
    const safeCurrentCity = escapeHtml(currentCity.trim() || "Not provided");
    const safeService = escapeHtml(service.trim());
    const safeExperienceLevel = escapeHtml(experienceLevel.trim() || "Not provided");
    const safeResumeLink = escapeHtml(resumeLink.trim());
    const safeNote = escapeHtml(note.trim() || "Not provided").replaceAll("\n", "<br />");

    await resend.emails.send({
      from: mailFrom,
      to: [mailTo],
      replyTo: email.trim(),
      subject: `Paid job seeker registration: ${name.trim()} · ${service.trim()}`,
      text: [
        `Payment label: ${paymentLabel}`,
        `Amount: ${(paymentAmount / 100).toFixed(2)} ${paymentCurrency}`,
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Phone: ${phone.trim()}`,
        `Current city: ${currentCity.trim() || "Not provided"}`,
        `Service: ${service.trim()}`,
        `Experience level: ${experienceLevel.trim() || "Not provided"}`,
        `Resume or LinkedIn: ${resumeLink.trim()}`,
        `Candidate note: ${note.trim() || "Not provided"}`,
        `Razorpay order ID: ${razorpayOrderId}`,
        `Razorpay payment ID: ${razorpayPaymentId}`,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; color: #123622; line-height: 1.6;">
          <h2 style="margin: 0 0 16px;">New paid job seeker registration</h2>
          <p style="margin: 0 0 8px;"><strong>Payment label:</strong> ${escapeHtml(paymentLabel)}</p>
          <p style="margin: 0 0 8px;"><strong>Amount:</strong> ${(paymentAmount / 100).toFixed(2)} ${paymentCurrency}</p>
          <p style="margin: 0 0 8px;"><strong>Name:</strong> ${safeName}</p>
          <p style="margin: 0 0 8px;"><strong>Email:</strong> ${safeEmail}</p>
          <p style="margin: 0 0 8px;"><strong>Phone:</strong> ${safePhone}</p>
          <p style="margin: 0 0 8px;"><strong>Current city:</strong> ${safeCurrentCity}</p>
          <p style="margin: 0 0 8px;"><strong>Service:</strong> ${safeService}</p>
          <p style="margin: 0 0 8px;"><strong>Experience level:</strong> ${safeExperienceLevel}</p>
          <p style="margin: 0 0 8px;"><strong>Resume or LinkedIn:</strong> <a href="${escapeHtml(resumeLink.trim())}">${safeResumeLink}</a></p>
          <p style="margin: 16px 0 8px;"><strong>Candidate note:</strong></p>
          <div style="padding: 16px; border: 1px solid #e3decf; border-radius: 12px; background: #fffef7; margin-bottom: 16px;">
            ${safeNote}
          </div>
          <p style="margin: 0 0 8px;"><strong>Razorpay order ID:</strong> ${escapeHtml(razorpayOrderId)}</p>
          <p style="margin: 0;"><strong>Razorpay payment ID:</strong> ${escapeHtml(razorpayPaymentId)}</p>
        </div>
      `,
    });

    return NextResponse.json({
      message: "Payment verified and your job seeker registration has been submitted successfully.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to verify the payment right now. Please contact our team with your payment reference." }, { status: 500 });
  }
}
