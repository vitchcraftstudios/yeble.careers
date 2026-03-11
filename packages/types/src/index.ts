export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string | null;
  tags: string[];
  createdAt: string;
};

export type Candidate = {
  id: string;
  name: string;
  email: string;
  headline?: string | null;
  linkedin?: string | null;
  resumeUrl?: string | null;
};

export type Application = {
  id: string;
  status: string;
  note?: string | null;
  jobId: string;
  candidateId: string;
  createdAt: string;
};
