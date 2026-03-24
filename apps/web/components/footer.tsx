import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-700">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Image src="/logo.svg" alt="Yeble.careers logo" width={180} height={60} className="h-12 w-auto grayscale" />
          <p>(c) {year} Yeble Careers. Recruitment operations from Selaqui, Dehradun.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/about" className="hover:text-[#163b66]">About</Link>
          <Link href="/services" className="hover:text-[#163b66]">Services</Link>
          <Link href="/jobs" className="hover:text-[#163b66]">Jobs</Link>
          <Link href="/contact" className="hover:text-[#163b66]">Contact</Link>
          <Link href="/signin?callbackUrl=/jobs" className="hover:text-[#163b66]">Registrant Login</Link>
          <Link href="/signin?callbackUrl=/admin" className="hover:text-[#163b66]">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}
