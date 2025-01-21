import { create } from "zustand";

type TempChanges = {
  [resumeId: string]: {
    [field: string]: any;
  };
};

type ResumeStore = {
  selectedResumeId: string | undefined;
  setSelectedResumeId: (id: string) => void;
  tempChanges: TempChanges;
  setTempValue: (resumeId: string, field: string, value: any) => void;
  getTempValue: (resumeId: string, field: string) => any;
  clearTempChanges: (resumeId: string) => void;
  clearAllTempChanges: () => void;
};

export const useResumeStore = create<ResumeStore>((set, get) => ({
  selectedResumeId: undefined,
  setSelectedResumeId: (id) => set({ selectedResumeId: id }),
  tempChanges: {},
  setTempValue: (resumeId, field, value) =>
    set((state) => ({
      tempChanges: {
        ...state.tempChanges,
        [resumeId]: {
          ...state.tempChanges[resumeId],
          [field]: value,
        },
      },
    })),
  getTempValue: (resumeId, field) => {
    const state = get();
    return state.tempChanges[resumeId]?.[field];
  },
  clearTempChanges: (resumeId) =>
    set((state) => {
      const { [resumeId]: _, ...rest } = state.tempChanges;
      return { tempChanges: rest };
    }),
  clearAllTempChanges: () => set({ tempChanges: {} }),
}));
