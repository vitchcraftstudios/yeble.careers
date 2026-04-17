import HomeClient from "./home-client";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Recruitment Agency in Dehradun for Employers and Job Seekers",
  description:
    "Yeble Careers helps employers hire and job seekers find opportunities across Dehradun, Uttarakhand, Noida, Gurugram, Chandigarh, Haryana, Himachal Pradesh, and nearby North India markets.",
  keywords: [
    "recruitment agency Dehradun",
    "placement consultancy Uttarakhand",
    "jobs in North India",
    "hiring agency for Noida and Gurugram",
    "employment agency in Dehradun",
  ],
});

export default function HomePage() {
  return <HomeClient />;
}
