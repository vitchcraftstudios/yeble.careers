import { prisma } from "@/lib/prisma";

type SiteContentSeed = {
  id: string;
  title: string;
  body: string;
  mediaUrl: string | null;
};

export const defaultSiteContent: SiteContentSeed[] = [
  {
    id: "home-hero-title",
    title: "Home - Hero Title",
    body: "Powering Companies With Talent That Drives Real Growth.",
    mediaUrl: null,
  },
  {
    id: "home-hero-summary",
    title: "Home - Hero Summary",
    body: "Founded in 2026 from Selaqui, Dehradun, Yeble works across Uttarakhand, Uttar Pradesh, Haryana, and Himachal Pradesh with practical hiring support, tighter follow-up, and clearer communication.",
    mediaUrl: null,
  },
  {
    id: "home-testimonials-heading",
    title: "Home - Testimonials Heading",
    body: "What people say about working with Yeble",
    mediaUrl: null,
  },
  {
    id: "services-page-intro",
    title: "Services - Intro",
    body: "Strategic Talent Solutions Rooted in Regional Insight, Built for Professional Growth.",
    mediaUrl: null,
  },
  {
    id: "services-page-summary",
    title: "Services - Summary",
    body: "Yeble Careers works from Dehradun and supports both employers and job seekers across North India. Our services are built around practical hiring needs, honest communication, and a simple idea that good roles should reach the right people without unnecessary confusion or delay.",
    mediaUrl: null,
  },
  {
    id: "services-page-media",
    title: "Services - Hero Media",
    body: "Primary supporting media for the services page.",
    mediaUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "jobs-page-intro",
    title: "Jobs - Intro",
    body: "Updated regularly. Candidates can currently apply or reach out via growth@yeble.careers.",
    mediaUrl: null,
  },
  {
    id: "about-page-title",
    title: "About - Hero Title",
    body: "Your Partner in Building Resilient Teams for Emerging Growth Corridors.",
    mediaUrl: null,
  },
  {
    id: "about-page-summary",
    title: "About - Summary",
    body: "Yeble Careers started in 2026 with a simple belief: strong companies deserve better hiring support, and good candidates deserve access to genuine opportunities. From our Dehradun base, we work closely with employers and job seekers to make hiring more transparent, faster, and more dependable across regional and growth markets.",
    mediaUrl: null,
  },
  {
    id: "contact-page-title",
    title: "Contact - Hero Title",
    body: "Partner with our Strategic Placement Hub",
    mediaUrl: null,
  },
  {
    id: "contact-page-summary",
    title: "Contact - Summary",
    body: "Employers can share open mandates, team expansion plans, and hiring timelines. Candidates may send their profile, preferred location, and Job ID for faster screening support. Our team works with employers across Uttarakhand, Uttar Pradesh, Haryana, and Himachal Pradesh.",
    mediaUrl: null,
  },
];

function toMap(items: SiteContentSeed[]) {
  return Object.fromEntries(items.map((item) => [item.id, item])) as Record<string, SiteContentSeed>;
}

export const defaultSiteContentMap = toMap(defaultSiteContent);

export async function getSiteContentMap() {
  const dbItems = await prisma.siteContent.findMany().catch(() => []);
  const map = { ...defaultSiteContentMap };

  for (const item of dbItems) {
    map[item.id] = {
      id: item.id,
      title: item.title,
      body: item.body,
      mediaUrl: item.mediaUrl,
    };
  }

  return map;
}