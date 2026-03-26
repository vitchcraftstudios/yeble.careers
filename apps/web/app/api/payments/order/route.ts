import { NextResponse } from "next/server";
import { getRazorpayClient, paymentAmount, paymentCurrency, paymentLabel } from "@/lib/payments";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      currentCity?: string;
      service?: string;
      experienceLevel?: string;
      resumeLink?: string;
      note?: string;
      company?: string;
    };

    if (body.company?.trim()) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!body.name?.trim() || !body.email?.trim() || !body.phone?.trim() || !body.service?.trim() || !body.resumeLink?.trim()) {
      return NextResponse.json({ error: "Please complete the required registration details before payment." }, { status: 400 });
    }

    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: paymentAmount,
      currency: paymentCurrency,
      receipt: `yeble-${Date.now()}`,
      notes: {
        formType: "job-seeker-registration",
        paymentLabel,
        name: body.name.trim(),
        email: body.email.trim(),
        phone: body.phone.trim(),
        currentCity: body.currentCity?.trim() || "",
        service: body.service.trim(),
        experienceLevel: body.experienceLevel?.trim() || "",
        resumeLink: body.resumeLink.trim(),
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      label: paymentLabel,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create the payment order right now." }, { status: 500 });
  }
}
