import { create } from "zustand";

type TempChanges = {
  [resumeId: string]: {
    [field: string]: any;
  };
};

type ResumeStore = {
  selectedResumeId: string | undefined;
  setSelectedResumeId: (id: string) => void;
};

export const useResumeStore = create<ResumeStore>((set) => ({
  selectedResumeId: undefined,
  setSelectedResumeId: (id) => set({ selectedResumeId: id }),
}));
