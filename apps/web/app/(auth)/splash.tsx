"use client";

import { useEffect, useState } from "react";

export default function Splash() {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHide(true), 2200);
    return () => clearTimeout(t);
  }, []);

  if (hide) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#03120a] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#2cff9188,transparent_30%),radial-gradient(circle_at_75%_20%,#dffb5f55,transparent_32%),radial-gradient(circle_at_65%_80%,#24c86c55,transparent_28%)] blur-3xl opacity-80 animate-sway" />
      <div className="absolute inset-0 bg-[linear-gradient(150deg,#071c10,#06260f_45%,#0b3618)] opacity-85" />
      <div className="absolute inset-[-20%] bg-grid" />
      <div className="relative w-[520px] max-w-[92vw] rounded-[32px] border border-lime-300/50 bg-white/10 px-10 py-12 shadow-[0_25px_120px_rgba(90,255,130,0.35)] backdrop-blur-2xl">
        <div className="flex flex-col items-center gap-3 text-center">
          <img src="/logo.svg" alt="Yeble.careers" className="h-14 w-auto" />
          <span className="text-sm uppercase tracking-[0.32em] text-lime-200">Accelerate your Placement</span>
        </div>
        <div className="mt-8 h-4 w-full overflow-hidden rounded-full bg-white/15 shadow-inner">
          <div className="progress-bar h-full w-full rounded-full bg-gradient-to-r from-lime-300 via-yellow-300 to-lime-400" />
        </div>
        <p className="mt-5 text-base text-lime-50/85">Loading the Dehradun HQ experience…</p>
      </div>
    </div>
  );
}
