import Link from "next/link";
import { PolicyAccordion } from "@/components/policy-accordion";

type PolicySection = {
  title: string;
  content: readonly string[];
};

type PolicyPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: readonly PolicySection[];
};

export function PolicyPage({ eyebrow, title, intro, sections }: PolicyPageProps) {
  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-[#e3decf] bg-white/95 p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#2d6a3e]">{eyebrow}</p>
          <h1 className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em] text-[#123622] sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-8 text-[#31513c] sm:text-lg">{intro}</p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
          <aside className="rounded-[1.75rem] border border-[#e8e1cd] bg-[#fffdf6] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[#2d6a3e]">Need help?</p>
            <p className="mt-3 text-sm leading-7 text-[#31513c]">
              If you need clarity before making a payment or sharing your details, our team is happy to help in a straightforward way.
            </p>
            <div className="mt-5 space-y-3 text-sm text-[#123622]">
              <a className="block rounded-2xl border border-[#e3decf] bg-white px-4 py-3 hover:border-[#2d6a3e]" href="mailto:growth@yeble.careers">
                growth@yeble.careers
              </a>
              <a className="block rounded-2xl border border-[#e3decf] bg-white px-4 py-3 hover:border-[#2d6a3e]" href="tel:+919429692113">
                +91 94296 92113
              </a>
            </div>
            <div className="mt-5 rounded-2xl bg-[#f5fbf6] px-4 py-4 text-sm leading-7 text-[#31513c]">
              We review policy-related questions during normal business hours and aim to respond as quickly as possible.
            </div>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center rounded-full border border-[#d6d1c1] px-5 py-3 text-sm font-semibold text-[#123622] transition hover:border-[#2d6a3e]"
            >
              Contact our team
            </Link>
          </aside>

          <PolicyAccordion sections={sections} />
        </div>
      </section>
    </main>
  );
}

