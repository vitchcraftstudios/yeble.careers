import { createHash } from "crypto";
import { JOOBLE_IMPORT_BATCHES, isNorthIndiaJob } from "@/lib/job-source";
import { normalizeOptionalText, normalizeText, normalizeTextArray } from "@/lib/text-normalize";

const JOOBLE_ENDPOINT = "https://jooble.org/api";

export type JoobleImportOptions = {
  apiKey: string;
  batchLimit?: number;
  defaultCountry?: string;
};

type JoobleBatch = (typeof JOOBLE_IMPORT_BATCHES)[number];

type JoobleJob = {
  id?: string | number;
  title?: string;
  company?: string;
  companyName?: string;
  location?: string;
  snippet?: string;
  salary?: string;
  type?: string;
  updated?: string;
  link?: string;
  source?: string;
};

type JoobleResponse = {
  jobs?: JoobleJob[];
};

export type ImportedJoobleJob = {
  source: "jooble";
  sourceJobId: string;
  sourceUrl: string | null;
  title: string;
  company: string;
  sector: string;
  city: string | null;
  locationType: string;
  experience: string | null;
  salaryRange: string | null;
  type: string;
  openings: number;
  status: string;
  location: string;
  description: string;
  salary: string | null;
  tags: string[];
  isImported: true;
  isVerified: false;
  isActive: true;
  syncStatus: string;
  importHash: string;
  lastSyncedAt: Date;
  expiresAt: Date;
  sourcePayload: Record<string, string | number | boolean | null>;
};

export async function fetchJoobleJobs({ apiKey, batchLimit = JOOBLE_IMPORT_BATCHES.length, defaultCountry = "in" }: JoobleImportOptions) {
  const syncTime = new Date();
  const selectedBatches = JOOBLE_IMPORT_BATCHES.slice(0, Math.max(1, Math.min(batchLimit, JOOBLE_IMPORT_BATCHES.length)));
  const importedJobs: ImportedJoobleJob[] = [];
  const requestStats: Array<{ batch: string; fetched: number; kept: number }> = [];

  for (const batch of selectedBatches) {
    const response = await fetch(`${JOOBLE_ENDPOINT}/${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keywords: batch.keywords,
        location: "India",
        page: 1,
        country: defaultCountry,
        resultOnPage: batch.resultsPerBatch,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Jooble sync failed for ${batch.label}: ${response.status}`);
    }

    const payload = (await response.json()) as JoobleResponse;
    const batchJobs = (payload.jobs || []).filter((job) => isNorthIndiaJob(job.location));
    const mapped = batchJobs
      .map((job) => mapJoobleJob(job, batch, syncTime))
      .filter((job): job is ImportedJoobleJob => Boolean(job));

    importedJobs.push(...mapped);
    requestStats.push({ batch: batch.label, fetched: (payload.jobs || []).length, kept: mapped.length });
  }

  const dedupedJobs = dedupeImportedJobs(importedJobs);

  return {
    syncTime,
    requestCount: selectedBatches.length,
    requestStats,
    jobs: dedupedJobs,
  };
}

function mapJoobleJob(job: JoobleJob, batch: JoobleBatch, syncTime: Date): ImportedJoobleJob | null {
  const title = normalizeText(job.title || "");
  const company = normalizeText(job.company || job.companyName || "Confidential company");
  const location = normalizeText(job.location || "India");
  const description = normalizeText(job.snippet || `${title} opportunity sourced from Jooble for ${location}.`);
  const sourceUrl = normalizeOptionalText(job.link);
  const sourceJobId = normalizeText(String(job.id || sourceUrl || `${title}-${company}-${location}`));

  if (!title || !location || !sourceJobId) return null;

  const city = deriveCity(location);
  const locationType = deriveLocationType(title, description, location);
  const type = deriveEmploymentType(job.type, title, description);
  const salaryRange = normalizeOptionalText(job.salary);
  const importHash = createHash("sha1")
    .update([title.toLowerCase(), company.toLowerCase(), location.toLowerCase(), sourceUrl || ""].join("|"))
    .digest("hex");

  return {
    source: "jooble",
    sourceJobId,
    sourceUrl,
    title,
    company,
    sector: batch.sector,
    city,
    locationType,
    experience: null,
    salaryRange,
    type,
    openings: 1,
    status: "Open",
    location,
    description,
    salary: salaryRange,
    tags: normalizeTextArray([batch.sector, city || "", locationType, type, "jooble"]),
    isImported: true,
    isVerified: false,
    isActive: true,
    syncStatus: "synced",
    importHash,
    lastSyncedAt: syncTime,
    expiresAt: new Date(syncTime.getTime() + 1000 * 60 * 60 * 24 * 14),
    sourcePayload: {
      ...job,
      importBatch: batch.key,
      importedAt: syncTime.toISOString(),
    },
  };
}

function dedupeImportedJobs(jobs: ImportedJoobleJob[]) {
  const seen = new Set<string>();
  return jobs.filter((job) => {
    if (seen.has(job.importHash)) return false;
    seen.add(job.importHash);
    return true;
  });
}

function deriveCity(location: string) {
  const cleaned = normalizeText(location);
  if (!cleaned) return null;
  const [firstPart] = cleaned.split(",");
  return normalizeOptionalText(firstPart);
}

function deriveLocationType(...values: Array<string | null | undefined>) {
  const haystack = values.map((value) => normalizeText(value)).join(" ").toLowerCase();
  if (haystack.includes("remote")) return "Remote";
  if (haystack.includes("hybrid")) return "Hybrid";
  return "On-site";
}

function deriveEmploymentType(type: string | null | undefined, ...values: Array<string | null | undefined>) {
  const haystack = [type, ...values].map((value) => normalizeText(value)).join(" ").toLowerCase();
  if (haystack.includes("intern")) return "Internship";
  if (haystack.includes("contract")) return "Contract";
  if (haystack.includes("part-time")) return "Part-time";
  return normalizeText(type || "Full-time");
}

