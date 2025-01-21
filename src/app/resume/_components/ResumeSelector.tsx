"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Copy, Loader2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Button } from "@/components/ui/Button";
import { useResumeStore } from "@/app/resume/_store/resume-store";
import {
  useCloneResume,
  useResumes,
  useDeleteResume,
} from "../_hooks/use-resume";

export const ResumeSelector = () => {
  const { data: resumeInfos, isLoading: isLoadingResumes } = useResumes();
  const { selectedResumeId, setSelectedResumeId } = useResumeStore();
  const { cloneResume, isLoading: isCloning } = useCloneResume();
  const { mutate: deleteResume, isPending: isDeleting } = useDeleteResume();

  // Set initial selected resume
  if (!selectedResumeId && resumeInfos?.length && !isLoadingResumes) {
    setSelectedResumeId(resumeInfos[0].id);
  }

  const handleClone = async () => {
    if (!selectedResumeId || !resumeInfos) return;
    const resumeToClone = resumeInfos.find((r) => r.id === selectedResumeId);
    if (!resumeToClone) return;
    await cloneResume(resumeToClone);
  };

  const handleDelete = (id: string) => {
    deleteResume(id);
    // Set selected resume to another one if available
    const remainingResumes = resumeInfos?.filter((info) => info.id !== id);
    if (remainingResumes?.length) {
      setSelectedResumeId(remainingResumes[0].id);
    }
  };

  if (isLoadingResumes) {
    return (
      <div className="flex gap-2 items-center">
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading resumes...
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      <Select
        value={selectedResumeId}
        onValueChange={setSelectedResumeId}
      >
        <SelectTrigger
          className="w-full"
          data-testid="resume-selector"
        >
          <SelectValue placeholder="Select a resume" />
        </SelectTrigger>
        <SelectContent>
          {resumeInfos?.map((info) => (
            <SelectItem
              key={info.id}
              value={info.id}
              data-testid={`resume-option-${info.title}`}
            >
              {info.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10"
        disabled={!selectedResumeId || isCloning}
        onClick={handleClone}
        data-testid="clone-resume-button"
      >
        {isCloning ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>

      <ConfirmDialog
        trigger={
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10"
            disabled={!selectedResumeId || isDeleting}
            data-testid="delete-resume-button"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </Button>
        }
        title="Delete Resume"
        description="Are you sure you want to delete this resume? This action cannot be undone."
        onConfirm={() => selectedResumeId && handleDelete(selectedResumeId)}
        confirmText="Delete"
      />
    </div>
  );
};
