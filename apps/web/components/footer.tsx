import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#dcd8cf] bg-[#f5f4ef] text-[#0f2c1c]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-sm md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Yeble.careers logo"
              width={180}
              height={60}
              className="h-12 w-auto filter grayscale"
            />
          </div>
          <p className="text-[#2f4a35]/70">© {year} Yeble - Accelerate your Placement</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/about" className="hover:text-[#1c3e2a]">
            About
          </Link>
          <Link href="/services" className="hover:text-[#1c3e2a]">
            Services
          </Link>
          <Link href="/jobs" className="hover:text-[#1c3e2a]">
            Jobs
          </Link>
          <Link href="/contact" className="hover:text-[#1c3e2a]">
            Contact
          </Link>
          <Link href="/terms-conditions" className="hover:text-[#1c3e2a]">
            Terms & Conditions
          </Link>
          <Link href="/privacy-policy" className="hover:text-[#1c3e2a]">
            Privacy Policy
          </Link>
          <Link href="/refund-policy" className="hover:text-[#1c3e2a]">
            Refund Policy
          </Link>
          <Link href="/accessibility" className="hover:text-[#1c3e2a]">
            Accessibility
          </Link>
          <Link href="/signin" className="hover:text-[#1c3e2a]">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
