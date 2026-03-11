import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/jobs", label: "Jobs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  return (
    <header className="relative z-20 border-b border-white/10 bg-[#0a2918]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-[0.22em] uppercase text-lime-200">
          Yeble Careers
        </Link>
        <nav className="flex flex-wrap items-center gap-3 text-sm text-lime-100/80">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-lime-200">
              {link.label}
            </Link>
          ))}
          <Link
            href="/signin"
            className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-lime-50 hover:border-lime-300/70"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
