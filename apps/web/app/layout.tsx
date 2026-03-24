import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";
import "./globals.css";
import Splash from "./(auth)/splash";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yeble.careers - Accelerate your Placement",
  description: "Premium recruitment and staffing support across North India from our Selaqui, Dehradun HQ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
          <Splash />
          <SiteNav />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
