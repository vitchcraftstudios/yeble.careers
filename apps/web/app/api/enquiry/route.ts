import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const mailFrom = process.env.MAIL_FROM;
const mailTo = process.env.MAIL_TO;

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
    if (!resend || !mailFrom || !mailTo) {
      return NextResponse.json({ error: "Email service is not configured yet." }, { status: 500 });
    }

    const body = (await req.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
      company?: string;
    };

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const company = body.company?.trim() ?? "";

    if (company) {
      return NextResponse.json({ message: "Your enquiry has been sent successfully." }, { status: 200 });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and enquiry details are required." }, { status: 400 });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Not provided");
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    await resend.emails.send({
      from: mailFrom,
      to: [mailTo],
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        "",
        "Enquiry details:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; color: #123622; line-height: 1.6;">
          <h2 style="margin: 0 0 16px;">New enquiry from Yeble Careers</h2>
          <p style="margin: 0 0 8px;"><strong>Name:</strong> ${safeName}</p>
          <p style="margin: 0 0 8px;"><strong>Email:</strong> ${safeEmail}</p>
          <p style="margin: 0 0 16px;"><strong>Phone:</strong> ${safePhone}</p>
          <p style="margin: 0 0 8px;"><strong>Enquiry details:</strong></p>
          <div style="padding: 16px; border: 1px solid #e3decf; border-radius: 12px; background: #fffef7;">
            ${safeMessage}
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: "Your enquiry has been sent. Our team will get back to you shortly." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to send your enquiry right now. Please try again shortly." }, { status: 500 });
  }
}
