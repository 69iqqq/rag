"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, Loader2, File, CheckCircle } from "lucide-react";
import { btnPrimary, inputClass, labelClass } from "./styles";
import Reveal from "./Reveal";

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        setError("Please upload a PDF file.");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB.");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a resume PDF to upload.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);
      if (jobTitle) formData.append("jobTitle", jobTitle);
      if (companyName) formData.append("companyName", companyName);
      if (jobDescription) formData.append("jobDescription", jobDescription);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze resume");
      }

      const { data } = await response.json();
      router.push(`/dashboard/analysis/${data.analysisId}`);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Reveal className="w-full max-w-3xl mx-auto">
      <div className="glass-panel p-6 sm:p-10">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-fg">New Analysis</h2>
          <p className="text-sm text-subtle mt-2">
            Upload your resume and the target job description to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* File Upload Area */}
          <div>
            <label className={`${labelClass} mb-3 block`}>Resume (PDF)</label>
            <label
              className={`
                relative flex flex-col items-center justify-center w-full h-48 
                rounded-2xl border-2 border-dashed transition-all cursor-pointer
                ${file ? "border-accent bg-accent/5" : "border-line hover:border-muted bg-bg-soft/50 hover:bg-bg-soft"}
              `}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                {file ? (
                  <>
                    <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-3">
                      <CheckCircle className="h-6 w-6 text-accent" />
                    </div>
                    <p className="mb-1 text-sm font-semibold text-fg">{file.name}</p>
                    <p className="text-xs text-subtle">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </>
                ) : (
                  <>
                    <div className="h-12 w-12 rounded-full bg-bg flex items-center justify-center mb-3 shadow-sm border border-line">
                       <UploadCloud className="w-5 h-5 text-muted" />
                    </div>
                    <p className="mb-1 text-sm font-medium text-fg">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-subtle">PDF only (MAX. 5MB)</p>
                  </>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handleFileChange}
                disabled={loading}
              />
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="jobTitle" className={labelClass}>Target Job Title <span className="text-muted font-normal">(Optional)</span></label>
              <input
                id="jobTitle"
                type="text"
                className={inputClass}
                placeholder="e.g. Senior Frontend Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="companyName" className={labelClass}>Company Name <span className="text-muted font-normal">(Optional)</span></label>
              <input
                id="companyName"
                type="text"
                className={inputClass}
                placeholder="e.g. Acme Corp"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="jobDescription" className={labelClass}>Job Description <span className="text-muted font-normal">(Optional but recommended)</span></label>
            <textarea
              id="jobDescription"
              rows={6}
              className={`${inputClass} resize-y min-h-[120px]`}
              placeholder="Paste the full job description here for highly targeted feedback..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-500/10 p-4 text-sm text-red-500 border border-red-500/20">
              {error}
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-line">
             <button
                type="submit"
                disabled={!file || loading}
                className={btnPrimary}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing with Gemini AI...
                  </>
                ) : (
                  "Analyze Resume"
                )}
              </button>
          </div>
        </form>
      </div>
    </Reveal>
  );
}
