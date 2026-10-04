import { ReactNode } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let name = "User";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();
    if (profile?.full_name) {
      name = profile.full_name.split(" ")[0];
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row relative max-w-6xl mx-auto w-full">
       <div className="ambient-light bg-blue-500/5 w-[40vw] h-[40vw] -left-[10%] top-[10%]" />
       
      <aside className="hidden md:flex w-56 flex-col gap-8 px-6 py-12 border-r border-line">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted mb-2">Workspace</p>
          <h2 className="text-lg font-semibold text-fg truncate">Good morning, {name}.</h2>
        </div>

        <nav className="flex flex-col gap-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium bg-bg-soft text-fg transition-colors"
          >
            My Resumes
          </Link>
          <Link
            href="/templates"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-subtle hover:bg-bg-soft hover:text-fg transition-colors"
          >
            Templates
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-subtle hover:bg-bg-soft hover:text-fg transition-colors"
          >
            Settings
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-10 relative z-10 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
