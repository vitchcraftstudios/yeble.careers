"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { OverlayModal } from "@/components/overlay-modal";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

type JobSeekerRegistrationModalProps = {
  open: boolean;
  onClose: () => void;
};

type RegistrationFormState = {
  name: string;
  email: string;
  phone: string;
  currentCity: string;
  service: string;
  experienceLevel: string;
  resumeLink: string;
  note: string;
  company: string;
};

const serviceOptions = [
  "Permanent Recruitment Opportunities",
  "Campus & Fresher Placement Support",
  "Contract Staffing Opportunities",
  "Skill-Based Vetting & Assessment",
];

const initialState: RegistrationFormState = {
  name: "",
  email: "",
  phone: "",
  currentCity: "",
  service: serviceOptions[0],
  experienceLevel: "",
  resumeLink: "",
  note: "",
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

export function EmployerIntakeModal({ open, onClose }: JobSeekerRegistrationModalProps) {
  const router = useRouter();
  const [form, setForm] = useState<RegistrationFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "creating-order" | "opening-checkout" | "verifying" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const amountInRupees = useMemo(() => Number(process.env.NEXT_PUBLIC_RAZORPAY_AMOUNT || "499") || 499, []);
  const paymentLabel = useMemo(() => process.env.NEXT_PUBLIC_RAZORPAY_PAYMENT_LABEL || "Job Seeker Registration Fee", []);
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
                "Payment confirmed. Your job seeker registration has been received and our team will reach out shortly.",
            );
            setForm(initialState);
            router.push("/thank-you");
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
        title="Job Seeker Registration"
        description="Complete your registration details, choose the support you need, and pay the registration fee to submit your profile to our Dehradun hiring desk."
        widthClassName="max-w-3xl"
      >
        <div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr] md:gap-6">
          <form className="grid gap-3 sm:gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
              <input
                className="w-full rounded-xl border border-[#d6d1c1] bg-white px-4 py-3 text-base text-[#0f2918] placeholder:text-[#8a8f87] outline-none sm:text-lg"
                placeholder="Full name"
                required
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              />
              <input
                className="w-full rounded-xl border border-[#d6d1c1] bg-white px-4 py-3 text-base text-[#0f2918] placeholder:text-[#8a8f87] outline-none sm:text-lg"
                placeholder="Work or personal email"
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              />
            </div>
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
              <input
                className="w-full rounded-xl border border-[#d6d1c1] bg-white px-4 py-3 text-base text-[#0f2918] placeholder:text-[#8a8f87] outline-none sm:text-lg"
                placeholder="Phone number"
                required
                value={form.phone}
                onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              />
              <input
                className="w-full rounded-xl border border-[#d6d1c1] bg-white px-4 py-3 text-base text-[#0f2918] placeholder:text-[#8a8f87] outline-none sm:text-lg"
                placeholder="Current city"
                required
                value={form.currentCity}
                onChange={(event) => setForm((current) => ({ ...current, currentCity: event.target.value }))}
              />
            </div>
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
              <select
                className="w-full rounded-xl border border-[#d6d1c1] bg-white px-4 py-3 text-base text-[#0f2918] outline-none sm:text-lg"
                value={form.service}
                onChange={(event) => setForm((current) => ({ ...current, service: event.target.value }))}
              >
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <input
                className="w-full rounded-xl border border-[#d6d1c1] bg-white px-4 py-3 text-base text-[#0f2918] placeholder:text-[#8a8f87] outline-none sm:text-lg"
                placeholder="Experience level"
                required
                value={form.experienceLevel}
                onChange={(event) => setForm((current) => ({ ...current, experienceLevel: event.target.value }))}
              />
            </div>
            <input
              className="w-full rounded-xl border border-[#d6d1c1] bg-white px-4 py-3 text-base text-[#0f2918] placeholder:text-[#8a8f87] outline-none sm:text-lg"
              placeholder="Resume or LinkedIn URL"
              type="url"
              required
              value={form.resumeLink}
              onChange={(event) => setForm((current) => ({ ...current, resumeLink: event.target.value }))}
            />
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
              className="min-h-40 w-full rounded-xl border border-[#d6d1c1] bg-white px-4 py-3 text-base text-[#0f2918] placeholder:text-[#8a8f87] outline-none sm:min-h-44 sm:text-lg"
              placeholder="Tell us the kind of roles you are targeting, preferred locations, salary range, or anything important for your profile review"
              rows={5}
              required
              value={form.note}
              onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))}
            />
            {errorMessage ? <p className="text-sm leading-6 text-[#9b2c2c]">{errorMessage}</p> : null}
            <button
              type="submit"
              disabled={status === "creating-order" || status === "opening-checkout" || status === "verifying"}
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#27c06b] px-5 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-[#1fb35f] disabled:cursor-not-allowed disabled:opacity-70 sm:text-lg"
            >
              {status === "creating-order" && "Preparing payment..."}
              {status === "opening-checkout" && "Opening payment..."}
              {status === "verifying" && "Verifying payment..."}
              {status === "idle" || status === "error" ? `Pay Now · INR ${amountInRupees}` : null}
            </button>
            <p className="text-sm leading-7 text-[#31513c]">
              Your registration becomes successful only after payment verification. Once verified, your details are sent to
              our team so they can review your profile and guide you on the next step.
            </p>
          </form>

          <div className="space-y-4 rounded-[1.5rem] border border-[#e3decf] bg-[#fffdf6] p-4 sm:rounded-[1.75rem] sm:p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">What happens next</p>
            <h3 className="text-lg font-semibold leading-tight text-[#123622] sm:text-xl">A simple registration flow for serious job seekers</h3>
            <div className="space-y-3 text-sm leading-7 text-[#31513c]">
              <div className="flex items-start gap-3">
                <span className="mt-1 text-[#2d6a3e]"><CheckIcon /></span>
                <span>Select the support category that best matches your current job search need.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-[#2d6a3e]"><CheckIcon /></span>
                <span>Complete the Razorpay payment to confirm your registration.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-[#2d6a3e]"><CheckIcon /></span>
                <span>After payment verification, your profile details are shared with our team at growth@yeble.careers.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-[#2d6a3e]"><CheckIcon /></span>
                <span>Our Dehradun team reviews your profile and reaches out with the next step.</span>
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
        title="Registration completed successfully"
        description={successMessage || "Your payment has been verified and your job seeker registration has been submitted successfully."}
        widthClassName="max-w-xl"
      >
        <div className="space-y-5">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
            <CheckIcon />
          </div>
          <p className="text-sm leading-7 text-[#31513c]">
            Your profile has been registered successfully. Our team will review your details and reach out on the email or
            phone number you shared.
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




