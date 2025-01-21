import { create } from "zustand";
import { SelectResumeInfo } from "@/db/schema";
import { ResumeInfo } from "@/app/resume/_lib/resume-info";
import { toast } from "sonner";

type ResumeStore = {
  resumeInfos: (SelectResumeInfo & { isNew?: boolean })[];
  selectedResumeInfo: (SelectResumeInfo & { isNew?: boolean }) | undefined;
  isLoading: boolean;
  error: string | null;
  setResumeInfos: (resumeInfos: SelectResumeInfo[]) => void;
  setSelectedResumeInfo: (id: string) => void;
  updateResumeInfo: (updatedInfo: ResumeInfo) => Promise<void>;
  cloneSelectedResume: () => void;
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
      // Extract resumeTitle if it exists
      const { resumeTitle, ...resumeInfo } = updatedInfo as ResumeInfo & {
        resumeTitle?: string;
      };

      // If it's a new resume, make a POST request
      const method = selectedResumeInfo.isNew ? "POST" : "PUT";
      const url = selectedResumeInfo.isNew
        ? "/api/resume"
        : `/api/resume/${selectedResumeInfo.id}`;

      // For new resumes, don't send the temporary ID
      const body = selectedResumeInfo.isNew
        ? { info: resumeInfo, title: resumeTitle || selectedResumeInfo.title }
        : {
            info: resumeInfo,
            ...(resumeTitle && { title: resumeTitle }),
          };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${selectedResumeInfo.isNew ? "create" : "update"} resume`
        );
      }

      const updatedResume = await response.json();
      set((state) => ({
        resumeInfos: state.resumeInfos.map((info) =>
          info.id === selectedResumeInfo.id
            ? { ...updatedResume, isNew: false }
            : info
        ),
        selectedResumeInfo: { ...updatedResume, isNew: false },
      }));

      toast.success("Success", {
        description: `Resume ${
          selectedResumeInfo.isNew ? "created" : "updated"
        } successfully`,
      });
    } catch (error) {
      set({ error: (error as Error).message });
      toast.error("Error", {
        description: `Failed to ${
          selectedResumeInfo.isNew ? "create" : "update"
        } resume`,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  cloneSelectedResume: () => {
    const { selectedResumeInfo } = get();
    if (!selectedResumeInfo) return;

    const newResume: SelectResumeInfo & { isNew: boolean } = {
      id: `temp_${Date.now()}`, // Temporary ID using timestamp
      title: `Copy of ${selectedResumeInfo.title}`,
      info: {
        ...selectedResumeInfo.info,
        title: selectedResumeInfo.info.title, // Keep the professional title unchanged
      },
      isNew: true,
    };

    set((state) => ({
      resumeInfos: [...state.resumeInfos, newResume],
      selectedResumeInfo: newResume,
    }));

    toast.success("Success", {
      description: "Resume cloned successfully. Click Save Changes to save it.",
    });
  },
}));
