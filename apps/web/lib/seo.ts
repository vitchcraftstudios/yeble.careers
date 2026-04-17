import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const businessName = "Yeble Careers";
export const defaultTitle = "Yeble Careers | Recruitment Agency in Dehradun for North India Hiring";
export const defaultDescription =
  "Yeble Careers is a Dehradun-based recruitment and placement agency supporting employers and job seekers across Uttarakhand, Uttar Pradesh, Haryana, Himachal Pradesh, Noida, Gurugram, Chandigarh, and nearby North India hiring corridors.";

export const coreLocations = [
  "Dehradun",
  "Uttarakhand",
  "Uttar Pradesh",
  "Haryana",
  "Himachal Pradesh",
  "Noida",
  "Gurugram",
  "Chandigarh",
  "Mohali",
];

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const url = new URL(path, `${siteUrl}/`).toString();

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: businessName,
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}
