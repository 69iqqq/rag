import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { btnPrimary, cardClass } from "@/components/styles";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // NOTE: For now, this is a placeholder UI since we haven't created the `resumes` table yet.
  const resumes: any[] = [];

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-fg tracking-tight">My Resumes</h1>
          <p className="text-subtle text-sm mt-1">Create and manage your professional resumes.</p>
        </div>
        <Link href="/builder" className="text-[13px] font-medium bg-fg text-bg px-4 py-2 rounded-full hover:bg-fg/90 transition-colors inline-flex items-center">
          + Create New Resume
        </Link>
      </div>

      <div className="mt-12">
        {resumes.length === 0 ? (
          <div className="glass-panel border-dashed p-16 flex flex-col items-center justify-center text-center">
            <h3 className="text-fg font-medium mb-2 text-lg">You haven't created a resume yet.</h3>
            <p className="text-subtle text-sm max-w-sm mb-8">
              Start building a professional resume in minutes with our templates and live editor.
            </p>
            <Link href="/builder" className={btnPrimary}>
              Create Resume
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             {/* Resume cards would go here */}
          </div>
        )}
      </div>
    </div>
  );
}
