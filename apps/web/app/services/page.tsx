import Link from "next/link";
import { Montserrat } from "next/font/google";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  Database,
  Globe2,
  MapPinned,
  PanelsTopLeft,
  Route,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { IntakeCallDialog } from "@/components/intake-call-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata = {
  title: "Services | Yeble Careers",
};

const services = [
  {
    title: "End-to-end Talent Acquisition",
    eyebrow: "Permanent Hiring",
    description:
      "Built for SDE, product design, analytics, and data hiring with recruiter-led screening, interview orchestration, and offer closure.",
    points: [
      "72-hour Shortlisting Guarantee for active mandates with aligned intake.",
      "Structured screening for SDE, Designers, Data, Product, and platform roles.",
      "Calibrated scorecards, stakeholder syncs, and offer management from one team.",
    ],
  },
  {
    title: "Flexible Staffing & Payroll Management",
    eyebrow: "Contract Hiring",
    description:
      "Delivery-ready tech staffing with payroll support, location coverage, and bench visibility for programs that need speed without compliance gaps.",
    points: [
      "Compliance-ready contracts and payroll coordination for audit comfort.",
      "Bench strength for rapid deployment across engineering, support, and delivery pods.",
      "Hybrid, onsite, and metro-linked staffing coverage with employer coordination.",
    ],
  },
  {
    title: "Executive Search & Headhunting",
    eyebrow: "Leadership Hiring",
    description:
      "Focused search for Director and VP-level mandates with a disciplined market map, compensation narrative, and founder-ready shortlist.",
    points: [
      "Director and VP-level placements across Engineering, Product, Data, and GTM.",
      "Weekly market mapping updates with longlist movement and response signals.",
      "High-trust outreach, compensation benchmarking, and candidate positioning support.",
    ],
  },
];

const regions = [
  { name: "Uttarakhand", note: "Dehradun, Selaqui, Haridwar, Roorkee talent networks", icon: MapPinned },
  { name: "Uttar Pradesh", note: "Noida, Greater Noida, Lucknow, and growth corridors", icon: Route },
  { name: "Haryana", note: "Gurugram and industrial hiring belts with tech support roles", icon: Building2 },
  { name: "Himachal Pradesh", note: "Emerging regional talent pools for remote-first teams", icon: Globe2 },
  { name: "Metro Hubs", note: "Delhi NCR, Bengaluru, Hyderabad, Pune, Mumbai, Chennai", icon: BriefcaseBusiness },
  { name: "Pan-India Coordination", note: "IST-first hiring ops with overlap for global stakeholders", icon: UsersRound },
];

const dashboardReadiness = [
  {
    value: "Registrant Dashboard",
    title: "Candidate-side intake continuity",
    description:
      "The page now has a clear conversion path that can later connect each intake request to registrant status, document prompts, and interview updates.",
    bullets: [
      "CTA language and modal flow are already framed for user account handoff.",
      "Cards can map to dashboard-specific service journeys without changing layout.",
      "Submission feedback is lightweight for fast 4G and 5G usage on mobile devices.",
    ],
    icon: PanelsTopLeft,
  },
  {
    value: "Admin Submission",
    title: "Operations-friendly intake structure",
    description:
      "The form fields are organized for a future Neon-backed submission table so recruiters can triage, assign, and respond from the Admin panel.",
    bullets: [
      "Company, SPOC, service type, and hiring brief are already segmented cleanly.",
      "The modal copy reflects the kind of intake notes recruiters need for kickoff.",
      "UI styling matches the emerging admin dashboard direction for continuity.",
    ],
    icon: Database,
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_62%,#eef5f1_100%)]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="space-y-6">
              <Badge variant="outline" className="border-[#163b66]/20 bg-[#163b66]/5 text-[#163b66]">
                Selaqui, Dehradun HQ | North India hiring partner
              </Badge>
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#123b2f]">Services</p>
                <h1 className={`${montserrat.className} max-w-4xl text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl`}>
                  Premium Recruitment & Staffing Solutions for North India&apos;s Tech Corridor.
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-slate-600">
                  We support growth-stage teams, enterprise business units, and regional employers with hiring programs
                  designed for quality, speed, and strong communication from kickoff to closure.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/contact">
                  <Button size="lg">
                    Talk to the hiring team
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/signin?callbackUrl=/jobs">
                  <Button variant="outline" size="lg">
                    Registrant Login
                  </Button>
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "HQ", value: "Selaqui, Dehradun" },
                  { label: "Speed", value: "72-hour shortlist" },
                  { label: "Coverage", value: "North India + metros" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <Card className="overflow-hidden border-slate-200 bg-white">
              <CardHeader className="border-b border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <Badge variant="secondary">4G/5G Optimized</Badge>
                    <CardTitle className="mt-3 text-2xl">Regional delivery snapshot</CardTitle>
                  </div>
                  <Sparkles className="h-6 w-6 text-[#163b66]" />
                </div>
                <CardDescription>
                  Lightweight visual panel prepared for a future Vercel Blob-served regional image without adding heavy media to the current page load.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="rounded-3xl border border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(22,59,102,0.14),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(18,59,47,0.12),_transparent_28%),linear-gradient(135deg,#f8fafc_0%,#ffffff_45%,#eef5f1_100%)] p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      "Hiring plans aligned to Delhi NCR, Dehradun, Gurugram, and Noida demand.",
                      "Built for low-bandwidth usage with text-first hierarchy and minimal motion.",
                      "Prepared to attach Blob-hosted city or corridor imagery when assets are ready.",
                      "Consistent CTA pattern for employers, registrants, and admin ops teams.",
                    ].map((item) => (
                      <div key={item} className="rounded-2xl border border-white/70 bg-white/80 p-4 text-sm leading-6 text-slate-700 shadow-sm">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#123b2f]" />
                          <span>{item}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <Clock3 className="h-5 w-5 text-[#163b66]" />
                    <p className="mt-3 text-sm font-semibold text-slate-900">Fast intake</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">A professional modal replaces fragmented enquiry text and artifact-heavy bullets.</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <ShieldCheck className="h-5 w-5 text-[#163b66]" />
                    <p className="mt-3 text-sm font-semibold text-slate-900">Compliance-ready</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">Built to support contract documentation and admin review without design rework.</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <PanelsTopLeft className="h-5 w-5 text-[#163b66]" />
                    <p className="mt-3 text-sm font-semibold text-slate-900">Dashboard-ready</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">CTA structure aligns with the upcoming registrant and admin experience.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#123b2f]">Service Lines</p>
            <h2 className={`${montserrat.className} mt-3 text-3xl font-bold text-slate-950`}>Recruitment support designed for hiring velocity and regional trust.</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            Every engagement is built around sharper intake, stronger recruiter communication, and predictable reporting for employers hiring across North India and metro hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="flex h-full flex-col border-slate-200 shadow-[0_16px_48px_rgba(15,23,42,0.06)]">
              <CardHeader>
                <Badge variant="outline" className="w-fit border-[#123b2f]/20 bg-[#123b2f]/5 text-[#123b2f]">
                  {service.eyebrow}
                </Badge>
                <CardTitle className="mt-3 text-2xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-6">
                <div className="space-y-3">
                  {service.points.map((point) => (
                    <div key={point} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#123b2f]" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <IntakeCallDialog service={service.title} />
                  <p className="text-xs leading-5 text-slate-500">Structured for future Neon submission storage and recruiter-side admin visibility.</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#163b66]">Regional Strength</p>
              <h2 className={`${montserrat.className} mt-3 text-3xl font-bold text-slate-950`}>Strong coverage across North Indian talent markets and metro hiring hubs.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              We speak the language of regional trust, local follow-up, and employer responsiveness while still operating with metro-grade process discipline.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {regions.map(({ name, note, icon: Icon }) => (
              <Card key={name} className="border-slate-200 bg-white">
                <CardContent className="p-6">
                  <Icon className="h-6 w-6 text-[#163b66]" />
                  <h3 className="mt-4 text-lg font-semibold text-slate-950">{name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#123b2f]">Platform Readiness</p>
            <h2 className={`${montserrat.className} text-3xl font-bold text-slate-950`}>Prepared for the upcoming Registrant Dashboard and Admin Submission flow.</h2>
            <p className="text-sm leading-7 text-slate-600">
              The redesigned page is not just cosmetic. It sets up a clean bridge into the operational product surfaces you are adding next, with predictable calls to action and clear state messaging.
            </p>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
              <div className="flex items-start gap-3">
                <Database className="mt-1 h-5 w-5 text-[#163b66]" />
                <p>Form structure, CTA hierarchy, and response messaging are intentionally shaped so they can map into Neon tables, recruiter queues, and later Vercel Blob-backed document or media attachments.</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue={dashboardReadiness[0].value} className="w-full">
            <TabsList>
              {dashboardReadiness.map((item) => (
                <TabsTrigger key={item.value} value={item.value}>{item.value}</TabsTrigger>
              ))}
            </TabsList>
            {dashboardReadiness.map((item) => {
              const Icon = item.icon;
              return (
                <TabsContent key={item.value} value={item.value}>
                  <Card className="border-slate-200">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-[#163b66]/8 p-3 text-[#163b66]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription>{item.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {item.bullets.map((bullet) => (
                        <div key={bullet} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#123b2f]" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>
    </div>
  );
}
