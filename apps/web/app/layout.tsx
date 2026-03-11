import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";
import dynamic from "next/dynamic";
import "./globals.css";

const Splash = dynamic(() => import("./(auth)/splash"), { ssr: false });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yeble.careers - Accelerate your Placement",
  description: "Permanent & contract hiring across tech, product, analytics, GTM from Dehradun HQ.",
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
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Splash />
          <SiteNav />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
