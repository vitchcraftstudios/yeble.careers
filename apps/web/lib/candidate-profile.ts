function normalizeValue(value: string | null | undefined) {
  return (value || "").trim();
}

export type CandidateProfileForCompletion = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  currentCity?: string | null;
  headline?: string | null;
  experienceLevel?: string | null;
  resumeUrl?: string | null;
};

export function getMissingCandidateProfileFields(profile: CandidateProfileForCompletion) {
  const missing: string[] = [];

  if (!normalizeValue(profile.name)) missing.push("Full name");
  if (!normalizeValue(profile.email)) missing.push("Email");
  if (!normalizeValue(profile.phone)) missing.push("Phone number");
  if (!normalizeValue(profile.currentCity)) missing.push("Current city");
  if (!normalizeValue(profile.headline)) missing.push("Headline");
  if (!normalizeValue(profile.experienceLevel)) missing.push("Experience level");
  if (!normalizeValue(profile.resumeUrl)) missing.push("Resume");

  return missing;
}

export function isCandidateProfileComplete(profile: CandidateProfileForCompletion) {
  return getMissingCandidateProfileFields(profile).length === 0;
}
