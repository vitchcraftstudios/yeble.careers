import Razorpay from "razorpay";

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

export const paymentAmount = Number(process.env.RAZORPAY_AMOUNT || "49900");
export const paymentCurrency = "INR";
export const paymentLabel = process.env.RAZORPAY_PAYMENT_LABEL || "Employer Intake Fee";

export function getRazorpayClient() {
  if (!keyId || !keySecret) {
    throw new Error("Razorpay is not configured yet.");
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
}

export function getRazorpayKeyId() {
  return process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || keyId || "";
}
