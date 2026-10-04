import React from "react";
import { ResumeData } from "@/lib/types";

interface TemplateProps {
  resume: ResumeData;
}

export default function ModernTemplate({ resume }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects, settings } = resume;
  const accent = settings?.accentColor || "#18181b";

  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
    personalInfo.linkedin,
    personalInfo.github,
  ].filter(Boolean);

  const skillList = (skills || "")
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="w-[794px] h-[1123px] bg-white text-[#18181b] flex flex-col font-sans box-border select-none overflow-hidden">
      {/* Top Accent Stripe */}
      <div className="h-2 w-full shrink-0" style={{ backgroundColor: accent }} />

      <div className="p-10 flex-1 flex flex-col justify-between">
        <div>
          {/* Header */}
          <header className="mb-5">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
              {personalInfo.fullName || "John Doe"}
            </h1>
            <p className="text-sm font-semibold mt-0.5" style={{ color: accent }}>
              {personalInfo.jobTitle || "Software Engineer"}
            </p>
            <div className="flex flex-wrap gap-x-3.5 gap-y-1 text-[11px] text-zinc-600 mt-2">
              {contactItems.map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-zinc-300">•</span>}
                  {item}
                </span>
              ))}
            </div>
          </header>

          {/* Sections */}
          <div className="space-y-4">
            {/* Summary */}
            {summary && (
              <section>
                <h2
                  className="text-[11px] font-bold uppercase tracking-wider pb-1 mb-1.5 border-b border-zinc-200"
                  style={{ color: accent }}
                >
                  Summary
                </h2>
                <p className="text-[11.5px] leading-relaxed text-zinc-700">{summary}</p>
              </section>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
              <section>
                <h2
                  className="text-[11px] font-bold uppercase tracking-wider pb-1 mb-2 border-b border-zinc-200"
                  style={{ color: accent }}
                >
                  Experience
                </h2>
                <div className="space-y-3.5">
                  {experience.slice(0, 3).map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <div className="text-[12px] font-bold text-zinc-900">
                          {exp.role} <span className="font-medium text-zinc-600">| {exp.company}</span>
                        </div>
                        <span className="text-[10.5px] font-medium text-zinc-500">
                          {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-[11px] leading-relaxed text-zinc-700 mt-1 whitespace-pre-line">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <section>
                <h2
                  className="text-[11px] font-bold uppercase tracking-wider pb-1 mb-2 border-b border-zinc-200"
                  style={{ color: accent }}
                >
                  Key Projects
                </h2>
                <div className="space-y-2.5">
                  {projects.slice(0, 2).map((proj) => (
                    <div key={proj.id}>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[11.5px] font-semibold text-zinc-900">{proj.name}</span>
                        {proj.link && <span className="text-[10px] text-zinc-400">{proj.link}</span>}
                      </div>
                      <p className="text-[11px] text-zinc-700 leading-snug mt-0.5">{proj.description}</p>
                      {proj.technologies && (
                        <p className="text-[10px] text-zinc-500 mt-0.5">{proj.technologies}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <section>
                <h2
                  className="text-[11px] font-bold uppercase tracking-wider pb-1 mb-1.5 border-b border-zinc-200"
                  style={{ color: accent }}
                >
                  Education
                </h2>
                <div className="space-y-1.5">
                  {education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-baseline">
                      <div>
                        <span className="text-[11.5px] font-bold text-zinc-900">{edu.degree}</span>
                        <span className="text-[11px] text-zinc-600 ml-2">{edu.school} {edu.gpa ? `· ${edu.gpa}` : ""}</span>
                      </div>
                      <span className="text-[10.5px] text-zinc-500">{edu.startDate} – {edu.endDate}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {skillList.length > 0 && (
              <section>
                <h2
                  className="text-[11px] font-bold uppercase tracking-wider pb-1 mb-2 border-b border-zinc-200"
                  style={{ color: accent }}
                >
                  Skills &amp; Technologies
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {skillList.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] font-medium text-zinc-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
