"use client";

import { Card } from "@/components/ui/Card";
import { useResumes } from "../_hooks/use-resume";
import { useResumeStore } from "../_store/resume-store";
import { useQueryClient } from "@tanstack/react-query";
import { resumeKeys } from "../_hooks/use-resume";
import { SelectResumeInfo } from "@/db/schema";
import { ResumeInfo } from "../_lib/resume-info";
import Editor from "@monaco-editor/react";
import { toast } from "sonner";
import { useEffect } from "react";

export const ResumeJsonEditor = () => {
  const { data: resumeInfos } = useResumes();
  const { selectedResumeId } = useResumeStore();
  const queryClient = useQueryClient();

  const selectedResumeInfo = resumeInfos?.find(
    (r) => r.id === selectedResumeId
  );

  const handleJsonChange = (value: string | undefined) => {
    if (!selectedResumeId || !selectedResumeInfo || !value) return;

    try {
      // Parse and validate that the JSON has the correct shape
      const parsedJson = JSON.parse(value);
      const validatedJson = parsedJson as ResumeInfo;

      // Only update the local UI state
      queryClient.setQueryData<SelectResumeInfo[]>(resumeKeys.lists(), (old) =>
        old?.map((resume) =>
          resume.id === selectedResumeId
            ? {
                ...resume,
                info: validatedJson,
              }
            : resume
        )
      );
    } catch (error) {
      toast.error("Invalid JSON", {
        description: "The JSON must match the ResumeInfo type structure",
      });
    }
  };

  // Reset JSON editor content when selected resume changes
  useEffect(() => {
    if (selectedResumeInfo) {
      const editor = document.querySelector(".monaco-editor");
      if (editor) {
        // Force Monaco editor to update its content
        const event = new Event("input", { bubbles: true });
        editor.dispatchEvent(event);
      }
    }
  }, [selectedResumeId, selectedResumeInfo]);

  if (!selectedResumeInfo) {
    return (
      <Card className="flex flex-1 justify-center items-center text-muted-foreground">
        Select a resume to view and edit
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden flex-1 p-4 h-full">
      <Editor
        height="100%"
        defaultLanguage="json"
        value={JSON.stringify(selectedResumeInfo.info, null, 2)}
        onChange={handleJsonChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
    </Card>
  );
};
