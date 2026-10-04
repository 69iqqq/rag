import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Sparkles, FileText, Target, ChevronRight } from "lucide-react";
import ResumePreview from "@/components/ResumePreview";
import { btnPrimary, btnSecondary, cardClass } from "@/components/styles";

export default function Home() {
  return (
    <div className="relative overflow-hidden selection:bg-accent-soft selection:text-accent">
      {/* Ambient background glows */}
      <div className="ambient-light bg-blue-500/20 w-[40vw] h-[40vw] left-0 top-0" />
      <div className="ambient-light bg-purple-500/20 w-[50vw] h-[50vw] right-0 bottom-[20%]" />

      <div className="mx-auto max-w-6xl px-6 pb-32 pt-24 sm:pt-32">
        {/* HERO SECTION */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="max-w-2xl text-center lg:text-left">
            <Reveal>
              <div className="inline-flex items-center rounded-full glass-layer px-3 py-1 text-[13px] font-medium text-accent mb-6 shadow-sm border border-line">
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                <span>Powered by Gemini AI</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-fg sm:text-6xl mb-6">
                Build a resume that gets noticed.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-balance text-lg text-subtle mb-10 max-w-xl mx-auto lg:mx-0">
                Instantly analyze your resume against any job description, uncover hidden weaknesses, and generate tailored, high-impact improvements.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/signup" className={btnPrimary}>
                  Analyze My Resume
                </Link>
                <Link href="#features" className={btnSecondary}>
                  See How It Works <ChevronRight className="ml-1 h-4 w-4 text-muted" />
                </Link>
              </div>
            </Reveal>
            
            <Reveal delay={0.4}>
              <p className="mt-8 text-xs text-muted flex items-center justify-center lg:justify-start gap-2">
                 Join thousands of professionals landing their dream roles.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3} className="relative mx-auto w-full max-w-[400px] lg:max-w-none">
            {/* Hero Visual - Floating Resume */}
            <div className="relative">
               <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-purple-500/20 blur-3xl rounded-full opacity-50" />
               <div className="glass-panel p-2 shadow-2xl rotate-1 transform-gpu hover:rotate-0 transition-transform duration-700">
                  <ResumePreview layout="modern" />
               </div>
               
               {/* Floating elements */}
               <div className="absolute -left-6 top-1/4 glass-layer p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-float animation-delay-1000">
                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Target className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-subtle uppercase tracking-wider">ATS Match</p>
                    <p className="text-sm font-semibold text-fg">92% Score</p>
                  </div>
               </div>

               <div className="absolute -right-8 bottom-1/4 glass-layer p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-float animation-delay-2000">
                  <div className="h-8 w-8 rounded-full bg-accent-soft flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-subtle uppercase tracking-wider">AI Suggestion</p>
                    <p className="text-sm font-semibold text-fg">Impact Added</p>
                  </div>
               </div>
            </div>
          </Reveal>
        </div>

        {/* FEATURES SECTION */}
        <div id="features" className="mt-40">
           <Reveal>
              <h2 className="text-center text-3xl font-semibold tracking-tight text-fg mb-4">
                Everything you need to stand out
              </h2>
              <p className="text-center text-subtle mb-16 max-w-2xl mx-auto">
                Our tools are designed to surface your true value and align it perfectly with what recruiters are looking for.
              </p>
           </Reveal>

           <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: <Target className="h-6 w-6 text-blue-500" />,
                  title: "Targeted Analysis",
                  description: "Upload any job description and let our AI compare it line-by-line with your resume."
                },
                {
                  icon: <Sparkles className="h-6 w-6 text-purple-500" />,
                  title: "Smart Suggestions",
                  description: "Get actionable rewrites for your bullets to increase impact and match required keywords."
                },
                {
                  icon: <FileText className="h-6 w-6 text-amber-500" />,
                  title: "ATS Optimization",
                  description: "Ensure your resume passes through automated screening systems without getting blocked."
                }
              ].map((feature, i) => (
                 <Reveal key={i} delay={0.1 * i} className={`${cardClass} hover:-translate-y-1 transition-transform duration-300`}>
                    <div className="h-12 w-12 rounded-xl bg-bg-soft flex items-center justify-center mb-6 border border-line">
                       {feature.icon}
                    </div>
                    <h3 className="text-lg font-medium text-fg mb-2">{feature.title}</h3>
                    <p className="text-sm text-subtle leading-relaxed">{feature.description}</p>
                 </Reveal>
              ))}
           </div>
        </div>

        {/* FINAL CTA */}
        <div className="mt-40">
           <Reveal>
             <div className="glass-panel overflow-hidden relative text-center py-24 px-6">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent/5 pointer-events-none" />
                <h2 className="relative text-3xl font-semibold tracking-tight text-fg mb-4">
                  Ready to upgrade your career?
                </h2>
                <p className="relative text-subtle mb-8 max-w-xl mx-auto">
                  Start analyzing your resume today and double your interview chances.
                </p>
                <div className="relative">
                  <Link href="/signup" className={btnPrimary}>
                    Create Your Account
                  </Link>
                </div>
             </div>
           </Reveal>
        </div>
      </div>
    </div>
  );
}
