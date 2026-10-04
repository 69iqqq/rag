import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata = {
  title: "AI Resume Analyzer",
  description: "Get instant AI feedback on your resume and find your perfect job match.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      {/* 
        The body has the background color and ambient lights. 
        It also handles the scrollbar styling if needed.
      */}
      <body className="flex min-h-screen flex-col font-sans antialiased selection:bg-accent-soft">
        <Navbar />
        <main className="flex-1">{children}</main>
        
        {/* Simple Footer */}
        <footer className="border-t border-line py-12 text-center text-[13px] text-subtle">
          <p>© {new Date().getFullYear()} Resume Analyzer. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
