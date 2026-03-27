"use client";

import { useMemo, useState } from "react";

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

type RegistrantItem = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  currentCity: string | null;
  experienceLevel: string | null;
  serviceInterest: string | null;
  paymentStatus: string;
  latestPaymentReference: string | null;
  filesCount: number;
  applicationsCount: number;
  createdAt: string;
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

export function AdminDashboardClient({ initialJobs, initialRegistrants, initialContent }: Props) {
  const [jobs, setJobs] = useState<JobItem[]>(initialJobs);
  const [registrants] = useState<RegistrantItem[]>(initialRegistrants);
  const [content, setContent] = useState<ContentItem[]>(initialContent);
  const [jobForm, setJobForm] = useState<JobFormState>(emptyJob);
  const [savingJob, setSavingJob] = useState(false);
  const [jobMessage, setJobMessage] = useState("");
  const [contentMessage, setContentMessage] = useState("");
  const [editingContent, setEditingContent] = useState<Record<string, { title: string; body: string; mediaUrl: string }>>(
    Object.fromEntries(
      initialContent.map((item) => [item.id, { title: item.title, body: item.body, mediaUrl: item.mediaUrl || "" }]),
    ),
  );

  const metrics = useMemo(
    () => [
      { label: "Live mandates", value: jobs.length },
      { label: "Paid registrants", value: registrants.filter((item) => item.paymentStatus === "paid").length },
      { label: "Files uploaded", value: registrants.reduce((sum, item) => sum + item.filesCount, 0) },
      { label: "Applications", value: registrants.reduce((sum, item) => sum + item.applicationsCount, 0) },
    ],
    [jobs, registrants],
  );

  async function createJob(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingJob(true);
    setJobMessage("");

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...jobForm,
          openings: Number(jobForm.openings || "1"),
          tags: jobForm.tags
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to create the job.");

      setJobs((current) => [data, ...current]);
      setJobForm(emptyJob);
      setJobMessage("Job mandate created successfully.");
    } catch (error) {
      setJobMessage(error instanceof Error ? error.message : "Unable to create the job.");
    } finally {
      setSavingJob(false);
    }
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
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-[#e3decf] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Admin CMS</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#123622]">Add a new job mandate</h2>
            </div>
            <span className="rounded-full border border-[#d6d1c1] px-3 py-1 text-xs text-[#31513c]">Live on jobs page</span>
          </div>
          <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={createJob}>
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
              <button type="submit" disabled={savingJob} className="rounded-full bg-[#27c06b] px-6 py-3 text-sm font-semibold text-white disabled:opacity-70">
                {savingJob ? "Saving mandate..." : "Publish mandate"}
              </button>
              {jobMessage ? <p className="text-sm text-[#31513c]">{jobMessage}</p> : null}
            </div>
          </form>
        </div>

        <div className="rounded-3xl border border-[#e3decf] bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Registrant desk</p>
          <h2 className="mt-2 text-2xl font-semibold text-[#123622]">Recent paid registrants</h2>
          <div className="mt-6 space-y-3">
            {registrants.length ? (
              registrants.slice(0, 6).map((registrant) => (
                <div key={registrant.id} className="rounded-2xl border border-[#e3decf] bg-[#fffdf6] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-[#123622]">{registrant.name}</p>
                      <p className="text-sm text-[#31513c]">{registrant.email}</p>
                      <p className="text-sm text-[#31513c]">{registrant.currentCity || "City not added"}</p>
                    </div>
                    <span className="rounded-full border border-[#d6d1c1] px-3 py-1 text-xs text-[#2d6a3e]">{registrant.paymentStatus}</span>
                  </div>
                  <p className="mt-3 text-sm text-[#31513c]">Files: {registrant.filesCount} · Applications: {registrant.applicationsCount}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-[#d6d1c1] bg-[#fffdf6] p-5 text-sm text-[#56705d]">
                No registrants yet. Once candidates register, their paid profiles will appear here.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
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
                      <p className="text-sm text-[#31513c]">
                        {job.company} · {job.city || job.location} · {job.status}
                      </p>
                      <p className="text-sm text-[#31513c]">{job.salaryRange || job.salary || "Salary on request"}</p>
                    </div>
                    <button type="button" onClick={() => deleteJob(job.id)} className="rounded-full border border-[#e3decf] px-4 py-2 text-sm text-[#7a1f1f]">
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-[#d6d1c1] bg-[#fffdf6] p-5 text-sm text-[#56705d]">
                No live job mandates yet. Add one above to start publishing.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-[#e3decf] bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Content store</p>
          <h2 className="mt-2 text-2xl font-semibold text-[#123622]">Edit key homepage content</h2>
          <div className="mt-6 space-y-4">
            {content.length ? (
              content.map((item) => (
                <div key={item.id} className="rounded-2xl border border-[#e3decf] bg-[#fffdf6] p-4">
                  <input
                    className="w-full rounded-xl border border-[#d6d1c1] px-3 py-2 text-sm text-[#123622] outline-none"
                    value={editingContent[item.id]?.title || ""}
                    onChange={(event) =>
                      setEditingContent((current) => ({
                        ...current,
                        [item.id]: { ...current[item.id], title: event.target.value },
                      }))
                    }
                  />
                  <textarea
                    className="mt-3 min-h-24 w-full rounded-xl border border-[#d6d1c1] px-3 py-2 text-sm text-[#123622] outline-none"
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
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-xs text-[#56705d]">Last updated: {new Date(item.updatedAt).toLocaleDateString()}</p>
                    <button type="button" onClick={() => saveContent(item.id)} className="rounded-full border border-[#d6d1c1] px-4 py-2 text-sm font-medium text-[#123622]">
                      Save
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-[#d6d1c1] bg-[#fffdf6] p-5 text-sm text-[#56705d]">
                No content items found yet. Seed data will populate this section once deployed.
              </div>
            )}
            {contentMessage ? <p className="text-sm text-[#31513c]">{contentMessage}</p> : null}
          </div>
        </div>
      </section>
    </div>
  );
}





