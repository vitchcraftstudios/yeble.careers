export const ALLOWED_REGISTRANT_FILE_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".txt",
  ".xls",
  ".xlsx",
  ".csv",
] as const;

export const ALLOWED_REGISTRANT_FILE_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
  "application/csv",
  "application/vnd.ms-office",
] as const;

export const MAX_REGISTRANT_FILE_SIZE_BYTES = 10 * 1024 * 1024;

function normalizeFilename(filename: string) {
  return filename.trim().toLowerCase();
}

export function getRegistrantFileExtension(filename: string) {
  const normalized = normalizeFilename(filename);
  const dotIndex = normalized.lastIndexOf(".");
  if (dotIndex < 0) return "";
  return normalized.slice(dotIndex);
}

export function isAllowedRegistrantFileType(filename: string, mimeType: string | null | undefined) {
  const extension = getRegistrantFileExtension(filename);
  const normalizedMimeType = (mimeType || "").trim().toLowerCase();

  const extensionAllowed = ALLOWED_REGISTRANT_FILE_EXTENSIONS.includes(extension as (typeof ALLOWED_REGISTRANT_FILE_EXTENSIONS)[number]);
  const mimeAllowed = !normalizedMimeType || ALLOWED_REGISTRANT_FILE_MIME_TYPES.includes(normalizedMimeType as (typeof ALLOWED_REGISTRANT_FILE_MIME_TYPES)[number]);

  return extensionAllowed && mimeAllowed;
}

export function getRegistrantFileValidationMessage() {
  return "Upload PDF, DOC, DOCX, TXT, XLS, XLSX, or CSV files up to 10 MB.";
}
