"use client";

import { ReactNode, useEffect } from "react";

type OverlayModalProps = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
  widthClassName?: string;
  showCloseButton?: boolean;
};

export function OverlayModal({
  open,
  title,
  description,
  onClose,
  children,
  widthClassName = "max-w-2xl",
  showCloseButton = true,
}: OverlayModalProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showCloseButton) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose, showCloseButton]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0f2918]/45 px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-6">
      <div className="flex min-h-full items-start justify-center sm:items-center">
        <div
          className={`relative w-full ${widthClassName} max-h-[calc(100dvh-1.5rem)] overflow-hidden rounded-[1.75rem] border border-[#d8e5d9] bg-[#fffef7] shadow-[0_30px_80px_rgba(15,41,24,0.22)] sm:max-h-[calc(100dvh-3rem)] sm:rounded-[2rem]`}
        >
          {showCloseButton ? (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d6d1c1] bg-white text-lg text-[#123622] transition hover:border-[#2d6a3e] sm:right-4 sm:top-4"
              aria-label="Close modal"
            >
              ×
            </button>
          ) : null}
          <div className="flex max-h-[calc(100dvh-1.5rem)] flex-col sm:max-h-[calc(100dvh-3rem)]">
            <div className="border-b border-[#ebe4d2] px-4 pb-4 pt-5 sm:px-6 sm:pb-5 sm:pt-6 md:px-8">
              <p className="pr-12 text-xs uppercase tracking-[0.24em] text-[#2d6a3e]">Yeble Careers</p>
              <h2 className="mt-3 pr-12 text-xl font-semibold leading-tight text-[#123622] sm:text-2xl">{title}</h2>
              {description ? <p className="mt-2 pr-8 text-sm leading-6 text-[#31513c] sm:max-w-2xl sm:leading-7">{description}</p> : null}
            </div>
            <div className="overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 md:px-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
