import React from "react";
import { ResumeData } from "@/lib/types";

interface TemplateProps {
  resume: ResumeData;
}

export default function MinimalTemplate({ resume }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects } = resume;

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
    <div className="w-[794px] h-[1123px] bg-white text-[#18181b] p-10 flex flex-col justify-between font-sans box-border select-none">
      <div>
        {/* Header */}
        <header className="border-b border-zinc-200 pb-4 mb-5">
          <h1 className="text-3xl font-light tracking-tight text-zinc-950">
            {personalInfo.fullName || "John Doe"}
          </h1>
          <p className="text-sm font-medium text-zinc-600 mt-1">
            {personalInfo.jobTitle || "Software Engineer"}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-zinc-500 mt-2.5">
            {contactItems.map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-zinc-300">·</span>}
                {item}
              </span>
            ))}
          </div>
        </header>

        {/* Main Content Sections */}
        <div className="space-y-4">
          {/* Summary */}
          {summary && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400 mb-1.5">
                Summary
              </h2>
              <p className="text-[11.5px] leading-relaxed text-zinc-700">
                {summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400 mb-2">
                Experience
              </h2>
              <div className="space-y-3.5">
                {experience.slice(0, 3).map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <div className="text-[12px] font-semibold text-zinc-900">
                        {exp.role} <span className="font-normal text-zinc-600">· {exp.company}</span>
                      </div>
                      <span className="text-[10.5px] text-zinc-500">
                        {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-[11px] leading-relaxed text-zinc-600 mt-1 whitespace-pre-line">
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
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400 mb-2">
                Projects
              </h2>
              <div className="space-y-2.5">
                {projects.slice(0, 2).map((proj) => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[11.5px] font-semibold text-zinc-900">{proj.name}</span>
                      {proj.link && <span className="text-[10px] text-zinc-400">{proj.link}</span>}
                    </div>
                    <p className="text-[11px] text-zinc-600 leading-snug mt-0.5">{proj.description}</p>
                    {proj.technologies && (
                      <p className="text-[10px] text-zinc-400 mt-0.5">{proj.technologies}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400 mb-2">
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-baseline">
                    <div>
                      <span className="text-[11.5px] font-semibold text-zinc-900">{edu.degree}</span>
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
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400 mb-1.5">
                Skills
              </h2>
              <p className="text-[11px] text-zinc-700 leading-relaxed">
                {skillList.join("  ·  ")}
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
