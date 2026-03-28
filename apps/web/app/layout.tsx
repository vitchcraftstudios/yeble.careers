import type { Metadata, Viewport } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SiteFloatingChrome, SiteFooterChrome, SiteHeaderChrome } from "@/components/site-chrome";
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
  title: "Yeble.careers - Accelerate your Placement",
  description: "Permanent & contract hiring across tech, product, analytics, GTM from Dehradun HQ.",
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
        <body
          className={`${brandSans.variable} ${geistMono.variable} antialiased`}
        >
          <Splash />
          <SiteHeaderChrome />
          {children}
          <SiteFloatingChrome />
          <SiteFooterChrome />
        </body>
      </html>
    </ClerkProvider>
  );
}




