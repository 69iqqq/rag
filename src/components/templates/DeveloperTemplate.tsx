import React from "react";
import { ResumeData } from "@/lib/types";

interface TemplateProps {
  resume: ResumeData;
}

export default function DeveloperTemplate({ resume }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects, settings } = resume;
  const accent = settings?.accentColor || "#18181b";

  const skillList = (skills || "")
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="w-[794px] h-[1123px] bg-white text-[#18181b] p-10 flex flex-col justify-between font-mono box-border select-none overflow-hidden">
      <div>
        {/* Terminal/Code Header */}
        <header className="border-b border-zinc-300 pb-3 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-zinc-950 tracking-tight font-sans">
                {personalInfo.fullName || "John Doe"}
              </h1>
              <p className="text-[12.5px] font-medium mt-0.5" style={{ color: accent }}>
                &gt; {personalInfo.jobTitle || "Software Engineer"}
              </p>
            </div>
            <div className="text-right text-[10px] text-zinc-600 space-y-0.5">
              {personalInfo.github && <div>gh: {personalInfo.github}</div>}
              {personalInfo.website && <div>web: {personalInfo.website}</div>}
              {personalInfo.email && <div>mail: {personalInfo.email}</div>}
              {personalInfo.location && <div>loc: {personalInfo.location}</div>}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="space-y-3.5">
          {/* Summary */}
          {summary && (
            <section>
              <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
                {"// Summary"}
              </h2>
              <p className="text-[11px] leading-relaxed text-zinc-800 font-sans">
                {summary}
              </p>
            </section>
          )}

          {/* Technical Stack */}
          {skillList.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                {"// Technical Stack"}
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skillList.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-zinc-100 border border-zinc-200 text-zinc-800 rounded text-[10px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                {"// Experience"}
              </h2>
              <div className="space-y-3">
                {experience.slice(0, 3).map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <div className="text-[11.5px] font-bold text-zinc-950 font-sans">
                        {exp.role} <span style={{ color: accent }}>@{exp.company}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500">
                        [{exp.startDate} - {exp.current ? "present" : exp.endDate}]
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-[10.5px] text-zinc-700 mt-1 whitespace-pre-line leading-relaxed font-sans">
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
              <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                {"// Open Source & Projects"}
              </h2>
              <div className="space-y-2">
                {projects.slice(0, 2).map((proj) => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[11px] font-bold text-zinc-900">{proj.name}</span>
                      {proj.link && <span className="text-[10px] text-zinc-500">{proj.link}</span>}
                    </div>
                    <p className="text-[10.5px] text-zinc-700 mt-0.5 font-sans leading-snug">{proj.description}</p>
                    {proj.technologies && (
                      <p className="text-[9.5px] text-zinc-500 mt-0.5">stack: {proj.technologies}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
                {"// Education"}
              </h2>
              <div className="space-y-1">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-baseline text-[10.5px]">
                    <span className="text-zinc-900 font-bold">{edu.degree} · {edu.school}</span>
                    <span className="text-zinc-500 text-[10px]">{edu.startDate} - {edu.endDate}</span>
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
