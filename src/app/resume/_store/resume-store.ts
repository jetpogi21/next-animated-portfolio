import { create } from "zustand";
import { SelectResumeInfo } from "@/db/schema";
import { ResumeInfo } from "@/app/resume/_lib/resume-info";
import { toast } from "sonner";

type ResumeStore = {
  resumeInfos: SelectResumeInfo[];
  selectedResumeInfo: SelectResumeInfo | undefined;
  isLoading: boolean;
  error: string | null;
  setResumeInfos: (resumeInfos: SelectResumeInfo[]) => void;
  setSelectedResumeInfo: (id: string) => void;
  updateResumeInfo: (updatedInfo: ResumeInfo) => Promise<void>;
};

export const useResumeStore = create<ResumeStore>((set, get) => ({
  resumeInfos: [],
  selectedResumeInfo: undefined,
  isLoading: false,
  error: null,
  setResumeInfos: (resumeInfos) => {
    set({ resumeInfos, selectedResumeInfo: resumeInfos[0] });
  },
  setSelectedResumeInfo: (id) => {
    const selected = get().resumeInfos.find((info) => info.id === id);
    set({ selectedResumeInfo: selected });
  },
  updateResumeInfo: async (updatedInfo) => {
    const { selectedResumeInfo } = get();
    if (!selectedResumeInfo) return;

    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/resume/${selectedResumeInfo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ info: updatedInfo }),
      });

      if (!response.ok) {
        throw new Error("Failed to update resume");
      }

      const updatedResume = await response.json();
      set((state) => ({
        resumeInfos: state.resumeInfos.map((info) =>
          info.id === selectedResumeInfo.id ? updatedResume : info
        ),
        selectedResumeInfo: updatedResume,
      }));

      toast.success("Success", {
        description: "Resume updated successfully",
      });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
