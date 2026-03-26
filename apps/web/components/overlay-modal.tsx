"use client";

import { ReactNode, useEffect } from "react";

type OverlayModalProps = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
  widthClassName?: string;
};

export function OverlayModal({
  open,
  title,
  description,
  onClose,
  children,
  widthClassName = "max-w-2xl",
}: OverlayModalProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f2918]/45 px-4 py-6 backdrop-blur-sm">
      <div className={`relative w-full ${widthClassName} overflow-hidden rounded-[2rem] border border-[#d8e5d9] bg-[#fffef7] shadow-[0_30px_80px_rgba(15,41,24,0.22)]`}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d6d1c1] bg-white text-lg text-[#123622] transition hover:border-[#2d6a3e]"
          aria-label="Close modal"
        >
          ×
        </button>
        <div className="border-b border-[#ebe4d2] px-6 pb-5 pt-6 md:px-8">
          <p className="text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Yeble Careers</p>
          <h2 className="mt-3 text-2xl font-semibold text-[#123622]">{title}</h2>
          {description ? <p className="mt-2 max-w-2xl text-sm leading-7 text-[#31513c]">{description}</p> : null}
        </div>
        <div className="px-6 py-6 md:px-8">{children}</div>
      </div>
    </div>
  );
}
