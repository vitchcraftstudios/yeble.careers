export type Job = {
  id: string;
  title: string;
  company: string;
  sector: string;
  city: string;
  locationType: "On-site" | "Hybrid" | "Remote";
  experience: string;
  salaryRange: string;
  type: "Full-time" | "Contract" | "Internship";
  openings: number;
  postedAt: string;
  status: "Open" | "Interviewing" | "Offer" | "Closed";
};

export const jobs: Job[] = [
  {
    id: "JBLR-2403",
    title: "Senior Full-stack Engineer (Node/React)",
    company: "Kaveri Tech",
    sector: "Software & Platforms",
    city: "Bengaluru",
    locationType: "Hybrid",
    experience: "6-10 yrs",
    salaryRange: "₹28L - ₹42L",
    type: "Full-time",
    openings: 3,
    postedAt: "2026-03-04",
    status: "Interviewing",
  },
  {
    id: "JDEL-2399",
    title: "Product Designer (UX/UI)",
    company: "Northwind Labs",
    sector: "Consumer Internet",
    city: "New Delhi",
    locationType: "Hybrid",
    experience: "4-7 yrs",
    salaryRange: "₹18L - ₹28L",
    type: "Full-time",
    openings: 2,
    postedAt: "2026-03-02",
    status: "Open",
  },
  {
    id: "JPNQ-2388",
    title: "Data Analyst",
    company: "Helio Analytics",
    sector: "Analytics & AI",
    city: "Pune",
    locationType: "On-site",
    experience: "2-4 yrs",
    salaryRange: "₹10L - ₹16L",
    type: "Full-time",
    openings: 2,
    postedAt: "2026-03-01",
    status: "Offer",
  },
  {
    id: "JHYD-2382",
    title: "Cloud DevOps Engineer (AWS)",
    company: "Skychain",
    sector: "Fintech",
    city: "Hyderabad",
    locationType: "Remote",
    experience: "4-8 yrs",
    salaryRange: "₹22L - ₹30L",
    type: "Full-time",
    openings: 1,
    postedAt: "2026-02-28",
    status: "Interviewing",
  },
  {
    id: "JMUM-2377",
    title: "Talent Acquisition Partner",
    company: "Yeble Careers",
    sector: "Recruitment",
    city: "Mumbai",
    locationType: "Hybrid",
    experience: "3-6 yrs",
    salaryRange: "₹12L - ₹18L",
    type: "Full-time",
    openings: 1,
    postedAt: "2026-02-26",
    status: "Open",
  },
];

export const candidates = [
  { name: "Priya Narang", role: "Product Designer", stage: "Portfolio review", eta: "Today" },
  { name: "Luis Ortega", role: "Full-stack Engineer", stage: "Tech screen", eta: "In 2h" },
  { name: "Emma Walsh", role: "Data Analyst", stage: "Hiring manager", eta: "Tomorrow" },
  { name: "Jay Park", role: "Solutions Eng", stage: "Offer review", eta: "Awaiting" },
  { name: "Rohan Iyer", role: "DevOps Engineer", stage: "Panel interview", eta: "Thu" },
];

export const pipeline = {
  inbound: 342,
  shortlisted: 102,
  interviewing: 57,
  offers: 14,
  onTimeInterviewRate: 0.93,
};

export const opsChecklist = [
  "Publish JD for Bengaluru Full-stack cohort",
  "Send interview packs for Skychain DevOps slate",
  "Share shortlisted designers with Northwind",
  "Run compensation benchmark for Pune analytics roles",
];
