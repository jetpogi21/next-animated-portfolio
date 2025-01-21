"use client";
import { resumeInfos } from "@/app/resume/_lib/resume-info";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type ResumeSelectorProps = {
  resumeInfos: typeof resumeInfos;
  selectedResume: keyof typeof resumeInfos;
  setSelectedResume: (resume: keyof typeof resumeInfos) => void;
};

export const ResumeSelector = (props: ResumeSelectorProps) => {
  const { selectedResume, setSelectedResume } = props;
  return (
    <Select
      value={selectedResume}
      onValueChange={(value) =>
        setSelectedResume(value as keyof typeof resumeInfos)
      }
    >
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select a resume" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(resumeInfos).map((key) => (
          <SelectItem
            key={key}
            value={key}
          >
            {key}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
