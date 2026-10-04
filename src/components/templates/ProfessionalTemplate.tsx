import React from "react";
import { ResumeData } from "@/lib/types";

interface TemplateProps {
  resume: ResumeData;
}

export default function ProfessionalTemplate({ resume }: TemplateProps) {
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
    <div className="w-[794px] h-[1123px] bg-white text-[#18181b] p-10 flex flex-col justify-between font-serif box-border select-none overflow-hidden">
      <div>
        {/* Centered Traditional Header */}
        <header className="text-center pb-3 border-b-2 border-zinc-900 mb-4">
          <h1 className="text-2xl font-bold tracking-wide text-zinc-950 uppercase">
            {personalInfo.fullName || "John Doe"}
          </h1>
          <p className="text-[12.5px] italic text-zinc-700 mt-0.5">
            {personalInfo.jobTitle || "Software Engineer"}
          </p>
          <p className="text-[10.5px] text-zinc-600 mt-2 font-sans">
            {contactItems.join("  |  ")}
          </p>
        </header>

        {/* Content Sections */}
        <div className="space-y-3.5">
          {/* Summary */}
          {summary && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-zinc-300 pb-0.5 mb-1.5 text-zinc-900">
                Professional Summary
              </h2>
              <p className="text-[11px] leading-relaxed text-zinc-800 text-justify">
                {summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-zinc-300 pb-0.5 mb-1.5 text-zinc-900">
                Work Experience
              </h2>
              <div className="space-y-3">
                {experience.slice(0, 3).map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline font-bold text-[12px] text-zinc-950">
                      <span>{exp.company}</span>
                      <span className="text-[10.5px] font-normal text-zinc-600 font-sans">
                        {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <div className="italic text-[11.5px] text-zinc-700 mb-0.5">{exp.role}</div>
                    {exp.description && (
                      <p className="text-[11px] text-zinc-800 whitespace-pre-line leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-zinc-300 pb-0.5 mb-1.5 text-zinc-900">
                Education
              </h2>
              <div className="space-y-1.5">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-baseline text-[11px]">
                    <div>
                      <span className="font-bold text-zinc-950">{edu.school}</span>
                      <span className="text-zinc-700 ml-2">— {edu.degree} {edu.gpa ? `· ${edu.gpa}` : ""}</span>
                    </div>
                    <span className="text-[10.5px] text-zinc-600 font-sans">{edu.startDate} – {edu.endDate}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-zinc-300 pb-0.5 mb-1.5 text-zinc-900">
                Key Engagements &amp; Projects
              </h2>
              <div className="space-y-2">
                {projects.slice(0, 2).map((proj) => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[11.5px] font-bold text-zinc-900">{proj.name}</span>
                      {proj.link && <span className="text-[10px] text-zinc-500 font-sans">{proj.link}</span>}
                    </div>
                    <p className="text-[11px] text-zinc-700 leading-snug mt-0.5">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skillList.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-zinc-300 pb-0.5 mb-1.5 text-zinc-900">
                Core Competencies
              </h2>
              <p className="text-[11px] text-zinc-800 leading-relaxed font-sans">
                {skillList.join("  •  ")}
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
