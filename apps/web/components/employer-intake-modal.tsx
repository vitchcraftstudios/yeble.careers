"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { OverlayModal } from "@/components/overlay-modal";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

type EmployerIntakeModalProps = {
  open: boolean;
  onClose: () => void;
};

type IntakeFormState = {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  hiringLocation: string;
  service: string;
  requirementSummary: string;
  company: string;
};

const serviceOptions = [
  "Permanent Recruitment (RPO)",
  "Campus Recruitment Drives",
  "Contract Staffing (Staff Augmentation)",
  "Skill-Based Vetting (Assessment)",
];

const initialState: IntakeFormState = {
  name: "",
  companyName: "",
  email: "",
  phone: "",
  hiringLocation: "",
  service: serviceOptions[0],
  requirementSummary: "",
  company: "",
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="10" cy="10" r="7" />
      <path d="m7.5 10 1.6 1.6L12.5 8.4" />
    </svg>
  );
}

export function EmployerIntakeModal({ open, onClose }: EmployerIntakeModalProps) {
  const [form, setForm] = useState<IntakeFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "creating-order" | "opening-checkout" | "verifying" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const amountInRupees = useMemo(() => Number(process.env.NEXT_PUBLIC_RAZORPAY_AMOUNT || "499") || 499, []);
  const paymentLabel = useMemo(() => process.env.NEXT_PUBLIC_RAZORPAY_PAYMENT_LABEL || "Employer Intake Fee", []);
  const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";

  useEffect(() => {
    if (!open) return;

    const existingScript = document.querySelector<HTMLScriptElement>('script[data-razorpay-checkout="true"]');
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.dataset.razorpayCheckout = "true";
    document.body.appendChild(script);
  }, [open]);

  const resetAndClose = useCallback(() => {
    setStatus("idle");
    setErrorMessage("");
    setSuccessMessage("");
    setForm(initialState);
    onClose();
  }, [onClose]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!razorpayKeyId) {
      setStatus("error");
      setErrorMessage("Razorpay key is not configured yet. Please add NEXT_PUBLIC_RAZORPAY_KEY_ID to Vercel.");
      return;
    }

    if (!window.Razorpay) {
      setStatus("error");
      setErrorMessage("Payment checkout is still loading. Please wait a moment and try again.");
      return;
    }

    setStatus("creating-order");
    setErrorMessage("");

    try {
      const orderResponse = await fetch("/api/payments/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const orderData = (await orderResponse.json()) as {
        error?: string;
        orderId?: string;
        amount?: number;
        currency?: string;
        label?: string;
      };

      if (!orderResponse.ok || !orderData.orderId || !orderData.amount || !orderData.currency) {
        throw new Error(orderData.error || "Unable to prepare the payment order right now.");
      }

      setStatus("opening-checkout");

      const razorpay = new window.Razorpay({
        key: razorpayKeyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Yeble Careers",
        description: orderData.label || paymentLabel,
        order_id: orderData.orderId,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#27c06b",
        },
        modal: {
          ondismiss: () => {
            setStatus("idle");
          },
        },
        handler: async (response: Record<string, string>) => {
          setStatus("verifying");

          try {
            const verifyResponse = await fetch("/api/payments/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...form,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const verifyData = (await verifyResponse.json()) as { error?: string; message?: string };

            if (!verifyResponse.ok) {
              throw new Error(verifyData.error || "Payment verification failed.");
            }

            setStatus("success");
            setSuccessMessage(
              verifyData.message ||
                "Payment confirmed. Your employer intake has been received and our team will reach out shortly.",
            );
            setForm(initialState);
          } catch (error) {
            setStatus("error");
            setErrorMessage(
              error instanceof Error
                ? error.message
                : "Unable to verify the payment right now. Please contact our team with your payment reference.",
            );
          }
        },
      });

      razorpay.open();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unable to start the payment right now.");
    }
  }

  return (
    <>
      <OverlayModal
        open={open && status !== "success"}
        onClose={resetAndClose}
        title="Employer Intake Registration"
        description="Share your hiring requirement, select the service you need, and complete the intake fee to move forward with our Dehradun-led hiring desk."
        widthClassName="max-w-3xl"
      >
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="w-full rounded-xl border border-[#d6d1c1] bg-white px-4 py-3 text-[#0f2918] placeholder:text-[#8a8f87] outline-none"
                placeholder="Full name"
                required
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              />
              <input
                className="w-full rounded-xl border border-[#d6d1c1] bg-white px-4 py-3 text-[#0f2918] placeholder:text-[#8a8f87] outline-none"
                placeholder="Company name"
                required
                value={form.companyName}
                onChange={(event) => setForm((current) => ({ ...current, companyName: event.target.value }))}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="w-full rounded-xl border border-[#d6d1c1] bg-white px-4 py-3 text-[#0f2918] placeholder:text-[#8a8f87] outline-none"
                placeholder="Work email"
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              />
              <input
                className="w-full rounded-xl border border-[#d6d1c1] bg-white px-4 py-3 text-[#0f2918] placeholder:text-[#8a8f87] outline-none"
                placeholder="Phone number"
                required
                value={form.phone}
                onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="w-full rounded-xl border border-[#d6d1c1] bg-white px-4 py-3 text-[#0f2918] placeholder:text-[#8a8f87] outline-none"
                placeholder="Hiring location"
                value={form.hiringLocation}
                onChange={(event) => setForm((current) => ({ ...current, hiringLocation: event.target.value }))}
              />
              <select
                className="w-full rounded-xl border border-[#d6d1c1] bg-white px-4 py-3 text-[#0f2918] outline-none"
                value={form.service}
                onChange={(event) => setForm((current) => ({ ...current, service: event.target.value }))}
              >
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <input
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              name="company"
              value={form.company}
              onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
            />
            <textarea
              className="w-full rounded-xl border border-[#d6d1c1] bg-white px-4 py-3 text-[#0f2918] placeholder:text-[#8a8f87] outline-none"
              placeholder="Describe your hiring need, number of roles, seniority level, timeline, or any specific screening expectations"
              rows={6}
              required
              value={form.requirementSummary}
              onChange={(event) => setForm((current) => ({ ...current, requirementSummary: event.target.value }))}
            />
            {errorMessage ? <p className="text-sm leading-6 text-[#9b2c2c]">{errorMessage}</p> : null}
            <button
              type="submit"
              disabled={status === "creating-order" || status === "opening-checkout" || status === "verifying"}
              className="inline-flex items-center justify-center rounded-full bg-[#27c06b] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#1fb35f] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "creating-order" && "Preparing payment..."}
              {status === "opening-checkout" && "Opening payment..."}
              {status === "verifying" && "Verifying payment..."}
              {status === "idle" || status === "error" ? `Pay Now · INR ${amountInRupees}` : null}
            </button>
            <p className="text-xs leading-6 text-[#31513c]">
              Your registration is marked complete only after successful payment verification. After that, our team will
              receive your intake instantly and follow up on the same hiring requirement.
            </p>
          </form>

          <div className="space-y-4 rounded-[1.75rem] border border-[#e3decf] bg-[#fffdf6] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">What happens next</p>
            <h3 className="text-xl font-semibold text-[#123622]">A simple, paid intake flow for serious hiring requirements</h3>
            <div className="space-y-3 text-sm leading-7 text-[#31513c]">
              <div className="flex items-start gap-3">
                <span className="mt-1 text-[#2d6a3e]"><CheckIcon /></span>
                <span>Select the service that best matches your current hiring need.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-[#2d6a3e]"><CheckIcon /></span>
                <span>Complete the intake fee through Razorpay to confirm your request.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-[#2d6a3e]"><CheckIcon /></span>
                <span>Once payment is verified, your details are sent to our hiring desk at growth@yeble.careers.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-[#2d6a3e]"><CheckIcon /></span>
                <span>Our Dehradun team reviews the requirement and reaches out with the next step.</span>
              </div>
            </div>
            <div className="rounded-2xl border border-[#d8e5d9] bg-white p-4 text-sm text-[#31513c]">
              <p className="font-semibold text-[#123622]">Fee summary</p>
              <p className="mt-2">{paymentLabel}</p>
              <p className="mt-1 text-lg font-semibold text-[#2d6a3e]">INR {amountInRupees}</p>
            </div>
          </div>
        </div>
      </OverlayModal>

      <OverlayModal
        open={status === "success"}
        onClose={resetAndClose}
        title="Registration received successfully"
        description={successMessage || "Your payment has been verified and the intake has been submitted successfully."}
        widthClassName="max-w-xl"
      >
        <div className="space-y-5">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
            <CheckIcon />
          </div>
          <p className="text-sm leading-7 text-[#31513c]">
            Our hiring desk has received your request. We will review the requirement and reach out to you on the
            shared email or phone number.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={resetAndClose}
              className="inline-flex items-center justify-center rounded-full bg-[#27c06b] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#1fb35f]"
            >
              Close
            </button>
            <a
              href="mailto:growth@yeble.careers"
              className="inline-flex items-center justify-center rounded-full border border-[#d6d1c1] px-5 py-3 text-sm font-semibold text-[#123622] transition hover:border-[#2d6a3e]"
            >
              Email our team
            </a>
          </div>
        </div>
      </OverlayModal>
    </>
  );
}

