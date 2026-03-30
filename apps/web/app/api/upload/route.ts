import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import {
  MAX_REGISTRANT_FILE_SIZE_BYTES,
  getRegistrantFileValidationMessage,
  isAllowedRegistrantFileType,
} from "@/lib/registrant-files";

export const runtime = "nodejs";

function buildUniquePathname(filename: string) {
  const cleaned = filename.trim().replace(/[^a-zA-Z0-9._-]/g, "-");
  const dotIndex = cleaned.lastIndexOf(".");
  const hasExtension = dotIndex > 0 && dotIndex < cleaned.length - 1;
  const base = hasExtension ? cleaned.slice(0, dotIndex) : cleaned;
  const extension = hasExtension ? cleaned.slice(dotIndex) : "";
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  return `registrant-files/${base || "file"}-${stamp}${extension}`;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_REGISTRANT_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: getRegistrantFileValidationMessage() }, { status: 400 });
    }

    if (!isAllowedRegistrantFileType(file.name, file.type)) {
      return NextResponse.json({ error: getRegistrantFileValidationMessage() }, { status: 400 });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: "Missing BLOB_READ_WRITE_TOKEN" }, { status: 500 });
    }

    const blob = await put(buildUniquePathname(file.name), file, {
      access: "private",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: false,
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error("Blob upload error", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error && error.message.includes("access")
            ? "File storage is not available right now. Please try again in a moment."
            : error instanceof Error
              ? error.message
              : "Unable to upload file",
      },
      { status: 500 },
    );
  }
}
