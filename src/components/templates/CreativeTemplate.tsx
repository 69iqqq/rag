import React from "react";
import { ResumeData } from "@/lib/types";

interface TemplateProps {
  resume: ResumeData;
}

export default function CreativeTemplate({ resume }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects, settings } = resume;
  const accent = settings?.accentColor || "#18181b";

  const contactItems = [
    { label: "Email", val: personalInfo.email },
    { label: "Phone", val: personalInfo.phone },
    { label: "Location", val: personalInfo.location },
    { label: "Portfolio", val: personalInfo.website },
    { label: "LinkedIn", val: personalInfo.linkedin },
    { label: "GitHub", val: personalInfo.github },
  ].filter((item) => Boolean(item.val));

  const skillList = (skills || "")
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const initials = (personalInfo.fullName || "JD")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="w-[794px] h-[1123px] grid grid-cols-[260px_1fr] font-sans box-border select-none overflow-hidden">
      {/* Dark Sidebar */}
      <aside className="bg-zinc-950 text-white p-7 flex flex-col justify-between">
        <div>
          {/* Avatar Monogram */}
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm mb-4 text-white border border-white/20"
            style={{ backgroundColor: accent === "#18181b" ? "#27272a" : accent }}
          >
            {initials}
          </div>

          <h1 className="text-xl font-bold tracking-tight leading-tight">
            {personalInfo.fullName || "John Doe"}
          </h1>
          <p className="text-[12px] text-zinc-400 mt-1 font-medium">
            {personalInfo.jobTitle || "Software Engineer"}
          </p>

          {/* Contact Details */}
          <div className="mt-6 space-y-2 text-[10px] text-zinc-300">
            {contactItems.map((item, i) => (
              <div key={i} className="break-all">
                <span className="text-zinc-500 uppercase tracking-wider block text-[9px]">{item.label}</span>
                <span className="text-zinc-200">{item.val}</span>
              </div>
            ))}
          </div>

          {/* Skills in Sidebar */}
          {skillList.length > 0 && (
            <div className="mt-6">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 border-b border-zinc-800 pb-1">
                Core Skills
              </h2>
              <div className="space-y-1 text-[10.5px] text-zinc-200">
                {skillList.slice(0, 10).map((skill, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="text-zinc-500 text-[9px]">•</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education in Sidebar */}
          {education && education.length > 0 && (
            <div className="mt-6">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 border-b border-zinc-800 pb-1">
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="text-[10.5px]">
                    <p className="font-semibold text-white">{edu.degree}</p>
                    <p className="text-zinc-400 text-[10px]">{edu.school}</p>
                    <p className="text-zinc-500 text-[9.5px]">{edu.startDate} – {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="bg-white p-8 flex flex-col justify-between text-[#18181b]">
        <div className="space-y-4">
          {/* Profile Summary */}
          {summary && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5 border-b border-zinc-200 pb-1">
                Professional Profile
              </h2>
              <p className="text-[11.5px] leading-relaxed text-zinc-700">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-2 border-b border-zinc-200 pb-1">
                Work Experience
              </h2>
              <div className="space-y-3.5">
                {experience.slice(0, 3).map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[12px] font-bold text-zinc-950">{exp.role}</h3>
                      <span className="text-[10.5px] text-zinc-500">
                        {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-zinc-600 mb-0.5">{exp.company}</div>
                    {exp.description && (
                      <p className="text-[11px] text-zinc-700 whitespace-pre-line leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Featured Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-2 border-b border-zinc-200 pb-1">
                Featured Projects
              </h2>
              <div className="space-y-2.5">
                {projects.slice(0, 2).map((proj) => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[11.5px] font-semibold text-zinc-950">{proj.name}</h3>
                      {proj.link && <span className="text-[10px] text-zinc-400">{proj.link}</span>}
                    </div>
                    <p className="text-[11px] text-zinc-700 mt-0.5 leading-snug">{proj.description}</p>
                    {proj.technologies && (
                      <p className="text-[10px] text-zinc-400 mt-0.5">{proj.technologies}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
