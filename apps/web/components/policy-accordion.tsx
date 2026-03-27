"use client";

import { useState } from "react";

type PolicySection = {
  title: string;
  content: string[];
};

type PolicyAccordionProps = {
  sections: PolicySection[];
};

function PolicyToggleIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d8e5d9] bg-[#f5fbf6] text-[#2d6a3e]">
      <span className={`block h-0.5 w-4 rounded-full bg-current transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`} />
      <span className={`absolute block h-4 w-0.5 rounded-full bg-current transition-transform duration-300 ${open ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"}`} />
    </span>
  );
}

export function PolicyAccordion({ sections }: PolicyAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {sections.map((section, index) => {
        const isOpen = index === openIndex;

        return (
          <article key={section.title} className="overflow-hidden rounded-[1.5rem] border border-[#e3decf] bg-[#fffdf6]">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
            >
              <span className="text-base font-semibold leading-7 text-[#123622] sm:text-lg">{section.title}</span>
              <PolicyToggleIcon open={isOpen} />
            </button>
            <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-80"}`}>
              <div className="overflow-hidden">
                <div className="border-t border-[#ebe4d2] px-5 py-4 text-sm leading-7 text-[#31513c] sm:px-6 sm:py-5 sm:text-base">
                  {section.content.map((paragraph) => (
                    <p key={paragraph} className="mb-3 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
