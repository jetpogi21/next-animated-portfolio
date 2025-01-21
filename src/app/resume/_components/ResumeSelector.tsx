"use client";
import { SelectResumeInfo } from "@/db/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Copy } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/app/resume/_store/resume-store";

type ResumeSelectorProps = {
  resumeInfos: SelectResumeInfo[];
  selectedResume: string;
  setSelectedResume: (id: string) => void;
};

export const ResumeSelector = (props: ResumeSelectorProps) => {
  const { resumeInfos, selectedResume, setSelectedResume } = props;
  const router = useRouter();
  const { cloneSelectedResume } = useResumeStore();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/resume/${selectedResume}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete resume");
      }

      // Set selected resume to another one if available
      const remainingResumes = resumeInfos.filter(
        (info) => info.id !== selectedResume
      );
      if (remainingResumes.length > 0) {
        setSelectedResume(remainingResumes[0].id);
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting resume:", error);
      alert("Failed to delete resume. Please try again.");
    }
  };

  const handleClone = async () => {
    await cloneSelectedResume();
    router.refresh();
  };

  return (
    <div className="flex gap-2 items-center">
      <Select
        value={selectedResume}
        onValueChange={setSelectedResume}
      >
        <SelectTrigger
          className="w-full"
          data-testid="resume-selector"
        >
          <SelectValue placeholder="Select a resume" />
        </SelectTrigger>
        <SelectContent>
          {resumeInfos.map((info) => (
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
        disabled={!selectedResume}
        onClick={handleClone}
        data-testid="clone-resume-button"
      >
        <Copy className="w-4 h-4" />
      </Button>

      <ConfirmDialog
        trigger={
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10"
            disabled={!selectedResume}
            data-testid="delete-resume-button"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        }
        title="Delete Resume"
        description="Are you sure you want to delete this resume? This action cannot be undone."
        onConfirm={handleDelete}
        confirmText="Delete"
      />
    </div>
  );
};
