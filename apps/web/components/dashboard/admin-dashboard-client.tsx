"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";

type JobItem = {
  id: string;
  title: string;
  company: string;
  sector: string | null;
  city: string | null;
  locationType: string | null;
  experience: string | null;
  salaryRange: string | null;
  type: string | null;
  openings: number;
  status: string;
  location: string;
  description: string;
  salary: string | null;
  tags: string[];
  createdAt: string;
};

type RegistrantFileItem = {
  id: string;
  name: string;
  url: string;
  type: string | null;
  createdAt: string;
};

type RegistrantPaymentItem = {
  id: string;
  provider: string;
  status: string;
  amount: number;
  currency: string;
  label: string | null;
  reference: string | null;
  createdAt: string;
};

type RegistrantApplicationItem = {
  id: string;
  status: string;
  note: string | null;
  createdAt: string;
  jobTitle: string;
  company: string;
};

type RegistrantItem = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  currentCity: string | null;
  headline: string | null;
  experienceLevel: string | null;
  serviceInterest: string | null;
  linkedin: string | null;
  resumeUrl: string | null;
  note: string | null;
  paymentStatus: string;
  latestPaymentReference: string | null;
  filesCount: number;
  applicationsCount: number;
  createdAt: string;
  updatedAt: string;
  files: RegistrantFileItem[];
  applications: RegistrantApplicationItem[];
  payments: RegistrantPaymentItem[];
};

type ContentItem = {
  id: string;
  title: string;
  body: string;
  mediaUrl: string | null;
  updatedAt: string;
};

type Props = {
  initialJobs: JobItem[];
  initialRegistrants: RegistrantItem[];
  initialContent: ContentItem[];
};

type JobFormState = {
  title: string;
  company: string;
  sector: string;
  city: string;
  locationType: string | null;
  experience: string;
  salaryRange: string;
  type: string | null;
  openings: string;
  status: string;
  location: string;
  description: string;
  salary: string;
  tags: string;
};

type RegistrantFormState = {
  name: string;
  email: string;
  phone: string;
  currentCity: string;
  headline: string;
  experienceLevel: string;
  serviceInterest: string;
  linkedin: string;
  resumeUrl: string;
  note: string;
  paymentStatus: string;
  latestPaymentReference: string;
};

type AdminSection = "overview" | "jobs" | "registrants" | "content";

const emptyJob: JobFormState = {
  title: "",
  company: "",
  sector: "",
  city: "",
  locationType: "On-site",
  experience: "",
  salaryRange: "",
  type: "Full-time",
  openings: "1",
  status: "Open",
  location: "",
  description: "",
  salary: "",
  tags: "",
};

function toJobForm(job: JobItem): JobFormState {
  return {
    title: job.title,
    company: job.company,
    sector: job.sector || "",
    city: job.city || "",
    locationType: job.locationType || "On-site",
    experience: job.experience || "",
    salaryRange: job.salaryRange || "",
    type: job.type || "Full-time",
    openings: String(job.openings || 1),
    status: job.status,
    location: job.location,
    description: job.description,
    salary: job.salary || "",
    tags: job.tags.join(", "),
  };
}

function toRegistrantForm(registrant: RegistrantItem): RegistrantFormState {
  return {
    name: registrant.name,
    email: registrant.email,
    phone: registrant.phone || "",
    currentCity: registrant.currentCity || "",
    headline: registrant.headline || "",
    experienceLevel: registrant.experienceLevel || "",
    serviceInterest: registrant.serviceInterest || "",
    linkedin: registrant.linkedin || "",
    resumeUrl: registrant.resumeUrl || "",
    note: registrant.note || "",
    paymentStatus: registrant.paymentStatus,
    latestPaymentReference: registrant.latestPaymentReference || "",
  };
}

function getContentGroup(id: string) {
  if (id.startsWith("home-")) return "Home";
  if (id.startsWith("services-")) return "Services";
  if (id.startsWith("jobs-")) return "Jobs";
  if (id.startsWith("about-")) return "About";
  if (id.startsWith("contact-")) return "Contact";
  return "General";
}

export function AdminDashboardClient({ initialJobs, initialRegistrants, initialContent }: Props) {
  const [activeSection, setActiveSection] = useState<AdminSection>("overview");
  const [jobs, setJobs] = useState<JobItem[]>(initialJobs);
  const [registrants, setRegistrants] = useState<RegistrantItem[]>(initialRegistrants);
  const [content, setContent] = useState<ContentItem[]>(initialContent);
  const [jobForm, setJobForm] = useState<JobFormState>(emptyJob);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [selectedRegistrantId, setSelectedRegistrantId] = useState<string | null>(initialRegistrants[0]?.id || null);
  const [registrantForm, setRegistrantForm] = useState<RegistrantFormState | null>(initialRegistrants[0] ? toRegistrantForm(initialRegistrants[0]) : null);
  const [savingJob, setSavingJob] = useState(false);
  const [savingRegistrant, setSavingRegistrant] = useState(false);
  const [jobMessage, setJobMessage] = useState("");
  const [registrantMessage, setRegistrantMessage] = useState("");
  const [contentMessage, setContentMessage] = useState("");
  const [editingContent, setEditingContent] = useState<Record<string, { title: string; body: string; mediaUrl: string }>>(
    Object.fromEntries(
      initialContent.map((item) => [item.id, { title: item.title, body: item.body, mediaUrl: item.mediaUrl || "" }]),
    ),
  );

  const selectedRegistrant = useMemo(
    () => registrants.find((item) => item.id === selectedRegistrantId) || null,
    [registrants, selectedRegistrantId],
  );

  useEffect(() => {
    if (selectedRegistrant) {
      setRegistrantForm(toRegistrantForm(selectedRegistrant));
    }
  }, [selectedRegistrant]);

  const metrics = useMemo(
    () => [
      { label: "Live mandates", value: jobs.length, helper: "Structured roles published to the jobs page" },
      { label: "Paid registrants", value: registrants.filter((item) => item.paymentStatus === "paid").length, helper: "Candidates who completed payment verification" },
      { label: "Files uploaded", value: registrants.reduce((sum, item) => sum + item.filesCount, 0), helper: "Resumes and supporting documents in the dashboard" },
      { label: "Content blocks", value: content.length, helper: "Editable site blocks stored in the CMS layer" },
    ],
    [jobs, registrants, content],
  );

  const contentByGroup = useMemo(() => {
    return content.reduce<Record<string, ContentItem[]>>((acc, item) => {
      const key = getContentGroup(item.id);
      acc[key] = acc[key] ? [...acc[key], item] : [item];
      return acc;
    }, {});
  }, [content]);

  async function saveJob(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingJob(true);
    setJobMessage("");

    try {
      const payload = {
        ...jobForm,
        openings: Number(jobForm.openings || "1"),
        tags: jobForm.tags
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      const response = await fetch(editingJobId ? `/api/jobs/${editingJobId}` : "/api/jobs", {
        method: editingJobId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save the job.");

      if (editingJobId) {
        setJobs((current) => current.map((item) => (item.id === editingJobId ? data : item)));
        setJobMessage("Job mandate updated successfully.");
      } else {
        setJobs((current) => [data, ...current]);
        setJobMessage("Job mandate created successfully.");
      }

      setEditingJobId(null);
      setJobForm(emptyJob);
    } catch (error) {
      setJobMessage(error instanceof Error ? error.message : "Unable to save the job.");
    } finally {
      setSavingJob(false);
    }
  }

  function startEditingJob(job: JobItem) {
    setEditingJobId(job.id);
    setJobForm(toJobForm(job));
    setActiveSection("jobs");
    setJobMessage("");
  }

  function resetJobForm() {
    setEditingJobId(null);
    setJobForm(emptyJob);
    setJobMessage("");
  }

  async function deleteJob(id: string) {
    const confirmed = window.confirm("Delete this job mandate?");
    if (!confirmed) return;

    const response = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      window.alert(data.error || "Unable to delete the job.");
      return;
    }

    setJobs((current) => current.filter((item) => item.id !== id));
    if (editingJobId === id) resetJobForm();
  }

  async function saveRegistrant() {
    if (!selectedRegistrant || !registrantForm) return;

    setSavingRegistrant(true);
    setRegistrantMessage("");

    try {
      const response = await fetch(`/api/admin/registrants/${selectedRegistrant.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrantForm),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save registrant profile.");

      setRegistrants((current) => current.map((item) => (item.id === data.id ? data : item)));
      setRegistrantMessage("Registrant profile updated successfully.");
    } catch (error) {
      setRegistrantMessage(error instanceof Error ? error.message : "Unable to save registrant profile.");
    } finally {
      setSavingRegistrant(false);
    }
  }

  async function saveContent(id: string) {
    setContentMessage("");
    const payload = editingContent[id];

    const response = await fetch("/api/admin/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...payload }),
    });

    const data = await response.json();
    if (!response.ok) {
      setContentMessage(data.error || "Unable to save content right now.");
      return;
    }

    setContent((current) => current.map((item) => (item.id === id ? data : item)));
    setContentMessage("Content updated successfully.");
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-[#e3decf] bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">{metric.label}</p>
            <p className="mt-3 text-3xl font-semibold text-[#123622]">{metric.value}</p>
            <p className="mt-2 text-sm leading-6 text-[#56705d]">{metric.helper}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-[#e3decf] bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">CMS Sections</p>
            <h2 className="mt-1 text-xl font-semibold text-[#123622]">Choose the workspace you want to manage</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:flex">
            {[
              ["overview", "Overview"],
              ["jobs", "Jobs"],
              ["registrants", "Registrants"],
              ["content", "Page Content"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setActiveSection(value as AdminSection)}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  activeSection === value ? "bg-[#27c06b] text-white" : "border border-[#d6d1c1] bg-[#fffdf6] text-[#123622]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeSection === "overview" ? (
        <section className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="rounded-3xl border border-[#e3decf] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Overview</p>
            <h3 className="mt-2 text-2xl font-semibold text-[#123622]">What this CMS can already run</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Create, update, and remove live jobs",
                "Review full registrant profiles, files, and payment records",
                "Edit stored content blocks for public pages",
                "Use one admin desk instead of changing source files for every update",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-[#e3decf] bg-[#fffdf6] px-4 py-4 text-sm leading-6 text-[#31513c]">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-[#e3decf] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Next expansion</p>
            <h3 className="mt-2 text-2xl font-semibold text-[#123622]">Recommended next CMS slices</h3>
            <div className="mt-5 space-y-3">
              {[
                "Replace more hardcoded page sections with CMS-backed content blocks",
                "Add media uploads instead of URL-only media fields",
                "Support page builder style repeatable blocks for testimonials, FAQs, and hero sections",
                "Add application management workflows and internal notes",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-[#e3decf] bg-[#fffdf6] px-4 py-4 text-sm leading-6 text-[#31513c]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {activeSection === "jobs" ? (
        <section className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="rounded-3xl border border-[#e3decf] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Jobs CMS</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#123622]">{editingJobId ? "Edit job mandate" : "Create a new job mandate"}</h2>
              </div>
              <span className="rounded-full border border-[#d6d1c1] px-3 py-1 text-xs text-[#31513c]">Live on jobs page</span>
            </div>
            <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={saveJob}>
              {[
                ["title", "Role title"],
                ["company", "Company name"],
                ["sector", "Sector"],
                ["city", "City"],
                ["experience", "Experience"],
                ["salaryRange", "Salary range"],
                ["location", "Location summary"],
                ["tags", "Tags (comma separated)"],
              ].map(([key, label]) => (
                <input
                  key={key}
                  className="rounded-2xl border border-[#d6d1c1] px-4 py-3 text-sm text-[#123622] outline-none"
                  placeholder={label}
                  value={jobForm[key as keyof JobFormState] as string}
                  onChange={(event) => setJobForm((current) => ({ ...current, [key]: event.target.value }))}
                  required={key === "title" || key === "company" || key === "location"}
                />
              ))}
              <select
                className="rounded-2xl border border-[#d6d1c1] px-4 py-3 text-sm text-[#123622] outline-none"
                value={jobForm.locationType ?? ""}
                onChange={(event) => setJobForm((current) => ({ ...current, locationType: event.target.value }))}
              >
                <option>On-site</option>
                <option>Hybrid</option>
                <option>Remote</option>
              </select>
              <select
                className="rounded-2xl border border-[#d6d1c1] px-4 py-3 text-sm text-[#123622] outline-none"
                value={jobForm.type ?? ""}
                onChange={(event) => setJobForm((current) => ({ ...current, type: event.target.value }))}
              >
                <option>Full-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
              <input
                className="rounded-2xl border border-[#d6d1c1] px-4 py-3 text-sm text-[#123622] outline-none"
                placeholder="Openings"
                type="number"
                min="1"
                value={jobForm.openings}
                onChange={(event) => setJobForm((current) => ({ ...current, openings: event.target.value }))}
              />
              <select
                className="rounded-2xl border border-[#d6d1c1] px-4 py-3 text-sm text-[#123622] outline-none"
                value={jobForm.status}
                onChange={(event) => setJobForm((current) => ({ ...current, status: event.target.value }))}
              >
                <option>Open</option>
                <option>Interviewing</option>
                <option>Offer</option>
                <option>Closed</option>
              </select>
              <textarea
                className="min-h-32 rounded-2xl border border-[#d6d1c1] px-4 py-3 text-sm text-[#123622] outline-none md:col-span-2"
                placeholder="Role description"
                value={jobForm.description}
                onChange={(event) => setJobForm((current) => ({ ...current, description: event.target.value }))}
                required
              />
              <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button type="submit" disabled={savingJob} className="rounded-full bg-[#27c06b] px-6 py-3 text-sm font-semibold text-white disabled:opacity-70">
                    {savingJob ? "Saving mandate..." : editingJobId ? "Update mandate" : "Publish mandate"}
                  </button>
                  {editingJobId ? (
                    <button type="button" onClick={resetJobForm} className="rounded-full border border-[#d6d1c1] px-6 py-3 text-sm font-semibold text-[#123622]">
                      Cancel edit
                    </button>
                  ) : null}
                </div>
                {jobMessage ? <p className="text-sm text-[#31513c]">{jobMessage}</p> : null}
              </div>
            </form>
          </div>

          <div className="rounded-3xl border border-[#e3decf] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Mandates</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#123622]">Manage live jobs</h2>
            <div className="mt-6 space-y-3">
              {jobs.length ? (
                jobs.map((job) => (
                  <div key={job.id} className="rounded-2xl border border-[#e3decf] bg-[#fffdf6] p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-semibold text-[#123622]">{job.title}</p>
                        <p className="text-sm text-[#31513c]">{job.company} | {job.city || job.location} | {job.status}</p>
                        <p className="text-sm text-[#31513c]">{job.salaryRange || job.salary || "Salary on request"}</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => startEditingJob(job)} className="rounded-full border border-[#d6d1c1] px-4 py-2 text-sm text-[#123622]">
                          Edit
                        </button>
                        <button type="button" onClick={() => deleteJob(job.id)} className="rounded-full border border-[#e3decf] px-4 py-2 text-sm text-[#7a1f1f]">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-[#d6d1c1] bg-[#fffdf6] p-5 text-sm text-[#56705d]">
                  No live job mandates yet. Add one to start publishing.
                </div>
              )}
            </div>
          </div>
        </section>
      ) : null}

      {activeSection === "registrants" ? (
        <section className="grid gap-6 xl:grid-cols-[0.86fr_1.14fr]">
          <div className="rounded-3xl border border-[#e3decf] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Registrants</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#123622]">Registration desk</h2>
            <div className="mt-6 space-y-3">
              {registrants.length ? (
                registrants.map((registrant) => (
                  <button
                    key={registrant.id}
                    type="button"
                    onClick={() => setSelectedRegistrantId(registrant.id)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      selectedRegistrantId === registrant.id ? "border-[#27c06b] bg-[#f7fff9]" : "border-[#e3decf] bg-[#fffdf6]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-semibold text-[#123622]">{registrant.name}</p>
                        <p className="truncate text-sm text-[#31513c]">{registrant.email}</p>
                        <p className="text-sm text-[#56705d]">{registrant.currentCity || "City not added"}</p>
                      </div>
                      <span className="rounded-full border border-[#d6d1c1] px-3 py-1 text-xs text-[#2d6a3e]">{registrant.paymentStatus}</span>
                    </div>
                    <p className="mt-3 text-sm text-[#31513c]">Files: {registrant.filesCount} | Applications: {registrant.applicationsCount}</p>
                  </button>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-[#d6d1c1] bg-[#fffdf6] p-5 text-sm text-[#56705d]">
                  No registrants yet. Once candidates register, they will appear here.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-[#e3decf] bg-white p-6 shadow-sm">
            {selectedRegistrant && registrantForm ? (
              <div className="space-y-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Profile Manager</p>
                    <h2 className="mt-2 text-2xl font-semibold text-[#123622]">{selectedRegistrant.name}</h2>
                    <p className="mt-2 text-sm leading-6 text-[#31513c]">Review and edit registration details, payment status, files, and application history.</p>
                  </div>
                  <span className="rounded-full border border-[#d6d1c1] px-3 py-1 text-xs text-[#31513c]">Joined {new Date(selectedRegistrant.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    ["name", "Full name"],
                    ["email", "Email"],
                    ["phone", "Phone number"],
                    ["currentCity", "Current city"],
                    ["headline", "Headline"],
                    ["experienceLevel", "Experience level"],
                    ["serviceInterest", "Service interest"],
                    ["linkedin", "LinkedIn URL"],
                    ["resumeUrl", "Resume URL"],
                    ["latestPaymentReference", "Latest payment reference"],
                  ].map(([key, label]) => (
                    <input
                      key={key}
                      className="rounded-2xl border border-[#d6d1c1] px-4 py-3 text-sm text-[#123622] outline-none"
                      placeholder={label}
                      value={registrantForm[key as keyof RegistrantFormState] as string}
                      onChange={(event) =>
                        setRegistrantForm((current) => (current ? { ...current, [key]: event.target.value } : current))
                      }
                    />
                  ))}
                  <select
                    className="rounded-2xl border border-[#d6d1c1] px-4 py-3 text-sm text-[#123622] outline-none"
                    value={registrantForm.paymentStatus}
                    onChange={(event) =>
                      setRegistrantForm((current) => (current ? { ...current, paymentStatus: event.target.value } : current))
                    }
                  >
                    <option value="pending">pending</option>
                    <option value="paid">paid</option>
                    <option value="failed">failed</option>
                    <option value="review">review</option>
                  </select>
                  <textarea
                    className="min-h-28 rounded-2xl border border-[#d6d1c1] px-4 py-3 text-sm text-[#123622] outline-none md:col-span-2"
                    placeholder="Profile notes"
                    value={registrantForm.note}
                    onChange={(event) =>
                      setRegistrantForm((current) => (current ? { ...current, note: event.target.value } : current))
                    }
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button type="button" onClick={saveRegistrant} disabled={savingRegistrant} className="rounded-full bg-[#27c06b] px-6 py-3 text-sm font-semibold text-white disabled:opacity-70">
                    {savingRegistrant ? "Saving profile..." : "Save registrant profile"}
                  </button>
                  {registrantMessage ? <p className="text-sm text-[#31513c]">{registrantMessage}</p> : null}
                </div>

                <div className="grid gap-6 xl:grid-cols-3">
                  <div className="rounded-2xl border border-[#e3decf] bg-[#fffdf6] p-4 xl:col-span-1">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Payments</p>
                    <div className="mt-4 space-y-3">
                      {selectedRegistrant.payments.length ? (
                        selectedRegistrant.payments.map((payment) => (
                          <div key={payment.id} className="rounded-2xl border border-[#e3decf] bg-white p-3">
                            <p className="font-semibold text-[#123622]">{payment.label || "Registration payment"}</p>
                            <p className="text-sm text-[#31513c]">{payment.currency} {payment.amount / 100}</p>
                            <p className="text-sm text-[#31513c]">{payment.status} | {payment.reference || "Awaiting ref"}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-[#56705d]">No payment records yet.</p>
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#e3decf] bg-[#fffdf6] p-4 xl:col-span-1">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Files</p>
                    <div className="mt-4 space-y-3">
                      {selectedRegistrant.files.length ? (
                        selectedRegistrant.files.map((file) => (
                          <div key={file.id} className="rounded-2xl border border-[#e3decf] bg-white p-3">
                            <p className="break-all font-semibold text-[#123622]">{file.name}</p>
                            {file.type ? <p className="mt-1 text-sm text-[#56705d]">{file.type}</p> : null}
                            <a href={`/api/admin/files/open?id=${file.id}`} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm text-[#2d6a3e] underline">
                              Open file
                            </a>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-[#56705d]">No files uploaded yet.</p>
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#e3decf] bg-[#fffdf6] p-4 xl:col-span-1">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Applications</p>
                    <div className="mt-4 space-y-3">
                      {selectedRegistrant.applications.length ? (
                        selectedRegistrant.applications.map((application) => (
                          <div key={application.id} className="rounded-2xl border border-[#e3decf] bg-white p-3">
                            <p className="font-semibold text-[#123622]">{application.jobTitle}</p>
                            <p className="text-sm text-[#31513c]">{application.company}</p>
                            <p className="text-sm text-[#31513c]">{application.status}</p>
                            <p className="text-sm text-[#56705d]">{new Date(application.createdAt).toLocaleDateString()}</p>
                            {application.note ? <pre className="mt-3 whitespace-pre-wrap break-words rounded-2xl border border-[#e3decf] bg-[#fffef6] p-3 text-xs leading-6 text-[#31513c]">{application.note}</pre> : null}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-[#56705d]">No applications recorded yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#d6d1c1] bg-[#fffdf6] p-5 text-sm text-[#56705d]">
                Select a registrant to review their profile.
              </div>
            )}
          </div>
        </section>
      ) : null}

      {activeSection === "content" ? (
        <section className="rounded-3xl border border-[#e3decf] bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Page Content</p>
          <h2 className="mt-2 text-2xl font-semibold text-[#123622]">Edit stored content blocks</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-[#31513c]">This is the CMS content layer for text and media-backed sections. Public pages can progressively read from these blocks instead of staying hardcoded.</p>
          <div className="mt-6 space-y-6">
            {Object.entries(contentByGroup).map(([group, items]) => (
              <div key={group} className="rounded-3xl border border-[#e3decf] bg-[#fffdf6] p-4 sm:p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">{group}</p>
                <div className="mt-4 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-[#e3decf] bg-white p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs uppercase tracking-[0.18em] text-[#56705d]">{item.id}</p>
                        <p className="text-xs text-[#56705d]">Updated {new Date(item.updatedAt).toLocaleDateString()}</p>
                      </div>
                      <input
                        className="mt-3 w-full rounded-xl border border-[#d6d1c1] px-3 py-2 text-sm text-[#123622] outline-none"
                        value={editingContent[item.id]?.title || ""}
                        onChange={(event) =>
                          setEditingContent((current) => ({
                            ...current,
                            [item.id]: { ...current[item.id], title: event.target.value },
                          }))
                        }
                      />
                      <textarea
                        className="mt-3 min-h-28 w-full rounded-xl border border-[#d6d1c1] px-3 py-2 text-sm text-[#123622] outline-none"
                        value={editingContent[item.id]?.body || ""}
                        onChange={(event) =>
                          setEditingContent((current) => ({
                            ...current,
                            [item.id]: { ...current[item.id], body: event.target.value },
                          }))
                        }
                      />
                      <input
                        className="mt-3 w-full rounded-xl border border-[#d6d1c1] px-3 py-2 text-sm text-[#123622] outline-none"
                        placeholder="Optional media URL"
                        value={editingContent[item.id]?.mediaUrl || ""}
                        onChange={(event) =>
                          setEditingContent((current) => ({
                            ...current,
                            [item.id]: { ...current[item.id], mediaUrl: event.target.value },
                          }))
                        }
                      />
                      <div className="mt-3 flex justify-end">
                        <button type="button" onClick={() => saveContent(item.id)} className="rounded-full border border-[#d6d1c1] px-4 py-2 text-sm font-medium text-[#123622]">
                          Save block
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {contentMessage ? <p className="text-sm text-[#31513c]">{contentMessage}</p> : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}


