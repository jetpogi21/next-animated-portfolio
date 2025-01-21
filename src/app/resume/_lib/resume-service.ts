import { ResumeInfo } from "./resume-info";
import { SelectResumeInfo } from "@/db/schema";

export const resumeService = {
  getResumes: async (): Promise<SelectResumeInfo[]> => {
    const response = await fetch("/api/resume");
    if (!response.ok) throw new Error("Failed to fetch resumes");
    return response.json();
  },

  updateResume: async (
    id: string,
    data: { info: ResumeInfo; title?: string }
  ): Promise<SelectResumeInfo> => {
    const response = await fetch(`/api/resume/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update resume");
    return response.json();
  },

  createResume: async (data: {
    info: ResumeInfo;
    title: string;
  }): Promise<SelectResumeInfo> => {
    const response = await fetch("/api/resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create resume");
    return response.json();
  },

  deleteResume: async (id: string): Promise<string> => {
    const response = await fetch(`/api/resume/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete resume");
    return id;
  },
};
