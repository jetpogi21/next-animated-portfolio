import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jobApplicationService } from "../_lib/job-application-service";
import { InsertJobApplication, SelectJobApplication } from "@/db/schema";
import { toast } from "sonner";

export const jobApplicationKeys = {
  all: ["job-applications"] as const,
  lists: () => [...jobApplicationKeys.all, "list"] as const,
  detail: (id: string) => [...jobApplicationKeys.all, "detail", id] as const,
};

export const useJobApplications = () => {
  return useQuery({
    queryKey: jobApplicationKeys.lists(),
    queryFn: jobApplicationService.getJobApplications,
  });
};

export const useCreateJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: jobApplicationService.createJobApplication,
    onSuccess: (data) => {
      queryClient.setQueryData<SelectJobApplication[]>(
        jobApplicationKeys.lists(),
        (old) => [...(old || []), data]
      );
      toast.success("Success", {
        description: "Job application created successfully",
      });
    },
    onError: () => {
      toast.error("Error", {
        description: "Failed to create job application",
      });
    },
  });
};

export const useUpdateJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        companyName?: string;
        jobTitle?: string;
        jobDescription?: string;
        status?: string;
        notes?: string;
      };
    }) => jobApplicationService.updateJobApplication(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData<SelectJobApplication[]>(
        jobApplicationKeys.lists(),
        (old) =>
          old?.map((application) =>
            application.id === data.id ? data : application
          )
      );
      toast.success("Success", {
        description: "Job application updated successfully",
      });
    },
    onError: () => {
      toast.error("Error", {
        description: "Failed to update job application",
      });
    },
  });
};

export const useDeleteJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: jobApplicationService.deleteJobApplication,
    onSuccess: (deletedId) => {
      queryClient.setQueryData<SelectJobApplication[]>(
        jobApplicationKeys.lists(),
        (old) => old?.filter((application) => application.id !== deletedId)
      );
      toast.success("Success", {
        description: "Job application deleted successfully",
      });
    },
    onError: () => {
      toast.error("Error", {
        description: "Failed to delete job application",
      });
    },
  });
};
