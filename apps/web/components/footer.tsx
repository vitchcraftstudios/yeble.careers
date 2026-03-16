import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-[#04140c] text-lime-100/75">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-sm md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Yeble.careers logo" width={140} height={46} className="h-10 w-auto" />
            <p className="text-lime-200 uppercase tracking-[0.2em] text-xs">Yeble Careers</p>
          </div>
          <p>Founded 2026 · HQ: Selaqui, Dehradun, Uttarakhand</p>
          <p>Coverage: Uttarakhand · Uttar Pradesh · Haryana · Himachal Pradesh</p>
          <p className="text-lime-100/60">© {year} Yeble Careers</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/about" className="hover:text-lime-200">
            About
          </Link>
          <Link href="/services" className="hover:text-lime-200">
            Services
          </Link>
          <Link href="/jobs" className="hover:text-lime-200">
            Jobs
          </Link>
          <Link href="/contact" className="hover:text-lime-200">
            Contact
          </Link>
          <Link href="/signin" className="hover:text-lime-200">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
