"use client";

import { usePathname } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";
import { FloatingActions } from "@/components/floating-actions";

const hiddenChromePrefixes = ["/dashboard", "/admin", "/signin", "/signup", "/auth-complete"];

export function SiteChrome() {
  const pathname = usePathname();
  const hideChrome = hiddenChromePrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  if (hideChrome) {
    return null;
  }

  return (
    <>
      <SiteNav />
      <FloatingActions />
      <Footer />
    </>
  );
}


