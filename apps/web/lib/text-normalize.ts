export function normalizeText(value: string | null | undefined) {
  if (!value) return value ?? "";

  return value
    .replace(/^\uFEFF/, "")
    .replace(/\u00C3\u0192\u00E2\u201A\u00AC\u0160\u00C3\u00A2\u20AC\u0161\u00C3\u201A\u00C2\u00B7|\u00C3\u00A2\u20AC\u0161\u00C3\u201A\u00C2\u00B7|\u00C3\u201A\u00C2\u00B7|\u00C2\u00B7/g, " | ")
    .replace(/\u00C3\u00A2\u201A\u00AC\u00C2\u00A2/g, "-")
    .replace(/\u00C3\u00A2\u201A\u00AC\u201C|\u00C3\u00A2\u201A\u00AC\u00E2\u20AC\u009D/g, "-")
    .replace(/\u00C3\u00A2\u201A\u00AC\u02DC|\u00C3\u00A2\u201A\u00AC\u201E\u00A2/g, "'")
    .replace(/\u00C3\u00A2\u201A\u00AC\u0153|\u00C3\u00A2\u201A\u00AC/g, '"')
    .replace(/\s+\|\s+\|\s+/g, " | ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function normalizeOptionalText(value: string | null | undefined) {
  const normalized = normalizeText(value);
  return normalized ? normalized : null;
}

export function normalizeTextArray(values: string[] | null | undefined) {
  return (values || []).map((value) => normalizeText(value)).filter(Boolean);
}