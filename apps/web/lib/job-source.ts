import { normalizeText } from "@/lib/text-normalize";

export const NORTH_INDIA_STATES = [
  "Uttarakhand",
  "Uttar Pradesh",
  "Haryana",
  "Himachal Pradesh",
] as const;

const NORTH_INDIA_LOCATION_MATCHERS = [
  "uttarakhand",
  "dehradun",
  "haridwar",
  "roorkee",
  "haldwani",
  "rudrapur",
  "kashipur",
  "rishikesh",
  "uttar pradesh",
  "up",
  "noida",
  "greater noida",
  "lucknow",
  "ghaziabad",
  "kanpur",
  "meerut",
  "agra",
  "varanasi",
  "prayagraj",
  "gorakhpur",
  "bareilly",
  "haryana",
  "gurugram",
  "gurgaon",
  "faridabad",
  "panipat",
  "sonipat",
  "karnal",
  "ambala",
  "rohtak",
  "hisar",
  "himachal pradesh",
  "shimla",
  "solan",
  "baddi",
  "manali",
  "dharamshala",
  "kangra",
  "mandi",
  "una",
  "chandigarh"
] as const;

export const JOOBLE_IMPORT_BATCHES = [
  {
    key: "office-business-support",
    label: "Office Administration & Business Support",
    keywords: "office administrator mis executive back office executive coordinator executive business support executive admin executive",
    sector: "Office Administration & MIS",
    resultsPerBatch: 18,
  },
  {
    key: "gtm-retail-services",
    label: "GTM, Consumer, Retail & Services",
    keywords: "sales executive business development executive marketing executive customer support executive retail sales store executive relationship executive",
    sector: "GTM & Consumer",
    resultsPerBatch: 18,
  },
  {
    key: "staffing-compliance",
    label: "Staffing & Compliance",
    keywords: "recruiter hr recruiter talent acquisition compliance executive staffing coordinator payroll executive",
    sector: "Staffing & Compliance",
    resultsPerBatch: 14,
  },
  {
    key: "industrial-operations",
    label: "Industrial & Operations",
    keywords: "operations executive production supervisor warehouse executive supply chain executive quality executive plant operator",
    sector: "Industrial & Operations",
    resultsPerBatch: 14,
  },
  {
    key: "hospitality-travel",
    label: "Hospitality & Travel",
    keywords: "front office executive guest relations travel consultant hotel operations executive reservation executive",
    sector: "Hospitality & Travel",
    resultsPerBatch: 12,
  },
  {
    key: "bfsi-healthcare",
    label: "BFSI, Financial Services & Healthcare",
    keywords: "banking executive insurance advisor relationship manager accounts executive medical representative lab executive healthcare coordinator",
    sector: "BFSI & Financial Services",
    resultsPerBatch: 14,
  },
] as const;

export function isNorthIndiaJob(location: string | null | undefined) {
  const haystack = normalizeText(location).toLowerCase();
  return NORTH_INDIA_LOCATION_MATCHERS.some((keyword) => haystack.includes(keyword));
}

export function getJobSourceLabel(job: { isImported?: boolean; isVerified?: boolean; source?: string | null }) {
  if (job.isVerified) return "Verified";
  if (job.isImported || job.source === "jooble") return "Imported from Jooble";
  return "Manual";
}

export function getJobSourceTone(job: { isImported?: boolean; isVerified?: boolean; source?: string | null }) {
  if (job.isVerified) return "verified";
  if (job.isImported || job.source === "jooble") return "imported";
  return "manual";
}
