import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Plus, FileText, ChevronRight, BarChart2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import { btnPrimary, cardClass } from "@/components/styles";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: analyses } = await supabase
    .from("analyses")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Dashboard</h1>
          <p className="text-subtle text-sm mt-1">Manage and review your resume analyses.</p>
        </div>
        <Link href="/dashboard/upload" className={btnPrimary}>
          <Plus className="mr-2 h-4 w-4" />
          New Analysis
        </Link>
      </div>

      <Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Stats Cards */}
          <div className={`${cardClass} flex flex-col justify-between`}>
            <div className="flex items-center gap-3 mb-4">
               <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <BarChart2 className="h-5 w-5 text-accent" />
               </div>
               <p className="text-sm font-medium text-subtle">Total Analyses</p>
            </div>
            <p className="text-3xl font-semibold text-fg">{analyses?.length || 0}</p>
          </div>
          
          <div className={`${cardClass} flex flex-col justify-between`}>
            <div className="flex items-center gap-3 mb-4">
               <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-green-500" />
               </div>
               <p className="text-sm font-medium text-subtle">Recent Activity</p>
            </div>
            <p className="text-sm text-subtle">
               {analyses && analyses.length > 0 
                  ? `Last analyzed ${formatDistanceToNow(new Date(analyses[0].created_at), { addSuffix: true })}`
                  : 'No activity yet'
               }
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-12">
        <h2 className="text-lg font-medium text-fg mb-4">Recent Resumes</h2>
        
        {!analyses || analyses.length === 0 ? (
          <Reveal delay={0.1}>
            <div className="glass-panel border-dashed p-12 flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 rounded-full bg-bg-soft flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-muted" />
              </div>
              <h3 className="text-fg font-medium mb-2">No analyses yet</h3>
              <p className="text-subtle text-sm max-w-sm mb-6">
                Upload your resume and a job description to get instant AI-powered feedback.
              </p>
              <Link href="/dashboard/upload" className={btnPrimary}>
                Start First Analysis
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {analyses.map((analysis, i) => (
              <Reveal key={analysis.id} delay={i * 0.05}>
                <Link
                  href={`/dashboard/analysis/${analysis.id}`}
                  className="group block glass-layer rounded-2xl p-5 border border-line hover:border-accent/30 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-fg group-hover:text-accent transition-colors line-clamp-1">
                        {analysis.job_title || "Untitled Analysis"}
                      </h3>
                      <p className="text-sm text-subtle mt-1 line-clamp-1">
                        {analysis.company_name || "Unknown Company"}
                      </p>
                      <p className="text-xs text-muted mt-3">
                        {formatDistanceToNow(new Date(analysis.created_at), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-bg-soft flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
