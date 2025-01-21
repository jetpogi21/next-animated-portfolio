import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { aboutMeService } from "../_lib/about-me-service";
import { SelectAboutMe } from "@/db/schema";
import { toast } from "sonner";

export const aboutMeKeys = {
  all: ["about-me"] as const,
};

export const useAboutMe = () => {
  return useQuery({
    queryKey: aboutMeKeys.all,
    queryFn: aboutMeService.getAboutMe,
  });
};

export const useUpdateAboutMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { about_me: string }) =>
      aboutMeService.updateAboutMe(data),
    onSuccess: (data) => {
      queryClient.setQueryData<SelectAboutMe>(aboutMeKeys.all, data);
      toast.success("Success", {
        description: "About me updated successfully",
      });
    },
    onError: () => {
      toast.error("Error", {
        description: "Failed to update about me",
      });
    },
  });
};
