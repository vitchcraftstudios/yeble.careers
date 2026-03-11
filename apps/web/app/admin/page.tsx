import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function AdminPage() {
  const { userId } = auth();
  if (!userId) redirect("/signin");

  const user = await currentUser();
  const role = user?.publicMetadata?.role;
  if (role && role !== "ADMIN") redirect("/signin");

  const metrics = [
    { label: "Open roles", value: "18", delta: "+3 this week" },
    { label: "Active candidates", value: "126", delta: "+14 interviewing" },
    { label: "Avg. time to shortlist", value: "2.4 days", delta: "↓ 0.6 day" },
    { label: "Offer acceptance", value: "78%", delta: "↑ 6% vs last month" },
  ];

  const roles = [
    { title: "Full‑stack Engineer", company: "GrowthOps", city: "Remote · US", stage: "Interview", slots: 3 },
    { title: "Product Designer", company: "Northwind", city: "NYC", stage: "Shortlist", slots: 2 },
    { title: "Data Analyst", company: "Helio Labs", city: "Remote · EU", stage: "Offer", slots: 1 },
  ];

  const candidates = [
    { name: "Priya Narang", role: "Product Designer", stage: "Portfolio review", eta: "Today" },
    { name: "Luis Ortega", role: "Full‑stack Engineer", stage: "Tech screen", eta: "In 2h" },
    { name: "Emma Walsh", role: "Data Analyst", stage: "Hiring manager", eta: "Tomorrow" },
    { name: "Jay Park", role: "Solutions Eng", stage: "Offer review", eta: "Awaiting" },
  ];

  const pipeline = [
    { label: "Inbound", value: 312, accent: "from-lime-300/90 via-emerald-300/60 to-yellow-200/70" },
    { label: "Shortlisted", value: 87, accent: "from-amber-200/80 via-lime-200/80 to-emerald-300/80" },
    { label: "Interviewing", value: 46, accent: "from-cyan-200/80 via-emerald-200/80 to-lime-200/80" },
    { label: "Offers", value: 12, accent: "from-lime-200/80 via-yellow-200/80 to-amber-200/80" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03110a] via-[#062314] to-[#0a3a1a] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,#2dfb9c22,transparent_28%),radial-gradient(circle_at_82%_12%,#dffb5f1c,transparent_30%),radial-gradient(circle_at_60%_78%,#1bb86a1f,transparent_30%)]" />
      <div className="relative mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-lime-200/80">Admin</p>
            <h1 className="text-3xl font-semibold text-lime-50">Operations Dashboard</h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-lime-100/80 shadow-lg shadow-emerald-500/10">
            <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
            {user?.primaryEmailAddress?.emailAddress ||
              user?.phoneNumbers?.[0]?.phoneNumber ||
              "Signed in"}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_80px_rgba(20,255,140,0.08)] backdrop-blur"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-lime-200/70">{metric.label}</p>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-3xl font-semibold text-lime-50">{metric.value}</span>
                <span className="text-xs rounded-full bg-white/10 px-3 py-1 text-lime-100/80">{metric.delta}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_25px_90px_rgba(20,255,140,0.12)] backdrop-blur">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-lime-100">Open roles</h2>
              <span className="text-xs text-lime-200/70">Refreshing hourly</span>
            </div>
            <div className="mt-4 space-y-3">
              {roles.map((role) => (
                <div
                  key={role.title}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-lime-50">{role.title}</p>
                    <p className="text-xs text-lime-100/70">
                      {role.company} · {role.city}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-lime-100">{role.stage}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-lime-200/80">{role.slots} slots</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-lime-100">Pipeline today</h2>
              <span className="text-xs text-lime-200/70">Live</span>
            </div>
            <div className="mt-4 space-y-3">
              {pipeline.map((stage) => (
                <div key={stage.label}>
                  <div className="flex justify-between text-sm text-lime-100/80">
                    <span>{stage.label}</span>
                    <span className="font-semibold text-lime-50">{stage.value}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full w-full bg-gradient-to-r ${stage.accent}`}
                      style={{ width: `${Math.min(stage.value, 120)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-white/5 bg-[#0b2716] px-4 py-3 text-xs text-lime-100/80">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                94% of interviews scheduled on time today.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-lime-100">Candidate feed</h2>
              <span className="text-xs text-lime-200/70">Next 24h</span>
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead className="bg-white/5 text-lime-200/70">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Candidate</th>
                    <th className="px-4 py-3 text-left font-medium">Role</th>
                    <th className="px-4 py-3 text-left font-medium">Stage</th>
                    <th className="px-4 py-3 text-left font-medium">ETA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-white/5">
                  {candidates.map((candidate) => (
                    <tr key={candidate.name} className="hover:bg-white/5">
                      <td className="px-4 py-3 text-lime-50">{candidate.name}</td>
                      <td className="px-4 py-3 text-lime-100/80">{candidate.role}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-xs text-lime-100">
                          {candidate.stage}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-lime-100/70">{candidate.eta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-lime-100">Ops checklist</h2>
              <span className="text-xs text-lime-200/70">Today</span>
            </div>
            <div className="mt-4 space-y-3 text-sm text-lime-50">
              {[
                "Push new SFDC webhook to capture inbound leads",
                "Upload design candidates for Northwind sprint",
                "Send offer packets for Solutions Eng cohort",
                "Archive rejected profiles older than 30 days",
              ].map((task) => (
                <label
                  key={task}
                  className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 transition hover:border-lime-200/40"
                >
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent text-lime-300" />
                  <span className="text-lime-100/85">{task}</span>
                </label>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-lime-300/30 bg-lime-300/10 px-4 py-3 text-xs text-lime-50">
              Tip: align interviewers in local time before you launch the slot invites.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
