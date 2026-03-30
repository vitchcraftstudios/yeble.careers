"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";

export type JobListItem = {
  id: string;
  company: string;
  title: string;
  city: string;
  locationType: string;
  experience: string;
  type: string;
  salaryRange: string;
  sector: string;
  openings: number;
  status: string;
  postedAt: string;
  sourceLabel: string;
  sourceTone: string;
  sourceUrl: string | null;
};

type SortOption = "recommended" | "newest" | "company" | "city" | "status";

const sourceBadgeStyles: Record<string, string> = {
  verified: "bg-[#e8f7ee] text-[#1f5c36] border border-[#b9e3c8]",
  imported: "bg-[#f6f2e6] text-[#6c5218] border border-[#e8d8aa]",
  manual: "bg-white text-[#31513c] border border-[#e3decf]",
};

export function JobsListClient({ jobs }: { jobs: JobListItem[] }) {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  const filteredAndSortedJobs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = jobs.filter((job) => {
      const matchesQuery =
        !query ||
        [job.title, job.company, job.city, job.sector, job.locationType, job.sourceLabel]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesStatus = statusFilter === "all" || job.status.toLowerCase() === statusFilter;
      const matchesType = typeFilter === "all" || job.type.toLowerCase() === typeFilter;
      const matchesSource = sourceFilter === "all" || job.sourceTone === sourceFilter;

      return matchesQuery && matchesStatus && matchesType && matchesSource;
    });

    if (sortBy === "company") {
      return filtered.sort((a, b) => a.company.localeCompare(b.company));
    }

    if (sortBy === "city") {
      return filtered.sort((a, b) => a.city.localeCompare(b.city));
    }

    if (sortBy === "status") {
      return filtered.sort((a, b) => a.status.localeCompare(b.status) || b.postedAt.localeCompare(a.postedAt));
    }

    if (sortBy === "newest") {
      return filtered.sort((a, b) => b.postedAt.localeCompare(a.postedAt));
    }

    return filtered.sort((a, b) => {
      const scoreA = (a.sourceTone === "verified" ? 2 : a.sourceTone === "manual" ? 1 : 0);
      const scoreB = (b.sourceTone === "verified" ? 2 : b.sourceTone === "manual" ? 1 : 0);
      return scoreB - scoreA || b.postedAt.localeCompare(a.postedAt);
    });
  }, [jobs, searchQuery, sortBy, statusFilter, typeFilter, sourceFilter]);

  return (
    <>
      <div className="rounded-3xl border border-[#e3decf] bg-white/80 p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Jobs toolbar</p>
              <p className="mt-1 text-sm text-[#56705d]">Search, sort, and compare verified Yeble mandates with imported discovery roles.</p>
            </div>
            <p className="text-sm text-[#31513c]">Showing {filteredAndSortedJobs.length} of {jobs.length} mandates</p>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.3fr_0.55fr_0.55fr_0.55fr_0.55fr]">
            <label className="flex flex-col gap-2 text-sm text-[#31513c]">
              <span className="text-xs uppercase tracking-[0.2em] text-[#56705d]">Search jobs</span>
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by role, company, city, sector, or source"
                className="rounded-2xl border border-[#d6d1c1] bg-[#fffdf6] px-4 py-3 text-sm text-[#123622] outline-none"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-[#31513c]">
              <span className="text-xs uppercase tracking-[0.2em] text-[#56705d]">Sort</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
                className="rounded-2xl border border-[#d6d1c1] bg-[#fffdf6] px-4 py-3 text-sm text-[#123622] outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="newest">Newest</option>
                <option value="company">Company</option>
                <option value="city">City</option>
                <option value="status">Status</option>
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm text-[#31513c]">
              <span className="text-xs uppercase tracking-[0.2em] text-[#56705d]">Status</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-2xl border border-[#d6d1c1] bg-[#fffdf6] px-4 py-3 text-sm text-[#123622] outline-none"
              >
                <option value="all">All statuses</option>
                <option value="open">Open</option>
                <option value="interviewing">Interviewing</option>
                <option value="offer">Offer</option>
                <option value="closed">Closed</option>
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm text-[#31513c]">
              <span className="text-xs uppercase tracking-[0.2em] text-[#56705d]">Type</span>
              <select
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
                className="rounded-2xl border border-[#d6d1c1] bg-[#fffdf6] px-4 py-3 text-sm text-[#123622] outline-none"
              >
                <option value="all">All types</option>
                <option value="full-time">Full-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
                <option value="part-time">Part-time</option>
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm text-[#31513c]">
              <span className="text-xs uppercase tracking-[0.2em] text-[#56705d]">Source</span>
              <select
                value={sourceFilter}
                onChange={(event) => setSourceFilter(event.target.value)}
                className="rounded-2xl border border-[#d6d1c1] bg-[#fffdf6] px-4 py-3 text-sm text-[#123622] outline-none"
              >
                <option value="all">All sources</option>
                <option value="verified">Verified</option>
                <option value="manual">Manual</option>
                <option value="imported">Imported</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        {filteredAndSortedJobs.length ? (
          filteredAndSortedJobs.map((job, index) => (
            <ScrollReveal key={job.id} delay={Math.min(index * 45, 220)}>
              <article className="rounded-2xl border border-[#e3decf] bg-white/85 p-5 backdrop-blur">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#2d6a3e]/80">{job.company}</p>
                      <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${sourceBadgeStyles[job.sourceTone] || sourceBadgeStyles.manual}`}>
                        {job.sourceLabel}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-[#123622]">{job.title}</h2>
                    <p className="text-sm text-[#31513c]">
                      {job.city} | {job.locationType} | {job.experience} | {job.type}
                    </p>
                    <p className="text-sm text-[#31513c]">Salary: {job.salaryRange} | Job ID: {job.id}</p>
                    {job.sourceUrl ? (
                      <a href={job.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-medium text-[#1f5c36] underline">
                        Open original listing
                      </a>
                    ) : null}
                  </div>
                  <div className="flex flex-col items-start gap-3 md:items-end">
                    <Link
                      href={`/apply/${job.id}`}
                      className="inline-flex items-center justify-center rounded-full bg-[#27c06b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1ea95c]"
                    >
                      Apply now
                    </Link>
                    <div className="flex flex-wrap gap-2 text-xs text-[#2f4a35]">
                      <span className="rounded-full bg-[#f6f2e6] px-3 py-1">{job.sector}</span>
                      <span className="rounded-full border border-[#e3decf] bg-white px-3 py-1">{job.openings} openings</span>
                      <span className="rounded-full border border-[#e3decf] bg-white px-3 py-1">{job.status}</span>
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-[#d6d1c1] bg-white/85 p-6 text-sm text-[#56705d]">
            No mandates match your current search and filters.
          </div>
        )}
      </div>
    </>
  );
}
