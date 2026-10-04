import React from "react";
import { ResumeData } from "@/lib/types";

interface TemplateProps {
  resume: ResumeData;
}

export default function ExecutiveTemplate({ resume }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects, settings } = resume;
  const accent = settings?.accentColor || "#18181b";

  const skillList = (skills || "")
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="w-[794px] h-[1123px] bg-white text-[#18181b] p-10 flex flex-col justify-between font-serif box-border select-none overflow-hidden">
      <div>
        {/* Executive Header */}
        <header className="border-b-2 border-zinc-900 pb-3 mb-4">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold text-zinc-950 tracking-tight">
                {personalInfo.fullName || "John Doe"}
              </h1>
              <p className="text-[13px] font-medium text-zinc-700 mt-0.5 tracking-wide">
                {personalInfo.jobTitle || "Executive Leader"}
              </p>
            </div>
            <div className="text-right text-[10.5px] text-zinc-600 font-sans space-y-0.5">
              <div>{personalInfo.email}</div>
              <div>
                {[personalInfo.phone, personalInfo.location, personalInfo.linkedin]
                  .filter(Boolean)
                  .join(" · ")}
              </div>
            </div>
          </div>
        </header>

        {/* Content Flow */}
        <div className="space-y-4">
          {/* Executive Profile */}
          {summary && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 mb-1.5">
                Executive Profile
              </h2>
              <p
                className="text-[11px] leading-relaxed text-zinc-800 text-justify border-l-2 pl-3"
                style={{ borderColor: accent }}
              >
                {summary}
              </p>
            </section>
          )}

          {/* Core Competencies Grid */}
          {skillList.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 mb-2">
                Core Competencies &amp; Governance
              </h2>
              <div className="grid grid-cols-3 gap-x-4 gap-y-1 text-[10.5px] text-zinc-800 font-sans">
                {skillList.slice(0, 9).map((skill, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                    <span className="truncate">{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Career History */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 mb-2">
                Executive Career History
              </h2>
              <div className="space-y-3">
                {experience.slice(0, 3).map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline font-bold text-[12px] text-zinc-950">
                      <span>{exp.role}</span>
                      <span className="text-[10.5px] font-medium text-zinc-600 font-sans">
                        {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-zinc-700 mb-0.5">{exp.company}</div>
                    {exp.description && (
                      <p className="text-[10.5px] text-zinc-800 whitespace-pre-line leading-relaxed font-sans">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key Strategic Initiatives / Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 mb-1.5">
                Strategic Initiatives
              </h2>
              <div className="space-y-2">
                {projects.slice(0, 2).map((proj) => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[11.5px] font-bold text-zinc-900">{proj.name}</span>
                      {proj.link && <span className="text-[10px] text-zinc-500 font-sans">{proj.link}</span>}
                    </div>
                    <p className="text-[10.5px] text-zinc-700 mt-0.5 font-sans leading-snug">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Credentials & Education */}
          {education && education.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 mb-1.5">
                Credentials &amp; Education
              </h2>
              <div className="space-y-1">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-baseline text-[11px]">
                    <span className="font-bold text-zinc-900">{edu.degree} — {edu.school}</span>
                    <span className="text-zinc-600 text-[10.5px] font-sans">{edu.startDate} – {edu.endDate}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
