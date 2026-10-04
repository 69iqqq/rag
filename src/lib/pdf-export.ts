"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import type { ResumeData } from "./types";

/**
 * High-fidelity client-side PDF export for Next Role resumes.
 * Captures the true 794px x 1123px physical A4 document with 2x retina
 * rasterization and compiles a pixel-perfect, downloadable A4 PDF.
 */
export async function exportResumeToPdf(
  resume: ResumeData,
  onProgress?: (message: string) => void,
): Promise<void> {
  const targetId = "resume-pdf-export-target";
  let target = document.getElementById(targetId);

  // If dedicated target is not found, fallback to any rendered paper
  if (!target) {
    target =
      document.getElementById("resume-document-to-print") ||
      document.querySelector(".resume-paper");
  }

  if (!target) {
    throw new Error("Resume document element could not be located for PDF generation.");
  }

  onProgress?.("Rendering high-resolution vector canvas...");

  // Capture canvas with 2x scale for sharp text and crisp line rendering
  const canvas = await html2canvas(target as HTMLElement, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#ffffff",
    logging: false,
    onclone: (clonedDoc) => {
      const clonedTarget = clonedDoc.getElementById(targetId);
      if (clonedTarget) {
        clonedTarget.style.left = "0px";
        clonedTarget.style.top = "0px";
        clonedTarget.style.position = "static";
        clonedTarget.style.visibility = "visible";
        clonedTarget.style.display = "block";
      }
    },
  });

  onProgress?.("Compiling standard A4 document...");

  // Standard A4 dimensions in millimeters: 210mm x 297mm
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.98);
  const pdfWidth = 210;
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  // Single-page or multi-page handling
  if (pdfHeight <= 298) {
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
  } else {
    let heightLeft = pdfHeight;
    let position = 0;
    const pageHeight = 297;

    pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 5) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }
  }

  // Clean filename: e.g. "Alex_Rivera_Resume.pdf"
  const rawName =
    resume.personalInfo?.fullName?.trim() || resume.title?.trim() || "Resume";
  const cleanName = rawName.replace(/[^a-zA-Z0-9_-]/g, "_").replace(/_+/g, "_");
  const fileName = `${cleanName}_Resume.pdf`;

  onProgress?.("Saving PDF file...");
  pdf.save(fileName);
}
