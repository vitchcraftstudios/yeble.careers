"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  company: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
  company: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to send your enquiry right now.");
      }

      setStatus("success");
      setFeedback(data.message || "Your enquiry has been sent successfully.");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Unable to send your enquiry right now.");
    }
  }

  return (
    <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
      <input
        className="w-full rounded-xl border border-[#d6d1c1] bg-white px-4 py-3 text-[#0f2918] placeholder:text-[#8a8f87] outline-none"
        placeholder="Full name"
        required
        value={form.name}
        onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
      />
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
        value={form.phone}
        onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
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
        className="w-full rounded-xl border border-[#d6d1c1] bg-white px-4 py-3 text-[#0f2918] placeholder:text-[#8a8f87] outline-none"
        placeholder="Share your hiring requirement, locations, experience range, or the Job ID you are applying for"
        rows={5}
        required
        value={form.message}
        onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-[#27c06b] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#1fb35f] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Sending enquiry..." : "Send enquiry"}
      </button>
      <p className="text-xs leading-6 text-[#31513c]">
        We usually respond within one business day. For urgent business enquiries, call <a className="font-medium text-[#2d6a3e]" href="tel:+919429692113">+91 94296 92113</a>, call <a className="font-medium text-[#2d6a3e]" href="tel:+911354222268">0135 422 2268</a>, or email <a className="font-medium text-[#2d6a3e]" href="mailto:growth@yeble.careers">growth@yeble.careers</a>.
      </p>
      {feedback ? (
        <p className={`text-sm leading-6 ${status === "success" ? "text-[#1f7a43]" : "text-[#9b2c2c]"}`}>
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
