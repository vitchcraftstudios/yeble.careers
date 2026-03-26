import { NextResponse } from "next/server";
import { getRazorpayClient, paymentAmount, paymentCurrency, paymentLabel } from "@/lib/payments";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      companyName?: string;
      service?: string;
      hiringLocation?: string;
      requirementSummary?: string;
      company?: string;
    };

    if (body.company?.trim()) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!body.name?.trim() || !body.email?.trim() || !body.companyName?.trim() || !body.service?.trim()) {
      return NextResponse.json({ error: "Please complete the required intake details before payment." }, { status: 400 });
    }

    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: paymentAmount,
      currency: paymentCurrency,
      receipt: `yeble-${Date.now()}`,
      notes: {
        formType: "employer-intake",
        paymentLabel,
        name: body.name.trim(),
        email: body.email.trim(),
        phone: body.phone?.trim() || "",
        companyName: body.companyName.trim(),
        service: body.service.trim(),
        hiringLocation: body.hiringLocation?.trim() || "",
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
