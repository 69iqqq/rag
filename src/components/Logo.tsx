import Link from "next/link";

/** Brand mark: a folded document with a spark, rendered as a glassy tile. */
export default function Logo({ href = "/", compact = false }: { href?: string; compact?: boolean }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2.5 rounded-full text-[15px] font-semibold tracking-[-0.02em] text-fg"
      aria-label="Resume Analyzer home"
    >
      <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-[10px] bg-gradient-to-b from-[#3a8bff] to-[#0062d6] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_2px_6px_rgb(0_98_214/0.35)] transition-transform duration-300 group-hover:scale-105">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M9 13h6M9 17h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      </span>
      {!compact && <span>Resume Analyzer</span>}
    </Link>
  );
}
