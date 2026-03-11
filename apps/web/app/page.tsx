"use client";

import { useEffect, useState } from "react";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string | null;
  tags: string[];
  createdAt: string;
};

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
    tags: "",
  });

  const [candidateForm, setCandidateForm] = useState({
    name: "",
    email: "",
    headline: "",
    linkedin: "",
    resumeUrl: "",
    note: "",
    jobId: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    const res = await fetch("/api/jobs");
    const data = await res.json();
    setJobs(data);
  }

  async function handleJobSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...jobForm,
        tags: jobForm.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }),
    });
    setJobForm({
      title: "",
      company: "",
      location: "",
      description: "",
      salary: "",
      tags: "",
    });
    await fetchJobs();
    setLoading(false);
  }

  async function handleCandidateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(candidateForm),
    });
    setCandidateForm({
      name: "",
      email: "",
      headline: "",
      linkedin: "",
      resumeUrl: "",
      note: "",
      jobId: "",
    });
    setLoading(false);
  }

  async function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setCandidateForm((prev) => ({ ...prev, resumeUrl: data.url }));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Yeble Placement</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Ship jobs live, match candidates fast.
            </h1>
            <p className="mt-3 max-w-2xl text-slate-300">
              Vercel + Neon + Blob ready. Post a role, drop a resume, track applications without leaving the page.
            </p>
          </div>
          <div className="rounded-full border border-emerald-400/40 px-4 py-2 text-sm text-emerald-200">
            {jobs.length} roles live
          </div>
        </header>

        <div className="mt-10 grid gap-8 md:grid-cols-[1.4fr,1fr]">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-xl font-semibold">Post a Job</h2>
            <form className="mt-4 grid gap-4" onSubmit={handleJobSubmit}>
              <div className="grid gap-2">
                <label className="text-sm text-slate-200">Title</label>
                <input
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2 md:grid-cols-2 md:gap-4">
                <div className="grid gap-2">
                  <label className="text-sm text-slate-200">Company</label>
                  <input
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none"
                    value={jobForm.company}
                    onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm text-slate-200">Location</label>
                  <input
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-slate-200">Description</label>
                <textarea
                  className="min-h-[120px] rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none"
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2 md:grid-cols-2 md:gap-4">
                <div className="grid gap-2">
                  <label className="text-sm text-slate-200">Salary range</label>
                  <input
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none"
                    value={jobForm.salary}
                    onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                    placeholder="$120k–$160k"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm text-slate-200">Tags (comma separated)</label>
                  <input
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none"
                    value={jobForm.tags}
                    onChange={(e) => setJobForm({ ...jobForm, tags: e.target.value })}
                    placeholder="React, TypeScript, Remote"
                  />
                </div>
              </div>
              <button
                className="mt-2 inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-slate-900 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
                type="submit"
                disabled={loading}
              >
                {loading ? "Saving..." : "Publish role"}
              </button>
            </form>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-xl font-semibold">Apply to a Role</h2>
            <form className="mt-4 grid gap-4" onSubmit={handleCandidateSubmit}>
              <div className="grid gap-2">
                <label className="text-sm text-slate-200">Choose role</label>
                <select
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none"
                  value={candidateForm.jobId}
                  onChange={(e) => setCandidateForm({ ...candidateForm, jobId: e.target.value })}
                  required
                >
                  <option value="">Select a job</option>
                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title} — {job.company}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-slate-200">Full name</label>
                <input
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none"
                  value={candidateForm.name}
                  onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-slate-200">Email</label>
                <input
                  type="email"
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none"
                  value={candidateForm.email}
                  onChange={(e) => setCandidateForm({ ...candidateForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-slate-200">Headline</label>
                <input
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none"
                  value={candidateForm.headline}
                  onChange={(e) => setCandidateForm({ ...candidateForm, headline: e.target.value })}
                  placeholder="Senior React engineer"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-slate-200">LinkedIn URL</label>
                <input
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none"
                  value={candidateForm.linkedin}
                  onChange={(e) => setCandidateForm({ ...candidateForm, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/you"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-slate-200">Resume (uploads to Blob)</label>
                <input
                  type="file"
                  accept=".pdf"
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none"
                  onChange={handleResumeUpload}
                />
                {candidateForm.resumeUrl ? (
                  <p className="text-sm text-emerald-200">Uploaded ✓</p>
                ) : (
                  <p className="text-sm text-slate-400">PDF only; stored publicly in Blob.</p>
                )}
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-slate-200">Note</label>
                <textarea
                  className="min-h-[80px] rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none"
                  value={candidateForm.note}
                  onChange={(e) => setCandidateForm({ ...candidateForm, note: e.target.value })}
                />
              </div>
              <button
                className="mt-2 inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 font-semibold text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit application"}
              </button>
            </form>
          </section>
        </div>

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Live roles</h2>
            <button
              className="text-sm text-emerald-200 underline underline-offset-4"
              onClick={fetchJobs}
              type="button"
            >
              Refresh
            </button>
          </div>
          <div className="mt-4 grid gap-4">
            {jobs.length === 0 && <p className="text-slate-300">No roles yet. Add one above.</p>}
            {jobs.map((job) => (
              <article
                key={job.id}
                className="rounded-xl border border-white/10 bg-black/30 p-4 shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">{job.company}</p>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                  </div>
                  <span className="text-xs text-slate-300">{job.location}</span>
                </div>
                <p className="mt-2 line-clamp-3 text-sm text-slate-300">{job.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-200">
                  {job.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/10 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                  {job.salary && (
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-emerald-100">
                      {job.salary}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
