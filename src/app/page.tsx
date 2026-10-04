import Link from "next/link";
import ResumePreview from "@/components/ResumePreview";
import { btnPrimary, btnSecondary, cardClass } from "@/components/styles";
import { defaultResumeData } from "@/lib/types";

export default function Home() {
  return (
    <div className="relative overflow-hidden selection:bg-accent-soft selection:text-accent font-sans">
      <div className="ambient-light bg-blue-500/10 w-[40vw] h-[40vw] left-0 top-0" />
      <div className="ambient-light bg-purple-500/10 w-[50vw] h-[50vw] right-0 bottom-[20%]" />

      <div className="mx-auto max-w-6xl px-6 pb-32 pt-24 sm:pt-32">
        {/* HERO SECTION */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="max-w-2xl text-center lg:text-left">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-fg sm:text-6xl mb-6 leading-tight">
              Build a resume that gets noticed.
            </h1>
            <p className="text-balance text-lg text-subtle mb-10 max-w-xl mx-auto lg:mx-0">
              Create a professional resume in minutes with beautiful templates, live preview, and effortless PDF export.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/builder" className="text-[14px] font-medium bg-fg text-bg px-6 py-3 rounded-xl hover:bg-fg/90 transition-all shadow-sm">
                Create My Resume
              </Link>
              <Link href="#templates" className={btnSecondary}>
                Explore Templates
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[450px] lg:max-w-none perspective-1000">
            <div className="relative transform-gpu rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-1000 ease-out">
               <div className="absolute -inset-8 bg-gradient-to-r from-accent/10 to-purple-500/10 blur-3xl rounded-full opacity-50 pointer-events-none" />
               
               {/* Stacked Resumes */}
               <div className="relative z-10 glass-panel p-2 shadow-2xl">
                  <ResumePreview data={{...defaultResumeData, layout: "classic"}} />
               </div>
               <div className="absolute -right-12 -bottom-12 -z-10 w-full glass-panel p-2 shadow-xl opacity-60 scale-95 blur-[2px]">
                  <ResumePreview data={{...defaultResumeData, layout: "sidebar"}} />
               </div>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="mt-48">
           <h2 className="text-center text-3xl font-semibold tracking-tight text-fg mb-16">
             How it works
           </h2>
           <div className="grid gap-8 md:grid-cols-3">
              {[
                { step: "01", title: "Choose", desc: "Select from our library of professional, ATS-friendly templates." },
                { step: "02", title: "Customize", desc: "Add your experience and customize the layout, typography, and colors." },
                { step: "03", title: "Download", desc: "Export a pixel-perfect PDF ready to be sent to recruiters." }
              ].map((s) => (
                 <div key={s.step} className="flex flex-col items-center text-center">
                    <div className="text-5xl font-light text-line mb-6">{s.step}</div>
                    <h3 className="text-lg font-medium text-fg mb-3">{s.title}</h3>
                    <p className="text-sm text-subtle leading-relaxed max-w-xs">{s.desc}</p>
                 </div>
              ))}
           </div>
        </div>

        {/* TEMPLATES SHOWCASE */}
        <div id="templates" className="mt-48">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold tracking-tight text-fg mb-4">
                Professional Templates
              </h2>
              <p className="text-subtle">Designed to pass ATS filters and impress human readers.</p>
           </div>
           
           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {(["classic", "modern", "sidebar", "minimal"] as const).map((layout) => (
                 <div key={layout} className="group relative">
                    <div className="glass-layer p-4 rounded-3xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:border-accent/30">
                       <ResumePreview data={{...defaultResumeData, layout}} className="pointer-events-none" />
                    </div>
                    <div className="mt-6 flex items-center justify-between px-2">
                       <div>
                          <h3 className="text-base font-medium text-fg capitalize">{layout}</h3>
                          <p className="text-xs text-subtle mt-1">Professional layout</p>
                       </div>
                       <Link href="/builder" className="text-[12px] font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                          Use Template
                       </Link>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* FINAL CTA */}
        <div className="mt-48">
             <div className="glass-panel overflow-hidden relative text-center py-32 px-6">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent/5 pointer-events-none" />
                <h2 className="relative text-3xl font-semibold tracking-tight text-fg mb-6">
                  Ready to build your resume?
                </h2>
                <div className="relative">
                  <Link href="/builder" className="text-[14px] font-medium bg-fg text-bg px-8 py-4 rounded-full hover:bg-fg/90 transition-all shadow-sm">
                    Create Your Resume
                  </Link>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
}
