/**
 * Realistic sample resumes rendered as HTML "paper" so they stay crisp at any size.
 * All people and content are fictional samples used purely as illustrations.
 * Sizing uses container query units, so the whole page scales with its width.
 */

export type ResumeLayout = "classic" | "sidebar" | "modern" | "minimal";

interface Job {
  role: string;
  org: string;
  dates: string;
  bullets: string[];
}

interface SampleResume {
  name: string;
  title: string;
  contact: string;
  summary: string;
  jobs: Job[];
  skills: string[];
  education: string;
  accent: string;
}

export const SAMPLE_RESUMES: Record<ResumeLayout, SampleResume> = {
  classic: {
    name: "Maya Thompson",
    title: "Senior Software Engineer",
    contact: "maya.thompson@email.com · Seattle, WA · github.com/mayat",
    summary:
      "Backend engineer with 7 years building distributed systems. Led migrations that cut infrastructure cost and improved reliability across high-traffic services.",
    jobs: [
      {
        role: "Senior Software Engineer",
        org: "Northwind Cloud",
        dates: "2021 – Present",
        bullets: [
          "Led migration of 40 services to Kubernetes, reducing deploy time from 45 to 6 minutes.",
          "Designed an event pipeline processing 2B messages/day with 99.98% uptime.",
          "Mentored 5 engineers; introduced RFC process adopted company-wide.",
        ],
      },
      {
        role: "Software Engineer",
        org: "Brightline Labs",
        dates: "2017 – 2021",
        bullets: [
          "Built payments API in Go serving 300+ merchant integrations.",
          "Cut p95 latency by 38% through query optimisation and caching.",
        ],
      },
    ],
    skills: ["Go", "TypeScript", "PostgreSQL", "Kubernetes", "AWS", "Kafka", "gRPC"],
    education: "B.S. Computer Science — University of Washington",
    accent: "#0071e3",
  },
  sidebar: {
    name: "Daniel Okafor",
    title: "Product Designer",
    contact: "daniel@okafor.design · London",
    summary:
      "Product designer focused on complex B2B workflows. I turn research into clear, accessible interfaces and ship them alongside engineering.",
    jobs: [
      {
        role: "Lead Product Designer",
        org: "Ledgerly",
        dates: "2020 – Present",
        bullets: [
          "Redesigned invoicing flow; task completion rose from 61% to 89%.",
          "Built a design system of 120 components used by 4 product teams.",
        ],
      },
      {
        role: "UX Designer",
        org: "Studio Meridian",
        dates: "2017 – 2020",
        bullets: ["Shipped onboarding for a fintech app with 1M+ downloads.", "Ran 60+ usability sessions."],
      },
    ],
    skills: ["Figma", "Prototyping", "User research", "Design systems", "Accessibility"],
    education: "BA Interaction Design — Goldsmiths",
    accent: "#1d1d1f",
  },
  modern: {
    name: "Priya Raman",
    title: "Data Analyst",
    contact: "priya.raman@email.com · Bengaluru · linkedin.com/in/priyar",
    summary:
      "Analyst who translates messy data into decisions. Built dashboards and forecasting models used daily by sales and operations leadership.",
    jobs: [
      {
        role: "Data Analyst",
        org: "Kestrel Retail",
        dates: "2022 – Present",
        bullets: [
          "Built demand forecast that reduced stock-outs by 22% across 140 stores.",
          "Automated weekly reporting in Python, saving 12 analyst hours per week.",
        ],
      },
      {
        role: "Business Analyst Intern",
        org: "Arcadia Finance",
        dates: "2021",
        bullets: ["Modelled churn drivers with logistic regression for retention team."],
      },
    ],
    skills: ["SQL", "Python", "Power BI", "Statistics", "dbt", "Excel"],
    education: "M.Sc. Statistics — Christ University",
    accent: "#5e5ce6",
  },
  minimal: {
    name: "Lucas Moreau",
    title: "Marketing Manager",
    contact: "lucas.moreau@email.com · Paris",
    summary:
      "Growth marketer with B2C and SaaS experience. Comfortable owning budget, channels and the numbers behind them.",
    jobs: [
      {
        role: "Marketing Manager",
        org: "Pulsewave",
        dates: "2021 – Present",
        bullets: [
          "Grew paid acquisition 3.1x while lowering CAC by 27%.",
          "Launched lifecycle email program generating 18% of revenue.",
        ],
      },
      {
        role: "Growth Marketer",
        org: "Atelier Nord",
        dates: "2018 – 2021",
        bullets: ["Ran 200+ A/B tests across landing pages and onboarding."],
      },
    ],
    skills: ["Paid social", "SEO", "Lifecycle", "Analytics", "Copywriting"],
    education: "MSc Marketing — ESCP Business School",
    accent: "#248a3d",
  },
};

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-[0.35em] space-y-[0.25em]">
      {items.map((b) => (
        <li key={b} className="flex gap-[0.5em] text-[0.82em] leading-[1.45] text-[#3a3a3c]">
          <span className="mt-[0.6em] h-[0.28em] w-[0.28em] shrink-0 rounded-full bg-[#8e8e93]" />
          <span>{b}</span>
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

function Experience({ r }: { r: SampleResume }) {
  return (
    <div className="space-y-[0.9em]">
      {r.jobs.map((j) => (
        <div key={j.role + j.org}>
          <div className="flex items-baseline justify-between gap-[0.5em]">
            <p className="text-[0.92em] font-semibold text-[#1d1d1f]">
              {j.role} <span className="font-normal text-[#6e6e73]">· {j.org}</span>
            </p>
            <p className="shrink-0 text-[0.75em] text-[#8e8e93]">{j.dates}</p>
          </div>
          <Bullets items={j.bullets} />
        </div>
      ))}
    </div>
  );
}

function Classic({ r }: { r: SampleResume }) {
  return (
    <div className="p-[7%]">
      <div className="border-b border-[#e5e5ea] pb-[0.9em] text-center">
        <h3 className="text-[1.9em] font-semibold tracking-[-0.02em] text-[#1d1d1f]">{r.name}</h3>
        <p className="mt-[0.15em] text-[0.95em] font-medium" style={{ color: r.accent }}>
          {r.title}
        </p>
        <p className="mt-[0.35em] text-[0.72em] text-[#8e8e93]">{r.contact}</p>
      </div>
      <div className="mt-[1em] space-y-[1.1em]">
        <section>
          <SectionTitle accent={r.accent}>Summary</SectionTitle>
          <p className="text-[0.82em] leading-[1.5] text-[#3a3a3c]">{r.summary}</p>
        </section>
        <section>
          <SectionTitle accent={r.accent}>Experience</SectionTitle>
          <Experience r={r} />
        </section>
        <section>
          <SectionTitle accent={r.accent}>Skills</SectionTitle>
          <p className="text-[0.82em] text-[#3a3a3c]">{r.skills.join("  ·  ")}</p>
        </section>
        <section>
          <SectionTitle accent={r.accent}>Education</SectionTitle>
          <p className="text-[0.82em] text-[#3a3a3c]">{r.education}</p>
        </section>
      </div>
    </div>
  );
}

function Sidebar({ r }: { r: SampleResume }) {
  return (
    <div className="grid h-full grid-cols-[36%_1fr]">
      <aside className="bg-[#1d1d1f] p-[11%] text-white">
        <div className="mb-[1.2em] grid h-[3.4em] w-[3.4em] place-items-center rounded-full bg-white/15 text-[1.1em] font-semibold">
          {r.name
            .split(" ")
            .map((p) => p[0])
            .join("")}
        </div>
        <h3 className="text-[1.35em] font-semibold leading-tight tracking-[-0.02em]">{r.name}</h3>
        <p className="mt-[0.3em] text-[0.82em] text-white/70">{r.title}</p>
        <p className="mt-[1em] text-[0.7em] leading-[1.6] text-white/60">{r.contact}</p>
        <h4 className="mt-[1.6em] mb-[0.6em] text-[0.68em] font-bold uppercase tracking-[0.14em] text-white/50">Skills</h4>
        <ul className="space-y-[0.45em]">
          {r.skills.map((s) => (
            <li key={s} className="text-[0.78em] text-white/85">
              {s}
            </li>
          ))}
        </ul>
        <h4 className="mt-[1.6em] mb-[0.6em] text-[0.68em] font-bold uppercase tracking-[0.14em] text-white/50">Education</h4>
        <p className="text-[0.74em] leading-[1.5] text-white/80">{r.education}</p>
      </aside>
      <div className="p-[9%]">
        <SectionTitle accent="#1d1d1f">Profile</SectionTitle>
        <p className="text-[0.82em] leading-[1.5] text-[#3a3a3c]">{r.summary}</p>
        <div className="mt-[1.3em]">
          <SectionTitle accent="#1d1d1f">Experience</SectionTitle>
          <Experience r={r} />
        </div>
      </div>
    </div>
  );
}

function Modern({ r }: { r: SampleResume }) {
  return (
    <div>
      <div className="px-[7%] pt-[7%] pb-[1.2em]" style={{ background: `linear-gradient(135deg, ${r.accent}, #8e8cf0)` }}>
        <h3 className="text-[1.8em] font-semibold tracking-[-0.02em] text-white">{r.name}</h3>
        <p className="text-[0.95em] text-white/85">{r.title}</p>
        <p className="mt-[0.4em] text-[0.72em] text-white/70">{r.contact}</p>
      </div>
      <div className="space-y-[1.1em] p-[7%]">
        <p className="text-[0.84em] leading-[1.5] text-[#3a3a3c]">{r.summary}</p>
        <section>
          <SectionTitle accent={r.accent}>Experience</SectionTitle>
          <Experience r={r} />
        </section>
        <section>
          <SectionTitle accent={r.accent}>Skills</SectionTitle>
          <div className="flex flex-wrap gap-[0.4em]">
            {r.skills.map((s) => (
              <span key={s} className="rounded-full px-[0.7em] py-[0.2em] text-[0.74em] font-medium" style={{ background: `${r.accent}14`, color: r.accent }}>
                {s}
              </span>
            ))}
          </div>
        </section>
        <section>
          <SectionTitle accent={r.accent}>Education</SectionTitle>
          <p className="text-[0.82em] text-[#3a3a3c]">{r.education}</p>
        </section>
      </div>
    </div>
  );
}

function Minimal({ r }: { r: SampleResume }) {
  return (
    <div className="p-[8%]">
      <h3 className="text-[2.1em] font-light tracking-[-0.03em] text-[#1d1d1f]">{r.name}</h3>
      <p className="text-[0.9em] text-[#6e6e73]">
        {r.title} — {r.contact}
      </p>
      <div className="mt-[1.4em] grid grid-cols-[28%_1fr] gap-x-[1.2em] gap-y-[1.2em]">
        <SectionTitle accent={r.accent}>About</SectionTitle>
        <p className="text-[0.82em] leading-[1.5] text-[#3a3a3c]">{r.summary}</p>
        <SectionTitle accent={r.accent}>Experience</SectionTitle>
        <Experience r={r} />
        <SectionTitle accent={r.accent}>Skills</SectionTitle>
        <p className="text-[0.82em] text-[#3a3a3c]">{r.skills.join(", ")}</p>
        <SectionTitle accent={r.accent}>Education</SectionTitle>
        <p className="text-[0.82em] text-[#3a3a3c]">{r.education}</p>
      </div>
    </div>
  );
}

/** A sample resume page at US-letter proportions. Width is controlled by the parent. */
export default function ResumePreview({ layout, className = "" }: { layout: ResumeLayout; className?: string }) {
  const r = SAMPLE_RESUMES[layout];
  return (
    <div
      className={`paper relative aspect-[8.5/11] w-full bg-white overflow-hidden rounded-[6px] select-none [container-type:inline-size] ${className}`}
      role="img"
      aria-label={`Sample ${r.title} resume`}
    >
      <div className="h-full text-[2.55cqw] leading-normal">
        {layout === "classic" && <Classic r={r} />}
        {layout === "sidebar" && <Sidebar r={r} />}
        {layout === "modern" && <Modern r={r} />}
        {layout === "minimal" && <Minimal r={r} />}
      </div>
      {/* Subtle paper sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-black/[0.025]" />
    </div>
  );
}
