"use client";

import { useMemo, useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";

type JobListItem = {
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
};

type SortOption = "newest" | "company" | "city" | "status";

export function JobsListClient({ jobs }: { jobs: JobListItem[] }) {
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const sortedJobs = useMemo(() => {
    const items = [...jobs];

    if (sortBy === "company") {
      return items.sort((a, b) => a.company.localeCompare(b.company));
    }

    if (sortBy === "city") {
      return items.sort((a, b) => a.city.localeCompare(b.city));
    }

    if (sortBy === "status") {
      return items.sort((a, b) => a.status.localeCompare(b.status) || b.postedAt.localeCompare(a.postedAt));
    }

    return items.sort((a, b) => b.postedAt.localeCompare(a.postedAt));
  }, [jobs, sortBy]);

  return (
    <>
      <div className="flex flex-col gap-3 rounded-2xl border border-[#e3decf] bg-white/80 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Job sorter</p>
          <p className="mt-1 text-sm text-[#56705d]">Showing {sortedJobs.length} active mandates</p>
        </div>
        <label className="flex items-center gap-3 text-sm text-[#31513c]">
          <span>Sort by</span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortOption)}
            className="rounded-full border border-[#d6d1c1] bg-[#fffdf6] px-4 py-2 text-sm text-[#123622] outline-none"
          >
            <option value="newest">Newest</option>
            <option value="company">Company</option>
            <option value="city">City</option>
            <option value="status">Status</option>
          </select>
        </label>
      </div>

      <div className="grid gap-3">
        {sortedJobs.map((job, index) => (
          <ScrollReveal key={job.id} delay={Math.min(index * 45, 220)}>
            <article className="rounded-2xl border border-[#e3decf] bg-white/85 p-5 backdrop-blur">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#2d6a3e]/80">{job.company}</p>
                  <h2 className="text-xl font-semibold text-[#123622]">{job.title}</h2>
                  <p className="text-sm text-[#31513c]">
                    {job.city} | {job.locationType} | {job.experience} | {job.type}
                  </p>
                  <p className="text-sm text-[#31513c]">Salary: {job.salaryRange} | Job ID: {job.id}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-[#2f4a35]">
                  <span className="rounded-full bg-[#f6f2e6] px-3 py-1">{job.sector}</span>
                  <span className="rounded-full border border-[#e3decf] bg-white px-3 py-1">{job.openings} openings</span>
                  <span className="rounded-full border border-[#e3decf] bg-white px-3 py-1">{job.status}</span>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </>
  );
}