"use client";

import { useState } from "react";
import ResumePreview from "@/components/ResumePreview";
import { defaultResumeData, ResumeData, ResumeLayout } from "@/lib/types";
import { inputClass, btnPrimary } from "@/components/styles";
import Link from "next/link";

export default function BuilderPage() {
  const [data, setData] = useState<ResumeData>(defaultResumeData);

  const handleUpdate = (field: keyof ResumeData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleExperienceChange = (id: string, field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }));
  };

  const handleEducationChange = (id: string, field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((ed) => (ed.id === id ? { ...ed, [field]: value } : ed)),
    }));
  };

  return (
    <div className="flex h-screen w-full bg-bg overflow-hidden text-fg font-sans selection:bg-accent-soft selection:text-accent">
      
      {/* LEFT PANEL: Editing Controls */}
      <div className="w-[350px] shrink-0 border-r border-line bg-bg-soft overflow-y-auto hidden md:flex flex-col">
        <div className="p-6 border-b border-line flex items-center justify-between sticky top-0 bg-bg-soft/80 backdrop-blur-md z-10">
           <Link href="/dashboard" className="text-[13px] font-medium text-subtle hover:text-fg transition-colors">
              Dashboard
           </Link>
           <div className="text-[11px] font-medium text-muted uppercase tracking-widest">Editor</div>
        </div>
        
        <div className="p-6 space-y-10">
          <section>
             <h2 className="text-sm font-semibold mb-4 uppercase tracking-wider text-subtle">Personal Info</h2>
             <div className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5">Full Name</label>
                  <input type="text" className={inputClass} value={data.name} onChange={(e) => handleUpdate("name", e.target.value)} />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5">Job Title</label>
                  <input type="text" className={inputClass} value={data.title} onChange={(e) => handleUpdate("title", e.target.value)} />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5">Email</label>
                  <input type="email" className={inputClass} value={data.email} onChange={(e) => handleUpdate("email", e.target.value)} />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5">Location</label>
                  <input type="text" className={inputClass} value={data.location} onChange={(e) => handleUpdate("location", e.target.value)} />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5">Summary</label>
                  <textarea rows={4} className={`${inputClass} resize-y`} value={data.summary} onChange={(e) => handleUpdate("summary", e.target.value)} />
                </div>
             </div>
          </section>

          <section>
             <h2 className="text-sm font-semibold mb-4 uppercase tracking-wider text-subtle">Experience</h2>
             <div className="space-y-6">
                {data.experience.map((exp, i) => (
                  <div key={exp.id} className="p-4 rounded-xl border border-line bg-bg space-y-4">
                     <div>
                        <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5">Role</label>
                        <input type="text" className={inputClass} value={exp.role} onChange={(e) => handleExperienceChange(exp.id, "role", e.target.value)} />
                     </div>
                     <div>
                        <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5">Company</label>
                        <input type="text" className={inputClass} value={exp.company} onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)} />
                     </div>
                     <div>
                        <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5">Dates</label>
                        <input type="text" className={inputClass} value={exp.dateRange} onChange={(e) => handleExperienceChange(exp.id, "dateRange", e.target.value)} />
                     </div>
                     <div>
                        <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5">Description</label>
                        <textarea rows={3} className={`${inputClass} resize-y text-xs`} value={exp.description} onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)} />
                     </div>
                  </div>
                ))}
                <button className="w-full py-3 rounded-xl border border-dashed border-line text-[13px] font-medium text-subtle hover:text-fg hover:border-muted transition-colors">
                  + Add Experience
                </button>
             </div>
          </section>

          <section>
             <h2 className="text-sm font-semibold mb-4 uppercase tracking-wider text-subtle">Skills</h2>
             <div className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted mb-1.5">Comma separated</label>
                  <textarea rows={3} className={`${inputClass} resize-y`} value={data.skills} onChange={(e) => handleUpdate("skills", e.target.value)} />
                </div>
             </div>
          </section>
        </div>
      </div>

      {/* CENTER PANEL: Live Preview */}
      <div className="flex-1 bg-black/40 relative overflow-hidden flex flex-col">
         {/* Subtle ambient light behind the document */}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[60vw] h-[60vw] bg-accent/5 rounded-full blur-[120px]" />
         </div>
         
         <div className="flex-1 overflow-auto p-4 sm:p-12 flex items-start justify-center">
            <div className="w-full max-w-[800px] shadow-2xl transition-all duration-300 transform origin-top">
               <ResumePreview data={data} />
            </div>
         </div>
      </div>

      {/* RIGHT PANEL: Customization */}
      <div className="w-[300px] shrink-0 border-l border-line bg-bg-soft overflow-y-auto hidden lg:flex flex-col">
         <div className="p-6 border-b border-line flex items-center justify-between sticky top-0 bg-bg-soft/80 backdrop-blur-md z-10">
           <div className="text-[11px] font-medium text-muted uppercase tracking-widest">Settings</div>
           <button className="text-[13px] font-medium bg-fg text-bg px-4 py-1.5 rounded-full hover:bg-fg/90 transition-colors">
              Save
           </button>
        </div>

        <div className="p-6 space-y-10">
           <section>
             <h2 className="text-[11px] font-semibold mb-3 uppercase tracking-wider text-subtle">Template</h2>
             <div className="grid grid-cols-2 gap-3">
               {(["classic", "minimal", "modern", "sidebar"] as ResumeLayout[]).map((layout) => (
                 <button
                   key={layout}
                   onClick={() => handleUpdate("layout", layout)}
                   className={`p-3 text-[13px] font-medium rounded-xl border transition-all ${
                     data.layout === layout 
                     ? "bg-accent/10 border-accent/20 text-accent" 
                     : "bg-bg border-line text-subtle hover:border-muted hover:text-fg"
                   }`}
                 >
                   <span className="capitalize">{layout}</span>
                 </button>
               ))}
             </div>
           </section>

           <section>
             <h2 className="text-[11px] font-semibold mb-3 uppercase tracking-wider text-subtle">Accent Color</h2>
             <div className="flex gap-3 flex-wrap">
               {["#000000", "#2563eb", "#16a34a", "#ea580c", "#9333ea"].map((color) => (
                 <button
                   key={color}
                   onClick={() => handleUpdate("accentColor", color)}
                   className={`w-8 h-8 rounded-full border-2 transition-all ${
                     data.accentColor === color ? "border-fg scale-110" : "border-transparent hover:scale-105"
                   }`}
                   style={{ backgroundColor: color }}
                   title={color}
                 />
               ))}
             </div>
           </section>

           <div className="pt-8 mt-8 border-t border-line">
              <button className={`${btnPrimary} w-full`}>
                 Export as PDF
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
