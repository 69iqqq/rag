import { ResumeData } from "@/lib/types";

function Bullets({ text }: { text: string }) {
  if (!text) return null;
  const bullets = text.split("\n").filter((b) => b.trim() !== "");
  if (bullets.length === 1) return <p className="mt-[0.35em] text-[0.82em] leading-[1.45] text-[#3a3a3c]">{bullets[0]}</p>;
  
  return (
    <ul className="mt-[0.35em] space-y-[0.25em]">
      {bullets.map((b, i) => (
        <li key={i} className="flex gap-[0.5em] text-[0.82em] leading-[1.45] text-[#3a3a3c]">
          <span className="mt-[0.6em] h-[0.28em] w-[0.28em] shrink-0 rounded-full bg-[#8e8e93]" />
          <span>{b.replace(/^[•-]\s*/, '')}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionTitle({ children, accent }: { children: string; accent: string }) {
  return (
    <h4 className="mb-[0.4em] text-[0.72em] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
      {children}
    </h4>
  );
}

function ExperienceSection({ data }: { data: ResumeData }) {
  if (data.experience.length === 0) return null;
  return (
    <div className="space-y-[0.9em]">
      {data.experience.map((j) => (
        <div key={j.id}>
          <div className="flex items-baseline justify-between gap-[0.5em]">
            <p className="text-[0.92em] font-semibold text-[#1d1d1f]">
              {j.role} <span className="font-normal text-[#6e6e73]">· {j.company}</span>
            </p>
            <p className="shrink-0 text-[0.75em] text-[#8e8e93]">{j.dateRange}</p>
          </div>
          <Bullets text={j.description} />
        </div>
      ))}
    </div>
  );
}

function Classic({ data }: { data: ResumeData }) {
  const accent = data.accentColor || "#1d1d1f";
  return (
    <div className="p-[7%]">
      <div className="border-b border-[#e5e5ea] pb-[0.9em] text-center">
        <h3 className="text-[1.9em] font-semibold tracking-[-0.02em] text-[#1d1d1f]">{data.name}</h3>
        <p className="mt-[0.15em] text-[0.95em] font-medium" style={{ color: accent }}>
          {data.title}
        </p>
        <p className="mt-[0.35em] text-[0.72em] text-[#8e8e93]">
          {[data.email, data.phone, data.location, data.website].filter(Boolean).join(" · ")}
        </p>
      </div>
      <div className="mt-[1em] space-y-[1.1em]">
        {data.summary && (
          <section>
            <SectionTitle accent={accent}>Summary</SectionTitle>
            <p className="text-[0.82em] leading-[1.5] text-[#3a3a3c]">{data.summary}</p>
          </section>
        )}
        {data.experience.length > 0 && (
          <section>
            <SectionTitle accent={accent}>Experience</SectionTitle>
            <ExperienceSection data={data} />
          </section>
        )}
        {data.skills && (
          <section>
            <SectionTitle accent={accent}>Skills</SectionTitle>
            <p className="text-[0.82em] text-[#3a3a3c]">{data.skills.split(',').map(s=>s.trim()).join(" · ")}</p>
          </section>
        )}
        {data.education.length > 0 && (
          <section>
            <SectionTitle accent={accent}>Education</SectionTitle>
            {data.education.map(e => (
               <div key={e.id} className="flex justify-between items-baseline mb-[0.3em]">
                 <p className="text-[0.82em] text-[#3a3a3c] font-medium">{e.degree} <span className="font-normal text-[#8e8e93]">· {e.school}</span></p>
                 <p className="text-[0.75em] text-[#8e8e93]">{e.dateRange}</p>
               </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

function Minimal({ data }: { data: ResumeData }) {
  const accent = data.accentColor || "#1d1d1f";
  return (
    <div className="p-[8%]">
      <h3 className="text-[2.1em] font-light tracking-[-0.03em] text-[#1d1d1f]">{data.name}</h3>
      <p className="text-[0.9em] text-[#6e6e73]">
        {data.title} — {[data.email, data.location].filter(Boolean).join(" · ")}
      </p>
      <div className="mt-[1.4em] grid grid-cols-[28%_1fr] gap-x-[1.2em] gap-y-[1.2em]">
        {data.summary && (
          <>
            <SectionTitle accent={accent}>About</SectionTitle>
            <p className="text-[0.82em] leading-[1.5] text-[#3a3a3c]">{data.summary}</p>
          </>
        )}
        {data.experience.length > 0 && (
           <>
            <SectionTitle accent={accent}>Experience</SectionTitle>
            <ExperienceSection data={data} />
           </>
        )}
        {data.skills && (
           <>
            <SectionTitle accent={accent}>Skills</SectionTitle>
            <p className="text-[0.82em] text-[#3a3a3c]">{data.skills}</p>
           </>
        )}
      </div>
    </div>
  );
}

export default function ResumePreview({ data, className = "" }: { data: ResumeData; className?: string }) {
  const layout = data.layout || "classic";
  return (
    <div
      className={`paper relative aspect-[8.5/11] w-full bg-white overflow-hidden rounded-[6px] select-none [container-type:inline-size] ${className}`}
      style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.05), 0 20px 40px -10px rgba(0,0,0,0.1)" }}
    >
      <div className="h-full text-[2.55cqw] leading-normal font-sans">
        {layout === "classic" && <Classic data={data} />}
        {layout === "minimal" && <Minimal data={data} />}
        {(layout === "sidebar" || layout === "modern") && <Classic data={data} />}
      </div>
      {/* Subtle paper sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-black/[0.02]" />
    </div>
  );
}
