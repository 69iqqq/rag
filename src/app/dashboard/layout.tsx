import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, FileText, Settings, Upload } from "lucide-react";
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
      name = profile.full_name.split(" ")[0]; // First name only
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row relative max-w-7xl mx-auto w-full">
       <div className="ambient-light bg-blue-500/10 w-[40vw] h-[40vw] -left-[10%] top-[10%]" />
       
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col gap-6 px-6 py-8 border-r border-line">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted mb-1">Welcome back</p>
          <h2 className="text-xl font-semibold text-fg truncate">{name}</h2>
        </div>

        <nav className="flex flex-col gap-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-subtle hover:bg-bg-soft hover:text-fg transition-colors"
          >
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </Link>
          <Link
            href="/dashboard/upload"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-subtle hover:bg-bg-soft hover:text-fg transition-colors"
          >
            <Upload className="h-4 w-4" />
            New Analysis
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-subtle hover:bg-bg-soft hover:text-fg transition-colors"
          >
            <FileText className="h-4 w-4" />
            My Resumes
          </Link>
          {/* <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-subtle hover:bg-bg-soft hover:text-fg transition-colors"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link> */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 relative z-10 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
