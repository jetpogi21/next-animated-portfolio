"use client";
import { SelectResumeInfo } from "@/db/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ResumeSelectorProps = {
  resumeInfos: SelectResumeInfo[];
  selectedResume: string;
  setSelectedResume: (id: string) => void;
};

export const ResumeSelector = (props: ResumeSelectorProps) => {
  const { resumeInfos, selectedResume, setSelectedResume } = props;
  return (
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
  );
};
