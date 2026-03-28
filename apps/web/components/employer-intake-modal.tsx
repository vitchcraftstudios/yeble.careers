"use client";

import { FormEvent, useCallback, useMemo, useState } from "react";
import { OverlayModal } from "@/components/overlay-modal";

type JobSeekerRegistrationModalProps = {
  open: boolean;
  onClose: () => void;
  paymentPageUrl: string;
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

export function EmployerIntakeModal({ open, onClose, paymentPageUrl }: JobSeekerRegistrationModalProps) {
  const [form, setForm] = useState<RegistrationFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "redirecting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const amountInRupees = useMemo(() => Number(process.env.NEXT_PUBLIC_RAZORPAY_AMOUNT || "499") || 499, []);
  const paymentLabel = useMemo(() => process.env.NEXT_PUBLIC_RAZORPAY_PAYMENT_LABEL || "Job Seeker Registration Fee", []);

  const resetAndClose = useCallback(() => {
    setStatus("idle");
    setErrorMessage("");
    setForm(initialState);
    onClose();
  }, [onClose]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.company.trim()) {
      resetAndClose();
      return;
    }

    if (!paymentPageUrl.trim()) {
      setStatus("error");
      setErrorMessage("The hosted payment page URL is not configured yet.");
      return;
    }

    setStatus("redirecting");
    setErrorMessage("");

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(
        "yeble.registrationDraft",
        JSON.stringify({
          ...form,
          savedAt: new Date().toISOString(),
        }),
      );
      window.location.href = paymentPageUrl;
    }
  }

  return (
    <OverlayModal
      open={open}
      onClose={resetAndClose}
      title="Job Seeker Registration"
      description="Complete your registration details first. After that, we will send you to our secure hosted payment page to finish the payment step."
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
            disabled={status === "redirecting"}
            className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#27c06b] px-5 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-[#1fb35f] disabled:cursor-not-allowed disabled:opacity-70 sm:text-lg"
          >
            {status === "redirecting" ? "Opening payment page..." : `Continue to Payment · INR ${amountInRupees}`}
          </button>
          <p className="text-sm leading-7 text-[#31513c]">
            Your profile details are collected first so your registration context is not lost. After that, you will be redirected to our hosted Razorpay payment page to complete the payment step securely.
          </p>
        </form>

        <div className="space-y-4 rounded-[1.5rem] border border-[#e3decf] bg-[#fffdf6] p-4 sm:rounded-[1.75rem] sm:p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">What happens next</p>
          <h3 className="text-lg font-semibold leading-tight text-[#123622] sm:text-xl">A simple registration flow for serious job seekers</h3>
          <div className="space-y-3 text-sm leading-7 text-[#31513c]">
            <div className="flex items-start gap-3">
              <span className="mt-1 text-[#2d6a3e]"><CheckIcon /></span>
              <span>Complete your details so we know your role interest, location preference, and job-search context.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 text-[#2d6a3e]"><CheckIcon /></span>
              <span>Continue to our hosted Razorpay payment page to complete the registration payment securely.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 text-[#2d6a3e]"><CheckIcon /></span>
              <span>After payment, Razorpay will redirect you to the thank-you page already configured in the payment page setup.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 text-[#2d6a3e]"><CheckIcon /></span>
              <span>Our Dehradun team can then follow up with the next step in a clearer, more practical way.</span>
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
  );
}
