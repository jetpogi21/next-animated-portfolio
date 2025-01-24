import { SelectJobApplication } from "@/db/schema";

export const jobApplicationService = {
  getJobApplications: async (): Promise<SelectJobApplication[]> => {
    const response = await fetch("/api/job-applications");
    if (!response.ok) throw new Error("Failed to fetch job applications");
    return response.json();
  },

  createJobApplication: async (data: {
    companyName: string;
    jobTitle: string;
    jobDescription?: string;
    status?: string;
    notes?: string;
  }): Promise<SelectJobApplication> => {
    const response = await fetch("/api/job-applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create job application");
    return response.json();
  },

  updateJobApplication: async (
    id: string,
    data: {
      companyName?: string;
      jobTitle?: string;
      jobDescription?: string;
      status?: string;
      notes?: string;
    }
  ): Promise<SelectJobApplication> => {
    const response = await fetch(`/api/job-applications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update job application");
    return response.json();
  },

  deleteJobApplication: async (id: string): Promise<string> => {
    const response = await fetch(`/api/job-applications/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete job application");
    return id;
  },
};
