"use client";

import React from "react";
import { ResumeData } from "@/lib/types";
import {
  MinimalTemplate,
  ModernTemplate,
  ProfessionalTemplate,
  DeveloperTemplate,
  CreativeTemplate,
  ExecutiveTemplate,
} from "./templates";

interface ResumeDocumentProps {
  resume: ResumeData;
  id?: string;
  className?: string;
}

/**
 * Single source of truth for rendering a complete, full-page A4 resume document.
 * Used identically for:
 * 1. Gallery previews (scaled down proportionally)
 * 2. Editor workspace preview
 * 3. PDF print / export
 */
export default function ResumeDocument({
  resume,
  id = "resume-document-to-print",
  className = "",
}: ResumeDocumentProps) {
  const layout = resume.settings?.template || "modern";
  const fontFamily = resume.settings?.fontFamily;

  const fontClass =
    fontFamily === "serif"
      ? "font-serif"
      : fontFamily === "mono"
      ? "font-mono"
      : fontFamily === "inter"
      ? "font-sans"
      : "";

  return (
    <div
      id={id}
      className={`resume-paper w-[794px] min-h-[1123px] bg-white text-[#18181b] relative select-none box-border ${fontClass} ${className}`}
      style={{
        width: 794,
        minHeight: 1123,
      }}
    >
      {layout === "minimal" && <MinimalTemplate resume={resume} />}
      {layout === "modern" && <ModernTemplate resume={resume} />}
      {layout === "professional" && <ProfessionalTemplate resume={resume} />}
      {layout === "developer" && <DeveloperTemplate resume={resume} />}
      {layout === "creative" && <CreativeTemplate resume={resume} />}
      {layout === "executive" && <ExecutiveTemplate resume={resume} />}
    </div>
  );
}
