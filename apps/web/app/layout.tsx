import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Geist_Mono, Manrope } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SiteFloatingChrome, SiteFooterChrome, SiteHeaderChrome } from "@/components/site-chrome";
import { NavigationProgress } from "@/components/navigation-progress";
import { getSiteUrl } from "@/lib/site-url";
import { absoluteUrl, businessName, coreLocations, defaultDescription, defaultTitle } from "@/lib/seo";
import "./globals.css";
import Splash from "./(auth)/splash";

const brandSans = Manrope({
  variable: "--font-brand-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: defaultTitle,
    template: `%s | ${businessName}`,
  },
  description: defaultDescription,
  applicationName: businessName,
  referrer: "origin-when-cross-origin",
  keywords: [
    "recruitment agency in Dehradun",
    "placement agency in Dehradun",
    "North India recruitment agency",
    "jobs in Dehradun",
    "hiring in Uttarakhand",
    "staffing agency in Uttarakhand",
    "recruitment services for Noida and Gurugram",
    ...coreLocations,
  ],
  category: "business",
  authors: [{ name: businessName }],
  creator: businessName,
  publisher: businessName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: absoluteUrl("/"),
    siteName: businessName,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icon.svg",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${brandSans.variable} ${geistMono.variable} antialiased`}>
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([
                {
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  name: businessName,
                  url: absoluteUrl("/"),
                  logo: absoluteUrl("/logo.svg"),
                  email: "growth@yeble.careers",
                  telephone: "+91 94296 92113",
                  sameAs: [
                    "https://www.facebook.com/yeble.careers",
                    "https://www.instagram.com/yeble.careers",
                  ],
                  areaServed: coreLocations,
                },
                {
                  "@context": "https://schema.org",
                  "@type": "EmploymentAgency",
                  name: businessName,
                  url: absoluteUrl("/"),
                  image: absoluteUrl("/logo.svg"),
                  description: defaultDescription,
                  telephone: "+91 94296 92113",
                  email: "growth@yeble.careers",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Dehradun",
                    addressRegion: "Uttarakhand",
                    postalCode: "248015",
                    addressCountry: "IN",
                    streetAddress: "Sudhowala",
                  },
                  areaServed: coreLocations,
                },
                {
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  name: businessName,
                  url: absoluteUrl("/"),
                  inLanguage: "en-IN",
                },
              ]),
            }}
          />
          <Splash />
          <Suspense fallback={null}>
            <NavigationProgress />
          </Suspense>
          <SiteHeaderChrome />
          {children}
          <SiteFloatingChrome />
          <SiteFooterChrome />
        </body>
      </html>
    </ClerkProvider>
  );
}
