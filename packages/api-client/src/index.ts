import type { Job } from "@yeble/types";

const defaultBaseUrl = process.env.NEXT_PUBLIC_API_URL || "";

export async function listJobs(baseUrl = defaultBaseUrl): Promise<Job[]> {
  const res = await fetch(`${baseUrl}/api/jobs`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load jobs");
  return res.json();
}

export async function createJob(
  input: {
    title: string;
    company: string;
    location: string;
    description: string;
    salary?: string;
    tags?: string[];
  },
  baseUrl = defaultBaseUrl
): Promise<Job> {
  const res = await fetch(`${baseUrl}/api/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to create job");
  return res.json();
}
