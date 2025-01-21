import { SelectAboutMe } from "@/db/schema";

export const aboutMeService = {
  getAboutMe: async (): Promise<SelectAboutMe> => {
    const response = await fetch("/api/about-me");
    if (!response.ok) throw new Error("Failed to fetch about me");
    return response.json();
  },

  updateAboutMe: async (data: { about_me: string }): Promise<SelectAboutMe> => {
    const response = await fetch("/api/about-me", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update about me");
    return response.json();
  },
};
