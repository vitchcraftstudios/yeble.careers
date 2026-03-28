"use client";

import { usePathname } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";
import { FloatingActions } from "@/components/floating-actions";

const hiddenChromePrefixes = ["/dashboard", "/admin", "/signin", "/signup", "/auth-complete"];

function useHideChrome() {
  const pathname = usePathname();
  return hiddenChromePrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function SiteHeaderChrome() {
  const hideChrome = useHideChrome();

  if (hideChrome) {
    return null;
  }

  return <SiteNav />;
}

export function SiteFloatingChrome() {
  const hideChrome = useHideChrome();

  if (hideChrome) {
    return null;
  }

  return <FloatingActions />;
}

export function SiteFooterChrome() {
  const hideChrome = useHideChrome();

  if (hideChrome) {
    return null;
  }

  return <Footer />;
}
