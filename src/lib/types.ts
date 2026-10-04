export type ResumeLayout = "classic" | "sidebar" | "modern" | "minimal";

export interface Experience {
  id: string;
  role: string;
  company: string;
  dateRange: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  dateRange: string;
}

export interface ResumeData {
  id?: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string; // Comma separated for simplicity, or we can make it string[]
  layout: ResumeLayout;
  accentColor: string;
}

export const defaultResumeData: ResumeData = {
  name: "Jane Doe",
  title: "Software Engineer",
  email: "jane@example.com",
  phone: "(555) 123-4567",
  location: "San Francisco, CA",
  website: "github.com/janedoe",
  summary: "Detail-oriented software engineer with 5+ years of experience building scalable web applications.",
  experience: [
    {
      id: "1",
      role: "Senior Frontend Engineer",
      company: "Tech Corp",
      dateRange: "2020 - Present",
      description: "Led a team of 4 engineers to rebuild the core customer dashboard in React, improving performance by 40%.",
    }
  ],
  education: [
    {
      id: "1",
      degree: "B.S. Computer Science",
      school: "University of Technology",
      dateRange: "2016 - 2020",
    }
  ],
  skills: "JavaScript, TypeScript, React, Next.js, Node.js",
  layout: "classic",
  accentColor: "#000000",
};
