import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/signin");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03120a] via-[#052511] to-[#0b3b1b] text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-lime-200">Admin</p>
            <h1 className="text-3xl font-semibold text-lime-50">Dashboard</h1>
          }
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-lime-100/80">
            {(session.user as any).email}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold text-lime-100">Jobs</h2>
            <p className="mt-2 text-sm text-lime-100/70">
              TODO: list & edit jobs. This placeholder confirms admin access works.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold text-lime-100">Applications</h2>
            <p className="mt-2 text-sm text-lime-100/70">
              TODO: review and update application statuses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
