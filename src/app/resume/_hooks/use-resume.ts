import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { resumeService } from "../_lib/resume-service";
import { ResumeInfo } from "../_lib/resume-info";
import { SelectResumeInfo } from "@/db/schema";
import { toast } from "sonner";
import { useResumeStore } from "../_store/resume-store";

export const resumeKeys = {
  all: ["resumes"] as const,
  lists: () => [...resumeKeys.all, "list"] as const,
  detail: (id: string) => [...resumeKeys.all, "detail", id] as const,
};

export const useResumes = () => {
  return useQuery({
    queryKey: resumeKeys.lists(),
    queryFn: resumeService.getResumes,
  });
};

export const useUpdateResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        info: ResumeInfo;
        title?: string;
        jobApplicationId?: string | null;
      };
    }) => resumeService.updateResume(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData<SelectResumeInfo[]>(resumeKeys.lists(), (old) =>
        old?.map((resume) => (resume.id === data.id ? data : resume))
      );
      toast.success("Success", {
        description: "Resume updated successfully",
      });
    },
    onError: () => {
      toast.error("Error", {
        description: "Failed to update resume",
      });
    },
  });
};

export const useCreateResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { info: ResumeInfo; title: string }) =>
      resumeService.createResume(data),
    onSuccess: (data) => {
      queryClient.setQueryData<SelectResumeInfo[]>(
        resumeKeys.lists(),
        (old) => [...(old || []), data]
      );
      toast.success("Success", {
        description: "Resume created successfully",
      });
    },
    onError: () => {
      toast.error("Error", {
        description: "Failed to create resume",
      });
    },
  });
};

export const useCloneResume = () => {
  const createResume = useCreateResume();
  const { setSelectedResumeId } = useResumeStore();
  const { data: resumes = [] } = useResumes();

  const cloneResume = async (resume: SelectResumeInfo) => {
    const newTitle = `Copy of ${resume.title}`;

    // Check if a resume with the same title already exists
    const existingResume = resumes.find((r) => r.title === newTitle);
    if (existingResume) {
      toast.warning("Warning", {
        description: `A resume with the name "${newTitle}" already exists.`,
      });
      return;
    }

    const result = await createResume.mutateAsync({
      info: resume.info,
      title: newTitle,
    });
    setSelectedResumeId(result.id);
    return result;
  };

  return {
    cloneResume,
    isLoading: createResume.isPending,
    error: createResume.error,
  };
};

export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resumeService.deleteResume,
    onSuccess: (deletedId) => {
      queryClient.setQueryData<SelectResumeInfo[]>(resumeKeys.lists(), (old) =>
        old?.filter((resume) => resume.id !== deletedId)
      );
      toast.success("Success", {
        description: "Resume deleted successfully",
      });
    },
    onError: () => {
      toast.error("Error", {
        description: "Failed to delete resume",
      });
    },
  });
};
