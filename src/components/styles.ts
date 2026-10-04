// Liquid Glass Tokens
const btnBase = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]";

export const btnPrimary = `${btnBase} bg-fg text-bg hover:bg-fg/90 shadow-sm`;
export const btnSecondary = `${btnBase} glass-layer border border-line text-fg hover:bg-bg-soft hover:border-muted`;
export const btnGhost = `${btnBase} text-subtle hover:bg-bg-soft hover:text-fg`;
export const btnDanger = `${btnBase} bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-500 dark:hover:bg-red-500/20`;

export const inputClass = "block w-full rounded-xl border border-line bg-bg-soft/50 px-4 py-3 text-sm text-fg placeholder:text-muted transition-all duration-300 focus:border-accent focus:bg-bg focus:outline-none focus:ring-1 focus:ring-accent";
export const labelClass = "text-sm font-medium text-fg";

export const cardClass = "glass-layer rounded-2xl p-6 md:p-8 border border-line shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none";

export function scoreTone(score: number): { text: string; bg: string; border: string; icon: string } {
  if (score >= 80) return { text: "text-green-600", bg: "bg-green-500/10", border: "border-green-500/20", icon: "text-green-500" };
  if (score >= 60) return { text: "text-amber-600", bg: "bg-amber-500/10", border: "border-amber-500/20", icon: "text-amber-500" };
  return { text: "text-red-600", bg: "bg-red-500/10", border: "border-red-500/20", icon: "text-red-500" };
}
