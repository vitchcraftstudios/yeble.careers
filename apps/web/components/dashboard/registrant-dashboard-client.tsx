"use client";

import { useMemo, useState } from "react";

type ApplicationItem = {
  id: string;
  status: string;
  note: string | null;
  createdAt: string;
  jobTitle: string;
  company: string;
};

type FileItem = {
  id: string;
  name: string;
  url: string;
  type: string | null;
  createdAt: string;
};

type PaymentItem = {
  id: string;
  status: string;
  amount: number;
  currency: string;
  label: string | null;
  reference: string | null;
  createdAt: string;
};

type CandidateProfile = {
  name: string;
  email: string;
  phone: string;
  currentCity: string;
  headline: string;
  experienceLevel: string;
  serviceInterest: string;
  linkedin: string;
  resumeUrl: string;
  note: string;
  paymentStatus: string;
};

type Props = {
  initialProfile: CandidateProfile;
  files: FileItem[];
  payments: PaymentItem[];
  applications: ApplicationItem[];
};

async function readResponseJson(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await response.text();
    throw new Error(text.includes("<!DOCTYPE") ? "The server returned an unexpected response. Please try again." : text || "Unexpected server response.");
  }

  return response.json();
}

export function RegistrantDashboardClient({ initialProfile, files: initialFiles, payments, applications }: Props) {
  const [profile, setProfile] = useState(initialProfile);
  const [files, setFiles] = useState(initialFiles);
  const [profileMessage, setProfileMessage] = useState("");
  const [fileMessage, setFileMessage] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  const latestPayment = useMemo(() => payments[0] || null, [payments]);

  async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingProfile(true);
    setProfileMessage("");

    try {
      const response = await fetch("/api/dashboard/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      const data = await readResponseJson(response);
      if (!response.ok) {
        setProfileMessage(data.error || "Unable to save profile.");
        setSavingProfile(false);
        return;
      }

      setProfile(data.profile);
      setProfileMessage("Profile updated successfully.");
    } catch (error) {
      setProfileMessage(error instanceof Error ? error.message : "Unable to save profile.");
    } finally {
      setSavingProfile(false);
    }
  }

  async function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    setFileMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const blobResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const blobData = await readResponseJson(blobResponse);
      if (!blobResponse.ok) throw new Error(blobData.error || "Unable to upload file.");

      const saveResponse = await fetch("/api/dashboard/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: file.name, url: blobData.url, type: file.type || null }),
      });
      const saveData = await readResponseJson(saveResponse);
      if (!saveResponse.ok) throw new Error(saveData.error || "Unable to save file.");

      setFiles((current) => [saveData.file, ...current]);
      if (!profile.resumeUrl && file.type.includes("pdf")) {
        setProfile((current) => ({ ...current, resumeUrl: blobData.url }));
      }
      setFileMessage("File uploaded successfully.");
    } catch (error) {
      setFileMessage(error instanceof Error ? error.message : "Unable to upload file.");
    } finally {
      setUploadingFile(false);
      event.target.value = "";
    }
  }

  async function deleteFile(id: string) {
    const response = await fetch(`/api/dashboard/files?id=${id}`, { method: "DELETE" });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setFileMessage(data.error || "Unable to delete file.");
      return;
    }
    setFiles((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div className="min-w-0 space-y-8 overflow-x-hidden">
      <section className="grid min-w-0 gap-4 md:grid-cols-3">
        <div className="min-w-0 rounded-2xl border border-[#e3decf] bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Payment status</p>
          <p className="mt-3 text-2xl font-semibold text-[#123622]">{profile.paymentStatus || "pending"}</p>
          <p className="mt-2 break-words text-sm text-[#31513c]">{latestPayment ? `${latestPayment.label || "Registration fee"} | ${latestPayment.currency} ${latestPayment.amount / 100}` : "No payment history yet."}</p>
        </div>
        <div className="min-w-0 rounded-2xl border border-[#e3decf] bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Files</p>
          <p className="mt-3 text-2xl font-semibold text-[#123622]">{files.length}</p>
          <p className="mt-2 break-words text-sm text-[#31513c]">Resume, LinkedIn exports, certificates, and profile documents.</p>
        </div>
        <div className="min-w-0 rounded-2xl border border-[#e3decf] bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Applications</p>
          <p className="mt-3 text-2xl font-semibold text-[#123622]">{applications.length}</p>
          <p className="mt-2 break-words text-sm text-[#31513c]">Roles you have been submitted to through the Yeble desk.</p>
        </div>
      </section>

      <section className="grid min-w-0 gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <form onSubmit={saveProfile} className="min-w-0 overflow-hidden rounded-3xl border border-[#e3decf] bg-white p-4 shadow-sm sm:p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Registrant profile</p>
          <h2 className="mt-2 break-words text-2xl font-semibold text-[#123622]">Manage your profile</h2>
          <div className="mt-6 grid min-w-0 gap-4 md:grid-cols-2">
            {[
              ["name", "Full name"],
              ["email", "Email"],
              ["phone", "Phone number"],
              ["currentCity", "Current city"],
              ["headline", "Headline"],
              ["experienceLevel", "Experience level"],
              ["serviceInterest", "Service interest"],
              ["linkedin", "LinkedIn URL"],
              ["resumeUrl", "Resume URL"],
            ].map(([key, label]) => (
              <input
                key={key}
                className="min-w-0 w-full rounded-2xl border border-[#d6d1c1] px-4 py-3 text-sm text-[#123622] outline-none"
                placeholder={label}
                value={profile[key as keyof CandidateProfile] as string}
                onChange={(event) => setProfile((current) => ({ ...current, [key]: event.target.value }))}
                disabled={key === "email"}
              />
            ))}
            <textarea
              className="min-h-32 min-w-0 w-full rounded-2xl border border-[#d6d1c1] px-4 py-3 text-sm text-[#123622] outline-none md:col-span-2"
              placeholder="Add notes about roles, locations, or salary expectations"
              value={profile.note}
              onChange={(event) => setProfile((current) => ({ ...current, note: event.target.value }))}
            />
          </div>
          <div className="mt-5 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" disabled={savingProfile} className="w-full rounded-full bg-[#27c06b] px-6 py-3 text-sm font-semibold text-white disabled:opacity-70 sm:w-auto">
              {savingProfile ? "Saving profile..." : "Save profile"}
            </button>
            {profileMessage ? <p className="min-w-0 break-words text-sm text-[#31513c]">{profileMessage}</p> : null}
          </div>
        </form>

        <div className="min-w-0 overflow-hidden rounded-3xl border border-[#e3decf] bg-white p-4 shadow-sm sm:p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Files</p>
          <h2 className="mt-2 break-words text-2xl font-semibold text-[#123622]">Resume and documents</h2>
          <label className="mt-6 inline-flex max-w-full cursor-pointer items-center justify-center rounded-full border border-[#d6d1c1] px-5 py-3 text-sm font-semibold text-[#123622]">
            {uploadingFile ? "Uploading..." : "Upload file"}
            <input type="file" className="hidden" onChange={uploadFile} disabled={uploadingFile} />
          </label>
          {fileMessage ? <p className="mt-3 break-words text-sm text-[#31513c]">{fileMessage}</p> : null}
          <div className="mt-5 space-y-3">
            {files.length ? (
              files.map((file) => (
                <div key={file.id} className="min-w-0 rounded-2xl border border-[#e3decf] bg-[#fffdf6] p-4">
                  <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="break-all font-semibold text-[#123622]">{file.name}</p>
                      <a href={`/api/dashboard/files/open?id=${file.id}`} target="_blank" rel="noreferrer" className="mt-1 inline-block break-all text-sm text-[#2d6a3e] underline">
                        Open file
                      </a>
                    </div>
                    <button type="button" onClick={() => deleteFile(file.id)} className="shrink-0 text-left text-sm text-[#8c2d2d] sm:text-right">
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-[#d6d1c1] p-4 text-sm text-[#56705d]">
                No files uploaded yet.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid min-w-0 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="min-w-0 overflow-hidden rounded-3xl border border-[#e3decf] bg-white p-4 shadow-sm sm:p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Payment history</p>
          <h2 className="mt-2 break-words text-2xl font-semibold text-[#123622]">Recent transactions</h2>
          <div className="mt-6 space-y-3">
            {payments.length ? (
              payments.map((payment) => (
                <div key={payment.id} className="min-w-0 rounded-2xl border border-[#e3decf] bg-[#fffdf6] p-4">
                  <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="break-words font-semibold text-[#123622]">{payment.label || "Registration payment"}</p>
                      <p className="break-words text-sm text-[#31513c]">{payment.currency} {payment.amount / 100}</p>
                      <p className="break-all text-sm text-[#31513c]">Reference: {payment.reference || "Awaiting"}</p>
                    </div>
                    <span className="w-fit rounded-full border border-[#d6d1c1] px-3 py-1 text-xs text-[#2d6a3e]">{payment.status}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-[#d6d1c1] p-4 text-sm text-[#56705d]">
                No payment records yet.
              </div>
            )}
          </div>
        </div>

        <div className="min-w-0 overflow-hidden rounded-3xl border border-[#e3decf] bg-white p-4 shadow-sm sm:p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Applications</p>
          <h2 className="mt-2 break-words text-2xl font-semibold text-[#123622]">Role history</h2>
          <div className="mt-6 space-y-3">
            {applications.length ? (
              applications.map((application) => (
                <div key={application.id} className="min-w-0 rounded-2xl border border-[#e3decf] bg-[#fffdf6] p-4">
                  <p className="break-words font-semibold text-[#123622]">{application.jobTitle}</p>
                  <p className="break-words text-sm text-[#31513c]">{application.company}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full border border-[#d6d1c1] px-3 py-1 text-[#2d6a3e]">{application.status}</span>
                    <span className="text-[#56705d]">{new Date(application.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-[#d6d1c1] p-4 text-sm text-[#56705d]">
                No applications recorded yet.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
